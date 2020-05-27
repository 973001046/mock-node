/*
 * @Author: Raojun
 * @LastEditors: Raojun
 * @Date: 2020-05-08 16:17:50
 * @LastEditTime: 2020-05-13 16:14:41
 * @Description: API router配置
 */
const router = require('koa-router')();
const path = require('path');
const toFiles = require('../utils/toFiles');
const fs = require('fs')

router.get('/getApi/:project', (ctx, next) => {
  var currentProjectPath = path.join(__dirname, '../apiFile', ctx.params.project)
  ctx.body = {
    code: 200,
    dir: toFiles(currentProjectPath, ctx.params.project)
  }
})

router.delete('/delete', (ctx, next) => {
  if (fs.existsSync(ctx.query.path)) {
    fs.unlinkSync(ctx.query.path);
    ctx.body = {
      code: 200,
      msg: '删除成功'
    }
  } else {
    ctx.body = {
      code: 404,
      msg: '文件未找到'
    }
  }
})

router.post('/setApi', (ctx, next) => {
  var file = ctx.request.files.file
  const reader = fs.createReadStream(file.path);
  var currentProjectPath = path.join(__dirname, '../apiFile', ctx.request.body.project, ctx.request.body.way + ctx.request.body.api.replace(/\//g, "_") + '.json')
  const upStream = fs.createWriteStream(currentProjectPath);
  reader.pipe(upStream);
  ctx.body = {
    code: 200,
    dir: currentProjectPath,
    msg: '新增成功'
  }
})

module.exports = router