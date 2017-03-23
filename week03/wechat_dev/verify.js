/**
 *  token验证 (只需验证一次)
 *
 *  执行结果:
 *  query----->signature=863dc1866accd0f435a1e182f861e75efc2e1d69&echostr=7809850245464973302&timestamp=1489653462&nonce=752031912
 *  params----->[object Object]
 *  token----->token--> guozy
 */

var port = 8889;
//http模块
var http = require('http');
//qs模块
var qs = require('qs');

var TOKEN = 'guozy';

//签名验证
function checkSignature(params,token) {
    var key = [token,params.timestamp,params.nonce].sort().join('');
    var sha1 = require('crypto').createHash('sha1');
    sha1.update(key);

    return sha1.digest('hex') == params.signature;
}

//request
//response
var server = http.createServer(function (request,response) {

    //解析URL中的query部分
    var query = require('url').parse(request.url).query;
    //用qs模块将query解析成json -- 未解析成功
    var params = qs.parse(query);

    console.log("query----->" + query);
    console.log("params----->" + params);
    console.log("token----->" + "token-->",TOKEN);

    if(checkSignature(params,TOKEN)){
        response.end(params.echostr);
    }else{
        response.end('signature fail');
    }
});

server.listen(port);

console.log("Server runing at port:" + port + ".");
