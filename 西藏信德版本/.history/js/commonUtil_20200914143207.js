/**
 * @file 全站通用公共方法
 * @author zhenghf(zhenghf@xbfax.com)
 * @date 2016-11-30
 * @version 1.0
 */
var commonUtil = {
    isModalShow: false,
    /**
     * 请求服务
     * @param url 请求地址
     * @param body 请求参数，选填，默认空
     * @param method 提交方式，选填，默认get
     */
    xhr: function(url, body, method, async) {
        var defer = $.Deferred();
        body = body || {};
        method = method || 'GET';
        if (undefined == async) {
            async = true;
        }
        return $.ajax({
            type: method,
            url: ctx + url,
            async: async,
            cache: false,
            dataType: 'json',
            data: body
        });
    },
    /**
     * 保存登录用户信息
     */
    loginUser: {},
    /**
     * 获取登录用户信息
     */
    getLoginInfo: function() {
        if (!commonUtil.loginUser || $.isEmptyObject(commonUtil.loginUser) || !commonUtil.loginUser.uid) {
            commonUtil.xhr('/member/loginUser.shtml', {}, 'GET', false).done(function(rsp) {
                if (rsp.code == '200') {
                    commonUtil.loginUser = rsp.data;
                }
            });
        }
        return commonUtil.loginUser;
    },
    /**
     * 消息提示
     */
    msg: {
        options: {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-right",
            "onclick": null,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        },
        info: function(title, msg) {
            toastr.info(msg, title, commonUtil.msg.options);
        },
        success: function(title, msg) {
            toastr.success(msg, title, commonUtil.msg.options);
        },
        warning: function(title, msg) {
            toastr.warning(msg, title, commonUtil.msg.options);
        },
        error: function(title, msg) {
            toastr.error(msg, title, commonUtil.msg.options);
        }
    },
    /**
     * 登录弹框
     * @param obj
     * @param param
     */
    login: function(obj, param) {
        if (!commonUtil.isModalShow) {
            commonUtil.isModalShow = true;
            obj = obj || null;
            if (typeof $.fn.LoginModalManage === 'function') {
                $(obj).LoginModalManage(param || {});
            } else {
                commonUtil.getScript(ctxStatic + '/js/commons/plug/loginModalControl.js?v=' + version, function() {
                    $(obj).LoginModalManage(param || {});
                });
            }
        }
    },
    /**
     * 权限校验
     * 
     * @param type 权限类型，partner机构权限，interbank同业权限，notbank非银权限
     * @param callback 权限校验通过后执行
     */
    authcheck: function(obj, callback) {
        var menu = $(obj).attr('data-menu');
        var menuoper = $(obj).attr('data-menuoper');
        var column = $(obj).attr('data-column');
        var columnoper = $(obj).attr('data-columnoper');

        var param = {
            menu: menu,
            menuoper: menuoper,
            column: column,
            columnoper: columnoper
        };

        commonUtil.auth(param, callback);
    },
    /**
     * 公共 - 校验权限
     * 如果param为空，则校验基本权限（是否登录、是否为有效用户）
     * 
     * @param param = {
     * 		menu: menu,	// 菜单code
     *		menuoper: menuoper,	// 菜单操作code
     *		column: column,	// 栏目code
     *		columnoper: columnoper // 栏目操作code
     * }
     * @param callback 校验通过后回调函数
     */
    auth: function(param, callback) {
        commonUtil.xhr('/auth/index.shtml', param, 'GET', false).done(function(result) {
            if (result.code == '200') {
                if (typeof callback === 'function') {
                    callback();
                }
            } else if (result.code == '300') {
                commonUtil.login();
            } else {
                commonUtil.tips({
                    content: result.msg,
                    contentExt: result.msgext
                });
            }
        });
    },
    // 表情 图片转换方法
    faceUtil: {
        // 表情转成图片
        replace_em_img: function(str) {
            if (!str) { return ""; }
            str = str.replace(/\[em_([0-9]*)\]/g, '<img style="width:24px;height:24px;" src="' + ctxStatic + '/js/commons/layim/images/face/3/_$1.png"/>');
            return str;
        },
        replace_img_em: function(str) {
            if (str == undefined) { return; }
            var rep = new RegExp('\<img style=\"width:24px;height:24px;\" src=\"' + ctxStatic + '\/js\/commons\/layim\/images\/face\/3\/_([0-9]*).png\"/>', "g");
            str = str.replace(rep, '[em_$1]');
            return str;
        }
    },
    /**
     * IM聊天
     */
    imTalk: function(uid) {
        var self = this;

        // 获取im所需的用户信息
        self.xhr('/user/home/userinfo/' + uid + '.shtml').done(function(result) {
            if ("success" == result.statue) {
                if (!!result.opInfo) {
                    var userName = result.opInfo.userName;
                    var instName = result.opInfo.instName;
                    var avatar = result.opInfo.avatar;

                    xxim.popchatbox(xxim.oneUser({ 'id': uid, 'sender': userName, 'senderName': userName + "卍" + instName + "卍" + avatar }));
                    log.imarea = xxim.chatbox.find('#layim_area' + xxim.nowchat.type + uid);
                }
            }
        });
    },
    /**
     * IM留言
     * @param uid 接收消息的用户id
     * @param content 接收的消息内容
     */
    leaveMessage: function(uid, content) {
        if (!uid || !content) {
            return;
        }

        // 请求参数
        var params = {
            id: uid,
            content: content,
            name: '',
            sign_key: ''
        };

        commonUtil.xhr('/user/im/message/send.shtml', params, 'POST').done(function(result) {
            if (1 == result.status) {
                if (typeof xxim === 'undefined') {

                } else {
                    xxim.getDates(0);
                }
            }
        });
    },
    /**
     * 交换名片
     * 
     * @param uid
     * @param callback
     */
    exchangeCard: function(uid) {
        var self = this;
        if (_uid == uid) {
            commonUtil.msg.error("提示", "自己不能与自己交换名片!");
            return;
        }
        var params = {
            content: "我申请与你交换名片,请在移动端系统消息或网站消息中心中同意或拒绝,谢谢!",
            id: uid,
            name: "",
            sign_key: 'type_subcard', // 密匙
            time: +new Date
        };



        // 发送服务请求，站内信
        self.xhr('/user/cardExchange/exchange/' + uid + '.shtml', {}, 'GET').done(function(result) {
            if (result.statue == 200) {
                commonUtil.msg.success("提示", "发送交换名片请求成功!");

                //发送im消息
                self.xhr('/user/im/message/send.shtml', params, 'POST').done(function(result) {
                    if (result.status == 1) {}
                });
            } else {
                commonUtil.msg.error("提示", result.msg);
            }
        });
    },
    /**
     * 交换名片同意或拒绝
     * 
     * @param uid
     * @param callback
     */
    cardAgree: function(uid, status, callback) {
        var self = this;



        // 发送服务请求，站内信
        self.xhr(ctx + '/user/cardExchange/isagree/' + uid + '/' + status + '.shtml', {}, 'GET').done(function(result) {
            if (result.statue == 200) {
                if (typeof callback === 'function') {
                    callback(result.code);
                }
                /*   	if(result.code == 1){
                 		sendIMAgree(isagree,contactuid,name)
                 		//commonUtil.msg.success("提示", "同意交换名片申请成功!");
                 	}
                 	if(result.code == 2){
                 		sendIMAgree(isagree,contactuid,name)
                 		//commonUtil.msg.success("提示", "拒绝交换名片申请成功!");
                 	}*/
            }
        });
    },
    /**
     * 根据用户id，获取用户信息
     */
    getUserInfo: function(uid, callback) {
        var self = this;

        if (!uid) {
            return;
        }

        self.xhr('/member/' + uid + '.shtml').done(function(rsp) {
            if ("200" == rsp.code) {
                if (!!rsp.data) {
                    if (typeof callback === 'function') {
                        callback(rsp.data);
                    }
                }
            }
        });
    },
    getUserCertificateInfo: function(uid, callback) {
        commonUtil.xhr('/fund/cert/' + uid + '.shtml', {}, 'GET').done(function(result) {
            if (typeof callback === 'function') {
                callback(result)
            }
        });
    },
    /**
     * upload
     * 
     * @param obj
     * @param param
     * @returns
     */
    upload: function(obj, param) {
        /*if(typeof $.fn.FineUploader === 'function') {
        	return $(obj).FineUploader(param || {});
        } else {
        	commonUtil.getScript(ctxStatic + '/scripts/plugin/jquery.uploadPlugin.js', function() {
        		return $(obj).FineUploader(param || {});
        	});
        }*/
    },
    /**
     * 操作提示
     * 
     * @param obj 触发对象
     * @param param = {
     *   	title: '友情提示',  // 标题
     *   	type: 'error', // 提示框类型，error：操作受限
     *  	content: '访问受限！您还没有登录西部金交中心平台',  // 提示内容 
     *   	contentExt: '<a href="${ctx}/login.shtml">立即登录</a><a href="${ctx}/member/register.shtml">注册用户</a>', // 提示内容 
     *   	callback: function() {}  // 回调函数
     *   }
     */
    tips: function(param, obj) {
        if (!obj) {
            obj = null;
        }

        if (typeof $.template === 'function') {
            if (typeof $.fn.PlugTooltip === 'function') {
                return $(obj).PlugTooltip(param || {});
            } else {
                commonUtil.getScript(ctxStatic + '/js/commons/plug/jquery.plug.tooltip.js?v=' + version, function() {
                    return $(obj).PlugTooltip(param || {});
                });
            }
        } else {
            commonUtil.getScript(ctxStatic + '/js/commons/layout/jquery.tmpl.js?v=' + version, function() {
                if (typeof $.fn.PlugTooltip === 'function') {
                    return $(obj).PlugTooltip(param || {});
                } else {
                    commonUtil.getScript(ctxStatic + '/js/commons/plug/jquery.plug.tooltip.js?v=' + version, function() {
                        return $(obj).PlugTooltip(param || {});
                    });
                }
            });
        }
    },
    /**
     * 加载中动画
     * 
     * @param obj
     * @param param
     * @returns
     */
    loading: function(obj, param) {
        var loading;

        if (typeof $.fn.Loading === 'function') {
            loading = $(obj).Loading(param || {});
        } else {
            $.ajax({
                url: ctxStatic + '/js/commons/plug/jquery.plug.loading.js?v=' + version,
                dataType: "script",
                async: false,
                cache: true,
                success: function() {
                    loading = $(obj).Loading(param || {});
                }
            });
        }

        return loading;
    },
    /**
     * ueditor
     * 
     * @param obj
     * @param param
     * @returns
     */
    ueditor: function(obj, param) {
        var ue;

        if (typeof $.fn.UEditor === 'function') {
            ue = $(obj).UEditor(param || {});
        } else {
            $.ajax({
                url: ctxStatic + '/js/commons/plug/jquery.plug.ueditor.js?v=' + version,
                dataType: "script",
                async: false,
                cache: true,
                success: function() {
                    ue = $(obj).UEditor(param || {});
                }
            });
        }

        return ue;
    },
    /**
     * 广告
     * 
     * @param obj
     * @param param
     */
    ad: function(obj, param) {
        if (typeof $.fn.Ad === 'function') {
            return $(obj).Ad(param || {});
        } else {
            commonUtil.getScript(ctxStatic + '/js/commons/msg/jquery.plug.msg.js?v=' + version, function() {
                return $(obj).Ad(param || {});
            });
        }
    },
    /**
     * 图片缩略图路径转换
     * imgPath : 图片路径 path
     */
    getThumbnailPath: function(imgPath) {
        imgPath = imgPath.replace('default', 'thumb');
        var strStart = imgPath.substr(0, imgPath.lastIndexOf('.'));
        var strEnd = imgPath.substr(imgPath.lastIndexOf('.'),
            imgPath.length);
        return strStart + "_400_400" + strEnd.toLowerCase();
    },
    /**
     * 浏览器版本过低时提示
     */
    browserVersionTips: function() {
        var agent = navigator.userAgent.toLowerCase();
        var regStr_ie = /msie [\d.]+;/gi;

        //IE
        if (agent.indexOf("msie") > 0) {
            var brower = agent.match(regStr_ie);
            var version = (brower + "").replace(/[^0-9.]/ig, "");

            if (version && version.length > 0) {
                version = version.substring(0, 1);
                version = new Number(version);

                if (version == 5 || version == 6 || version == 7) {
                    if ($('.browser-version-tips').length == 0) {
                        $("body").prepend('\
							<div class="browser-version-tips">\
								<div>\
									<div>您的IE浏览器版本过低，获取最佳体验，请升级到IE8以上或使用360浏览器、谷歌浏览器、火狐浏览器</div>\
									<div class="right close-top-msg" title="关闭">×</div>\
								</div>\
							</div>\
						');
                    }

                    $('.browser-version-tips .close-top-msg').on('click', function() {
                        $('.browser-version-tips').hide();
                    });

                    setTimeout(function() {
                        $('.browser-version-tips').hide();
                    }, 1000 * 30);
                }
            }
        }
    },
    /**
     * 模拟a标签在另一个标签打开页面
     * @param obj
     * @param param
     */
    targetClick: function(href, target) {
        var a = document.createElement('a');
        a.target = target || '_blank'; //默认设置为在新窗口打开
        a.href = href || (ctx + "/"); // 默认跳转到网站首页
        document.body.appendChild(a);

        var agent = navigator.userAgent.toLowerCase();
        var regStr_saf = /safari\/[\d.]+/gi;

        if (agent.indexOf("safari") > 0) {
            var e = document.createEvent('MouseEvent');
            e.initEvent('click', false, false);
            a.dispatchEvent(e);
        } else {
            a.click();
        }

        document.body.removeChild(a);
    },
    /**
     * 动态加载css文件
     * @param cssUrl css文件路径
     * @param container 容器
     */
    loadCss: function(cssUrl, container) {
        if (cssUrl.indexOf('?v=') == -1) {
            cssUrl = cssUrl + '?v=' + version;
        }

        css = document.createElement('link');
        css.href = cssUrl;
        css.rel = 'stylesheet';
        css.type = 'text/css';

        if (!container) {
            var cssLen = $('link[href*="' + cssUrl + '"]', $("head")[0]).length;
            if (cssLen == 0) {
                $("head")[0].appendChild(css);
            }
        } else {
            var cssLen = $('link[href*="' + cssUrl + '"]', container).length;
            if (cssLen == 0) {
                $(container).append(css);
            }
        }
    },
    /**
     * 动态加载js文件
     * @param cssUrl css文件路径
     * @param container 容器
     */
    loadJs: function(id, jsUrl, container) {
        var js = document.createElement('script');
        js.src = jsUrl;
        js.id = id;
        js.type = 'text/javascript';

        if (!container) {
            container = document.getElementsByTagName('head').item(0);
        }

        if ($('#' + id, container).length > 0) {
            $('#' + id, container).remove();
        }

        $(container).append(js);
    },
    /**
     * 动态加载js
     */
    getScript: function(jsUrl, callback, async) {
        if (async == undefined) {
            async = true;
        }

        if (jsUrl.indexOf('?v=') == -1) {
            jsUrl = jsUrl + '?v=' + version;
        }

        $.ajax({
            url: jsUrl,
            dataType: "script",
            async: async,
            cache: true,
            success: function() {
                if (typeof callback === 'function') {
                    callback();
                }
            }
        });
    },
    /**
     * 获取浏览器版本
     * @returns
     */
    checkBrowser: function() {
        var agent = navigator.userAgent.toLowerCase();

        var regStr_ie = /msie [\d.]+;/gi;
        var regStr_ff = /firefox\/[\d.]+/gi;
        var regStr_chrome = /chrome\/[\d.]+/gi;
        var regStr_saf = /safari\/[\d.]+/gi;

        //IE
        var ieVersion = IEVersion();
        if (ieVersion != '') {
            return ieVersion;
        }

        //Edge
        if (agent.indexOf("edge") > -1) {
            return "msie/edge";
        }

        //firefox
        if (agent.indexOf("firefox") > 0) {
            return agent.match(regStr_ff);
        }

        //Chrome
        if (agent.indexOf("chrome") > 0) {
            return agent.match(regStr_chrome);
        }

        //Safari
        if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
            return agent.match(regStr_saf);
        }

        return "";
    },
    /**
     * 根据模板进行数据字典转码（根据值或者编码转码），转换后为HTML代码
     * 
     * @param module 业务模块
     * @param type 类型
     * @param code 编码或值
     * @param tmpl 模板
     */
    trans: function(module, type, code, tmpl) {
        var result = "";

        if (typeof xbfaxConfig !== 'undefined') {
            result = xbfaxConfig.func.transToHtmlByTmpl(module, type, code, tmpl);
        } else {
            $.ajax({
                url: ctxStatic + '/js/commons/xbfax.config.js?v=' + version,
                dataType: "script",
                async: false,
                cache: true,
                success: function() {
                    result = xbfaxConfig.func.transToHtmlByTmpl(module, type, code, tmpl);
                }
            });
        }

        return result;
    },
    /**
     * 格式化日期
     * @param time
     * @param type
     * @returns {String}
     */
    dataTimeFormatter: function(time, type) {
        var self = this;

        var date;
        if (time) {
            date = new Date(Number(time));
        } else {
            date = new Date();
        }

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var second = date.getSeconds();

        switch (type) {
            case 0: // 01-05
                return self.zerofill(month) + "-" + self.zerofill(day);
            case 1: // 11:12
                return self.zerofill(hours) + ":" + self.zerofill(minutes);
            case 2: // 2015-01-05
                return year + "-" + self.zerofill(month) + "-" + self.zerofill(day);
            case 3: // 2015-01-05 11:12
                return year + "-" + self.zerofill(month) + "-" + self.zerofill(day) + " " + self.zerofill(hours) + ":" + self.zerofill(minutes);
            case 4: // 01.05
                return self.zerofill(month) + "." + self.zerofill(day);
            case 5: // 01-05 11:12
                return self.zerofill(month) + "-" + self.zerofill(day) + " " + self.zerofill(hours) + ":" + self.zerofill(minutes);
            default: // 2015-01-05 11:12:13
                return year + "-" + self.zerofill(month) + "-" + self.zerofill(day) + " " + self.zerofill(hours) + ":" + self.zerofill(minutes) + ":" + self.zerofill(second);
        }
    },
    zerofill: function(v) {
        return v >= 10 ? v : '0' + v;
    },
    /**
     * 计算距离现在时间的大小
     * @param value：具体时间
     * @param type : 使用模板 [1：个人动态，信息披露，首页] [2 ： 我的金融市场，金融市场列表，播报]
     * @returns {String}
     */
    transDiffTime: function(value, type) {
        value = value || new Date().getTime();
        var result = '';
        var now = new Date().getTime(); // 当前时间戳，单位毫秒
        var timerc = now - value;
        var day = 1000 * 60 * 60 * 24;
        var hour = 1000 * 60 * 60;
        var min = 1000 * 60;
        if (!type || type == 1) {
            if (timerc <= min * 1) {
                result = "刚刚";
            } else if (timerc > min * 1 && timerc <= min * 30) {
                result = parseInt(timerc / min) + "分钟前";
            } else if (timerc > min * 30 && timerc < min * 60) {
                result = "半个小时前";
            } else if (timerc >= hour && timerc <= hour * 10) {
                result = parseInt(timerc / hour) + "小时前";
            } else if (timerc > hour * 10 && timerc <= hour * 20) {
                result = "10个小时前";
            } else if (timerc > hour * 20 && timerc <= hour * 24) {
                result = "20个小时前";
            } else if (timerc > day && timerc <= day * 2) {
                result = "昨天";
            } else if (timerc > day * 2 && timerc <= day * 10) {
                result = parseInt(timerc / day) + "天前";
            } else if (timerc > day * 10 && timerc <= day * 15) {
                result = "半月前";
            } else if (timerc > day * 15 && timerc <= day * 30) {
                result = "1月前";
            } else if (timerc > day * 30 && timerc <= day * 30 * 12) {
                var toDate = new Date(value).Format('yyyy');
                var nowDate = new Date(value).Format('yyyy');
                if (!toDate == nowDate) {
                    result = new Date(value).Format('yyyy-MM-dd');
                } else {
                    result = new Date(value).Format('MM-dd');
                }
            } else {
                result = new Date(value).Format('yyyy-MM-dd');
            }
        }
        if (type && type == 2) {
            if (timerc <= min * 10) {
                result = "刚刚";
            } else if (timerc > min * 10 && timerc <= min * 20) {
                result = "10分钟前";
            } else if (timerc > min * 20 && timerc <= min * 30) {
                result = "20分钟前";
            } else if (timerc > min * 30 && timerc < min * 60) {
                result = "半个小时前";
            } else if (timerc >= hour && timerc <= hour * 2) {
                result = "1小时前";
            } else if (timerc > hour * 2 && timerc <= hour * 3) {
                result = "2小时前";
            } else if (timerc > hour * 3 && timerc <= hour * 5) {
                result = "3小时前";
            } else if (timerc > hour * 5 && timerc <= hour * 10) {
                result = "5小时前";
            } else if (timerc > hour * 10 && timerc <= hour * 24) {
                result = "10个小时前";
            } else if (timerc > day && timerc <= day * 2) {
                result = "昨天";
            } else if (timerc > day * 2 && timerc <= day * 3) {
                result = "前天";
            } else if (timerc > day * 3 && timerc <= day * 30 * 12) {
                var toDate = new Date(value).Format('yyyy');
                var nowDate = new Date(value).Format('yyyy');
                if (!toDate == nowDate) {
                    result = new Date(value).Format('yyyy-MM-dd');
                } else {
                    result = new Date(value).Format('MM-dd');
                }
            } else {
                result = new Date(value).Format('yyyy-MM-dd');
            }
        }
        return result;
    },
    transDiffTime2: function(value) {
        var timeagoInstance = timeago();
        value = value || new Date().getTime();
        return timeagoInstance.format(value, 'zh_CN');
    },
    /**
     * 发布话题 param 格式 ：{"groupsId":"111","groupsName":"我去也"}
     */
    publishTopic: function(obj, param) {
        if (!_uid) {
            commonUtil.login();
            return;
        }
        if (typeof(param) == "undefined" || !param) { param = {}; }
        if (typeof $.fn.topicModal === 'function') {
            return $(obj).topicModal(param);
        } else {
            commonUtil.getScript(ctxStatic + '/js/portal/groups/jquery.topic.modal.js?v=' + version, function() {
                return $(obj).topicModal(param); //传递参数
            });
        }
    },
    /**
     * 同业报价 - 快捷报价
     */
    fundQuote: function(obj) {
        if (typeof $.fn.FundSave === 'function') {
            return $(obj).FundSave();
        } else {
            commonUtil.getScript(ctxStatic + '/js/commons/modal/fund/jquery.fund.save.js?v=' + version, function() {
                return $(obj).FundSave();
            });
        }
    },
    /**
     * 同业报价 - 批量报价
     */
    fundBatchQuote: function() {
        if (typeof fundBatchModal !== 'undefined') {
            fundBatchModal.show();
        } else {
            commonUtil.getScript(ctxStatic + '/js/commons/modal/fund/jquery.fund.batch.js?v=' + version, function() {
                fundBatchModal.show();
            });
        }
    },
    /**
     * 录入交易量
     * obj{submitDate:submitDate,quoteId:quoteId,isChoose:true}
     */
    fundDeal: function(obj) {
        var param = {};
        if (obj && obj != null) {
            param.submitDate = obj.submitDate || new Date().Format("yyyy-MM-dd");
            param.quoteId = obj.quoteId;
            param.isChoose = obj.isChoose;
        }
        var self = this;
        self.auth({ column: 'fund', columnoper: 'trade' }, function() {
            if (typeof $.fn.DealModel === 'function') {
                $(this).DealModel(param || {});
            } else {
                commonUtil.getScript(ctxStatic + '/js/commons/modal/fund/jquery.fund.deal.js?v=' + version, function() {
                    $(this).DealModel(param || {});
                });
            }
        });

    },
    /**
     * 查看评价model 一般传递的是uid 查看谁的评价 就传谁的uid openAssessingModal(obj,{uid:1232});
     */
    openAssessingModal: function(obj, param) {
        if (typeof $.fn.AssesslModel === 'function') {
            $(obj).AssesslModel(param || {});
        } else {
            commonUtil.getScript(ctxStatic + '/js/commons/evaluate/fund_assessing_model.js?v=' + version, function() {
                $(obj).AssesslModel(param || {});
            });
        }
    },
    /**
     * 弹出发布需求模态框
     */
    openAddPage: function(obj, param, id) {
        if (typeof financialCommonJs !== 'undefined') {
            financialCommonJs.openAddPage(obj, param, id);
        } else {
            commonUtil.getScript(ctxStatic + '/js/portal/financial/financial_common.js?v=' + version, function() {
                financialCommonJs.openAddPage(obj, param, id);
            });
        }
    },
    msgConfig: {

    },
    msgTsUtil: {
        init: function() {
            //this.getSystemMsgCa1();
            commonUtil.msgTsUtil.getSystemMsgCa2();
            commonUtil.msgTsUtil.getNewMsgCount2();
        },
        switchParam: {
            switch1: false,
            switch1: false,
        },
        getSystemMsgCa1: function() {
            //获取消息配置 系统分类
            commonUtil.xhr('/user/message/listMsgType.shtml').done(function(result) {
                if (result.code = "200") {
                    if (result.data) {
                        var arrayItem = result.data;
                        //添加设置
                        for (var i = 0; i < arrayItem.length; i++) {
                            commonUtil.msgConfig[arrayItem[i].msgCategory] = arrayItem[i].name;
                        }
                        commonUtil.msgTsUtil.switchParam.switch1 = true;
                        //----------------
                        if (commonUtil.msgTsUtil.switchParam.switch1 && commonUtil.msgTsUtil.switchParam.switch2) {
                            commonUtil.msgTsUtil.getNewMsgCount();
                        }
                        //------------end---
                    }
                }
            }).fail(function(e) {
                commonUtil.msg.error('提示', '系统异常');
            });
        },
        getSystemMsgCa2: function() {
            //消息分类
            commonUtil.xhr('/user/message/listMsgType.shtml').done(function(result) {
                if (result.code = "200") {
                    if (result.data) {
                        var arrayItem = result.data;
                        //添加设置
                        for (var i = 0; i < arrayItem.length; i++) {
                            commonUtil.msgConfig[arrayItem[i].msgCategory] = arrayItem[i].name;
                        }
                        console.info(commonUtil.msgConfig);
                        commonUtil.msgTsUtil.getNewMsgCount();
                    }
                }
            }).fail(function(e) {
                commonUtil.msg.error('提示', '系统异常');
            });
        },
        getNewMsgCount2: function() {
            commonUtil.xhr('/user/message/getNewsMessageCount.shtml').done(function(result) {
                if (result.code = "200") {
                    if (result.data && result.data.newsMsgList) {
                        var arrUnReadArr = result.data.newsMsgList;
                        $(".remind2 span").text(result.data.sumCount)
                        if (result.data.sumCount > 0) {
                            $(".remind .remind2").show();
                            $(".remind .remind2 span").show();
                        } else {
                            $(".remind .remind2").hide();
                            $(".remind .remind2 span").hide();
                        }
                    }
                }
            }).fail(function(e) {
                commonUtil.msg.error('提示', '系统异常');
            });
        },
        getNewMsgCount: function() {
            $("#msgDivTip div").remove();
            commonUtil.xhr('/user/message/getNewsMessageCount.shtml').done(function(result) {
                if (result.code = "200") {
                    if (result.data && result.data.newsMsgList) {
                        var arrUnReadArr = result.data.newsMsgList;
                        for (var i = 0; i < arrUnReadArr.length; i++) {
                            if (arrUnReadArr[i].sumCount == 0) {
                                continue;
                            }
                            var divItem = '<div class="item" data-code="' + arrUnReadArr[i].msgCategory + '"><a style="color:#333" href="' + ctx + '/user/home/myIndex.shtml?code=message&categoryCode=' + arrUnReadArr[i].msgCategory + '"><span class="sort">' + commonUtil.msgConfig[arrUnReadArr[i].msgCategory] + '</span><span class="num red">' + arrUnReadArr[i].sumCount + '</span></a></div>';
                            $("#msgDivTip").append(divItem);
                        }
                        $("#msgDivTip .item").unbind("click").click(function() {
                            commonUtil.xhr('/user/message/setMsgStatus.shtml', { msgCategory: $(this).attr('data-code') }).done(function(result) {
                                $(this).remove();
                                if (result.code != "200") {
                                    commonUtil.msg.success('提示', result.msg);
                                }
                            }).fail(function(e) {
                                commonUtil.msg.error('提示', '系统异常');
                            });
                        });
                    }
                }
            }).fail(function(e) {
                commonUtil.msg.error('提示', '系统异常');
            });
        }
    },
    /**
     * 对url进行编码
     */
    encodeUrl: function(url) {
        return encodeURIComponent(encodeURIComponent(url));
    }
};
/**
 * 消息推送过来的数据
 * @param message
 */
function showMessageCenter(message) {
    if (message.header && message.header.modelType == "xxzx") {

        if (message.header.receiverType && message.header.receiverType == "qtqbry") {
            commonUtil.xhr('/user/message/reflashMsg.shtml').done(function(result) {
                if (result.code = "200") {} else {
                    commonUtil.msg.success('提示', result.msg);
                }
            }).fail(function(e) {
                commonUtil.msg.error('提示', '系统异常');
            });
        }
        var bodyObj = JSON.parse(message.body);
        var sumcount = $(".remind .remind2 span").text();
        sumcount = parseFloat(sumcount) + 1;
        $(".remind .remind2").show();
        $(".remind .remind2 span").show();
        $(".remind .remind2 span").text(sumcount);
        if ($("#msgDivTip .item[data-code=" + bodyObj.msgCategory + "]").length <= 0) {
            var divItem = '<div class="item" data-code="' + bodyObj.msgCategory + '"><a style="color:#333" href="' + ctx + '/user/home/myIndex.shtml?code=message&categoryCode=' + bodyObj.msgCategory + '"><span class="sort">' + bodyObj.msgCategoryName + '</span><span class="num red">1</span></a></div>';
            $("#msgDivTip").prepend(divItem);
        } else {
            var num = $("#msgDivTip .item[data-code=" + bodyObj.msgCategory + "]").find("span.num").text();
            num = parseFloat(num) + 1;
            $("#msgDivTip .item[data-code=" + bodyObj.msgCategory + "]").find("span.num").text(num);
            var itemObj = $("#msgDivTip .item[data-code=" + bodyObj.msgCategory + "]");
            $("#msgDivTip .item[data-code=" + bodyObj.msgCategory + "]").remove();
            $("#msgDivTip").prepend(itemObj);
        }
        if ($("li.msgItem[data-code='" + bodyObj.msgCategory + "']").length > 0) {
            var itemCount = $("li.msgItem[data-code='" + bodyObj.msgCategory + "']").find("span.num").text();
            itemCount = parseFloat(itemCount) + 1;
            $("li.msgItem[data-code='" + bodyObj.msgCategory + "']").find("span.num").text(itemCount);
            $("li.msgItem[data-code='" + bodyObj.msgCategory + "']").find("span.num").css({ "display": "inline-block" });
        }

    }
}
//获取用户信息
$(function() {
    commonUtil.getLoginInfo();
    _uid = commonUtil.loginUser.uid;
    _uname = !!commonUtil.loginUser.uid ? commonUtil.loginUser.userName : "";
    _instName = !!commonUtil.loginUser.uid ? commonUtil.loginUser.instName : "";
    _userType = !!commonUtil.loginUser.uid ? commonUtil.loginUser.userType.typeValue : "";
    _auditStatus = !!commonUtil.loginUser.uid ? commonUtil.loginUser.auditStatus : "";
    _userPhone = !!commonUtil.loginUser.uid ? commonUtil.loginUser.mphone : "";
});

//判断是否是IE浏览器，包括Edge浏览器  
function IEVersion() {
    var ua = navigator.userAgent.toLowerCase();
    var rMsie = /(msie\s|trident\/7)([\w.]+)/;
    var rTrident = /(trident)\/([\w.]+)/;
    var matchBS = rMsie.exec(ua);
    if (matchBS != null) {
        matchBS2 = rTrident.exec(ua);
        if (matchBS2 != null) {
            switch (matchBS2[2]) {
                case "4.0":
                    return 'msie/8';
                    break;
                case "5.0":
                    return 'msie/9';
                    break;
                case "6.0":
                    return 'msie/10';
                    break;
                case "7.0":
                    return 'msie/11';
                    break;
                default:
                    return '';
            }
        } else
            return 'msie/' + matchBS[2];
    } else {
        return '';
    }
}


/**
 * 获取用户的总金币数量
 */
function getSumGoldCount() {
    commonUtil.xhr('/user/coins/total.shtml', {}, 'GET').done(function(result) {
        if ("success" == result.statue) {
            var obj = result.data;
            $("#totalCoins").html(obj / 10000);
            $("#goldTotal").html(obj / 10000 + "万");
        }
    });
}

/**
 * 获取当前用户未读消息总数
 */
function unReadUserMessage() {
    commonUtil.xhr('/user/message/count.shtml', {}, 'GET').done(function(result) {
        if ("success" == result.statue) {
            var count = result.count;
            $("#unReadMsgCount").html(count);
            if (count && count > 0) {
                $(".remind2 > span").html(count).show();
                $(".massage-number").html(count);
                $(".massage-number").show();
                $(".fa-bell-o").removeClass('tgold').addClass('tgold');
            } else {
                $(".remind2").hide();
                $(".remind .remind2 span").hide();
                $(".massage-number").hide();
                $(".fa-bell-o").removeClass('tgold').addClass('tgrey');
            }

        }
    });
}

/**
 * 实时更新用户数据显示
 */
function updateUserInfo() {
    commonUtil.xhr('/user/home/userinfo.shtml', {}, 'GET').done(function(result) {
        if ("success" == result.statue) {
            if (!!result.opInfo && !!result.opInfo.avatar) {
                $("#picAvatar").attr({ "src": download_urlImg + result.opInfo.avatar });
                $("#xxim_onlinetex > img, .user-headLogo").attr("src", download_urlImg + result.opInfo.avatar);
            }
        }
    });
}

/**
 * 新增西金币动画效果
 */
function addGoldAnimation() {
    var offset = $('#goldTotal').offset();
    var flyer = $('<img style="z-index: 2000;" class="u-flyer" src="' + ctxStatic + '/img/commons/coin.png"/>');
    flyer.fly({
        count: 10,
        speed: 0.5,
        start: {
            left: $(window).width() / 2,
            top: $(window).height() / 2 + $(document).scrollTop(),
            width: 80,
            height: 80
        },
        end: {
            left: offset.left,
            top: offset.top,
            width: 20,
            height: 20
        },
        onEnd: function() {
            this.destory(); //移除dom 
            getSumGoldCount();
        }
    });
}

/**
 * 新增西金币动画效果
 */
function addGoldAnimationNew(fromObj, toObj, callback) {
    if (!fromObj || !toObj) {
        return;
    }

    var fromOffset = $(fromObj).offset();
    var toOffset = $(toObj).offset();

    var flyer = $('<img style="z-index: 2000;" class="u-flyer" src="' + ctxStatic + '/img/commons/coin.png"/>');
    flyer.fly({
        count: 10,
        speed: 1,
        start: {
            left: fromOffset.left,
            top: fromOffset.top,
            width: 80,
            height: 80
        },
        end: {
            left: toOffset.left + 20,
            top: toOffset.top + 10,
            width: 20,
            height: 20
        },
        onEnd: function() {
            this.destory(); //移除dom 
            getSumGoldCount();

            if (typeof callback === 'function') {
                callback();
            }
        }
    });
}

/**
 * 选中频道样式
 */
function chooseMenuStyle() {
    var menu = "";
    var pathname = window.location.pathname;
    pathname = pathname.replace(ctx, '');
    var split = pathname.split("/");

    if (pathname.indexOf("/") != -1) {
        if ("" == split[1]) {
            menu = "index";
        } else {
            menu = split[1];
        }
    }

    if (pathname.indexOf("/unlogin/newfinancial/index.shtml") >= 0) {
        menu = "newfinancial";
    } else if (pathname.indexOf("/unlogin/fund.shtml") >= 0) {
        menu = "fund";
    } else if (pathname.indexOf("/user/home/myIndex.shtml") != -1) {
        menu = "user";
    }

    //if("userclub" == menu) {
    //	if(split.length >= 4) {
    //		menu = split[3].split(".")[0];
    //	} else {
    //		menu = "index";
    //	}

    //	$(".nav-List li[data-column='"+ menu +"'] a").addClass("nav-List-curr-menu").css({"color":"#ff3358","border-bottom":"none"});
    //	$(".nav-List li[data-column='"+ menu +"'] a").addClass("nav-List-curr-menu").siblings("p").css({"width":"100%"});
    //} else {
    //	$(".navbar-nav li[data-column='"+ menu +"'] > a").addClass("current-title").siblings().removeClass("current-title");
    //	$(".navbar-nav li[data-column='"+ menu +"'] > .nav-line").css("width","100%");
    //}
}
/**
 * 针对IE8 9 设置的map方法
 */
function addMapForIE() {
    if (!Array.prototype.map) {
        Array.prototype.map = function(callback, thisArg) {
            var T,
                A,
                k;
            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function");
            }
            if (thisArg) {
                T = thisArg;
            }
            A = new Array(len);
            k = 0;
            while (k < len) {

                var kValue,
                    mappedValue;
                if (k in O) {
                    kValue = O[k];
                    mappedValue = callback.call(T, kValue, k, O);
                    A[k] = mappedValue;
                }
                k++;
            }
            return A;
        };
    }
}
$(function() {
    chooseMenuStyle();
    addMapForIE();
    // ajax全局设置
    $.ajaxSetup({
        cache: true,
        complete: function(XMLHttpRequest, textStatus) {
            var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，  
            if (sessionstatus == "timeout") {
                //如果超时就处理 ，指定要跳转的页面  
                window.location.replace(ctx + "/login.shtml");
            }
            var rspJson = XMLHttpRequest.responseJSON;
            if (rspJson && rspJson.code == '300') {
                commonUtil.login();
                return;
            }

            // 权限校验返回提示
            var authstatue = XMLHttpRequest.getResponseHeader("authstatue"); //通过XMLHttpRequest取得响应头，authstatue，  
            if (authstatue == "false") {
                var result = XMLHttpRequest.responseJSON;
                if (!result) {
                    result = JSON.parse(XMLHttpRequest.responseText);
                }
                var code = result.code;

                if (code == "300") {
                    commonUtil.login();
                } else if (code == "400") {
                    if (!commonUtil.isModalShow) {
                        commonUtil.isModalShow = true;
                        commonUtil.tips({
                            content: result.msg,
                            contentExt: '相关咨询，请联系客服 <span style=\"color:#ff3358;\">support@xbfax.com</span>'
                        });
                    }
                } else {
                    if (!commonUtil.isModalShow) {
                        commonUtil.isModalShow = true;
                        commonUtil.tips({
                            content: result.msg,
                            contentExt: result.msgext || '相关咨询，请联系客服 <span style=\"color:#ff3358;\">support@xbfax.com</span>'
                        });
                    }
                }
            }
        }
    });

    // 检查浏览器类型和版本
    commonUtil.browserVersionTips();

    // 如果用户已登录
    if (!!_uid && _auditStatus == 'SUCCESS') {
        // 获取用户西金币总数
        getSumGoldCount();

        // 获取当前用户未读消息总数
        // unReadUserMessage();
        commonUtil.msgTsUtil.init();

        // 更新用户头像
        updateUserInfo();
    }

    $("#goldTotal").on('click', function() {
        window.location.href = ctx + '/user/home/myIndex.shtml?code=coins';
    });

    $(".avatar > .viplevel").on('click', function() {
        window.location.href = ctx + '/user/home/myIndex.shtml';
    });

    $(document).on('click', '.authcheck', function(event) {
        event.stopPropagation();

        var authresult = false;

        var obj = this;
        // 校验是否拥有某项权限
        commonUtil.authcheck(obj, function() {
            authresult = true;
        });

        return authresult;
    });
});

//广告
$(function() {
    commonUtil.ad($('#msg-banner'));
});

/**
 * 数字运算工具
 */
var numUtil = {
    /**
     * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
     * 
     * @param num1加数1 | num2加数2
     */
    add: function(num1, num2) {
        var baseNum, baseNum1, baseNum2;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return (num1 * baseNum + num2 * baseNum) / baseNum;
    },
    /**
     * 减法运算，避免数据相减小数点后产生多位数和计算精度损失。
     * 
     * @param num1被减数  |  num2减数
     */
    sub: function(num1, num2) {
        var baseNum, baseNum1, baseNum2;
        var precision; // 精度
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
        return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
    },
    /**
     * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
     * 
     * @param num1被乘数 | num2乘数
     */
    multi: function(num1, num2) {
        var baseNum = 0;
        try {
            baseNum += num1.toString().split(".")[1].length;
        } catch (e) {}
        try {
            baseNum += num2.toString().split(".")[1].length;
        } catch (e) {}
        return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
    },
    /**
     * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
     * 
     * @param num1被除数 | num2除数
     */
    div: function(num1, num2) {
        var baseNum1 = 0,
            baseNum2 = 0;
        var baseNum3, baseNum4;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        with(Math) {
            baseNum3 = Number(num1.toString().replace(".", ""));
            baseNum4 = Number(num2.toString().replace(".", ""));
            return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
        }
    },
};

function authMenu(obj) {
    var parent = $(obj).parent();
    var colum = parent.attr("data-column");

    var param = { column: colum, columnoper: 'view' };

    if (colum == 'newfinancial') {
        commonUtil.xhr('/auth/index.shtml', param, 'GET', false).done(function(result) {
            if (result.code == '200') {
                window.location.href = ctx + '/newfinancial/index.shtml';
            } else if (result.code == '300') {
                window.location.href = ctx + '/unlogin/newfinancial/index.shtml';
            } else {
                commonUtil.tips({
                    content: result.msg,
                    contentExt: result.msgext
                });
            }
        });
    }

}