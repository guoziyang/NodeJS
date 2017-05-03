/**
 * node 操作mysql
 *
 * 使用MySQL连接池
 */

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,//限制连接的最大数量
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webnote'
});
//获取连接
pool.getConnection(function (err, connection) {
    if (err) throw err;
    //条件查询
    var value = 'zhang';
    var query = connection.query('SELECT * FROM user WHERE name=?', value, function (err, ret) {
        if (err) throw err;
        console.log(ret);
        //释放连接
        connection.release();
    });
    //输出查询条件
    console.log(query.sql);
});
