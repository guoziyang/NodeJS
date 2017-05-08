//ORM中间
var waterline = require('waterline');

//用户表
var user = waterline.Collection.extend({
    identity:'user',
    connection:'mysql',
    // connection:'mongo',
    schema:true,
    migrate: 'safe',
    autoCreatedAt:false,
    autoUpdatedAt:false,
    attributes: {
        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        createTime: {
            type: 'date'
        },
        beforeCreate: function(value, cb){
            value.createTime =new Date();
            return cb();
        }
    }
});
//笔记表
var note = waterline.Collection.extend({
    identity:'note',
    connection:'mysql',
    // connection:'mongo',
    schema:true,
    migrate: 'safe',
    autoCreatedAt:false,
    autoUpdatedAt:false,
    attributes: {
        title :{
            type:'string',
        },
        author:{
            type:'string',
        },
        tag   :{
            type:'string',
        },
        content:{
            type:'string',
        },
        createTime:{
            type:'date'
        }
    }
});

exports.user=user;
exports.note=note;