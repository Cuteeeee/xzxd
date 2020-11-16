/**
 * @file 分享插件
 * @depend 前置依赖：Jquery
 * @author zhenghf(zhenghf@xbfax.com)
 * @date 2017-05-16
 * @version 1.0
 */
;(function($, window, document, undefined){
	//定义Share的构造函数
    var Share = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
        	host: function () {
        		var protocol = window.location.protocol;
    			var host = window.location.host;
    			return protocol + "//" + host;
        	},
        	desc: '',
    		url: '',
            title: '',
            content: '',
            pic: ''
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    
    //定义Share的方法
    Share.prototype = {
    	/**
    	 * 初始化
    	 */
		init: function () {
			var self = this;
			
			self.options.url = self.options.host() + $(self.$element).attr("data-url");
			self.options.title = $(self.$element).attr("data-title");
			self.options.content = $(self.$element).attr("data-text");
			self.options.pic = $(self.$element).attr("data-pic") || "";
			
			$(".shareLink", self.$element).unbind("click").on("click", function(){
				self.share($(this).attr("data-value"));
			});
		},
		/**
    	 * 各个平台分享接口链接
    	 */
		api: {
			// QQ空间
			qZone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?desc={desc}&title={title}&url={url}&pics={pic}&summary={content}&site=',
			// QQ
			qq: 'http://connect.qq.com/widget/shareqq/index.html?url={url}&title={title}&pics={pic}&summary={content}',
			// 新浪微博
			sina: 'http://service.weibo.com/share/share.php?url={url}&title={title}，{content}&pic={pic}&searchPic=false',
			// 腾讯微博
			txweibo: 'http://share.v.t.qq.com/index.php?c=share&a=index&url=&title={title}{url}',
			// 豆瓣
			douban: 'https://www.douban.com/share/service?href={url}&name={title}&text={content}&image={pic}'
		},
		/**
    	 * 替换变量
    	 */
		replaceAPI: function (api) {
			var self = this;
			api = api.replace(new RegExp("{url}","gm"), self.options.url);
			api = api.replace(new RegExp("{title}","gm"), self.options.title);
			api = api.replace(new RegExp("{content}","gm"), self.options.content);
			api = api.replace(new RegExp("{pic}","gm"), self.options.pic);
			api = api.replace(new RegExp("{desc}","gm"), self.options.desc);
			return api;
		},
		/**
    	 * 弹出分享窗口
    	 */
		share: function (type) {
			var self = this;
			
			if (type=='weixin') {
				self.weixinShare();
			} else {
				window.open(self.replaceAPI(self.api[type]));
			}
		},
		/**
    	 * 微信分享
    	 */
		weixinShare: function () {
			var self = this;
			$(".qrcode").hide();
			
			if ($(".qrcode", self.$element).length > 0) {
				$(".qrcode", self.$element).show();
				return;
			}
			
			var w = $('.bds_weixin', self.$element).attr("data-width");
			if (!w) {
				w = 160;
			} else {
				w = new Number(w);
			}
			var position = $('.bds_weixin', self.$element).position();
			var pLeft = (position.left+8)-(w+80)/2;
			var pTop = position.top+20;
			$(self.$element).append('\
				<div class="qrcode bd_weixin_popup" style="left: '+pLeft+'px; top: '+pTop+'px; width: '+(w+80)+'px; height: '+(w+115)+'px;">\
					<div class="bd_weixin_popup_head">\
						<span>分享到微信朋友圈</span>\
						<a href="#" onclick="return false;" class="bd_weixin_popup_close">×</a>\
					</div>\
					<div id="bdshare_weixin_qrcode_dialog_qr" class="bd_weixin_popup_main"></div>\
					<div class="bd_weixin_popup_foot">打开微信，点击底部的“发现”，<br>使用“扫一扫”即可将网页分享至朋友圈。</div>\
				</div>\
			');
			
			$(".qrcode .bd_weixin_popup_close", self.$element).off("click").on("click", function () {
				$(".qrcode", self.$element).hide();
			});
			
			commonUtil.getScript(ctxStatic + '/js/commons/jquery-qrcode.min.js', function () {
				$(".qrcode .bd_weixin_popup_main", self.$element).qrcode({
					size: w,
					text: self.options.url
				});
			});
		}
    }
    
    //在插件中使用Share对象
    $.fn.Share = function(options) {
        //创建Share的实体
        var share = new Share(this, options);
        //调用其方法
        share.init();
        return share;
    }
})(jQuery, window, document);