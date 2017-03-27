/**
 * 主要功能:根据用户发送的消息自动回复消息类型
 *
 * 客户端   -->  发送消息
 * 服务器端  -->  自动回复消息
 * 需要时从文件./token.txt中获取token
 */

var port = 8889;

var http = require('http');//实现应用程序使用的后端web服务
var qs = require('qs');

var server = http.createServer(function (request,response) {

    var query = require('url').parse(request.url).query;
    var params = qs.parse(query);
    //xml格式数据转换为json格式
    var parseStr = require("xml2js").parseString;
    
    function replyText(msg) {
        var msgtype = msg.xml.MsgType[0];

        //判断收到的消息类型
        switch(msgtype){
            case 'text':
                feedback='文本消息';
                break;
            case 'image':
                feedback='图片消息';
                break;
            case 'shortvideo':
                feedback='小视频';
                break;
            case 'video':
                feedback='视频消息';
                break;
            case 'voice':
                feedback='语音消息';
                break;
            case 'location':
                feedback='位置消息';
                break;
            case 'link':
                feedback='链接消息';
                break;
            default:
                feedback='未知消息类型';

        }

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
                //回复的消息
                res = replyText(result);
                console.log("回复消息格式:")
                console.log(res);//json格式
            });
            //发给客户端的相应
            response.end(res);
            // response.end('success');
        });
    }
});

server.listen(port);

console.log("Server runing at port:" + port + ".");
