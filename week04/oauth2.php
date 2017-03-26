<?php
/**
 * 授权访问
 *
 * 主要功能:获取微信用户基本信息
 */
if (isset($_GET['code'])){
    //step 1 --> 用户同意授权后,获取code
    $code =  $_GET['code'];

    //测试 -- 输出code
    echo "获取的code----->".$code;

    //step 2 --> 通过code换取网页授权access_token
    $appid = '';
    $secret = '';
    //构造url
    $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$secret.'&code='.$code.'&grant_type=authorization_code';
    //返回json数据包
    $json = file_get_contents($url);
    //将json格式转换为数组
    $arr = json_decode($json,true);
    //获取access_token和openid
    $token = $arr['access_token'];
    $openid = $arr['openid'];

    //测试 url拼接
    echo "<br />url----->".$url;
    echo "<br />";

    if($json == null){
        echo "<br />未获取到";
    }else{
        echo "<br />已获取到:";
        var_dump($json);
        echo "<br />access_token---->";
        echo $token;
        echo "<br />openid---->";
        echo $openid;

    }

    //step 3 --> 拉取用户信息
    $url2 = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$token.'&openid='.$openid.'&lang=zh_CN';
    echo $url2;
    //返回json数据包
    $json2 = file_get_contents($url2);
    //测试 -- 输出用户信息
    echo "<br />用户信息:";
    var_dump($json2);
    //将json格式转换为数组
    $arr = json_decode($json2,true);
    $name = $arr['nickname'];//昵称
    $imgURL = $arr['headimgurl'];//头像地址
    $sex = $arr['sex'];//性别
    $province = $arr['province'];//用户个人资料填写的省份
    $city= $arr['city'];//普通用户个人资料填写的城市
    $country= $arr['country'];//国家，如中国为CN
    //测试 -- 解析后输出
    echo "<br/>基本信息------>解析后";
    echo "<br/>OpenID:".$openid;
    echo "<br/>昵称：".$name;
    echo "<br/>头像地址:".$imgURL;
    echo "<br/>性别：".$sex;
    echo "<br/>省份：".$province;
    echo "<br/>城市：".$city;

}else{//用户未同意授权
    echo "NO CODE";
}
?>