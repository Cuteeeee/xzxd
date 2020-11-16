/**
 * @file 金融市场未登录页
 * @depend 前置依赖：Jquery、bootstrap-dialog
 * @author zhenghf(zhenghf@xbfax.com)
 * @date 2017-06-08
 * @version 1.0
 */
;(function($, window, document, undefined){
	//定义FinancialUnlogin的构造函数
    var FinancialUnlogin = function(ele, opt) {
        this.that = ele,
        this.defaults = {},
        this.options = $.extend({}, this.defaults, opt)
    }
    
    //定义FinancialUnlogin的方法
    FinancialUnlogin.prototype = {
		/**
		 * 初始化
		 */
		init: function () {
			var self = this;
			new WOW().init();
			// 声明事件
			self.initEvent();
			// 加载数据
			self.getStatisticData();
		},
		/**
		 * 声明事件
		 */
		initEvent: function () {
			$(".goIndex, #rzxxTotal, #tzxxTotal, #ssgsTotal, #orderTotal, .pintroduct-dl > div").on('click', function () {
				commonUtil.auth({column: 'newfinancial',columnoper: 'view'}, function () {
					window.location.href = ctx + '/newfinancial/index.shtml';
				});
			});
		},
		/**
		 * 获取统计数据
		 */
		getStatisticData: function () {
			var self = this;
			
			commonUtil.xhr('/unlogin/newfinancial/statistic.shtml').done(function (rsp) {
				if ("200" == rsp.code) {
					if (rsp.data.success) {
						var rspData = rsp.data;
						// 融资项目总笔数
						$("#rzxxTotal", self.that).html(rspData.rzCount || '--');
						// 投资项目总笔数
						$("#tzxxTotal", self.that).html(rspData.tzCount || '--');
						// 投资项目总笔数
						$("#ssgsTotal", self.that).html(rspData.ssgsCount || '--');
						// 约单总金额
						$("#orderTotal", self.that).html(rspData.amount || '--');
					}
				}
			});
		}
    }
    
    //在插件中使用FinancialUnlogin对象
    $.fn.FinancialUnlogin = function(options) {
        //创建FinancialUnlogin的实体
        var financialUnlogin = new FinancialUnlogin(this, options);
    	//调用其方法
        financialUnlogin.init();
        return financialUnlogin;
    };
    
    // 页面加载完成后调用
    $("#financialUnloginPage").FinancialUnlogin();
})(jQuery, window, document);
