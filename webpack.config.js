const glob = require("glob");
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 读取src目录所有入口
function getEntry() {
  const entry = {};
  glob.sync('./src/*/index.js')
    .forEach(function (filePath) {
      let name = filePath.match(/\.\/src\/(.+)\/index\.js/);
      name = name[1];
      entry[name] = filePath;
    });
  return entry;
};

module.exports = env => {
  
  const webpackConfig = {
    mode: env.NODE_ENV,
    entry: getEntry(),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]/index.js?v=[chunkhash:7]',
    },
    plugins: [],
    devServer: {
      host: 'localhost',
      port: 9000
    },
  }

  // 给每个出口添加html
  Object.keys(webpackConfig.entry).forEach((name) => {
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      filename: `${name}/index.html`,
      template: `./src/${name}/index.html`,
      inject: true,
      chunks: ['js', `${name}`]
    }));
  });

  if (env.NODE_ENV === 'production') {
    webpackConfig.plugins.push(new CleanWebpackPlugin())
  }
  return webpackConfig
}
