/**
 * step 1 定时获取access_token
 *
 * 1 - 定时获取access_token(每隔一小时获取一次)
 * 2 - 获取后存入文件./token.txt中
 * 3 - 服务器端程序(menu.js)每次在文件中读取最新access_token
 */

//引入模块
var later = require('later');
var https = require('https');
var fs = require('fs');

//测试号信息
//http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
var appid = "";
var appsecret = "";
var access_token;

later.date.localTime();
console.log("Now:" + new Date());

var sched = later.parse.recur().every(1).hour();
next = later.schedule(sched).next(10);
console.log(next);

var timer = later.setInterval(test, sched);
//2s后执行test函数
setTimeout(test, 2000);

/**
 * 保存access_token到文件中
 *
 * path 保存路径
 * access_token 最新获取到的token
 */
function saveAccessToken(path,access_token){
    fs.writeFile(path,access_token,function (err) {
            if(err){
                return console.log(err);
            }
            console.log('token saved !');
        }

    );
}

//函数定义
function test() {
    console.log(new Date());

    var options = {
        hostname: 'api.weixin.qq.com',
        path: '/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + appsecret
    };

    var req = https.get(options, function (res) {
        var bodyChunks = '';
        res.on('data', function (chunk) {
            bodyChunks += chunk;
        });
        res.on('end', function () {
            var body = JSON.parse(bodyChunks);
            //console.dir(body);
            if (body.access_token) {
                //获取access_token
                access_token = body.access_token;
                //保存access_token到文件
                saveAccessToken('./token.txt',access_token);
                console.log(access_token);
            } else {
                console.dir(body);
            }
        });
    });

    req.on('error', function (e) {
        console.log('ERROR: ' + e.message);
    });
}
