$(function() {
    $(window).scroll(function() {
        t = $(document).scrollTop();
        if (t > 650) {
            $(".toolbox").show();
        } else {
            $(".toolbox").hide();
        }
    });

    $(".goto-top").click(function() {
        $("html,body").stop().animate({
            scrollTop: 0
        }, 500);
    });
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?78044b10664b88a041c8876f462802f0";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
        //登录校验
        $("#btn_login").click(function() {
            var user = $("#username").val();
            var psw = $("#password").val();
            // if (user != '' && psw != '') {
            //     alert("登录成功");
            //     window.location.href = '../xbfaxv/index.html';
            // } else {
            //     alert("用户名或密码错误，请重新登录");
            //     window.location.href = '../xbfaxv/login.html';
            // }
            if (user && psw) {
                alert("该用户不存在请注册");
                window.location.href = '../xbfaxv/login.html';
            } else {
                alert("用户名或密码输入有误")
                window.location.href = '../xbfaxv/login.html';
            }
        })
    })();
});
// 显示确认框
function showMsgConfirm(title, msg, msgEx, okFun) {
    $("#msgConfirm h4:eq(0)").html(title);
    $("#msgConfirm .success-body >p:eq(0)").html(msg);
    $("#msgConfirm .success-body >p:eq(1)").html(msgEx);
    $("#msgConfirm .success-primary").unbind("click").one("click", function() {
        okFun();
    });
    $("#msgConfirm").modal('show');
}
// 隐藏确认框
function closeMsgConfirm() {
    $("#msgConfirm h4:eq(0)").html("");
    $("#msgConfirm .success-body >p:eq(0)").html("");
    $("#msgConfirm .success-body >p:eq(1)").html("");
    $("#msgConfirm .success-primary").unbind("click");
    $("#msgConfirm").modal('hide');
}

// 显示消息框
function showMsgAlert(title, msg, msgEx, time) {
    time = (undefined == time) ? 3000 : time;
    $("#msgAlert h4:eq(0)").html(title);
    $("#msgAlert .success-body >p:eq(0)").html(msg);
    $("#msgAlert .success-body >p:eq(1)").html(msgEx);


    if (0 != time) {
        $("#msgAlert").modal('show');
        setTimeout(function() {
            closeMsgAlert();
        }, time);
    } else {
        $("#msgAlert").modal({
            backdrop: 'static',
            keyboard: false
        }).modal('show');
    }
}
// 隐藏消息框
function closeMsgAlert() {
    $("#msgAlert h4:eq(0)").html("");
    $("#msgAlert .success-body >p:eq(0)").html("");
    $("#msgAlert .success-body >p:eq(1)").html("");
    $("#msgAlert").modal('hide');
}
var ctx = '',
    ctxStatic = '/static',
    version = '201911291',
    download_url = 'https://downimg.xbfax.com/upload/images/',
    download_urlImg = 'https://downimg.xbfax.com/upload/images/',
    upload_urlImg = 'https://upimg.xbfax.com/fs/upload/image.shtml',
    download_urlFile = 'https://upfile.xbfax.com/',
    upload_urlFile = 'https://files.xbfax.com/fs/uploadFile',
    download_urlDocument = 'https://upfile.xbfax.com/',
    upload_urlDocument = 'https://files.xbfax.com/fs/uploadDoc';