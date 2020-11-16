/**
 * 公示结束
 * @param obj
 * @param id
 * @returns
 */
function gotoUrlForEnd(obj, id){
	// 校验是否拥有机构权限
	commonUtil.authcheck(obj, function () {
		 
		var param = $.extend({}, this.params,{'type':$(obj).attr("data-column")});
		
		if(typeof $.fn.PlugAssetsDialog === 'function') {
			param.title = "备案编号:";
			param.content = "【请输入备案编号】:";
			param.callback = function(obj){
				authCode(obj,id);
			}
			var diag = $(obj).PlugAssetsDialog(param || {});
		}
	});
}

function authCode(obj,id){
	$('#assetsCodeForm').bootstrapValidator('validate');
	var code = $("input[name=code]").val();
	if(code){
		commonUtil.xhr('/asset/assetsCode.shtml', {assetsId:id,code:code}, 'GET').done(function (result) {
			if ("100" == result.status || "300" == result.status) {
				commonUtil.msg.error('提示','备案编号不正确,请重新输入!');
			}else if ("500" == result.status) {
				commonUtil.msg.error('提示','备案编号不正确,请重新输入!');
			}else if ("600" == result.status) {
				commonUtil.msg.error('提示','该项目未配置备案编号!请联系管理员!');
			}else if ("200" == result.status){
				commonUtil.targetClick(ctx + "/asset/"+id+".shtml?code="+code);
			}
		});
	}else{
		commonUtil.msg.error('提示','备案编号不正确,请重新输入!');
	}
}