# CRM升级日志

前述：
```powershell
//使用npm view 包名 versions 查看各npm包的大版本中的小版本信息方便升级
```
## 1、升级webpack并安装webpack-cli并配置环境变量
```powershell
npm i -D webpack@4.46.0 webpack-cli@3.3.12
```
```json
"dev": "cross-env NODE_ENV=development webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
"build": "cross-env NODE_ENV=production node build/build.js"
```
```javascript
//webpack.dev.conf.js
const devWebpackConfig = merge(baseWebpackConfig, {
  mode:"development",
  .....
})
```
```javascript
//webpack.prod.conf.js
const webpackConfig = merge(baseWebpackConfig, {
  mode:"production",
  .....
})
```
npm run dev 报错
```powershell
internal/modules/cjs/loader.js:984
  throw err;
  ^

Error: Cannot find module 'webpack/bin/config-yargs'
Require stack:
```
这是因为webpack-dev-server版本不兼容导致的，所以我们升级一下webpack-dev-server版本
## 2、升级webpack-dev-server
```powershell
npm i -D webpack-dev-server@3.11.2
```
npm run dev 报错
```javascript
//html-webpack-plugin与webpack版本不兼容
var outputName = compilation.mainTemplate.applyPluginsWaterfall('asset-path', outputOptions.filename, {
                                                  ^
TypeError: compilation.mainTemplate.applyPluginsWaterfall is not a function
```
## 3、升级html-webpack-plugin
```powershell
npm i -D html-webpack-plugin@4.5.1
```
npm run dev报错
```javascript
TypeError: Cannot read property 'vue' of undefined
//vue-loader与webpack版本不兼容
```
## 4、升级vue-loader
```powershell
npm i -D vue-loader@15.9.6
```
并配置vue-loader
```javascript
//build/webpack.base.conf.js
//
const {VueLoaderPlugin}=require('vue-loader')
//
//与module同级加入plugin
 plugins:[
    new VueLoaderPlugin(),
 ],
```
关闭cssSourceMap（选配）
```javascript
//config/index.js
cssSourceMap:false//关闭后无法在控制台看到css的位置
```
npm run dev控制台报错
```javascript
//
Uncaught TypeError: Cannot assign to read only property 'exports' of object '#<Object>'
```
点开报错信息，发现直指BaseClient.js，该文件是node_modules下webpack-dev-server中的文件。经过查询得知，出现该种报错信息的原因是因为混用了import和module.exports,一个是es6的用法，一个是es5的用法。
网上的解决办法是建议统一使用es6或者es5的写法 。但是这里的文件并不是我写的，而是npm插件中生成的，所以肯定不能修改写法。于是想到了是不是没有配置babel转换导致的。
## 5、安装babel-plugin-transform-es2015-modules-commonjs
```powershell
npm install babel-plugin-transform-es2015-modules-commonjs -D
```
在项目根目录的.babelrc文件中加入：
```javascript
"plugins": ["transform-es2015-modules-commonjs"]
```
npm run dev控制台报错
```javascript
TypeError: Encrypt.JSEncrypt.JSEncrypt is not a constructor
```
## 6、全局搜索Encrypt.JSEncrypt.JSEncrypt
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1658583/1610953661232-6c6a381b-81f9-4b71-b9d7-78443ade52c3.png#align=left&display=inline&height=30&margin=%5Bobject%20Object%5D&name=image.png&originHeight=30&originWidth=433&size=3207&status=done&style=none&width=433)
改为
```javascript
  let encryptor = new Encrypt.JSEncrypt();
```
## 7、全局搜索).wangEditor;(此步不操作项目也可以运行起来)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1658583/1610953914295-05199fc5-3bfc-4d2e-be1c-d76091ef7e74.png#align=left&display=inline&height=28&margin=%5Bobject%20Object%5D&name=image.png&originHeight=28&originWidth=488&size=4398&status=done&style=none&width=488)
改为
```javascript
var E = require("../../utils/wangEditor.js")
```
## 8、开启babel-loader缓存
```javascript
//build/webpack.base.conf.js
//删除
loader: 'babel-loader',
//更改为
use: {
	loader: 'babel-loader',
	options: {
		cacheDirectory: true
	}
},
exclude: /node_modules/,
include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]

```
## 9、安装html-loader

```powershell
 npm i -D html-loader@0.5.5
```
```javascript
//在webpack.base.conf.js>rules中新增
{
	test: /\.(html|tpl)$/,
	loader: 'html-loader',
	exclude: /node_modules/
},
```
npm run dev报错
```javascript
//最后根据报错提示找到了项目中的一个文件template模板多加了一个lang="html"所以编译不过
  Errors compiling template:

  text "module.exports = "\r\n" outside root element will be ignored.

  1  |  module.exports = "\r\n<div>\r\n  <div class=\"editor\">\r\n    <!-- <div ref=\"toolbar\" class=\"toolbar\">\r\n    </div>\r\n    <div ref=\"editor\" class=\"text\">\r\n    </div> -->\r\n    <div ref=\"editorElem\"></div>\r\n  </div>\r\n  <uploadImgDialog ref=\"uploadImgDialog\" @getSelectImgData=\"getSelectImgData\"></uploadImgDialog>\r\n</div>\r\n";
     |  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```
解决办法：全局搜索lang="html"删除即可
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1658583/1610955035893-d3f80040-bd4c-4caf-a7b4-d21976f24b2a.png#align=left&display=inline&height=326&margin=%5Bobject%20Object%5D&name=image.png&originHeight=326&originWidth=673&size=49352&status=done&style=none&width=673)
npm run dev 启动成功
## 10、修改webpack.base.conf.js中的extensions
```javascript
//优先编译.vue
extensions: ['.vue', '.js', '.json'],
```
## 11、使用mini-css-extract-plugin替换extract-text-webpack-plugin
```powershell
//卸载
npm uninstall extract-text-webpack-plugin
//安装
npm i -D mini-css-extract-plugin@0.9.0
```
```javascript
//  utils.js
//删除
const ExtractTextPlugin = require('extract-text-webpack-plugin')
//删除
//新增
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//新增

//替换
return ExtractTextPlugin.extract({
	use: loaders,
	fallback: 'vue-style-loader'
})
//为
return [MiniCssExtractPlugin.loader].concat(loaders)
```
```javascript
//webpack.dev.conf.js
//新增
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//新增
//在plugins中新增
new MiniCssExtractPlugin({
	filename: '[name].css',
	allChunks: true,
	ignoreOrder:true//关闭顺序警告
}),
```
## 12、修改webpack.dev.conf配置
```javascript
//webpack.dev.conf.js 
new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
new webpack.NoEmitOnErrorsPlugin(),
//这两个方法已在webpack4启用删除即可
```
## 13、修改webpack.prod.conf.js配置
```javascript
//删除
const ExtractTextPlugin = require('extract-text-webpack-plugin')
//删除
//新增
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//新增
//删除plugins中的
// extract css into its own file
new ExtractTextPlugin({
  filename: utils.assetsPath('css/[name].[contenthash].css'),
  // Setting the following option to `false` will not extract CSS from codesplit chunks.
  // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
  // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
  // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
  allChunks: true,
}),
//删除plugins中的
//新增
  new MiniCssExtractPlugin({
      filename: 'static/js/[name].[hash].css',
      chunkFilename: 'static/css/chunks/[name].[hash].chunk.css',
      ignoreOrder:true
    }),
//新增

```
npm run build报错
```javascript
                        throw new RemovedPluginError(errorMessage);
                        ^

Error: webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.
```
这是因为webpack4已经弃用了webpack.optimize.CommonsChunkPlugin插件，
## 14、删除webpack.prod.conf.js中有关CommonsChunkPlugin及已经弃用的配置和不推荐的插件
```javascript
    
//删除prod中的这一串代码
// enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
          // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
```
## 15、在webpack.prod.conf.js与plugins同级新增配置
```powershell
先安装cssnano
npm i -D cssnano@4.1.10
```
```javascript
 optimization: {
    runtimeChunk: true,
    splitChunks: {
        chunks: "all", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
        minSize: 30000, // 模块超过30k自动被抽离成公共模块
        minChunks: 2, // 模块被引用>=1次，便分割
        maxAsyncRequests: 5, // 异步加载chunk的并发请求数量<=5
        maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
        name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
        automaticNameDelimiter: '~', // 命名分隔符
        cacheGroups: { // 缓存组，会继承和覆盖splitChunks的配置
            // default: { // 模块缓存规则，设置为false，默认缓存组将禁用
            //     minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
            //     priority: 1, // 优先级
            //     reuseExistingChunk: true, // 默认使用已有的模块
            // },
            vendors: {
                test: /node_modules/, // 表示默认拆分node_modules中的模块
                priority: 2,
                chunks: 'initial',
                minSize: 0,
                minChunks: 2,
            }
        }
    },
    minimizer: [
        new OptimizeCSSPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true // 移除注释
                }
            },
            canPrint: true
        }),
    ]
  },
```
## 16、移除webpack.prod.conf.js中的chunksSortMode: 'dependency'选项
## 17、使用cdn引入echarts(4.3.0)和vue-router(3.0.1)、axios(0.19.0||0.19.2)
[echarts.min.js](https://www.yuque.com/attachments/yuque/0/2021/js/1658583/1611045775969-490e5da6-6a72-4375-bf63-6c8299253428.js?_lake_card=%7B%22uid%22%3A%221611045775417-0%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2021%2Fjs%2F1658583%2F1611045775969-490e5da6-6a72-4375-bf63-6c8299253428.js%22%2C%22name%22%3A%22echarts.min.js%22%2C%22size%22%3A751826%2C%22type%22%3A%22text%2Fjavascript%22%2C%22ext%22%3A%22js%22%2C%22progress%22%3A%7B%22percent%22%3A99%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22oIxvf%22%2C%22card%22%3A%22file%22%7D)[vue-router.min.js](https://www.yuque.com/attachments/yuque/0/2021/js/1658583/1611045808054-7298fa26-e738-478d-96d8-aa0a0063fff0.js?_lake_card=%7B%22uid%22%3A%221611045807974-0%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2021%2Fjs%2F1658583%2F1611045808054-7298fa26-e738-478d-96d8-aa0a0063fff0.js%22%2C%22name%22%3A%22vue-router.min.js%22%2C%22size%22%3A24560%2C%22type%22%3A%22text%2Fjavascript%22%2C%22ext%22%3A%22js%22%2C%22progress%22%3A%7B%22percent%22%3A99%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22ZybSJ%22%2C%22card%22%3A%22file%22%7D)[axios.min.js](https://www.yuque.com/attachments/yuque/0/2021/js/1658583/1611048620300-8ff1d9d0-074b-428f-98ca-6bfe4c7ee4e2.js?_lake_card=%7B%22uid%22%3A%221611048620202-0%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2021%2Fjs%2F1658583%2F1611048620300-8ff1d9d0-074b-428f-98ca-6bfe4c7ee4e2.js%22%2C%22name%22%3A%22axios.min.js%22%2C%22size%22%3A13993%2C%22type%22%3A%22text%2Fjavascript%22%2C%22ext%22%3A%22js%22%2C%22progress%22%3A%7B%22percent%22%3A99%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22WZRS5%22%2C%22card%22%3A%22file%22%7D)(此方式优化提升不是很大)
卸载原有包
```powershell
npm uninstall echarts vue-router axios
```
下载这些包的cdn对应版本，脱离第三方库。并在根目录的static中新建一个js文件夹把第三方库文件放进去
```javascript
//webpack.base.conf.js
与entry新增
externals: {
  	包名            全局名称---支持驼峰
    'vue-router': 'VueRouter',
    'echarts': 'echarts',
    "axios":"axios"
},
```
```html
在项目根目录index.html新增
    <script src="/static//js//vue-router.min.js"></script>
    <script src="/static/js/echarts.min.js"></script>
    <script src="/static//js//axios.min.js"></script>
```
## 18、 npm i -D simple-progress-webpack-plugin可以查看构建及打包的进度(选配)
```javascript
//webpack.base.conf.js
//不知道为啥这个确实可以解决 DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead 这个警告
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' )
 plugins:[
    new SimpleProgressWebpackPlugin()
  ],

```
## 19、使用terser-webpack-plugin替代uglifyjs-webpack-plugin
```javascript
//webpack.prod.conf.js
删除
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
 new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console:true
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true,
      cache:true
    }),
```
```powershell
npm uninstall uglifyjs-webpack-plugin
npm i -D terser-webpack-plugin@4.2.3
```
```javascript
//webpack.prod.conf.js
const TerserPlugin = require('terser-webpack-plugin')
//在optimization>>>minimizer中新增
 new TerserPlugin({
		terserOptions: {
		ecma: undefined,
  	warnings: false,
  	parse: {},
 		compress: {
  	drop_console: true,
  	drop_debugger: false,
  	pure_funcs: ['console.log'], // 移除console
  	},
  },
}),
```
## 20、升级完第一次构建和打包可能会慢点(使用cdn引入过后的速度)
| 升级后 | 构建 | 打包 |
| --- | --- | --- |
| 第一次 | ![image.png](https://cdn.nlark.com/yuque/0/2021/png/1658583/1611018670919-11c6f6cb-831a-454b-900f-6013a6210a4a.png#align=left&display=inline&height=30&margin=%5Bobject%20Object%5D&name=image.png&originHeight=30&originWidth=72&size=615&status=done&style=none&width=72)70s-100s | ![image.png](https://cdn.nlark.com/yuque/0/2021/png/1658583/1611018938423-655f5371-8ad7-4d16-93f9-f5f827761173.png#align=left&display=inline&height=68&margin=%5Bobject%20Object%5D&name=image.png&originHeight=68&originWidth=226&size=3423&status=done&style=none&width=226)60s-100s |
| 第二次 | ![image.png](https://cdn.nlark.com/yuque/0/2021/png/1658583/1611018704561-bc214871-37dc-494c-8e2b-73221e3e373f.png#align=left&display=inline&height=30&margin=%5Bobject%20Object%5D&name=image.png&originHeight=30&originWidth=68&size=526&status=done&style=none&width=68)50s-65s | ![image.png](https://cdn.nlark.com/yuque/0/2021/png/1658583/1611018977731-0e34aa09-eb42-45ec-a202-d7a42a69b2c8.png#align=left&display=inline&height=44&margin=%5Bobject%20Object%5D&name=image.png&originHeight=44&originWidth=192&size=2245&status=done&style=none&width=192)30s-55s |
| 第三次 | ![image.png](https://cdn.nlark.com/yuque/0/2021/png/1658583/1611018773195-c1ca93cf-43f5-4512-af51-9a10f062b895.png#align=left&display=inline&height=35&margin=%5Bobject%20Object%5D&name=image.png&originHeight=35&originWidth=74&size=606&status=done&style=none&width=74) | ![image.png](https://cdn.nlark.com/yuque/0/2021/png/1658583/1611019073473-15e72bfe-4043-4d55-8f64-b5bf770901d4.png#align=left&display=inline&height=44&margin=%5Bobject%20Object%5D&name=image.png&originHeight=44&originWidth=198&size=2277&status=done&style=none&width=198) |

## 21、目前只发现系统设置页面中样式有点问题
## 22、操作中误把开发环境变量设置成了production发现构建速度成倍提升
```json
//package.json中
"dev": "cross-env NODE_ENV=production webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
```
排查过程中未发现造成该问题的原因....


## 补充：
将vue-loader版本换成14.2.4
```javascript
// 将 extract 属性改为false
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: false
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href',
    audio: 'src'
  }
}

```


23、优化打包后的体积
开启gzip
```powershell
//安装最新版的compression-webpack-plugin
npm i compression-webpack-plugin@5.0.0 -D
```
```javascript
//去config/index.js中找到
productionGzip:false
改为
productionGzip:true
```
```javascript
//去webpack.prod.conf.js将
new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
改为
new CompressionWebpackPlugin({
      filename: info => {
        return `${info.path}.gz${info.query}`
      },//返回新资源文件名
      algorithm: 'gzip',
      threshold: 10240, //只处理比这个字节大的资源
      test: /\.(js|css|json|txt|html|ico|svg|png|eot|ttf|mp4|gif)(\?.*)?$/i,//类型为正则，处理所有匹配此资源的
      minRatio: 0.8, //只有压缩率比这个值小的资源才会被处理
      deleteOriginalAssets: true //是否删除原资源
})
```
删除多余的文件(慎用...)
```powershell
npm i useless-files-webpack-plugin -D
```
```javascript
//webpack.prod.conf.js
在plugins中新增配置
new UselessFile({
      root: path.resolve(__dirname,文件夹路径), // 项目目录
      out: './fileList.json', // 输出文件列表
      clean: false,// 删除文件,
      exclude: path // 排除文件列表, 格式为文件路径数组
    }),
```
24、杂货
file-loader版本过高问题：[https://www.cnblogs.com/jesse131/p/12884126.html](https://www.cnblogs.com/jesse131/p/12884126.html)
在webpack.base.conf.js配置
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' )
 plugins:[
    new SimpleProgressWebpackPlugin()_//编译和打包的进度_
  ]
继续优化...HardSourceWebpackPlugin是webpack的插件，为模块提供**中间缓存**步骤。为了查看结果，需要使用此插件运行webpack两次：第一次构建将花费正常的时间。第二次构建将显着加快（大概提升90%的构建速度）。
```powershell
npm i -D hard-source-webpack-plugin
```
```javascript
//webpack.dev.conf.js
plugins:[
	...
  	 new HardSourceWebpackPlugin({
      // cacheDirectory 默认情况下将缓存存储在 node_modules 下的目录中，因此如果清除了node_modules，则缓存也是如此
      cacheDirectory: "node_modules/.cache/hard-source/[confighash]",
      recordsPath: "node_modules/.cache/hard-source/[confighash]/records.json",
      // configHash 在启动 webpack 实例时转换 webpack 配置，并用于cacheDirectory 为不同的 webpack 配置构建不同的缓存
      configHash: function(webpackConfig) {
        return require("node-object-hash")({ sort: false }).hash(webpackConfig);
      },
      // 当加载器、插件、其他构建时脚本或其他动态依赖项发生更改时，hard-source 需要替换缓存以确保输出正确。
      // environmentHash 被用来确定这一点。如果散列与先前的构建不同，则将使用新的缓存
      environmentHash: {
        root: process.cwd(),
        directories: [],
        files: ["package-lock.json"]
      }
    })
  ...
]
```













