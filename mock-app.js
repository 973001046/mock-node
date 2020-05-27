/*
 * @Author: Raojun
 * @LastEditors: Raojun
 * @Date: 2020-05-07 14:46:59
 * @LastEditTime: 2020-05-12 16:29:59
 * @Description: 启动程序
 */
const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors')
const koaBody = require('koa-body');
const chalk = require('chalk')
const CONFIG = require('./utils/config');
const terminalLink = require('terminal-link');
const router = require('./routers/api')
const checkApi = require('./checkApi/index')
const path = require('path')

app.use(cors({
  origin: function (ctx) {
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTION'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-tag'],
}))

app.use(koaBody({ multipart: true }));

app.use(router.routes(), router.allowedMethods())

app.use(checkApi);

app.listen(CONFIG.HOST, () => {
  const link = terminalLink('chh-mock 启动地址：', 'http://' + CONFIG.IP + ':' + CONFIG.HOST);
  console.log(chalk.yellow(link))
});
