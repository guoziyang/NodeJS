/**
 * Express-session的使用
 */

var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')

// var uuid = require('uuid')
// var cookieParser = require('cookie-parser')
// var clone = require('clone')

var app = express()


//挂载express-session中间件到所有路径,可通过req参数来存储和访问session对象的数据
//每次请求都被执行
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
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
    res.send('you viewed this page '+req.session.views['/foo']+' times');
});

app.get('/bar',function (req,res,next) {
    res.send('you viewed this page '+req.session.views['/bar']+' times');
});

app.listen(3000);
console.log('Server running at port:3000!');