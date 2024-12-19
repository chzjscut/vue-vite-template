const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true, //是否使用包含运行时编译器的 Vue 构建版本
  //lintOnSave: false, //关闭eslint校验
});
