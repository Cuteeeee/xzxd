//当页面加载时
$(function() {
    //显示密码
    //验证用户名是否符合要求
    var isError = true;
    $("#username").blur(function() {
            var reg = /^[a-zA-Z0-9\_]{6,12}$/;
            var value = $(this).val();
            if (reg.test(value)) {
                $("#namesp").html("");
                return true;
            } else {
                $("#namesp").html("6-12位字母或数字");
                return false;
            }
        })
        //验证密码是否符合要求
    $("#password").blur(function() {
            var reg = /^[a-zA-Z0-9\_]{3,12}$/
            var value = $(this).val();
            if (reg.test(value)) {
                $("#pwdsp").html("");
                return true;
            } else {
                $("#pwdsp").html("3-12位字母或数字");
                return false;
            }
        })
        //再次确认密码
    $("#password2").blur(function() {
        var pass = $("#password").val();
        var pass1 = $(this).val();
        console.log(pass1)

        if (pass1 === pass) {
            if (pass1 == "" || pass == "") {
                $("#pwdsp2").html("密码为空");
                return false;
            } else
                $("#pwdsp2").html("");
            return false;
        } else {
            $("#pwdsp2").html("密码不符");
            return true;
        }
    })

    //验证邮箱

    $("#email").blur(function() {

        var regemail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

        var uemail = $("#email").val();

        if (uemail.length <= 0 || !regemail.test(uemail)) {
            $("#emailsp").html("邮箱格式错误");
            return false;
        } else {

            $("#emailsp").html("");
            return true;

        }

    });

    //验证手机号
    $("#tel").blur(function() {
            var regtel = /^1[3456789]\d{9}$/;
            var utel = $("#tel").val();
            if (utel.length <= 0 || !regtel.test(utel)) {
                $("#telsp").html("手机号码错误 ");
                return false;
            } else {
                $("#telsp").html("");
                return true;
            }
        })
        //验证邀请码
    $("#checkcode").blur(function() {
            var regcode = /^[0-9]{8}$/;
            var ucode = $("#checkcode").val();
            if (!regcode.test(ucode)) {
                return false;
            } else {
                return true;
            }
        })
        //验证 必选协议


    //在提交按钮判断校验有没有疏漏
    $("#chkItem").click(function() {
        if ($("#chkItem").prop("checked") == true) {
            $("#btn_sub").removeAttr("disabled");
        } else {
            $("#btn_sub").attr("disabled", "disabled");

        }
    });
    $("#btn_sub").click(function() {
        var username = $("#username").val();
        var userpwd = $("#password").val();
        var userpwd2 = $("#password2").val();
        var useremail = $("#email").val();
        var usertel = $("#tel").val();
        var usercode = $("#checkcode").val();
        if (usercode == 2634) {
            if (username && userpwd && userpwd2 && useremail && usertel && usercode) {
                if ($("#password").val() === $("#password2").val()) {

                    if (confirm("注册成功")) {
                        function go() {
                            window.location.href = '../xbfaxv/index.html';
                        }
                        setTimeout(go(), 10000);
                        return true;
                    } else {
                        return false
                    }

                    // agree();

                } else {
                    alert('密码不一致请重新填写');
                    $("#password").val("") && $("#password2").val("");
                    return false;
                }

            } else {
                confirm('注册失败');
                $("#username").val("") && $("#password").val("") && $("#password2").val("") && $("#checkcode").val("") && $("#email").val("") && $("#tel").val("") && $(".warnings").val("");
                return false;

            }

        } else {
            confirm("注册失败请您输入正确的邀请码");
            $("#username").val("") && $("#password").val("") && $("#password2").val("") && $("#checkcode").val("") && $("#email").val("") && $("#tel").val("") && $("#usercode").val("");
            return false;

        }


    })

})