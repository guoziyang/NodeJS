/**
 * 实现一个简单的新闻列表
 *
 * 用URL模块解析url
 */

var http = require('http');
var parseUrl = require('url').parse;

//返回的新闻内容
var NEWS = {
    1:'这里是第一篇新闻的内容',
    2:'这里是第二篇新闻的内容',
    3:'这里是第三篇新闻的内容'
};

//根据query string 返回对应的新闻内容
function  getNews(id) {
    return NEWS[id] || '文章不存在';
}

var server = http.createServer(function (req,res) {

    //服务器返回给浏览器的响应信息
    function send(html) {
        res.writeHead(200,{//响应头
            'content-type':'text/html;charset=utf-8'
        });
        res.end(html);//网页正文
    }

    //req.url为 /news?type=1&id=3
    //query部分为type=1&id=3

    //parseUrl(),第二个参数为false(默认), query变为string类型
    var info1 = parseUrl(req.url,false);//解析后,query string为 'type=1&id=3'
    console.log(typeof (info1.query));
    console.log("query string --->"+info1.query);

    //parseUrl(),第二个参数为TRUE,表示将所有query变为对象
    var info = parseUrl(req.url,true);//解析后,query对象为 { type: '1', id: '3' }

    req.pathname = info.pathname;       //未赋值前,req.pathname,req.query均为undefind类型
    req.query = info.query;

    //根据请求url,返回不同页面
    if(req.url === '/'){//返回新闻列表
        send('<ul>'+
            '<li><a href="/news?type=1&id=1">新闻一</a></li>'+
            '<li><a href="/news?type=1&id=2">新闻二</a></li>'+
            '<li><a href="/news?type=1&id=3">新闻三</a></li>'+
            '</ul>');
    }else if(req.pathname === '/news' && req.query.type === '1'){
        //根据query对象,id属性值判断返回哪条新闻的内容
        send(getNews(req.query.id));//query对象的id属性,String类型
    }else{
        send('<h1>文章不存在!</h1>');
    }
});

server.listen(3001);
console.log("Server runing at port 3001 ... ...");

