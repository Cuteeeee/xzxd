/**
 * @file 提示模态框
 * @depend 前置依赖：Jquery、bootstrap-dialog
 * @author 
 * @date 2017-12-06
 * @version 1.0
 */
;(function($, window, document, undefined){
	//定义PlugTooltip的构造函数
    var PlugAssetsDialog = function(ele, opt) {
        this.$element = ele,
        this.that = undefined,
        this.dialog = undefined,
        this.defaults = {
        	title: '友情提示', /* 标题 */
        	content: '是否要删除该条记录?', /* 提示内容 */
        	callback: function() {}  /* 回调函数 */
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    
    //定义PlugConfirmDialog的方法
    PlugAssetsDialog.prototype = {
		/**
		 * 显示模态框
		 */
		show: function() {
			var self = this;
			
			// 初始化模板
			self.initTmpl();	
			// 容器
			self.that = $('<div></div>');
			// 页面布局
			$(self.that).html($.tmpl('assetsConfirmdialog', self.options));
			// 动态加载css文件
			commonUtil.loadCss(ctxStatic +"/css/commons/modal.css?v=2016112804", self.that);
			
			self.dialog = new BootstrapDialog({
			    message: $(self.that).html(),
			    closable: false,
			    onshown: function() {
			    	// 如果是ie浏览器，延迟500毫秒初始化
			    	if(commonUtil.checkBrowser().indexOf('msie') > -1) {
			    		setTimeout(function() {
				    		self.init();
				    	}, 500);
			    	} else {
				    	self.init();
			    	}
			    },
			    onhidden: function() {
			    	commonUtil.isModalShow = false;
			    },
			    data: {}
			});
			self.dialog.realize();
			self.dialog.getModalHeader().hide();
			self.dialog.getModalFooter().hide();
			self.dialog.getModal().css({'top': '0'}).removeAttr("tabIndex");
			self.dialog.getModalDialog().css({'width': '500px', "margin": "0 auto", "margin-top":($(window).height()-400)/2});
			self.dialog.getModalBody().css({'padding': '0'});
			self.dialog.open();
		},
		/**
		 * 隐藏模态框
		 */
		hide: function() {
			this.dialog.close();
		},
		/**
		 * 初始化
		 */
		init: function() {
			var self = this;
			
			$('.okbtn').on('click', function() {
				$('#assetsCodeForm').bootstrapValidator('validate');
				var valid = $("#assetsCodeForm").data('bootstrapValidator');
				if(valid && valid.isValid()){
					if(typeof self.options.callback === 'function') {
						self.options.callback(self.options);
					}
					self.hide();
				}
			});
			
			$(self.that).on('click', '.cancelbtn', function() {
				self.hide();
			});
			
			var time = self.options.time;
			if (time > 0) {
				setTimeout(function () {
					self.hide();
				}, time);
			}
		},
		/**
		 * 初始化模板
		 */
		initTmpl: function() {
			// 操作受限提示模板
			$.template("assetsConfirmdialog", this.tmpl.assetsConfirmdialog);
		},
		/**
		 * 模板
		 */
		tmpl: {
			// 布局模板
			assetsConfirmdialog: '\
				<div class="modal-header">\
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">\
					<span>&times;</span>\
				</button>\
				<h4 class="modal-title" id="myModalLabel">${title}</h4>\
			</div>\
			<form id="assetsCodeForm">\
				<div class="modal-body mbodys clearfix orderModal form-group" style="padding-left: 20px;padding-top: 20px;text-align:center;">\
					<div class="t14 shuoming" style="text-align:center">\
						${content}<input name="code" type="text" value="" data-bv-notempty data-bv-notempty-message="该字段不能为空" data-bv-stringlength="true" data-bv-stringlength-max="30" data-bv-stringlength-message="长度超过30"/>\
					</div>\
				</div>\
				<div class="modal-footer">\
					<button type="button" class="btn btn-primary okbtn">确认</button>\
					<button type="button" class="btn btn-default cancelbtn" data-dismiss="modal">取消</button>\
				</div>\
			</form>\
			'
		}
    }
    
    //在插件中使用PlugTooltip对象
    $.fn.PlugAssetsDialog = function(options) {
        //创建PlugTooltip的实体
        var plugAssetsDialog = new PlugAssetsDialog(this, options);
        //调用其方法
        plugAssetsDialog.show();
        return plugAssetsDialog;
    }
})(jQuery, window, document);