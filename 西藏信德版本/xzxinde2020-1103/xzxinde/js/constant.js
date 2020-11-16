var data = {
	bizType : [ {
		value : '0',
		name : '全部'
	}, {
		value : '1',
		name : '委托债权'
	} , {
		value : '2',
		name : '不良资产'
	}],
	subcriptionStatus:[ {
		value : '0',
		name : '认购中'
	}, {
		value : '1',
		name : '认购成功'
	} , {
		value : '2',
		name : '认购失败'
	}]
 
}

/**
 * 数据转换
 * @param type 数据类型
 * @param value 数据编码
 * @returns {String} 转换后数据结果
 */
function transAssetData (type, value) {	 
    if ("termType" == type) {    	
		if ("1" == value) {
			return "天";
		} else if ("2" == value) {
			return "月";
		} else if ("3" == value) {
			return "年";
		}  else {
			return "--";
		}
	} else if ("bizType" == type) {	
		var attvalue="";
		for(var p in value) 
		{ 
		  if(p=="stateValue"){
		      attvalue=value[p];//属性对应的值 
		  }		
		} 
		if ("1" == attvalue) {
			return "委托债权";
		} else if ("2" == attvalue) {
			return "小贷资产收益权";
		}else if ("3" == attvalue) {
			return "债权收益权";
	    }else if ("4" == attvalue) {
			return "不良资产";
	    }else if ("5" == attvalue) {
			return "其他资产";
	    }else {
			return "--";
		}
	} else if ("amount" == type) {
		if (isNaN(value) || "" == value || undefined == value || null == value) {
			return "--";
		} else {
			return value;
		}
	} else if ("currRate" == type) {		
		var num = new Number(value);
		if (isNaN(value) || "" == value || 0 > value || undefined == value || "null" == value) {
			return "--";
		} else {
			return num.toFixed(4);
		}
	} 
	else if ("assetsTerm" == type) {
		var num = new Number(value);
		if (isNaN(num) || "" == value || undefined == value || "null" == value) {
			return "--";
		} else {
			return value;
		}
	} 	else if ("rateType" == type) {		
		if ("1" == value) {
			return "固定";
		} else if ("2" == value) {
			return "浮动";
		} else if ("3" == value) {
			return "风险定价";
		} else{
			return "--";
		}
		
	} 
	else if ("transType" == type) {		
		if ("1" == value) {
			return "协议转让";
		} else if ("2" == value) {
			return "做市转让";
		} else if ("3" == value) {
			return "拍卖模式";
		} else if ("4" == value) {
			return "议价";
		} else if ("5" == value) {
			return "竞价";
		} else{
			return "--";
		} 
		
	} else if ("orderStatus" == type) {
		var attvalue="";
		for(var p in value) 
		{ 
		  if(p=="stateValue"){
		      attvalue=value[p];//属性对应的值 
		  }		
		} 
		if ("0" == attvalue) {
			return "审核中";
		} else if ("2" == attvalue) {
			return "审核通过";
		} else if ("3" == attvalue) {
			return "失败";
		} else if ("4" == attvalue) {
			return "撤销";
		} 
		
	} else if ("assetsArea" == type) {
		if ("1" == value) {
			return "6个月以内（含）";
		} else if ("2" == value) {
			return "6个月～1年（含）";
		} else if ("3" == value) {
			return "1年～3年（含）";
		} 
	}else if ("orderStatus" == type) {
		var attvalue="";
		for(var p in value) 
		{ 
		  if(p=="stateValue"){
		      attvalue=value[p];//属性对应的值 
		  }		
		} 
		if ("0" == attvalue) {
			return "审核中";
		} else if ("2" == attvalue) {
			return "审核通过";
		} else if ("3" == attvalue) {
			return "失败";
		} else if ("4" == attvalue) {
			return "撤销";
		} 
		
	} 
	  
}

function getEnumValue(value){
	var attvalue="";
	for(var p in value) 
	{ 
	  if(p=="stateValue"){
	      attvalue=value[p];//属性对应的值 
	  }		
	} 
	return attvalue;
}
/**
 * 获取当前日期
 * @returns {String}
 */
function getTodayDate () {
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	var day = today.getDate();
	
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}
	
	return year+"."+month+"."+day;
}

/**
 * 获取距离当前日期的指定天数的日期
 * @param AddDayCount
 * @returns {String}
 */
function getDateStr(dd) {
	    if(dd){
		var today = new Date(dd);		
		var year = today.getFullYear();
		var month = today.getMonth()+1;
		var day = today.getDate();
		
		if (month < 10) {
			month = "0" + month;
		}
		if (day < 10) {
			day = "0" + day;
		}	  
	    return year+"-"+month+"-"+day;	   
	    }
}

/**
 * 获取距离当前日期的指定天数的日期
 * @param AddDayCount
 * @returns {String}
 */
function getDateDay(dd) {
	    if(dd){
		var today = new Date(dd);		
		var year = today.getFullYear();
		var month = today.getMonth()+1;
		var day = today.getDate();
		
		if (month < 10) {
			month = "0" + month;
		}
		if (day < 10) {
			day = "0" + day;
		}	  
	    return year+"-"+month+"-"+day;	   
	    }
}