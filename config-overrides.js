/* config-overrides.js */
const { override,disableEsLint} = require('customize-cra')


//关闭mapSource bug 打包的css有map文件
//const rewiredMap = () => config => {
   //config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
   //return config;
//};

//关闭mapSource css和js都去掉了map文件
process.env.GENERATE_SOURCEMAP = false

module.exports = {
   webpack: override(
      // 关闭mapSource
      //rewiredMap(),
      disableEsLint()
   ),
} 
