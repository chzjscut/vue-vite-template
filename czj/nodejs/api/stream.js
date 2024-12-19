const fs = require('fs');
const zlib = require('zlib');

var readerStream = fs.createReadStream('./files/1.jpg');
// var writerStream = fs.createWriteStream('./files/c.txt');
// readerStream.pipe(writerStream);

// 压缩文件
// readerStream
//   .pipe(zlib.createGzip())
//   .pipe(fs.createWriteStream('./files/1.jpg.gz'));

// 解压文件
fs.createReadStream('./files/1.jpg.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('./files/1_copy.jpg'));

// node 全局对象：global（类似浏览器中的window）
// 全局变量：__filename 和 __dirname
console.log(`${__filename} 执行完毕`);
console.log(__dirname);

// 全局变量：process
console.log('当前目录：' + process.cwd());
console.log('当前版本：' + process.version);
//内存使用情况
console.log(process.memoryUsage());