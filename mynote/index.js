/**
 * 入口文件
 */

//加载依赖库
var express = require('express');
var path= require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
//session
var session = require('express-session');
//用于处理日期的显示格式(笔记详情使用)
var moment = require('moment');
//用于检验登录状态
var checkLogin = require('./checkLogin.js');


//使用mongoose访问mongodb
//引入 mongoose
// var mongoose = require('mongoose');
//引入模型
// var models = require('./models/models');
//实例化
// var User = models.User;//实例化User
// var Note = models.Note;//实例化Note
//使用mongoose连接服务
// mongoose.connect('mongodb://localhost:27017/webnote');
// mongoose.connection.on('error',console.error.bind(console,'连接数据库失败'));


//使用ORM中间件,支持Mysql、Mongodb数据库的读写
var w_config = require('./waterline/config').config;
var w_orm    =  require('./waterline/instance').orm;
var User;
var Note;
w_orm.initialize(w_config,function(err,models){
    if(err) throw err;
    console.log("database initialize success ... ...");
    User = models.collections.user;
    Note = models.collections.note;
});


//创建express实例
var app = express();
//定义EJS模板引擎和模板文件位置
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//定义静态文件目录
app.use(express.static(path.join(__dirname,'public')));
//定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//建立session模型
app.use(session({
    secret:'1234',
    name:'webnote',
    // cookie:{maxAge:1000*60*20},    //设置session的保存时间为20分钟
    cookie:{maxAge:1000*60*60*24*7},    //设置session的保存时间为一周(一周内免登录)
    resave:false,
    saveUninitialized:true
}));

//在首页请求时，首先检测登录状态,未登录则自动跳转到登录页面
app.get('/',checkLogin.noLogin);

//响应首页get请求,登录成功后跳转到该页面,显示当前用户的所有笔记列表
app.get('/',function (req,res) {
    Note.find({author:req.session.user.username}).exec(function (err,allNotes) {//allNotes参数为从数据库取出的该用户的所有笔记
        if(err){
            console.log(err);
            return res.redirect('/');
        }
        res.render('index',{
            title:'首页',
            user:req.session.user,  //在跳转页面之前，将user信息数据传入EJS模板
            notes:allNotes          //在跳转页面之前，将该用户的笔记数据传入EJS模板
        });
    });
});

//注册
app.get('/register',function (req,res) {
    if(req.session.user){//已经登录成功的用户不允许跳转到注册和登录页面
        return res.redirect('/');
    }
    console.log('注册');
    res.render('register',{
        user:req.session.user,  //在跳转页面之前，将user信息数据传入EJS模板
        title:'注册',
        status:'0'
    });
});

//post请求,接收注册页面表单提交数据,并作合法性检查
app.post('/register',function (req,res) {
    //req.body可以获取到表单提交的每项数据
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var passwordRepeat = req.body.passwordRepeat;
    //检查输入用户名是否为空,去掉两端空格
    if(username.trim().length==0){
        console.log("用户名不能为空");
        return res.redirect('/register');
    }
    //检查密码是否为空,去掉两端空格
    if(password.trim().length==0 ||passwordRepeat.trim().length==0){
        console.log("密码不能为空");
        return res.redirect('/register');
    }
    //检查两次输入的密码是否一致
    if(password!=passwordRepeat){
        console.log("两次输入的密码不一致!");
        return res.redirect('/register');
    }
    //检查用户名是否已经存在,如果不存在,则保存该条记录
    // User.findOne({username:username},function (err,user) {
        User.findOne({ username: username })
            .exec(function(err, user) {
        if(err){
            console.log(err);
            return res.redirect('/register');
        }
        if(user){
            console.log('用户名已存在');
            return res.render('register',{
                user:req.session.user,
                title:'注册',
                status:'1'        // 2 - 用户名不存在或密码错误(登录), 1 - 用户已经存在(注册), 0 - 不存在,可以注册(注册)
            });
        }
        //对密码进行md5加密
        var md5 = crypto.createHash('md5'),
            md5password = md5.update(password).digest('hex');

        //使用waterline操作数据库
        //保存数据(waterline)
        User.create({ username: username ,password:md5password,createTime:new Date()})
            .exec(function(err, newuser) {
                if(err){
                    console.log(err);
                    return res.redirect('/');
                }
                req.session.user = newuser;
                console.log('注册成功');
                return res.redirect('/success');
            });

        //使用mongoose操作数据库
        //新建user对象用于保存数据
        // var newUser = new User({
        //     username:username,
        //     password:md5password
        // });
        //保存数据(mongoose)
        // newUser.save(function (err,doc) {
        //     if(err){
        //         console.log(err);
        //         return res.redirect('/register');
        //     }
        //     console.log('注册成功');
        //     return res.redirect('/');
        // });
    });
});
//登录
app.get('/login',function (req,res) {
    if(req.session.user){//已经登录成功的用户不允许跳转到注册和登录页面
        return res.redirect('/');
    }
    console.log('登录');
    res.render('login',{
        user:req.session.user,
        title:'登录',
        status:'0'
    });
});
//post请求,接收登录页面表单提交数据,并作合法性检查
app.post('/login',function (req,res) {
    //req.body可以获取到表单提交的每项数据
    console.log(req.body);
    var username = req.body.username,
        password = req.body.password;

    // if(username.trim().length==0 ||password.trim().length==0){
    //     console.log("用户名或密码不能为空");
    //     return res.redirect('/login');
    // }

        //检查用户名是否已经存在,如果存在,则登录成功
    // User.findOne({username:username},function (err,user) {//使用mongoose操作数据库
        User.findOne({ username: username })
            .exec(function(err, user) {//使用waterline操作数据库
                if(err){
                    console.log(err);
                    return res.redirect('/login');
                }
                if(!user){//用户不存在
                    console.log('用户不存在');
                    return res.render('login',{
                        user:req.session.user,
                        title:'登录',
                        status:'2'          // 2 - 用户名不存在或密码错误(登录), 1 - 用户已经存在(注册), 0 - 不存在,可以注册(注册)
                    });
                }
                //对密码进行md5加密
                var md5 = crypto.createHash('md5'),
                    md5password = md5.update(password).digest('hex');
                if(user.password !== md5password){
                    console.log('密码错误！');
                    return res.render('login',{
                        user:req.session.user,
                        title:'登录',
                        status:'2'          // 2 - 用户名不存在或密码错误(登录), 1 - 用户已经存在(注册), 0 - 不存在,可以注册(注册)
                    });
                }
                console.log('登录成功！');
                user.password = null;         //存入session前,为了安全起见,删除密码
                delete user.password;
                req.session.user = user;      //登录成功后,将用户信息存入session
                return res.redirect('/');
            });
    // }
});
//退出
app.get('/quit',function (req,res) {
    req.session.user = null;        //退出后,将session中的user删除
    console.log('退出！');
    return res.redirect('/login');
});
//发布
app.get('/post',function (req,res) {
    console.log('发布');
    res.render('post',{
        user:req.session.user,
        title:'发布'
    });
});
//post请求,接收发布笔记页面表单提交数据
app.post('/post',function (req,res) {
    //req.body可以获取到表单提交的每项数据
    console.log(req.body);
    //使用waterline操作数据库
    Note.create({//保存笔记
        title:req.body.title,
        author:req.session.user.username,
        tag:req.body.tag,
        content:req.body.content,
        createTime :new Date()})
        .exec(function(err, doc) {
            if(err){
                console.log(err);
                return res.redirect('/post');
            }
            console.log('文章发表成功！');
            return res.redirect('/');
        });
    //使用mongoose操作数据库
    // var note = new Note({
    //     title:req.body.title,
    //     author:req.session.user.username,
    //     tag:req.body.tag,
    //     content:req.body.content
    // });
    // note.save(function (err,doc) {
    //     if(err){
    //         console.log(err);
    //         return res.redirect('/post');
    //     }
    //     console.log('文章发表成功！');
    //     return res.redirect('/');
    // });
});


//查看笔记详情
app.get('/detail/:id',function (req,res) {
    // 查找指定id的笔记
    // Note.findOne({_id:req.params.id})//参数
    Note.findOne({id: req.params.id})
        .exec(function (err,art) {//art为查询返回的结果
        if(err){
            console.log(err);
            return res.redirect('/');
        }
        if(art){
            res.render('detail',{
                title:'笔记详情',
                user:req.session.user,  //在跳转页面之前，将user信息数据传入EJS模板
                art:art,                //在跳转页面之前，将该条笔记的详细信息数据传入EJS模板
                moment:moment           //用于处理日期的显示格式
            });
        }
    });
});


//操作成功
app.get('/success',function (req,res) {
    console.log('注册成功');
    res.render('success',{
        user:req.session.user,
        title:'注册成功'
    });
});

//监听3000端口
app.listen(3000);
console.log("webnote is running at port 3000 ... ...");
