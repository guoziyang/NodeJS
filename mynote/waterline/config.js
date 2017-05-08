
var mysqlAdapter = require('sails-mysql');
var mongoAdapter =require('sails-mongo');

var adapters={
    mongo:mongoAdapter,
    mysql:mysqlAdapter,
    default:'mysql'
};

// 连接
var connections = {
    mongo: {
        adapter: 'mongo',
        url: 'mongodb://localhost:27017/webnote'
    },
    mysql: {
        adapter: 'mysql',
        // url: 'mysql://root:123@localhost/webnote'
        url: 'mysql://root:ry123@localhost/webnote'
    }
};

var config = {
    adapters:adapters,
    connections:connections
};

exports.config = config;