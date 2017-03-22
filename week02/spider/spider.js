/**
 * 抓取内容:北京大学软件与微电子学院新闻
 * 页面URL:http://www.ss.pku.edu.cn/index.php/newscenter/news
 */
//引入必要的模块
var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');

//通过Http.get创建一个Get请求来获取数据

//第一个参数为要抓取的URL,第二个参数为处理函数
http.get("http://www.ss.pku.edu.cn/index.php/newscenter/news",function (res) {
    var html = "";//保存到抓取到的HTML源码
    var news = [];//保存解析HTML后的数据
    res.setEncoding('utf-8');
    //抓取页面内容
    res.on('data', function (chunk) {
        html += chunk;
    });
    //网页内容抓取完毕
    res.on('end', function () {
        // console.log(html);
        //解析html中的数据
        var $ = cheerio.load(html);
        //选取id="info-list-ul"元素中,所有li,并遍历
        $('#info-list-ul li').each(function (index, item) {
            var news_item = {
                title: $('.info-title', this).text(),//选取所有class="info-title"的元素
                time: $('.time',this).text(),
                link: 'http://www.ss.pku.edu.cn' + $('a', this).attr('href'),
            }
            //把所有新闻放在news数组里
            news.push(news_item);
        });
        console.log("打印解析后的数据:");
        console.log(news);
    });
}).on('error',function (err) {
    console.log(err);
});
