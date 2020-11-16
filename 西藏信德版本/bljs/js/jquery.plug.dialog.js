/**
 * @file Dialog公共插件
 * @depend 前置依赖：Jquery
 * @author zhenghf(zhenghf@xbfax.com)
 * @date 2017-05-22
 * @version 1.0
 */
;(function($, window, document, undefined){
	//定义Dialog的构造函数
    var Dialog = function(ele, opt) {
        this.that = ele;
        this.defaults = {
        	id: '',
        	title: 'Dialog', /* 模态框标题 */
        	deac: '', /* 模态框说明 */
        	css: [],
        	showHeader: true,
        	onshown: undefined,
        	onhidden: undefined
        };
        this.options = $.extend({}, this.defaults, opt);
        this.dialog;
    }
    
    //定义Dialog的方法
    Dialog.prototype = {
		/**
		 * 显示模态框
		 */
		show: function() {
			var self = this;
			
			// 加载基本布局
			self.initTmpl();
			self.that = $('<div id="'+ self.options.id +'"></div>').html($.tmpl('xbfax.plug.dialog.layout', self.options));
			self.loading();
			
			// 加载css文件
			var cssFile = self.options.css;
			if ($.isArray(cssFile) && cssFile.length > 0) {
				$.each(cssFile, function (inc, c) {
					commonUtil.loadCss(c + '?v=' + version);
				});
			}
			
			self.dialog = new BootstrapDialog({
			    message: $(self.that),
			    closable: false,
			    onshown: function () {
			    	if (typeof self.options.onshown === 'function') {
			    		self.options.onshown(self.that);
			    	}
			    },
			    onhidden: function () {
			    	if (typeof self.options.onhidden === 'function') {
			    		self.options.onhidden();
			    	}
			    },
			    data: {}
			});
			self.dialog.realize();
			self.dialog.getModalHeader().hide();
			self.dialog.getModalFooter().hide();
			self.dialog.getModal().css({'top': '0'}).removeAttr("tabIndex");
			self.dialog.open();
		},
		/**
		 * 关闭模态框
		 */
		close: function () {
			this.dialog.close();
		},
		/**
		 * 加载中效果
		 */
		loading: function () {
			$(".modal-body", this.that).hide();
			commonUtil.loadCss(ctxStatic + '/css/commons/loading/loaders.css', this.that);	//加载中的样式
			$(".modal-header", this.that).after('\
				<div class="slice">\
			      <div data-loader="circle-side" style="margin-left:80px"></div>\
				  <p style="text-align:center">正在加载中 请稍等...</p>\
			    </div>\
			');
		},
		/**
		 * 清除加载中效果
		 */
		clearLoading: function () {
			$(this.that).children(".slice").remove();
			$(this.that).children(".modal-body").show();
		},
		/**
		 * 初始化模板
		 */
		initTmpl: function () {
			$.template("xbfax.plug.dialog.layout", this.tmpl);
		},
		/**
		 * 模板
		 */
		tmpl: '\
			<div class="modal-header"{{if !showHeader}} style="display: none;"{{/if}}>\
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span>&times;</span></button>\
				<h4 class="modal-title">${title}</h4>\
			</div>\
			<div class="modal-body"></div>\
		'
    }
    
    //在插件中使用Dialog对象
    $.fn.Dialog = function(options) {
        //创建Dialog的实体
        var dialogObj = new Dialog(this, options);
        //调用其方法
        dialogObj.show();
        return dialogObj;
    }
})(jQuery, window, document);