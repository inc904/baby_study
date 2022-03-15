const {
  override,
  addLessLoader,
  fixBabelImports,
  addDecoratorsLegacy
} = require('customize-cra')
const modifyVars = require('./lessVars')

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addDecoratorsLegacy()
)
