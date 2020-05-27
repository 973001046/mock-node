/**
 * @description: 将读取文件数据流转换成json
 * @param {Stream} 
 * @return: JSON
 */

module.exports = (dataStream) => {
  return JSON.parse(dataStream.toString())
}