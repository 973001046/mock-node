/*
 * @Author: Raojun
 * @LastEditors: Raojun
 * @Date: 2020-05-09 10:08:32
 * @LastEditTime: 2020-05-12 18:05:02
 * @Description: 路由转化成文件绝对路径
 */
var path = require('path')
module.exports = (router, method) => {
  var routerArr = router.split('/')
  routerArr.shift()
  var firstPath = routerArr.shift()
  return path.join(__dirname, '../apiFile', firstPath, method + '_' + routerArr.join('_') + '.json')
}