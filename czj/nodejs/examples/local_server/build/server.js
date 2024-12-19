const http = require('http');
const path = require('path');
const fs = require('fs');
 
const hostname = '127.0.0.1';
const port = 3000;
 
http.createServer((req, res) => {
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  // res.end('haha');

  const filePath = path.join(__dirname, '../src/views', req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  console.log(filePath, ext)
  const contentType = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
  }[ext] || 'application/octet-stream';
 
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        // 页面未找到
        fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        // 服务器内部错误
        res.writeHead(500);
        res.end('Server Error');
      }
    } else {
      // 成功读取文件
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
 
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  process.send('refresh')
});

//监听来自watcher.js的消息
process.on('message', (message) => {
  console.log(message);
  if(message === 'refresh') {
    console.log('重新加载资源');
  }
})