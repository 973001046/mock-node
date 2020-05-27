var os = require("os");
var networkInterfaces = os.networkInterfaces();
var ip = networkInterfaces['en0'][1].address;
const HOST = 3000

module.exports = {
  IP: ip,
  HOST: HOST
}
