/**
 * node 操作mysql
 *
 * 查询操作
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
    //查询
    connection.query('SELECT * FROM user', function (err, ret) {
        if (err) throw err;
        console.log(ret);
        //关闭连接
        connection.end();
    });
});
