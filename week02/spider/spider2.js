/**
 * 抓取内容:豆瓣电影TOP250部电影列表
 * 页面URL:https://movie.douban.com/top250
 *
 */

//引入所需模块
var https = require('https')
var fs = require('fs')
var cheerio = require('cheerio');

var sum = 1; //计数

var html = "";//保存到抓取到的HTML源码
var news = [];//保存解析HTML后的数据
var i = 0;


//拆分https://movie.douban.com/top250?start= +  25 + &filter=
var url_basic ='https://movie.douban.com/top250?start=';
var url = url_basic + 0 + '&filter=';
var d = 25;//每页显示25条
//抓取数据
for(i = 0 ; i < 226 ; i+=d) {
    var url = url_basic + i + '&filter=';
    // console.log(url);

    //每次抓取一页,解析显示一页
    https.get(url, function(res) {
        var html = "";//保存到抓取到的HTML源码
        var movies = [];//保存解析HTML后的数据
        res.setEncoding('utf-8');

        var html='';
        res.on('data', function(data) {
            html += data;
        });

        res.on('end',function() {
            // console.log(html);
            // fs.writeFile('doubanMovie.html',html)

            //解析html中的数据
            var $ = cheerio.load(html);
            //遍历class='grid_view_li'的ol中的所有li元素
            $('.grid_view li').each(function (index, item) {
                var items = {
                    Number:sum++, //电影编号,用于记录电影数
                    name: $('.title',this).text(),//电影名字
                    other: $('.other',this).text(),//别名
                    main:$('p',this).text(),//导演和主演
                    score:$('.rating_num',this).text(),//豆瓣评分
                    link:$('a',this).attr('href'),//详情地址
                    picture:$('img',this).attr('src'),//剧照
                }
                //把所有新闻放在movies数组里
                movies.push(items);
            });
            console.log("打印解析后的数据:");
            console.log(movies);

        });

    }).on('error', function() {
        console.log('error');
    });

}