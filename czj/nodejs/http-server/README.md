搭建带HMR的本地开发node sever: 一种是直接用webpack-dev-server, 另一种是使用webpack-dev-middleware和webpack-hot-middleware;
# 使用webpack-dev-middleware + webpack-hot-middleware
1、对js文件热更新：
  （1）修改webpack配置，在每个entry文件中添加前缀'webpack-hot-middleware/client'；并且在webpack的配置项plugins需要配置HMR插件：
      plugins: [ new webpack.HotModuleReplacementPlugin()]；
  （2）在自定义的server文件中（dev-server.js）使用webpack-hot-middleware；
  （3）在想要热更新的文件中加入module.hot相关代码（一般会放在入口模块中）,参照js/index.js;

2、对html文件热更新：在项目中，我们使用html-webpack-plugin来生成webpack spa页面。由于该插件不支持HMR，为了支持html的HMR，我们需要利用webpack-hot-middleware提供对外接口来实现。
  （1）在dev-server.js中为html-webpack-plugin钩子html-webpack-plugin-after-emit增加回调，释放一个信号表示html页面已经构建完成。
  （2）为html页面构建完成后添加回调，用于实现热更新逻辑：新建一个dev-client.js；
  （3）修改webpack的entry，为其添加前缀，即第（2）步创建的文件build/dev-client；
  对html文件的热更新其实不是真正意义上的热更新，而是刷新整个页面。

3、css文件的热更新：一般情况下，webpack项目中的css处理都是通过 extract-text-webpack-plugin 插件把css抽离到单独css文件中，但令人遗憾的是该插件是不支持热加载的。但是，可喜的是webpack的style-loader是支持css热加载的。 该插件通过js创建一个 style 标签，然后注入内联的css。所以，按照上面描述，要想实现css的热加载，只需要: 开发环境不要用extract-text-webpack-plugin插件，而是用style-loader代替。 
  （1）style-loader: 配合css-loader使用，创建style标签；也支持在loader的options中设置injectType: "linkTag"来生成.css文件而不是创建创建style标签;
  （2）css-hot-loader：配合css-loader和mini-css-extract-plugin（webpack3使用extract-text-webpack-plugin）使用，生成相应的.css文件；
