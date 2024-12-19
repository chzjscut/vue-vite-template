const fs = require('fs');
const path = require('path');
const { fork } = require('child_process');

let childProcess = null;
const watchFile = (filePath, callback) => {
  fs.watch(filePath, (event) => {
    if(event === 'change') {
      console.log('文件已被修改，重新加载');
      //如果之前的子进程存在，终止该子进程
      childProcess && childProcess.kill();
      //创建新的子进程
      childProcess = fork(filePath);
      childProcess.on('message', callback);
    }
  })
}

const startServer = (filePath) => {
  //创建一个子进程，启动服务器
  childProcess = fork(filePath);
  childProcess.on('message', () => {
    console.log('服务已启动！');
    //监听文件变化
    watchFile(filePath, () => {
      console.log('文件已被修改')
    })
  })
}

startServer(path.join(__filename, '../server.js'))