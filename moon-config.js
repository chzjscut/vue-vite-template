// const pluginName = 'RequestParamExtra';

// var fse = require('fs-extra');
// var path = require('path');
// let pageGen = require('moon-fe-plugins/lib/page/page-gen');

module.exports = {
  type: 'h5-redux',
  api: {
    // swaggerUrls: ['http://10.82.2.5:8090/v2/api-docs'], // 刘思远
    // swaggerUrls: ['http://10.82.0.53:18090/v2/api-docs'], // 席洋
    //swaggerUrls: ['http://10.82.0.24:8090/v2/api-docs'], // 孟学潮
    swaggerUrls: ['http://172.23.20.135:12580/v2/api-docs'], // 测试环境
    plugins: [],
    wrapper: 'result',
    dir: './src/api',
    mock: {
      ignoreApi: [],
    },
    exclude: [],
    include: [],
  },
};
