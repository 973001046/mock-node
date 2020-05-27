/*
 * @Author: Raojun
 * @LastEditors: Raojun
 * @Date: 2020-05-08 17:53:00
 * @LastEditTime: 2020-05-13 09:53:38
 * @Description: 读取文件内容 返回JSON数据
 */
const fs = require('fs')
const toJson = require('../utils/toJson')
var routerTOpath = require('../utils/routerTOpath')

module.exports = async (ctx, next) => {
  var absolutePath = routerTOpath(ctx.path, ctx.method)
  if (fs.existsSync(absolutePath)) {
    var data = fs.readFileSync(absolutePath)
    ctx.body = {
      code: 200,
      path: absolutePath,
      method: ctx.method,
      message: '请求成功',
      json: toJson(data)
    }
  } else {
    ctx.body = {
      code: 404,
      path: ctx.path,
      message: '文件不存在：' + routerTOpath(ctx.path, ctx.method)
    }
  }
}
