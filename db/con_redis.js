/**
 * Node操作Redis
 */

var redis = require('redis');
//创建连接
var client = redis.createClient(6379, '127.0.0.1');
//给数据库中key为abc的string赋值为123
client.set('abc', 123, function (err, ret) {
    if (err) throw err;
    console.log(ret);
    //关闭连接
    client.quit();
});
//返回数据库中key为abc的string的value值
client.get('abc', function (err, ret) {
    if (err) throw err;
    console.log(ret);
    //关闭连接
    client.quit();
});
