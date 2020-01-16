//后台服务地址
var url = 'http://192.168.1.30/CTCMS/';
var socketurl = 'ws://192.168.1.30:8888/';
//secret key
var sk = 'TTILY';


$(document).ready(function(){

    //logo
    //$('.logo').html(' <a href="index.html" style="padding-top: 10px;">管理系统</a>');
    //$('footer').html("版权所有 © 2019");
    //$('.logo').html(' <a href=""><img src="images/logo.png" alt=""></a>');
    //$('.logo-icon').html(' <a href=""><img src="images/logo.png" alt=""></a>');
    $('#logoutBtn').click(function () {
        sessionStorage.clear();
        window.location.href='login.html';
    });

    var userinfo=sessionStorage.getItem('userinfo');
    var rolename='',nickname='';
    if(userinfo!=null){
        //$('#loginName').text(JSON.parse(userinfo)['nickname']);
        nickname=JSON.parse(userinfo)['nickname'];
        if(JSON.parse(userinfo)['nickname']=='0'){
            rolename='厅管理员';
        }
        else if(JSON.parse(userinfo)['nickname']=='1'){
            rolename='内容维护人员';
        }
        else{
            rolename='单位用户';
        }
    }



    $('#messageAndUser').html('<li class="nav-item dropdown-lg">\n' +
        '<a class="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown"\n' +
        '   href="javascript:;">\n' +
        '    <i class="fa fa-bell-o"></i><span class="badge badge-warning badge-up">14</span></a>\n' +
        '<div class="dropdown-menu dropdown-menu-right">\n' +
        '    <ul class="list-group list-group-flush">\n' +
        '        <li class="list-group-item d-flex justify-content-between align-items-center">\n' +
        '            您有14条通知提醒消息～\n' +
        '            <span class="badge badge-warning">14</span>\n' +
        '        </li>\n' +
        '        <li class="list-group-item">\n' +
        '            <a href="javascript:;">\n' +
        '                <div class="media">\n' +
        '<img alt="image" src="assets/images/fuwutixing.png" class="tixing-icon mr-3">\n' +
        '<div class="media-body">\n' +
        '    <h6 class="mt-0 msg-title">11111</h6>\n' +
        '    <p class="msg-info">11111111111111111...</p>\n' +
        '</div>\n' +
        '                </div>\n' +
        '            </a>\n' +
        '        </li>\n' +
        '        <li class="list-group-item">\n' +
        '            <a href="javascript:;">\n' +
        '                <div class="media">\n' +
        '<img alt="image" src="assets/images/huodongtixing.png" class="tixing-icon mr-3">\n' +
        '<div class="media-body">\n' +
        '    <h6 class="mt-0 msg-title">22222222222</h6>\n' +
        '    <p class="msg-info">2222222222222222222222...</p>\n' +
        '</div>\n' +
        '                </div>\n' +
        '            </a>\n' +
        '        </li>\n' +
        '        <li class="list-group-item">\n' +
        '            <a href="javascript:;">\n' +
        '                <div class="media">\n' +
        '<img alt="image" src="assets/images/fuwudantixing.png" class="tixing-icon mr-3">\n' +
        '<div class="media-body">\n' +
        '    <h6 class="mt-0 msg-title">3333333333333</h6>\n' +
        '    <p class="msg-info">333333333333333333333333...</p>\n' +
        '</div>\n' +
        '                </div>\n' +
        '            </a>\n' +
        '        </li>\n' +
        '        <li class="list-group-item"><a href="javascript:;">查看全部通知提醒>></a></li>\n' +
        '    </ul>\n' +
        '</div>\n' +
        '                </li>\n' +
        '                <li class="nav-item">\n' +
        '<a class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown" href="#">\n' +
        '    <span class="user-profile"><img alt="image" src="assets/images/user-1.png" class="img-circle"\n' +
        '                alt="user"></span>\n' +
        '</a>\n' +
        '<ul class="dropdown-menu dropdown-menu-right">\n' +
        '    <li class="dropdown-item user-details">\n' +
        '        <a href="javascript:;">\n' +
        '            <div class="media">\n' +
        '                <div class="avatar"><img alt="image" class="align-self-start mr-3"\n' +
        ' src="assets/images/user-1.png" alt="user"></div>\n' +
        '                <div class="media-body">\n' +
        '<h6 class="mt-2 user-title">'+rolename+'</h6>\n' +
        '<p class="user-subtitle">'+nickname+'</p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </a>\n' +
        '    </li>\n' +
        '    <li class="dropdown-divider"></li>\n' +
        '    <li class="dropdown-item"><i class="icon-settings mr-2"></i>设置</li>\n' +
        '    <li class="dropdown-divider"></li>\n' +
        '    <li class="dropdown-item" id="logoutBtn"><i class="icon-power mr-2"></i>退出</li>\n' +
        '</ul>\n' +
        '</li>');

});

var websocket = null;
if ('WebSocket' in window) {
    websocket = new ReconnectingWebSocket(socketurl);
}
else {
    alert('当前浏览器 Not support websocket')
}
//连接发生错误的回调方法
websocket.onerror = function () {
    console.log("WebSocket连接发生错误");
};
//连接成功建立的回调方法
websocket.onopen = function () {
    console.log("WebSocket连接成功");
    var userinfo=sessionStorage.getItem('userinfo');
    if(userinfo!=null){
        websocket.send('{"T":"1","UI":"'+JSON.parse(userinfo)['id']+'","UN":"'+JSON.parse(userinfo)['nickname']+'","UH":""}');
    }
}

//接收到消息的回调方法
websocket.onmessage = function (event) {
    console.log(event.data);
    var msg=JSON.parse(event.data);

    if(msg['T']=='3') {//叫车订单

        var txAudio = new Audio();
        txAudio.src = "audio/iphone_msg2.mp3";
        //audio.loop = true;
        //播放(继续播放)
        txAudio.play();

        var pop=new Pop("叫车订单提醒",
            "pt_order.html",
            "您有一条新的叫车订单，订单编号为："+msg['NO']+"，请尽快处理...");
    }
    else if(msg['T']=='7') {//跑腿订单
        var txAudio = new Audio();
        txAudio.src = "audio/iphone_msg2.mp3";
        //audio.loop = true;
        //播放(继续播放)
        txAudio.play();

        var pop=new Pop("跑腿订单提醒",
            "pt_orderpt.html",
            "您有一条新的跑腿订单，订单编号为："+msg['NO']+"，请尽快处理...");
    }
    else if(msg['T']=='8') {//留言
        var txAudio = new Audio();
        txAudio.src = "audio/iphone_msg2.mp3";
        //audio.loop = true;
        //播放(继续播放)
        txAudio.play();

        var pop=new Pop("留言提醒",
            "pt_ticket.html",
            "收到新的留言信息："+msg['NOTE']+"，请尽快处理...");
    }


}

//连接关闭的回调方法
websocket.onclose = function () {
    console.log("WebSocket连接关闭");
}

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    websocket.close();
}



var  pophtml='<div id="pop" style="display:none;">\n' +
    '<style type="text/css">\n' +
    '*{margin:0;padding:0;}\n' +
    '#pop{background:#fff;width:260px;border:1px solid #e0e0e0;font-size:12px;position: fixed;right:10px;bottom:10px;z-index:999;}\n' +
    '#popHead{line-height:32px;background:#f6f0f3;border-bottom:1px solid #e0e0e0;position:relative;font-size:12px;padding:0 0 0 10px;}\n' +
    '#popHead h2{font-size:14px;color:#666;line-height:32px;height:32px;    margin-top: 0px;    margin-bottom: 0px}\n' +
    '#popHead #popClose{position:absolute;right:10px;top:1px;}\n' +
    '#popHead a#popClose:hover{color:#f00;cursor:pointer;}\n' +
    '#popContent{padding:5px 10px;}\n' +
    '#popTitle a{line-height:24px;font-size:14px;font-family:\'微软雅黑\';color:#333;font-weight:bold;text-decoration:none;}\n' +
    '#popTitle a:hover{color:#f60;}\n' +
    '#popIntro{text-indent:24px;line-height:160%;margin:5px 0;color:#666;}\n' +
    '#popMore{text-align:right;border-top:1px dotted #ccc;line-height:24px;margin:8px 0 0 0;}\n' +
    '#popMore a{color:#f60;}\n' +
    '#popMore a:hover{color:#f00;}\n' +
    '</style>\n' +
    '<div id="popHead">\n' +
    '<a id="popClose" title="关闭">关闭</a>\n' +
    '<h2>温馨提示</h2>\n' +
    '</div>\n' +
    '<div id="popContent">\n' +
    '<dl>\n' +
    '<dt id="popTitle"><a href="">这里是参数</a></dt>\n' +
    '<dd id="popIntro">这里是内容简介</dd>\n' +
    '</dl>\n' +
    '<p id="popMore"><a href="" >查看 »</a></p>\n' +
    '</div>\n' +
    '</div>';

/**
 * 登录
 */
function login() {
    $.ajax({
        url : url+'login',
        type : 'POST',
        data : {
            'username' : $('#username').val(),
            'password' : $('#password').val()
        },
        success : function(response) {
            console.log(JSON.stringify(response));
            if(response['status']=='0'){
                var token = response['token'];
                var userinfo = JSON.stringify(response['msg']);
                //var timestamp = Date.parse(new Date());
                //var hash = md5(token + timestamp + sk);
                sessionStorage.setItem('username',$('#username').val());
                sessionStorage.setItem('userpwd',$('#password').val());
                sessionStorage.setItem('userinfo',userinfo);
                sessionStorage.setItem('token',token);

                //window.location.href='default-page.html?backurl='+window.location.href;
                window.location.href='index.html';
            }
            else{
                alert(response['msg']);
            }

        },
        error : function(response) {
            alert('登录失败！');
        }
    });

}


function createHttpR(url,type,dataType,bodyParam){
    this.url = url;
    this.type = type;
    this.dataType = dataType;
    this.bodyParam = bodyParam;
}
createHttpR.prototype.HttpRequest = function(callBack){

    if(sessionStorage.getItem('username')!=null||sessionStorage.getItem('token')!=null){
        var  token = sessionStorage.getItem('token');
        var timestamp = Date.parse(new Date());
        var hash = md5(token+timestamp+sk);
        $.ajax({
            url:this.url,
            type:this.type,
            cache:false,
            timeout:20,
            dataType:this.dataType,
            data :this.bodyParam,
            async:false,
            headers: {
                'token' : token,
                'timesamp' : timestamp,
                'sign' : hash
                //'content-Type': 'application/json'
            },
            success:function(response) {
                var obj = JSON.parse(response);
                var status = obj['status'];
                var msg = obj['msg'];
                if(status=='mismatch'||status=='expire'){
                    console.log(msg);
                    alert('验证信息错误，请重新登录！');
                    //无用户信息，重新登录
                    window.location.href='login.html';
                    //login();
                }
                else if(status=='0'){
                    callBack(response);
                }
                else{
                    alert(msg);
                }
            },
            error:function(response){
                alert('请求失败！');
                return false;
            },
            beforeSend:function(){
                //alert('before');
            },
            complete:function(){
                //alert('complete');
            }

        });
    }
    else{
        alert('访问权限已过期，请重新登录！');
        //无用户信息，重新登录
        window.location.href='login.html';
    }

}

function createJSONHttpR(url,type,dataType,bodyParam){
    this.url = url;
    this.type = type;
    this.dataType = dataType;
    this.bodyParam = bodyParam;
}
createJSONHttpR.prototype.HttpRequest = function(callBack){

    if(sessionStorage.getItem('username')!=null||sessionStorage.getItem('token')!=null){
        var  token = sessionStorage.getItem('token');
        var timestamp = Date.parse(new Date());
        var hash = md5(token+timestamp+sk);
        $.ajax({
            url:this.url,
            type:this.type,
            cache:false,
            timeout:20,
            dataType:this.dataType,
            data :this.bodyParam,
            async:false,
            headers: {
                'token' : token,
                'timesamp' : timestamp,
                'sign' : hash,
                'content-Type': 'application/json'
            },
            success:function(response) {
                var obj = JSON.parse(response);
                var status = obj['status'];
                var msg = obj['msg'];
                if(status=='mismatch'||status=='expire'){
                    console.log(msg);
                    alert('验证信息错误，请重新登录！');
                    //无用户信息，重新登录
                    window.location.href='login.html';
                    //login();
                }
                else if(status=='0'){
                    callBack(response);
                }
                else{
                    alert(msg);
                }
            },
            error:function(response){
                alert('请求失败！');
                return false;
            },
            beforeSend:function(){
                //alert('before');
            },
            complete:function(){
                //alert('complete');
            }

        });
    }
    else{
        alert('访问权限已过期，请重新登录！');
        //无用户信息，重新登录
        window.location.href='login.html';
    }

}


function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


function addNumber(_idx){
    var str = '';
    for(var i = 0; i < _idx; i += 1){
        str += Math.floor(Math.random() * 10);
    }
    return str;
}


function PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}
//////////////////

Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

///////////
//初始化变量
var interval;
var hour,minute,second;//时 分 秒
hour=minute=second=0;//初始化
var millisecond=0;//毫秒
//计时函数
function timer()
{
    millisecond=millisecond+1000;
    if(millisecond>=1000)
    {
        millisecond=0;
        second=second+1;
    }
    if(second>=60)
    {
        second=0;
        minute=minute+1;
    }

    if(minute>=60)
    {
        minute=0;
        hour=hour+1;
    }

    /*if($('#timeslot').val() == PrefixInteger(hour,2)+':'+PrefixInteger(minute,2)+':'+PrefixInteger(second,2)){
        clearInterval(interval);
        playEndSound();
    }*/


    //$('#repairTime').text("检修时间："+hour+'时'+minute+'分'+second+'秒'+millisecond+'毫秒')
    $('#timeSpan').text(PrefixInteger(hour,2)+':'+PrefixInteger(minute,2)+':'+PrefixInteger(second,2));

}
function PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}
//////////////////

Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}


function setMenu(par,sub){
    var menuStr='<ul class="sidebar-menu do-nicescrol">\n' +
        '             <li class="sidebar-header">全部功能</li>\n' +
        '             <li id="menu1">\n' +
        '                 <a href="index.html" class="waves-effect">\n' +
        '                     <img alt="image" class="index-icon-nav" src="assets/images/index-icon/i-shouye.png"> <span>首页</span>\n' +
        '                 </a>\n' +
        '             </li>\n' +
        '             <li id="menu2">\n' +
        '                 <a href="javascript:;" class="waves-effect">\n' +
        '                     <img alt="image" class="index-icon-nav" src="assets/images/index-icon/i-caozuorizhi.png"> <span>系统管理</span>\n' +
        '                 </a>\n' +
        '                 <ul class="sidebar-submenu">\n' +
        '                     <li id="menu2-1"><a href="ct_user_admin.html">用户管理</a></li>\n' +
        '                     <li id="menu2-2"><a href="ct_logs.html">登录日志</a></li>\n' +
        '                     <li id="menu2-3"><a>修改密码</a></li>\n' +
        '                     <li id="menu2-4"><a>站内意见</a></li>\n' +
        '                 </ul>\n' +
        '             </li>\n' +
        '             <li id="menu3">\n' +
        '                 <a href="javascript:;" class="waves-effect">\n' +
        '                     <img alt="image" class="index-icon-nav" src="assets/images/index-icon/i-qiye.png"> <span>矩阵单位管理</span>\n' +
        '                 </a>\n' +
        '                 <ul class="sidebar-submenu">\n' +
        '                     <li id="menu3-1"><a href="ct_user_new.html"">单位新注册审核</a></li>\n' +
        '                     <li id="menu3-2"><a href="ct_user_update.html">单位信息修改审核</a></li>\n' +
        '                     <li id="menu3-3"><a href="ct_user_frozen.html">单位冻结</a></li>\n' +
        '                     <li id="menu3-4"><a href="ct_user_list.html">单位列表</a></li>\n' +
        '                 </ul>\n' +
        '             </li>\n' +
        '             <li id="menu4">\n' +
        '                 <a href="javascript:;" class="waves-effect">\n' +
        '                     <img alt="image" class="index-icon-nav" src="assets/images/index-icon/i-huodong.png"><span>内容分发管理</span>\n' +
        '                 </a>\n' +
        '                 <ul class="sidebar-submenu">\n' +
        '                     <li id="menu4-1"><a>抖音内容推送</a></li>\n' +
        '                     <li id="menu4-2"><a>微博内容推送</a></li>\n' +
        '                     <li id="menu4-3"><a>微信内容推送</a></li>\n' +
        '                     <li id="menu4-4"><a>头条内容推送</a></li>\n' +
        '                     <li id="menu4-5"><a>内容推送已转发回执</a></li>\n' +
        '                     <li id="menu4-6"><a>新媒体点赞数据录入</a></li>\n' +
        '                     <li id="menu4-7"><a>新媒体评论数据录入</a></li>\n' +
        '                     <li id="menu4-8"><a>新媒体转发数据录入</a></li>\n' +
        '                     <li id="menu4-9"><a>新推送内容短消息提醒</a></li>\n' +
        '                     <li id="menu4-10"><a>新推送内容站内消息提醒</a></li>\n' +
        '                 </ul>\n' +
        '             </li>\n' +
        '             <li id="menu5">\n' +
        '                 <a href="javascript:;" class="waves-effect">\n' +
        '                     <img alt="image" class="index-icon-nav" src="assets/images/index-icon/i-wangge.png"> <span>矩阵单位新媒体统计</span>\n' +
        '                 </a>\n' +
        '                 <ul class="sidebar-submenu">\n' +
        '                     <li id="menu5-1"><a>评论数据统计</a></li>\n' +
        '                     <li id="menu5-2"><a>转发数据统计</a></li>\n' +
        '                     <li id="menu5-3"><a>点赞数据统计</a></li>\n' +
        '                 </ul>\n' +
        '             </li>\n' +
        '             <li id="menu6">\n' +
        '                 <a href="#" class="waves-effect">\n' +
        '                     <img alt="image" class="index-icon-nav" src="assets/images/index-icon/i-tongji.png"> <span>统计分析</span>\n' +
        '                 </a>\n' +
        '                 <ul class="sidebar-submenu">\n' +
        '                     <li id="menu6-1"><a>点赞数据统计</a></li>\n' +
        '                     <li id="menu6-2"><a>评论数据统计</a></li>\n' +
        '                     <li id="menu6-3"><a>转发数据统计</a></li>\n' +
        '                     <li id="menu6-4"><a>信息分发统计</a></li>\n' +
        '                     <li id="menu6-5"><a>新媒体内容点赞排行</a></li>\n' +
        '                     <li id="menu6-6"><a>新媒体内容转发排行</a></li>\n' +
        '                     <li id="menu6-7"><a>新媒体内容评论排行</a></li>\n' +
        '                 </ul>\n' +
        '             </li>\n' +
        '             <li  id="menu7">\n' +
        '                 <a href="javascript:;" class="waves-effect">\n' +
        '                     <img alt="image" class="index-icon-nav" src="assets/images/index-icon/i-biaoqian.png"><span>内容管理</span>\n' +
        '                     <i class="fa fa-angle-left float-right"></i>\n' +
        '                 </a>\n' +
        '                 <ul class="sidebar-submenu">\n' +
        '                     <li id="menu7-5"><a href="ct_contents.html">新媒体内容列表</a></li>\n' +
        '                     <li id="menu7-1"><a href="ct_contents_add.html?type=1">抖音内容录入</a></li>\n' +
        '                     <li id="menu7-2"><a href="ct_contents_add.html?type=2">微博内容录入</a></li>\n' +
        '                     <li id="menu7-3"><a href="ct_contents_add.html?type=3">微信内容录入</a></li>\n' +
        '                     <li id="menu7-4"><a href="ct_contents_add.html?type=4">头条内容录入</a></li>\n' +
        '                 </ul>\n' +
        '             </li>\n' +
        '             <li id="menu8">\n' +
        '                 <a href="javascript:;" class="waves-effect">\n' +
        '                     <img alt="image" class="index-icon-nav" src="assets/images/index-icon/i-fuwudan.png"> <span>舆情分析</span>\n' +
        '                 </a>\n' +
        '                 <ul class="sidebar-submenu">\n' +
        '                     <li id="menu8-1"><a>舆情数据</a></li>\n' +
        '                     <li id="menu8-2"><a>舆情关键词</a></li>\n' +
        '                     <li id="menu8-3"><a>舆情风向标</a></li>\n' +
        '                 </ul>\n' +
        '             </li>\n' +
        '         </ul>';
    $('#sidebar-wrapper').html(menuStr);
    $('#sidebar-wrapper li').removeClass("active");
    $('#menu'+par).addClass("active");
    $('#menu'+par+'-'+sub).addClass("active");


    var animationSpeed = 300,
        subMenuSelector = '.sidebar-submenu';
    $('#sidebar-wrapper').on('click', 'li a', function(e) {
        var $this = $(this);
        var checkElement = $this.next();
        if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function() {
                checkElement.removeClass('menu-open');
            });
            checkElement.parent("li").removeClass("active");
        }
        //If the menu is not visible
        else if ((checkElement.is(subMenuSelector)) && (!checkElement.is(':visible'))) {
            //Get the parent menu
            var parent = $this.parents('ul').first();
            //Close all open menus within the parent
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            //Remove the menu-open class from the parent
            ul.removeClass('menu-open');
            //Get the parent li
            var parent_li = $this.parent("li");
            //Open the target menu and add the menu-open class
            checkElement.slideDown(animationSpeed, function() {
                //Add the class active to the parent li
                checkElement.addClass('menu-open');
                parent.find('li.active').removeClass('active');
                parent_li.addClass('active');
            });
        }
        //if this isn't a link, prevent the page from being redirected
        if (checkElement.is(subMenuSelector)) {
            e.preventDefault();
        }
    });

}