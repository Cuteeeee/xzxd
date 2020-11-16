/**
 * @file 信息披露公共Js
 * @author zhenghf(zhenghf@xbfax.com)
 * @date 2016-12-30
 * @version 1.0
 */
var newsCommonJs = {
	/**
	 * 根据栏目code获取资讯列表
	 * 
	 * @param code 栏目code
	 */
	getInfosByChannelCode: function(code, params, callback) {
		commonUtil.xhr('/news/column/'+code+'.shtml', params || {}, 'POST').done(function(result) {
			if(typeof callback === 'function') {
				callback(result);
			}
		});
	},
	/**
	 * 数据转换
	 * 
	 * @param type
	 * @param value
	 */
	transData: function(type, value) {
		var result = "--";
		
		if('time' == type) {
			var now = new Date().getTime(); // 当前时间戳，单位毫秒
			var timerc = now - value;
			var day = parseInt(timerc /(1000*60*60*24));
	        var hour = parseInt((timerc %(1000*60*60*24)) /(1000*60*60));
	        var min = parseInt((timerc %(1000*60*60)) /(1000*60));
	        var sec = parseInt((timerc %(1000*60)) /(1000));
	        
	        if(day > 0) {
	        	result = day + "天前"
	        } else if(hour > 0) {
	        	result = hour + "小时前"
	        } else if(min > 0) {
	        	result = min + "分钟前"
	        } else if(sec > 0) {
	        	result = sec + "秒前"
	        } else if(sec <= 0) {
	        	result = "刚刚"
	        }
		}
		
		return result;
	},
	checkViewPwd:function(id,errmsg){
		var param = {
			title: '验证密码',
			content: '请输入密码：', /* 提示内容 */
			errmsg:errmsg || '',
			keyid:id,
        	callback: function(da) {
        		var viewpwd=$("#assetsCodeForm").find("input[name='code']").val();
        		commonUtil.xhr("/news/viewforpwd.shtml",{infoid:id,viewpwd:viewpwd},"GET",false).done(function (result) {
        		    if(result.code=="200"){
        		    	//window.location.href=ctx + "/news/"+id+".shtml?code="+viewpwd;
        		    	//commonUtil.targetClick(ctx + "/news/"+id+".shtml?code="+viewpwd,"_self");
        		    	newsCommonJs.refViewCenter(id,viewpwd);
        		    }else{
        		    	newsCommonJs.checkViewPwd(id,result.msg);
        		    }
        		})
        	} 
		};
		if(typeof $.fn.PlugNewsDialog === 'function') {
			return $(this).PlugNewsDialog(param||{});
		} else {
			commonUtil.getScript(ctxStatic + '/js/portal/news/jquery.plug.news.confirm.js?v='+version, function() {
			 	return $(this).PlugNewsDialog(param||{});
			});
		}
	},
	//局部更新可查看内容
	refViewCenter:function(id,viewpwd){
		 $.ajax({
	            type: 'get',
	            url: ctx + "/news/"+id+".shtml",
	            data: {code:viewpwd}, 
	            dataType: 'html',
	            success: function(data) {
	            	var result = $(data).find(".msg-xq-body");
	            	$(".msg-xq").html(result);
	            } 
	        }) 
	}
}
//验证密码回车自定义处理
function selectKeyDown(event){
	var beanid=$("#assetsCodeForm").find("input[name='keyid']").val();
	var viewpwd=$("#assetsCodeForm").find("input[name='code']").val();
	commonUtil.xhr("/news/viewforpwd.shtml",{infoid:beanid,viewpwd:viewpwd},"GET",false).done(function (result) {
	    if(result.code=="200"){
	    	newsCommonJs.refViewCenter(beanid,viewpwd);
	    }else{
	    	newsCommonJs.checkViewPwd(beanid,result.msg);
	    	
	    }
	})
}