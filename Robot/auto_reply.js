/**
 * 主要功能:根据用户发送的消息自动回复
 *
 *          调用图灵机器人接口
 *
 */

var port = 8889;

var http = require('http');//实现应用程序使用的后端web服务
var qs = require('qs');

var server = http.createServer(function (request,response) {
    //机器人回复内容
    var query = require('url').parse(request.url).query;
    var params = qs.parse(query);
    //xml格式数据转换为json格式
    var parseStr = require("xml2js").parseString;

    function replyText(msg,feedback) {
        // var msgtype = msg.xml.MsgType[0];
        var tmpl = require('tmpl');
        //回复的消息
        var replyTmpl = '<xml>'+
            '<ToUserName><![CDATA[{toUser}]]></ToUserName>'+
            '<FromUserName><![CDATA[{fromUser}]]></FromUserName>'+
            '<CreateTime>![CDATA[{time}]]</CreateTime>'+
            '<MsgType><![CDATA[{type}]]></MsgType>'+
            '<Content><![CDATA[{content}]]></Content>'+
            '</xml>';

        //回复的消息
        return tmpl(replyTmpl,{
            toUser:msg.xml.FromUserName[0],
            fromUser:msg.xml.ToUserName[0],
            type:'text',
            time:Date.now(),
            content:feedback
        });

    }


    //微信接收消息测试
    if(request.method == "GET"){//如果请求是GET,返回echostr用于通过服务器有效校验
        response.end(params.echostr);
    }else{//否则是微信开发者服务器的POST请求
        var postdata = "";
        request.addListener("data",function (postchunk) {
            postdata += postchunk;
        });
        var res = "";
        //获取到了POST数据
        request.addListener("data",function () {
            console.log("获取的post数据--------->" + postdata);
            //postdatea为xml格式数据,将其转换为json格式
            parseStr(postdata,function (err,result) {
                if(err){
                    console.log(err);
                    return;
                }
                console.log("发送消息的json格式:");//json格式
                console.log(result);//json格式

                //接收的微信消息
                // var question = result.content
                var question = result.xml.Content;
                console.log(result);
                console.log("接收的消息---》" + question);


                /**
                 * 同步发送request请求
                 */
                var rp = require('request-promise');
                var options = {
                    method: 'POST',
                    uri: 'http://www.tuling123.com/openapi/api',
                    body: {
                        key:'04d8548377c54dc98565dffb525b2a25',
                        info:question,
                        userid: '23'
                    },
                    json: true // Automatically stringifies the body to JSON
                };

                rp(options)
                    .then(function (repos) {
                        // console.log('User has %d repos', repos.toString());
                        console.log('成功');
                        console.log(repos.text);
                        feedback = repos.text;
                        //回复的消息
                        res = replyText(result,feedback);
                        console.log("回复消息格式:")
                        console.log(res);//json格式
                        //发给客户端的相应
                        response.end(res);
                        // response.end('success');

                    })
                    .catch(function (err) {
                        // API call failed...
                        // console.log('User has %d repos', err);
                        console.log('失败');
                    });
            });

        });
    }
});

server.listen(port);

console.log("Server runing at port:" + port + ".");
/**
 * Created by gzy on 2017/3/27.
 */
