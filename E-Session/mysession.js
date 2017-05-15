/**
 * 自定义Session中间件
 */

var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')

var uuid = require('uuid')
var cookieParser = require('cookie-parser')
var clone = require('clone')

var app = express()

// app.use(session({
//     secret:'keyboard cat',
//     resave:false,
//     saveUninitialized:true
// }));


function my_session() {
    var data ={};
    return function (req,res,next) {
        var id = req.signedCookies.session_id || uuid.v4();//从cookie中读取session_id
        res.cookie('session_id',id,{
            maxAge:300000,
            path:'/',
            httpOnly:true,
            signed:true
        });
        req.session = clone(data[id] || {});
        res.on('finish',function () {
            console.log('save session :',req.session);
            data[id] = clone(req.session);//把views,num存入req.session里
        });
        next();
    }
}
app.use(cookieParser('asdasdqweqwe'));
app.use(my_session());


app.use(function (req,res,next) {
    console.log("use 1.........")
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

app.use('/',function (req,res,next) {
    console.log("use 2.........")
    var num = req.session.num
    if(!num){
        num = req.session.num = 0
    }
    req.session.num = num +1
    console.log('=====这是第'+req.session.num+'次调用=====')
    next()
})


app.use(function (req,res,next) {
    console.log("use 3.........")
    console.log("................")
    console.log("我是一个中间件，每次请求到我都被执行..........")
    console.log("我可以偷懒,什么都不干，直接调用next..........")
    console.log("类似这样的中间件有很多,你可以注册多个,一定要记得next哦.........")
    next()
})

app.use(function (req,res,next) {
    console.log("use 4.........")
    console.log("................")
    console.log("我是另一个中间件，每次请求到我都被执行..........")
    console.log("我还是做点什么吧..........")
    next()
})

app.get('/foo',function (req,res,next) {
    res.send('you viewed this page '+req.session.views['/foo']+' times');
});

app.get('/bar',function (req,res,next) {
    res.send('you viewed this page '+req.session.views['/bar']+' times');
});

app.listen(3000);
console.log('Server running at port:3000!');
