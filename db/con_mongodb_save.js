/**
 * node 操作MongoDB
 *
 * 向集合中添加文档
 *
 */

var MongoClient = require('mongodb').MongoClient;

//设置url,数据库为webnote, 默认启动端口27017,
var url = 'mongodb://localhost:27017/webnote';

//连接
MongoClient.connect(url, function(err, db) {

    if(err) throw err;
    console.log("Connected correctly to server");

    //连接成功,向user集合中,添加文档
    db.collection('user').save({name:'zhang',passwd:'123456'},function(err,ret){
        if(err) throw err;
        console.log(ret);
        db.close();
    });
});