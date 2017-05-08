/**
 * 输入检测
 */
$(function () {

    //对登录功能的用户名、密码的输入信息做检查
    $("#login").click(function () {
        console.log("点击登录后,检测输入");
        $('#errEmpty').hide();//隐藏用户名已经存在的出错提示
        $('#errUser').hide();

        //前端输入的用户名,密码,确认密码
        var username = $('#username').val();
        var password = $('#password').val();

        console.log("输入的用户名和密码");
        console.log(username);
        console.log(password);

        if(username.trim().length==0 ||password.trim().length==0){
            console.log("用户名或密码不能为空");
            $('#errEmpty').show();
            return false; //如果没有这条语句,出错后会继续执行
        }



    });

    //对注册功能的用户名、密码的输入信息做检查
    $("#register").click(function () {
        console.log("点击注册后,检测输入");

        $('#status').hide();//隐藏用户名已经存在的出错提示

        // 用户名验证规则:只能是字母、数字、下划线的组合，长度3-20个字符
        var reUser = /^[a-zA-Z0-9_]{3,20}$/g;
        // 密码验证规则:密码长度不能少于6(6~20)，必须同时包含数字、小写字母、大写字母
        var rePwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,20}$/g;
        //前端输入的用户名,密码,确认密码
        var username = $('#username').val();
        var password = $('#password').val();
        var repassword = $('#repassword').val();

        //检测输入的用户名,密码
        var checkName = reUser.test(username);
        var checkPwd = rePwd.test(password);
        if(!checkName){//验证用户名,不符合规则,出错提示
            console.log(username);
            $('#username-tips').show();
            $("#username").prop('className','form-control err-border');
            return false;
        }else if(!checkPwd){//验证密码,不符合规则,出错提示
            console.log(password);
            $('#username-tips').hide();
            $("#username").prop('className','form-control');
            $('#password-tips').show();
            $("#password").prop('className','form-control err-border');
            return false;
        } else if(password!=repassword){//两次密码输入不一致,,出错提示
            console.log(repassword);
            $('#password-tips').hide();
            $("#password").prop('className','form-control');
            $('#repassword-tips').show();
            $("#repassword").prop('className','form-control err-border');
            return false;
        }else{
            $("form").submit();
            console.log(username);
            console.log(password);
        }
    });

});