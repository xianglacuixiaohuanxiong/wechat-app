/** 全局域名配置 */
let host = '';
let NODE_ENV = 'pro';
const fileManager = wx.getFileSystemManager();
try {
  fileManager.accessSync('local.text');
  NODE_ENV = 'dev';
  console.log('开发环境');
  host = '1';
} catch (e) {
  if (NODE_ENV === 'pro') {
    console.log('生产环境');
    host = 'https://api.apiopen.top/'
  }
}
exports.host = host;
