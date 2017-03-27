/**
 * 通过http模块构造web服务器
 */
var http = require('http');

var server = http.createServer(function (req,res) {

    //req 浏览器发给服务器的请求
    console.log(req.method);//请求的方法,get
    console.log(req.url);//请求的URL
    console.log(req.headers);

    //服务器收到请求后,返回相应的信息
    //res 服务器返回给浏览器的信息,包括状态码、响应头、网页正文
    res.statusCode = 404;       //手工设置状态码
    res.setHeader('abc','123'); //手工设置响应头
    res.end('Hello World!');    //网页正文

    //一次性写入状态信息
    // res.writeHead(404,{
    //     'abc':'123'
    // });
    // res.end('Hello World!');
});
server.listen(3001);
console.log("server port at 3001 ...");
