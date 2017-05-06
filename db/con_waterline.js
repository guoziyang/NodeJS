/**
 *  waterilne 的使用
 *
 *  对webnote数据库User表操作
 */

var Waterline = require('waterline');
var mysqlAdapter = require('sails-mysql');
var mongoAdapter = require('sails-mongo');

// 适配器
var adapters = {
    mongo: mongoAdapter,
    mysql: mysqlAdapter,
    default: 'mongo'
};

// 连接
var connections = {
    mongo: {
        adapter: 'mongo',
        url: 'mongodb://localhost/webnote'
    },
    mysql: {
        adapter: 'mysql',
        url: 'mysql://root:123@localhost/webnote'
    }
};

// 数据集合
var User = Waterline.Collection.extend({
    identity: 'user',
    //选择连接的数据库
    connection: 'mysql',
    schema: true,
    attributes: {
        username: {
            type: 'string',
            // 校验器
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        //通过回调赋值
        createTime: {
            type: 'date'
        }
    },

    //默认添加3个字段,设为false则不添加
    autoPK: true,          //id(自动增长
    autoCreatedAt: true,    //CreatedAt(创建时间)
    autoUpdatedAt: false,    //UpdatedAt(更新时间)

    // 生命周期回调
    beforeCreate: function(value, cb){
        value.createTime = new Date();
        console.log('beforeCreate executed');
        return cb();
    }
});

var orm = new Waterline();

// 加载数据集合
orm.loadCollection(User);

var config = {
    adapters: adapters,
    connections: connections
}

orm.initialize(config, function(err, models){
    if(err) {
        console.error('orm initialize failed.', err)
        return;
    }

    //添加记录,自动添加id字段,自动增长
    models.collections.user.create({username: 'yang',password: '123456'}, function(err, user){
        console.log('after user.create, err, user:', err, user);
    });
    models.collections.user.create({username: 'zhang',password: '123456'}, function(err, user){
        console.log('after user.create, err, user:', err, user);
    });
});
