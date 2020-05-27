/*
 * @Author: Raojun
 * @LastEditors: Raojun
 * @Date: 2020-05-09 14:36:17
 * @LastEditTime: 2020-05-13 09:57:21
 * @Description: 返回文件夹里面的所有文件
 */
const fs = require("fs");
const path = require('path');
const toJson = require('./toJson')

module.exports = (dir, projectName) => {
  //设置根目录
  var root = dir;
  var arr = [];

  //获取此文件夹下所有的文件(数组)
  var files = fs.readdirSync(root);

  //遍历这些文件或者文件夹
  for (var i = 0; i < files.length; i++) {
    //为文件创建一个描述对象
    var filePath = {};
    var name = (files[i].split('.'))[0].split('_')
    name.shift()
    //添加name属性
    filePath.interface = '/' + name.join('/')
    filePath.name = files[i];
    filePath.fullPath = path.join(dir, files[i]);
    filePath.method = (files[i].split('_'))[0];
    var fileStat = fs.statSync(path.join(root, files[i]));
    //判断是否是文件夹
    if (fileStat.isDirectory()) {
      //文件夹类型则添加type属性为dir
      filePath.type = 'dir';
    } else {
      //文件类型则添加type属性为文件后缀名
      filePath.dataType = path.extname(files[i]).substring(1);
    }
    filePath.data = toJson(fs.readFileSync(filePath.fullPath))
    filePath.projectType = projectName
    //将对象添加到数组中
    arr.push(filePath);
  }
  return arr
}