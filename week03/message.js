/**
 * token验证 + 接收微信消息
 */

var port = 8889;

var http = require('http');//实现应用程序使用的后端web服务
var qs = require('qs');

var TOKEN = 'guozy';

//token验证-函数定义
function checkSignature(params,token) {
    //1 - 将token,timestamp,nonce三个参数进行字典序排序
    var key = [token,params.timestamp,params.nonce].sort().join('');
    //2 - 将三个参数字符串拼接成一个字符串,进行sha1加密
    var sha1 = require('crypto').createHash('sha1');
    sha1.update(key);
    //3 - 开发者获得加密后的字符串可与signature对比,标识该请求来源于微信
    return sha1.digest('hex') == params.signature;
}

var server = http.createServer(function (request,response) {

    var query = require('url').parse(request.url).query;
    var params = qs.parse(query);

    //token验证-函数调用
    if(!checkSignature(params,TOKEN)){
        //如何签名不对,结束并返回
        response.end('signature fail');
        return;
    }

    //通过验证后 -- 微信接收消息测试
    if(request.method == "GET"){
        //如果请求是GET,返回echostr用于通过服务器有效校验
        response.end(params.echostr);
    }else{
        //否则是微信开发者服务器的POST请求
        var postdata = "";
        
        request.addListener("data",function (postchunk) {
            postdata += postchunk;
        });

        //获取到了POST数据
        request.addListener("data",function () {
            console.log("获取的post数据--------->" + postdata);
            response.end('success');
        });
    }
});

server.listen(port);

console.log("Server runing at port:" + port + ".");
