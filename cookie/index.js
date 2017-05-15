/**
 * session和cookie实验
 */

var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser('saddsafwerqsdaf'));//对cookie进行签名,防止用户篡改其值


app.get('/read',function (req,res,next) {
    res.json(req.cookies);//输出cookie
});

app.get('/abc',function (req,res,next) {
    res.json(req.cookies);
});

app.get('/write',function (req, res, next) {
    //设置cookie
    // res.cookie('my_cookie','hello');
    res.cookie('my_cookie','hello',{
        // domain:'www.abc.com',                     //在该子域下才可以访问cookie
        //设置cookie失效时间的两种方法
        // expires:new Date(Date.now() + 2*60*1000), //2分钟后过期,缺省设置为session(关闭浏览器后失效)
        // maxAge: 2*60*1000                         //2分钟后过期
    });

    res.cookie('a','123');
    res.cookie('b','456',{httpOnly:true,signed:true});//缺省为false,在console中通过document.cookie获取不到
    res.json(req.cookies);               //输出cookie
    // res.json(req.signedCookies);      //输出cookie(有签名)
});

app.listen(3000);
console.log('Server running at port:3000!');