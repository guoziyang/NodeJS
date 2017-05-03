/**
 * node 操作MongoDB
 */


var MongoClient = require('mongodb').MongoClient;

//设置连接url,默认启动端口27017
//mongodb://主机地址:端口号/数据库名
var url = 'mongodb://localhost:27017/webnote';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    if(err) throw err;

    // console.log("Connected correctly to server");
    console.log("连接成功!");

    db.collection('user').save({name:'yang',passwd:'123'},function(err,ret){
        if(err) throw err;
        console.log("添加成功");
        // console.log(ret);
    });
});

