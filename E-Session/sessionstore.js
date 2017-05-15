/**
 * 根据express-session的store接口实现一个存储到文件的引擎
 */


var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var fs = require('fs')

//引用模块
var MyFileStore = require("./MyFileStore")(session)//自定义存储引擎


var app = express()


app.use(session({
    secret: 'keyboard cat',
    //创建一个自定义的存储引擎实例
    //传入的参数为目录名，session数据均存储到这个目录下，以SessionID命名
    store: new MyFileStore('sessionStore'),
    resave:false,
    saveUninitialized:true,
}));


app.use(function (req,res,next) {
    var views = req.session.views;//req.session存储了session对象的数据
    if(!views){
        views = req.session.views = {};
    }
    //解析路径名
    var pathname = parseurl(req).pathname;
    //计算该路径访问次数
    views[pathname] = (views[pathname] || 0)+1;
    next();
});

app.get('/foo',function (req,res,next) {
    res.cookie('foo_cookie','hello');
    req.session.test = "test";//req.session存储了session对象的数据
    res.send('you viewed this page '+req.session.views['/foo']+' times');
});

app.get('/bar',function (req,res,next) {
    res.send('you viewed this page '+req.session.views['/bar']+' times');
});


app.listen(3000);
console.log('Server running at port:3000... ...');