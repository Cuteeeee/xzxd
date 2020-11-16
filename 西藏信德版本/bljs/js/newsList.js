/**
 * @file 信息披露列表页Js
 * @author zhenghf(zhenghf@xbfax.com)
 * @date 2016-12-29
 * @version 1.0
 */
var newsListJs = {
	// 页面容器
	that: undefined,
	params: {
		code: 'news',
		isParent: 'true',
		page: 1, 
		rows: 10
	},
	// 初始化入口
	init: function(that, params) {
		// 容器
		this.that = $(that);
		
		this.params = $.extend({}, this.params, params);
		
		// 初始化模板
		this.initTmpl();
		
		// 注册事件
		this.initEvent();
		
		// 初始化数据
		this.initData();
	},
	/**
	 * 注册事件
	 */
	initEvent: function() {
		var self = this;

		$(self.that).on('click', '.msg-list-left > ul > li', function() {
			var li = $(this);
			$(".msg-list-left > ul > li", self.that).removeClass("active")
			$(li).addClass("active");
			$(".msg-list-title", self.that).html($("span", li).text());
			
			var code = $(li).attr('data-code');
			var isparent = $(li).attr('data-isparent');
			
			self.params.code = code;
			self.params.isParent = isparent;

			self.getData();
		});
	},
	/**
	 * 初始化数据
	 */
	initData: function() {
		var self = this;
		
		$('.msg-list-left > ul > li.active', self.that).click();
	},
	/**
	 * 查询数据列表
	 * 
	 * @param pageNum 页码
	 */
	getData: function(pageNum) {
		var self = this;
		self.params.page = pageNum || 1;
		
		newsCommonJs.getInfosByChannelCode(self.params.code, self.params, function(result) {
    		if(result.statue == 'success') {
    			$(".msg-list-right > ul").empty();
    			$(".no-content").show();
    			$("#pagination").hide();
    			
    			var rsp = result.rsp;
    			if(!!rsp && !!rsp.list && rsp.list.length > 0) {
    				$(".msg-list-right > ul").append($.tmpl("news", rsp.list));
    				$(".no-content").hide();
        			$("#pagination").show();
        			self.initPagination(self.params.page, rsp.lastPageNumber);
    			}
    			
    			// 分享插件
    			$('.bdsharebuttonbox', self.that).each(function () {
    				$(this).Share();
    			});
    		}
    	});
	},
	/**
	 * 初始化分页控件
	 * 
	 * @param currentPage 当前页，不传则为1
	 * @param totalPage 总页数，不传则为1
	 */
	initPagination: function(currentPage, totalPage) {
		var self = this;
		
		if(!currentPage) {
			currentPage = 1;
		}
		
		if(!totalPage) {
			totalPage = 1;
		}
		
		$('#pagination ul', self.that).remove();
		$('#pagination > div', self.that).html("<ul class=\"pagination-sm\"></ul>");
		
		$('#pagination ul', self.that).twbsPagination({
			totalPages : totalPage,
			initiateStartPageClick: false,
			version : '1.0',
			startPage : currentPage,
			onPageClick: function(event, page) {
				self.getData(page);
			}
		});
	},
	/**
	 * 初始化模板
	 */
	initTmpl: function() {
		$.template("news", this.tmpl.news);
	},
	tmpl: {
		/*** 模板 ***/
		news: '\
			<li class="item">\
				<div class="item-head">\
					<div class="news-tag">${columnCode}</div>\
					<span class="a"><a target="_blank" href="${ctx}/news/${id}.shtml">${title}</a></span>\
				</div>\
				<div class="item-content">\
					{{if summary=="" || summary==null}}\
						<a target="_blank" href="${ctx }/news/${id}.shtml">查看详情</a>\
					{{else}}\
						{{if summary=="refuseView"}}\
							<span></span>\
						{{else}}\
							<span>${summary}</span>\
						{{/if}}\
						<br/><a target="_blank" href="${ctx }/news/${id}.shtml">查看详情</a>\
					{{/if}}\
				</div>\
				<p class="date">\
					{{if docSource}}<span>来源：${docSource}</span>{{/if}}\
					<span>{{html commonUtil.transDiffTime(updateTime)}}</span>\
				</p>\
			</li>\
		'
	}
};