/**
 * node 操作mysql
 *
 * 条件查询
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webnote'
});
//创建连接
connection.connect(function (err) {
    if (err) throw err;
    //设置查询条件
    var value = 'zhang';
    //查询,使用?,对查询变量value会自动进行转义
    var query =  connection.query('SELECT * FROM user where name=?',value, function (err, ret) {
        if (err) throw err;
        console.log(ret);
        //关闭连接
        connection.end();
    });
    console.log(query.sql);
});
