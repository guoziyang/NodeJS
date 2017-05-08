/**
 * 访问数据库
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//用户表
var userSchema = new Schema({
    username:String,
    password:String,
    email:String,
    createTime:{
        type:Date,
        default:Date.now
    }
});

//笔记表
var noteSchema = new Schema({
    title:String,
    author:String,
    tag:String,
    content:String,
    createTime:{
        type:Date,
        default:Date.now
    }
});

//用户表
// exports.User = mongoose.model('User',userSchema);//表名小写化,尾部追加s,即存入users表
exports.User = mongoose.model('User',userSchema,'user');//尾部不追加s,即存入user表
//笔记表
exports.Note = mongoose.model('Note',noteSchema,'note');//尾部不追加s,即存入note表
