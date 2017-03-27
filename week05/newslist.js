/**
 * 实现一个简单的新闻列表
 */

var http = require('http');
var NEWS = {
    1:'这里是第一篇新闻的内容',
    2:'这里是第二篇新闻的内容',
    3:'这里是第三篇新闻的内容'
};

//根据newid返回对应的新闻
function  getNews(id) {
    return NEWS[id] || '文章不存在';
}

var server = http.createServer(function (req,res) {
    //返回页面
    function send(html) {
        res.writeHead(200,{
            'content-type':'text/html;charset=utf-8'
        });
        res.end(html);
    }

    console.log("req.url----------->" + req.url);
    //根据url,返回不同页面
    if(req.url === '/'){
        send('<ul>'+
            '<li><a href="/news?id=1">新闻一</a></li>'+
            '<li><a href="/news?id=2">新闻二</a></li>'+
            '<li><a href="/news?id=3">新闻三</a></li>'+
            '</ul>');
    }else if(req.url === '/news?id=1'){
        send(getNews(1));
    }else if(req.url === '/news?id=2'){
        send(getNews(2));
    }else if(req.url === '/news?id=3'){
        send(getNews(3));
    }else{
        send('<h1>文章不存在!</h1>');
    }
});

server.listen(3001);
console.log("Server runing at port 3001 ... ...");

