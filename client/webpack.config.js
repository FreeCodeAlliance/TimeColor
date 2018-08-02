const webpack = require('atool-build/lib/webpack');
//const pxtorem = require('postcss-pxtorem');
const path = require('path');

module.exports = function (webpackConfig) {
  webpackConfig.entry = path.resolve(__dirname, 'src', 'index.js'),
  //webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', {
    style: true,  // if true, use less
    libraryName: 'antd',
  }]);
  
  const loaders = webpackConfig.module.loaders;
  for (let i = 0; i < loaders.length; i += 1) {
    if (loaders[i].test.toString() === /\.js$/.toString()) {
      if (!loaders[i].include) {
        loaders[i].include = [];
      }
      loaders[i].exclude = '';
      //loaders[i].include.push(path.join(__dirname, 'index.web.js'));
      loaders[i].include.push(path.join(__dirname, 'src'));
      //loaders[i].include.push(path.join(__dirname, 'node_modules/react-native-storage'));
    }
    if (loaders[i].test.toString() === /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i.toString()) {
      loaders[i] = {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: 'url?limit=1024&name=./images/[name]-[hash:10].[ext]',
      };
    }
  }
  return webpackConfig;
};