/**
 * 图灵机器人 api调用
 */

var http = require('http');

var qs = require('qs');



var server = http.createServer(function (request,response) {

    var query = require('url').parse(request.url).query;
    var params = qs.parse(query);

    //向robot发送请求
    //提问内容
    var question = {
        "key":"04d8548377c54dc98565dffb525b2a25",
        "info":"你叫什么",
        "userid": "123"
    };

//机器人回复内容
    var answer = '';

    var send_str = new Buffer(JSON.stringify(question));
    console.log("</Br>发送内容---->");
    console.log(send_str.toString());
    console.log(send_str.info);


//post请求
    var options = {
        hostname: 'www.tuling123.com',
        path: '/openapi/api',
        method: 'POST',
    };

//发送请求
    var req = http.request(options, function (response) {//回调函数用于处理服务器返回的响应
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            console.log("</Br>接收内容---->");
            console.log(str);
            var obj = JSON.parse(str);
            answer = obj.text;
            console.log("reply text;" + answer);
        });
    });
//将可选的数据输出写入响应的正文，然后刷新writable流并完成响应
    req.write(send_str);
    req.end();




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
            console.log("获取的answer数据--------->" + answer);
            response.end('success');
        });
    }
});

var port = 8889;
server.listen(port);

console.log("Server runing at port:" + port + ".");



