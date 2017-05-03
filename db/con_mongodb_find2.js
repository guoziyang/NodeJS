/**
 * node 操作MongoDB
 *
 * 在集合中查询文档(条件查询)
 *
 */
var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/webnote';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    console.log("Connected correctly to server");

    db.collection('user').find({"name":"zhang"}).toArray(function(err,list){
        if(err) throw err;
        console.log(list);
    });
    //关闭数据库
    // db.close();
});
