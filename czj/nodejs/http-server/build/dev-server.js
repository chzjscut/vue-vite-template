const path = require('path');
const express = require('express');
const webpack = require('webpack');
const chokidar = require('chokidar');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');


//监听webpack.config.js修改时重启本地服务
chokidar.watch(path.resolve(process.cwd(), 'webpack.config.js')).on('change', function() {
  process.send && process.send('restart'); //向父进程传递消息信号
})

Object.keys(config.entry).forEach(function(name) {
  config.entry[name] = ['webpack-hot-middleware/client'].concat(config.entry[name]);
})

const app = express();
const compiler = webpack(config);

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
});
const hotMiddleware = webpackHotMiddleware(compiler);

// force page reload when html-webpack-plugin template changes
// compiler.plugin('compilation', function(compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
//     hotMiddleware.publish({action: 'reload'});
//     cb();
//   });
// });

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
app.use(devMiddleware);
app.use(hotMiddleware);

app.listen(3000, function() {
  console.log('server listening on port 3000!\n');
});