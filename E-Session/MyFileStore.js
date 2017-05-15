/**
 * 根据express-session的store接口实现一个存储到文件的引擎
 */
var fs = require('fs-extra');
var writeFileAtomic = require('write-file-atomic');
// var helpers = require('./session-file-helpers');

//传入session
module.exports = function (session) {
    var storepath = "";//session的存储路径
    var Store = session.Store;

    /**
     * 初始化
     *
     * 参数:
     * directory  store: new MyFileStore('directory')中传入的参数
     */
    function MyFileStore(directory) {
        var self = this;
        storepath = './' + directory + '/';//session的存储路径
        console.log("storepath--->");
        console.log(storepath);
        fs.mkdirsSync(storepath);//创建存储目录
    }

    /**
     * 继承store
     */
    MyFileStore.prototype.__proto__ = Store.prototype;

    /**
     * 根据指定sessionId,获取session(必须实现)
     *
     * 操作:在保存session的目录下,查找名为sessionId的文件,并读取
     */
    MyFileStore.prototype.get = function (sessionId, callback) {

        // var sessionPath = self.options.path;
        console.log("get()-----storepath--->");
        console.log(storepath);
        var sessionPath = storepath +sessionId+'.json';
        console.log("get()-----sessionPath--->");
        console.log(sessionPath);

        // var operation = retry.operation({
        //    retries: options.retries,
        //     factor: options.factor,
        //     minTimeout: options.minTimeout,
        //     maxTimeout: options.maxTimeout
        // });

        /**
         * 从文件中读取sesssion
         *
         * 以异步方式读取文件内容
         *
         * 参数:
         * sessionPath 文件路径
         * opitons     option对象,包含encoding,编码格式,该项是可选的
         * callback 回调,传递2个参数,异常err和文件内容data
         */
        fs.readFile(sessionPath,'utf8',function (err,data) {
            if (!err) {
                var json;
                try {
                    json = JSON.parse(data);
                    console.log("get()--获取session(字符串)--->");
                    console.log(data);
                    console.log("get()--获取session(json对象)--->");
                    console.log(json);
                } catch (parseError) {
                    return fs.remove(sessionPath, function (removeError) {
                        if (removeError) {
                            return callback(removeError);
                        }
                        callback(parseError);
                    });
                }
                if (!err) {
                    return callback(null, !session ? null : json);
                }
            }
        });

    };

    /**
     * 保存session到文件,以sessionid命名(必须实现)
     *
     * 操作:将session,保存到名为sessionid的文件中
     */
    MyFileStore.prototype.set = function (sessionId, session, callback) {
        try {
            // helpers.setLastAccess(session);

            // var sessionPath = self.options.path;
            console.log("set()----storepath--->");
            console.log(storepath);
            var sessionPath = storepath +sessionId+'.json';
            console.log("set()-----sessionPath--->");
            console.log(sessionPath);
            // var json = options.encoder(session);
            // if (helpers.isSecret(options.secret)) {
            //     json = helpers.encrypt(options, json, sessionId)
            // }
            var json = JSON.stringify(session);
            writeFileAtomic(sessionPath, json, function (err) {
                if (callback) {
                    err ? callback(err) : callback(null, session);
                }
            });
        } catch (err) {
            if (callback) callback(err);
        }

    };

    /**
     * 根据指定sessionId,删除session(必须实现)
     *
     * 操作:在保存session的目录下,删除名为sessionId的文件
     */
    MyFileStore.prototype.destroy = function (sessionId, callback) {
        var sessionPath = storepath +sessionId+'.json';
        fs.remove(sessionPath, callback);
    };

    /**
     * Touch the given session object associated with the given `sessionId`(未实现)
     *
     * @param {string} sessionId
     * @param {object} session
     * @param {function} callback
     *
     * @api public
     */

    MyFileStore.prototype.touch = function (sessionId, session, callback) {
        // will update last access time
    };



    /**
     * Attempts to fetch number of the session files(未实现)
     *
     * @param  {Function} callback
     *
     * @api public
     */
    MyFileStore.prototype.length = function (callback) {

    };

    /**
     * Attempts to clear out all of the existing session files(未实现)
     *
     * @param  {Function} callback
     *
     * @api public
     */
    MyFileStore.prototype.clear = function (callback) {

    };

    /**
     * Attempts to find all of the session files(未实现)
     *
     * @param  {Function} callback
     *
     * @api public
     */
    MyFileStore.prototype.list = function (callback) {

    };

    /**
     * Attempts to detect whether a session file is already expired or not(未实现)
     *
     * @param  {String}   sessionId
     * @param  {Function} callback
     *
     * @api public
     */
    MyFileStore.prototype.expired = function (sessionId, callback) {

    };

    return MyFileStore;
};
