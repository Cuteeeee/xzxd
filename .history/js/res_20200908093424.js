//当页面加载时
$(function() {
    //验证用户名是否符合要求
    $("#username").blur(function() {
            var reg = /^[a-zA-Z0-9\_]{6,12}$/;
            var value = $(this).val();
            if (reg.test(value)) {
                $("#namesp").html("符合要求");
            } else {
                $("#namesp").html("6-12位字母或数字");
            }
        })
        //验证密码是否符合要求
    $("#password").blur(function() {
            var reg = /^[a-zA-Z0-9\_]{3,12}$/
            var value = $(this).val();
            if (reg.test(value)) {
                $("#pwdsp").html("符合要求")
            } else {
                $("#pwdsp").html("3-12位字母或数字");
            }
        })
        //再次确认密码
    $("#password2").blur(function() {
            var pass = $("#pass").val();
            var pass1 = $(this).val();
            console.log(pass1)

            if (pass1 == pass) {
                if (pass1 == "" || pass == "") {
                    $("#pwdsp2").html("密码为空");
                } else
                    $("#pwdsp2").html("密码一致");

            } else {
                $(".signConfirm span").text("密码不符");
            }
        })
        //在提交按钮判断校验有没有疏漏

    $("#btn_sub").click(function() {

        if ($("#username").val() && $("#password").val() && $("#password2").val() != null) {
            if ($("#password").val() === $("#password2").val()) {
                alert("注册成功");

                function go() {
                    window.location.href = '../xbfaxv/index.html';
                }
                setTimeout(go(), 5000)
            } else {
                alert('密码不一致请重新填写');
                $("#username").val("") && $("#password").val("") && $("#password2").val("") && $("#checkcode").val("") && $("#email").val("") && $("#tel").val("");
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
            alert('注册失败');
            $("#username").val("") && $("#password").val("") && $("#password2").val("") && $("#checkcode").val("") && $("#email").val("") && $("#tel").val("");

        }


    })

})