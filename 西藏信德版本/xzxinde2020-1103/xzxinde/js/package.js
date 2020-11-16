// 
/**
 * @file 用户中心统一表格工具
 * @author zhenghf(zhenghf@xbfax.com)
 */

var gridParam = {};

/**
 * 初始化表格grid
 * 
 * @param id 表格id
 * @param url ajax请求的服务器地址
 * @param param ajax请求的参数
 * @param formatters 字段格式化对象
 * @param selection 是否可选
 * @param multiSelect 是否可多选
 * @param rowSelect 是否可单选
 * @param keepSelection
 * @param navigation 0：不显示头部和尾部，1：显示头部，2：显示尾部，3：显示头部和尾部
 */

function initGrid (id, url, param, formatters, selection, multiSelect, rowSelect, keepSelection, navigation) {
	gridParam = param;
	if (undefined == navigation) {
		navigation = 2;
	}
	$("#"+id).bootgrid({
		navigation: navigation,
		ajax: true,
		post: function () {
			return gridParam;
		},
		url: url,
		selection: selection,
		multiSelect: multiSelect,
		rowSelect: rowSelect,
	    keepSelection: keepSelection,
		formatters: formatters,
		labels: {
	        noResults: "不好意思哦，这里暂时没有内容哦"
	    },
		sorting: false
	}).on("load.rs.jquery.bootgrid", function(e) {
		ShowBlockUI('#rightloading');
	}).on("loaded.rs.jquery.bootgrid", function(e) {
		setTimeout(function(){
			$('#rightloading').unblock();
		}, 500);
	    var totalRowCount = $("#"+id).bootgrid("getTotalRowCount");
	    if (!totalRowCount || 0 >= totalRowCount) {
	    	$("#"+id).hide(); // 隐藏表格主体
	    	$("#"+id+"-footer").hide(); // 隐藏表格底部（分页栏）
	    	$("#"+id+"_noResultDiv").remove(); // 清空无数据div
	    	$("#"+id).after(noResultDiv(id));
	    	// 如果需要显示数据总数，则显示
	    	if (0 < $("#"+id+"_totalRowCount").length) {
	    		$("#"+id+"_totalRowCount").html("（0）");
	    	}
	    } else {
	    	$("#"+id+"_noResultDiv").remove(); // 清空无数据div
	    	$("#"+id).show(); // 显示表格主体
	    	$("#"+id+"-footer").show(); // 显示表格底部（分页栏）
	    	
	    	// 如果需要显示数据总数，则显示
	    	if (0 < $("#"+id+"_totalRowCount").length) {
	    		$("#"+id+"_totalRowCount").html("（"+totalRowCount+"）");
	    	}
	    }
	    
	    // 数据加载完毕后扩展操作
	    loadedExtEvent(id, totalRowCount);
	});
}
/**
  初始化表格
*/
function initGridSearch (id, url, param, nodatatitle,formatters, selection, multiSelect, rowSelect, keepSelection, navigation) {
	nodatatitle=nodatatitle||'暂无数据';
	gridParam = param;
	if (undefined == navigation) {
		navigation = 2;
	}
	$("#"+id).bootgrid({
		navigation: navigation,
		ajax: true,
		post: function () {
			return gridParam;
		},
		url: url,
		selection: selection,
		multiSelect: multiSelect,
		rowSelect: rowSelect,
	    keepSelection: keepSelection,
		formatters: formatters,
		labels: {
	        noResults: "<div id='"+id+"_noResultDiv' class='no-content clearfix'><div class='clearfix no-contentone'><div class='clearfix'" +
	        		" ><img src='"+ ctxStatic +"/img/commons/nodata/nomsg.png'/><p id='"+id+"_nodata'>"+nodatatitle+"</p></div></div></div>"
	    },
	    rowStyle: function (row, index) {
            var style = {};             
                style={css:{'color':'#ed5565'}};                
            return style;
        },
		sorting: false
	}).on("load.rs.jquery.bootgrid", function(e) {
		ShowBlockUI('#rightloading');
	}).on("loaded.rs.jquery.bootgrid", function(e) {
		setTimeout(function(){
			$('#rightloading').unblock();
		}, 500);
	    var totalRowCount = $("#"+id).bootgrid("getTotalRowCount");
	    if (!totalRowCount || 0 >= totalRowCount) {
	    	$("#"+id).parent("div").css("height","");
	    	//$("#"+id).hide(); // 隐藏表格主体
	    	$("#"+id+"-footer").hide(); // 隐藏表格底部（分页栏）
	    	//$("#"+id+"_noResultDiv").remove(); // 清空无数据div
	    	//$("#"+id).after(noResultDiv(id));
	    	if(gridParam.searchkey!="" && gridParam.searchType!="init"){
	    		$("#"+id).find("#"+id+"_nodata").html("未查到相关备案编号记录");
	    	}
	    	// 如果需要显示数据总数，则显示
	    	if (0 < $("#"+id+"_totalRowCount").length) {
	    		$("#"+id+"_totalRowCount").html("（0）");
	    	}
	    } else {
	    	$("#"+id+"_noResultDiv").remove(); // 清空无数据div
	    	$("#"+id).show(); // 显示表格主体
	    	//$("#"+id+"-footer").show(); // 显示表格底部（分页栏）
	    	// 如果需要显示数据总数，则显示
	    	if (0 < $("#"+id+"_totalRowCount").length) {
	    		$("#"+id+"_totalRowCount").html("（"+totalRowCount+"）");
	    	}
	    	;
	    	$("#"+id).parent("div").css("height",$("#"+id).height()*4+"px");
	    }
	    
	    // 数据加载完毕后扩展操作
	    loadedExtEvent(id, totalRowCount);
	});
}


/**
 * 初始化配置grid表格
 * 
 * @param gridId 【必填】表格id
 * @param url    【必填】ajax请求地址
 * @param param  【选填】ajax请求参数
 * @param opts   【选填】配置项
 */
function initGridByOption (gridId, url, param, opts) {
	// 请求参数
	gridParam = param || {};
	
	// 默认配置项
	var defaultOpt = {
		navigation: 2,
		ajax: true,
		post: function () {
			return gridParam;
		},
		url: url,
		selection: false,
		multiSelect: false,
		rowSelect: false,
		keepSelection: false,
		formatters: {},
		labels: {
	        noResults: "不好意思哦，这里暂时没有内容哦"
	    },
	    sorting: false
	};
	
	// 合并后的最终配置项
	var fullOpts = $.extend({}, defaultOpt, opts || {});
	
	// 初始化grid控件并声明事件
	$("#"+gridId).bootgrid( fullOpts )
		.on("load.rs.jquery.bootgrid", function(e) {
			ShowBlockUI('#rightloading');
		})
		.on("loaded.rs.jquery.bootgrid", function(e) {
			setTimeout(function(){
				$('#rightloading').unblock();
			}, 500);
		    var totalRowCount = $("#"+gridId).bootgrid("getTotalRowCount");
		    if (!totalRowCount || 0 >= totalRowCount) {
		    	$("#"+gridId).hide(); // 隐藏表格主体
		    	$("#"+gridId+"-footer").hide(); // 隐藏表格底部（分页栏）
		    	$("#"+gridId+"_noResultDiv").remove(); // 清空无数据div
		    	$("#"+gridId).after(noResultDiv(gridId));
		    } else {
		    	$("#"+gridId+"_noResultDiv").remove(); // 清空无数据div
		    	$("#"+gridId).show(); // 显示表格主体
		    	$("#"+gridId+"-footer").show(); // 显示表格底部（分页栏）
		    	
		    	// 如果需要显示数据总数，则显示
		    	if (0 < $("#"+gridId+"_totalRowCount").length) {
		    		$("#"+gridId+"_totalRowCount").html("("+totalRowCount+")");
		    	}
		    }
		    
		    // 数据加载完毕后扩展操作
		    loadedExtEvent(gridId, totalRowCount);
		});
}

/**
 * 初始化配置grid表格-可配置表头列
 * 
 * @param gridId 【必填】表格id
 * @param url    【必填】ajax请求地址
 * @param param  【选填】ajax请求参数
 * @param cols   【必填】列名配置
 * 		[
		    {'label': '批次', 'data-column-id': 'batch'},
		    {'label': '资金方向', 'data-column-id': 'isIncome', 'data-formatter': 'isIncome'},
		    {'label': '隔夜', 'data-column-id': 'offeredRate_1', 'data-formatter': 'termType'},
		    {'label': '报价时间', 'data-column-id': 'createDate', 'data-formatter': 'time'}
		];
 * @param opts   【选填】配置项
 */
function initGridTable (gridId, url, param, cols, opts) {
	$("#"+gridId).addClass("table table-condensed table-hover table-striped money-table");
	
	if (cols && !$.isEmptyObject(cols)) {
		var tmp = "";
		tmp += "<thead>";
		tmp +=     "<tr class=\"money-tablehead\">";
		
		$.each(cols, function (inx, col) {
			tmp += "<td ";
			$.each(col, function (fid, value) {
				if (fid.indexOf("data-") == 0) {
					tmp += " " + fid + "=\""+ value +"\"";
				}
			});
			tmp += ">" + col.label + "</td>";
		});
		tmp +=     "</tr>";
		tmp += "</thead>";
		tmp += "<tbody>";
		tmp += "</tbody>";
		$("#"+gridId).html(tmp);
	}
	
	// 请求参数
	gridParam = param || {};
	
	// 默认配置项
	var defaultOpt = {
		navigation: 2,
		ajax: true,
		post: function () {
			return gridParam;
		},
		url: url,
		selection: false,
		multiSelect: false,
		rowSelect: false,
		keepSelection: false,
		formatters: {},
		labels: {
	        noResults: "不好意思哦，这里暂时没有内容哦"
	    },
	    sorting: false
	};
	
	// 合并后的最终配置项
	var fullOpts = $.extend({}, defaultOpt, opts || {});
	
	// 初始化grid控件并声明事件
	$("#"+gridId).bootgrid( fullOpts )
		.on("load.rs.jquery.bootgrid", function(e) {
			ShowBlockUI('#rightloading');
		})
		.on("loaded.rs.jquery.bootgrid", function(e) {
			setTimeout(function(){
				$('#rightloading').unblock();
			}, 500);
		    var totalRowCount = $("#"+gridId).bootgrid("getTotalRowCount");
		    if (!totalRowCount || 0 >= totalRowCount) {
		    	$("#"+gridId).hide(); // 隐藏表格主体
		    	$("#"+gridId+"-footer").hide(); // 隐藏表格底部（分页栏）
		    	$("#"+gridId+"_noResultDiv").remove(); // 清空无数据div
		    	$("#"+gridId).after(noResultDiv(gridId));
		    } else {
		    	$("#"+gridId+"_noResultDiv").remove(); // 清空无数据div
		    	$("#"+gridId).show(); // 显示表格主体
		    	$("#"+gridId+"-footer").show(); // 显示表格底部（分页栏）
		    	
		    	// 如果需要显示数据总数，则显示
		    	if (0 < $("#"+gridId+"_totalRowCount").length) {
		    		$("#"+gridId+"_totalRowCount").html("("+totalRowCount+")");
		    	}
		    }
		    
		    // 数据加载完毕后扩展操作
		    loadedExtEvent(gridId, totalRowCount);
		});
}

/**
 * 刷新表格数据
 * 
 * @param id 表格id
 * @param param 参数
 */
function reloadGrid (gridId, param) {
	gridParam = param;
	$("#"+gridId).bootgrid("reload");
}
function ShowBlockUI(dom){
	$(dom).block({css: {
		border: 'none',
        padding: '10px',
        '-webkit-border-radius': '10px', 
        '-moz-border-radius': '10px',
        opacity: .5,
        color: '#000'
    },message:'<img src="'+ctxStatic+'/img/uc/loading-2.gif" />加载中...' });
}
/**
 * 无记录显示样式，可定制显示文字和链接
 * 
 * @param gridId
 * @returns {String}
 */
function noResultDiv (gridId) {
	var tmp = "";
	tmp += "<div id='"+gridId+"_noResultDiv' class='no-content clearfix'>";
	
	if ("quotationList" == gridId || "quotationHistoryList" == gridId || "undoquoteList" == gridId) {
		tmp +=     "<div class='clearfix no-contentone'>";
		tmp +=         "<div class='clearfix'>";
		tmp +=             "<img src='"+ ctxStatic +"/img/commons/nodata/nomsg.png'/>";
		tmp +=             "<p>您还没有发布任何报价需求</p>";
		tmp +=             "<p><a class='tred' href='javascript:;' onclick='commonUtil.fundQuote()'>我要报价</a></p>";
	} else if ("enquiryList" == gridId) {
		tmp +=     "<div class='clearfix no-contentone'>";
		tmp +=         "<div class='clearfix'>";
		tmp +=             "<img src='"+ ctxStatic +"/img/commons/nodata/nomsg.png'/>";
		tmp +=             "<p>您还没有任何报价需求</p>";
		tmp +=             "<p><a class='tred' href='"+ ctx +"/fund/index.shtml'>进入报价大厅</a></p>";
	}  else if ("tradevolume" == gridId) {
		tmp +=     "<div class='clearfix no-contentone'>";
		tmp +=         "<div class='clearfix'>";
		tmp +=             "<img src='"+ ctxStatic +"/img/commons/nodata/nomsg.png'/>";
		tmp +=             "<p>填写交易量得金币，还等什么</p>";
		tmp +=             "<p><a class='tred' href='javascript:void(0)' onclick='commonUtil.fundDeal()'>成交录入</a></p>";
	} else if("assetindexsearch"==gridId){
//		tmp +=          "<div class='clearfix no-contentone'><div class='clearfix'" +
//	        		" ><img src='"+ ctxStatic +"/img/commons/nodata/nomsg.png'/><p>暂无记录</p>";	
	}else {
		tmp +=     "<div class='clearfix no-contentone'>";
		tmp +=         "<div class='clearfix'>";
		tmp +=             "<img src='"+ ctxStatic +"/img/commons/nodata/nomsg.png'/>";
		tmp +=             "<p>真遗憾，暂无记录！</p>";	
	}
	
	tmp +=         "</div>";
	tmp +=     "</div>";
	tmp += "</div>";
	return tmp;
}

/**
 * 数据加载完毕后扩展操作
 * 
 * @param gridId 表格id
 * @param totalCount 总数据量
 */
function loadedExtEvent (gridId, totalCount) {
	if ("quotationList" == gridId) {
		showHisDataTable(gridId, totalCount);
	}
}