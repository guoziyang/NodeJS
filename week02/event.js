/**
 * nodejs基础 -- 事件机制
 */
var EventEmitter = require('events').EventEmitter;

var event = new EventEmitter();

//on 监听事件,第一个参数为事件名,第二个参数为该事件的处理函数
event.on('some_event',function () {
    console.log('some_event 事件触发 。。。');
});


//触发事件
setTimeout(function () {//setTimeout第一个参数为函数,第二个参数为延期执行时间(单位毫秒)
    event.emit('some_event');//emit 触发事件some_event
},1000);

