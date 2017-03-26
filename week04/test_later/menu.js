/**
 * step2 自定义菜单(运行一次即可)
 *
 * 1-从./token.txt中获取access_token
 * 2-设置菜单
 */
"use strict"
var https = require('https');
var fs = require('fs');

//从文件中读取access_token(同步执行,语句按顺序执行)
var access_token = fs.readFileSync('./token.txt','utf-8');

//测试 -- 输入获取的token
console.log("access_token---->" + access_token);

//发送内容 --> 菜单内容,json格式
var menu = {
    "button": [
        //一级菜单1(最多3个)
        {
            "name": "小应用",//一级菜单名称
            //二级菜单(最多5个)
            "sub_button": [
                {
                    "type": "click",
                    "name": "聊天机器人",
                    "key": "NO_EVENT_BIND"
                }
            ]
        },
        //一级菜单2
        {
            "type": "view",
            "name": "网页授权",
            "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa6837dc9b13fa2dc&redirect_uri=http://www.guozy.cn:9999/oauth2.php&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect"
        },
        //一级菜单3
        {
            "name": "我",
            //二级菜单
            "sub_button": [
                {
                    "type": "view",
                    "name": "我的主页",
                    "url": "http://www.guozy.cn:9999/resume/index.html"
                },
                {
                    "type": "view",
                    "name": "Github",
                    "url": "https://github.com/guoziyang/nodeJS"
                }
            ]
        }
    ]
};

var post_str = new Buffer(JSON.stringify(menu));
//var post_str = JSON.stringify(menu);
console.log(post_str.toString());
console.log(post_str.length);

var post_options = {
    host: 'api.weixin.qq.com',//一个处理请求的服务器的域名或者IP地址，默认是 loaclhost
    port: '443',//远程服务器的端口。默认是 443
    path: '/cgi-bin/menu/create?access_token=' + access_token, //请求路径。默认是'/'。如果有的话，应该包含请求字符串。 例如 '/index.html?page=12'。当请求路径包含非法字符的时候，将抛出异常。目前只有空格字符被拒绝，但是未来可能会有改变。
    method: 'POST',//一个用来指定 HTTP 请求方法的字符串。默认是 'GET'
    headers: {//一个包含请求头的对象
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_str.length
    }
};

//向一个安全的服务器发起一个请求
var post_req = https.request(post_options, function (response) {
    var responseText = [];
    var size = 0;
    //发给客户端的信息
    response.setEncoding('utf8');
    response.on('data', function (data) {
        responseText.push(data);
        size += data.length;
    });
    response.on('end', function () {
        console.log(responseText);
    });
});

// post the data
post_req.write(post_str);
post_req.end();