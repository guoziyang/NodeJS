/**
 * http.ClientRequest对象用法
 */

var http = require('http');

var appid = "";
var appsecret = "";

//http.request的options参数
var options = {
    hostname: 'api.weixin.qq.com',//请求发往的服务器的域名或IP地址
    path: '/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + appsecret,//所请求资源的路径
    port: '8889',
    method: 'POST'
};

var req = http.request(options, function (response) {//回调函数用于处理服务器返回的响应
    var str = '';
    response.on('data', function (chunk) {
        str += chunk;
    });
    response.on('end', function () {
        console.log(str);
    });
});
//将可选的数据输出写入响应的正文，然后刷新writable流并完成响应
req.end();

