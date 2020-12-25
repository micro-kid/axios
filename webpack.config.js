const glob = require("glob");
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { exec } = require('child_process')

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
  if (env.NODE_ENV === 'development') {
    exec('cd ./app && yarn dev', (error, stdout, stderr) => {
      if (error) {
        console.error(`执行的错误: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    })
  }
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
      port: 9000,
      proxy: {
        '/api': 'http://localhost:3000'
      }
    }
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
