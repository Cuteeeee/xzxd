//当页面加载时
$(function() {
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
        var pass = $("#pass").val();
        var pass1 = $(this).val();
        console.log(pass1)

        if (pass1 === pass) {
            if (pass1 == "" || pass == "") {
                $("#pwdsp2").html("密码为空");
                return false;
            } else
                $("#pwdsp2").html("密码一致");
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

    //在提交按钮判断校验有没有疏漏

    $("#btn_sub").click(function() {

        if ($("#username").val() && $("#password").val() && $("#password2").val() != null) {
            if ($("#password").val() === $("#password2").val()) {
                $("#chkItem").prop("checked", true);
                alert("注册成功");
                return true;

                function go() {
                    window.location.href = '../xbfaxv/index.html';
                }
                setTimeout(go(), 10000)
            } else {
                alert('密码不一致请重新填写');
                $("#password").val("") && $("#password2").val("");
                return false;
            }
            // var chkItem = $("#chkFollow");
            // $("#btn_sub").on('click', function() {
            //     if ($(chkItem).is(":checked")) {
            //         return
            //     } else {
            //         return false;
            //     }
            // });
        } else {
            confirm('注册失败');
            $("#username").val("") && $("#password").val("") && $("#password2").val("") && $("#checkcode").val("") && $("#email").val("") && $("#tel").val("") && $(".warnings").val("");
            return false;

        }


    })

})