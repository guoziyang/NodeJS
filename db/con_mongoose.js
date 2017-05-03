/**
 * mongoose 操作MongoDB
 *
 * 操作集合:webnote数据库的users集合
 */


var mongoose = require('mongoose');
//建立连接
var connection = mongoose.createConnection('mongodb://localhost:27017/webnote', function (err) {
    if (err) throw err;
});
//定义模式
var Schema = mongoose.Schema;
var schema = new Schema({
    name: String,
    passwd: String
});
//对users集合进行操作(集合名小写化且尾部追加s)
connection.model('user',schema);
var user = connection.model('user');
//添加文档
var u = new user({
    name: 'yang',
    passwd: '123456',
});
u.save(function (err, ret) {
    if (err) throw err;
    console.log(ret);
});
//查询文档
user.find({},function (err, ret) {
    if (err) throw err;
    console.log(ret);
    //关闭连接
    connection.close();
});