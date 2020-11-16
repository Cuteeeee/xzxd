var indexContainer={
	init:function(){			
		this.loadInfo();
		this.initTemp();	
		this.getShowProject();
		this.getBroadCast();
		this.getNotice();
		this.getStatisticData();
		this.initEvent();
	},
	initEvent:function(){        	
    	var self=this;
    	
    	$(".goto, .financial-more").on('click', function () {
    		var gotoUrl = $(this).attr("data-goto");
    		if (!!_uid) {
    			window.location.href = ctx + gotoUrl;
    		} else {
    			commonUtil.login(this, {callback: function () {
    				window.location.href = ctx + gotoUrl;
    			}});
    		}
		});
    	
    	$("#infocate li").on("click",function(){
    		$(this).addClass("active").siblings().removeClass("active");
    		var dataload=$(this).attr("data-load");
    		if(dataload=='false'){
    	  		var code=$(this).attr("colcode");
        		var params={};
        		params.columnCode=code;
        		commonUtil.xhr('/indexnews.shtml', params || {}, 'GET').done(function (result) {
        			if(result.statue=='200'){
        				$("#noticecontent").empty();
        				var list=result.data;
        				var temp="";
        				if(undefined!=list&&null!=list&&""!=list){
        					$.each(list,function(id,item){
            					temp+="<li>";        					
            					temp+="<span class='red-disc'></span><h4><a href='#' onclick='indexContainer.navgateNewsDetail("+item.id+")'>"+item.title+"</a></h4>";
            					if (undefined!=item.updateTime&&null!=item.updateTime&&""!=item.updateTime) {
            						temp+="<span class='time right'>"+commonUtil.transDiffTime(item.updateTime)+"</span>";
            					} else{
            						temp+="<span class='time right'></span>";
            					}
            					
            					if (undefined!=item.summary&&null!=item.summary&&""!=item.summary) {
            						if(item.summary=="refuseView"){
            							/*temp+="<span><img style='height:30px' src='"+ctx+"/static/img/portal/newfinancial/xmgg_home_unlook.jpg'></img></span>";*/
            							temp+="<span class='left'>&nbsp;</span>";
            						}else{
            							temp+="<span class='left'>"+item.summary+"</span>";
            						}
            					} else {
            						temp+="<span class='left'></span>";
            					}            
            					/*temp+="<span class='left'>&nbsp;</span>";*/ 
            					temp+="</li>";
            				});
            				$("#noticecontent").append(temp);
        				}
        			}
        		});
    		}
    	});
    	
    	$("#inforhead").on("click",function(){
        		commonUtil.xhr('/indexnews.shtml', {columnCode:"yjxw"}, 'GET').done(function (result) {
        			if(result.statue=='200'){ 
        				//$("#infocate > li").removeClass('active');
        				$("#infocontent").empty();
        				var list=result.data;
        				var temp="";
        				if(undefined!=list&&null!=list&&""!=list){
        					$.each(list,function(id,item){
            					temp+="<li>";        					
            					temp+="<span class='red-disc'></span><h4><a href='#' onclick='indexContainer.navgateNewsDetail("+item.id+")'>"+item.title+"</a></h4>";
            					if (undefined!=item.updateTime&&null!=item.updateTime&&""!=item.updateTime) {
            						temp+="<span class='time right'>"+commonUtil.transDiffTime(item.updateTime)+"</span>";
            					} else{
            						temp+="<span class='time right'></span>";
            					}
            					
            					if (undefined!=item.summary&&null!=item.summary&&""!=item.summary) {
            						temp+="<span class='left'>"+item.summary+"</span>";
            					} else {
            						temp+="<span class='left'></span>";
            					}             					
            					temp+="</li>";
            				});
            				$("#infocontent").append(temp);
        				}
        			}
        		});
    	});
    	$("#inforhead").click(); 
    	
    	$("#broadcastlist li:eq(0)").on("click",function(){        		
    		if($(this).hasClass("fa-angle-down")){
    			$(this).addClass("fa-angle-up");
    			$(this).parent("li").addClass("show");
    		}
     		if($(this).hasClass("fa-angle-up")){
    			$(this).addClass("fa-angle-down");
    			$(this).parent("li").removeClass("show");
    		}
    	});	
    },
    initTemp: function() {        	
    	$.template("listProjectTemp", this.temp.listProject);
    },
    showContent: function(obj) {        	
    	if ($(obj).hasClass("fa-angle-down")) {        		
    		$(obj).removeClass("fa fa-angle-down");
    		$(obj).addClass("fa fa-angle-up");
			$(obj).parents("li").addClass("show");
		}else{
		 	if ($(obj).hasClass("fa-angle-up")) {
     			$(obj).removeClass("fa fa-angle-up")
    			$(obj).addClass("fa fa-angle-down");
    			$(obj).parents("li").removeClass("show");
    		}
		}
    },
    loadInfo: function() {
    	var codes=[{name:"项目公告",columcode:"xmgg"},{name:"公司公告",columcode:"gsgg"}];
    	var temp="";
    	$.each(codes,function(id,item){   		  
		   if (id==0) {
			   //class='active'
			   temp+="<li  data-load='false' colcode="+item.columcode+">"+item.name+"</li>";
		   } else {
			   temp+="<li  data-load='false' colcode="+item.columcode+">"+item.name+"</li>";
		   }
	  });    	 
	  $("#infocate").append(temp);    	 
    },
	getShowProject: function() {
		var params={};
		commonUtil.xhr('/indexproject.shtml', params || {}, 'GET').done(function (result) { 
			if(result.statue=='200'){    				
				var data = result.data;					
				var containerObj = $("#listedproject");
				containerObj.empty();    				
				if (null!=data&&""!=data&&undefined!=data&&data.length > 0) {
					$.each(data, function (i,item) {
						$(containerObj).append($.tmpl('listProjectTemp' , item));
					});
				}
			}
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
					$("#rzxxTotal").html(rspData.rzCount || '--');
					// 投资项目总笔数
					$("#tzxxTotal").html(rspData.tzCount || '--');
					// 投资项目总笔数
					$("#ssgsTotal").html(rspData.ssgsCount || '--');
				}
			}
		});
	},
	getNotice:function(){
		commonUtil.xhr('/indexnews.shtml', {columnCode:"xmgg,gsgg"}, 'GET').done(function (result) {
			if(result.statue=='200'){ 
				$("#noticecontent").empty();
				var list=result.data;
				var temp="";
				if(undefined!=list&&null!=list&&""!=list){
					$.each(list,function(id,item){
    					temp+="<li>";        					
    					temp+="<span class='red-disc'></span><h4><a href='#' onclick='indexContainer.navgateNewsDetail("+item.id+")'>"+item.title+"</a></h4>";
    					if (undefined!=item.updateTime&&null!=item.updateTime&&""!=item.updateTime) {
    						temp+="<span class='time right'>"+commonUtil.transDiffTime(item.updateTime)+"</span>";
    					} else{
    						temp+="<span class='time right'></span>";
    					}
    					
    					if (undefined!=item.summary&&null!=item.summary&&""!=item.summary) {
    						if(item.summary=="refuseView"){
    							/*temp+="<span><img style='height:30px' src='"+ctx+"/static/img/portal/newfinancial/xmgg_home_unlook.jpg'></img></span>";*/
    							temp+="<span class='left'>&nbsp;</span>";
    						}else{
    							temp+="<span class='left'>"+item.summary+"</span>";
    						}
    					} else {
    						temp+="<span class='left'></span>";
    					}             
    					/*temp+="<span class='left'>&nbsp;</span>";*/
    					temp+="</li>";
    				});
    				$("#noticecontent").append(temp);
				}
			}
		});
	},
	getBroadCast:function(){
 		var params={pageNo:"1",pageSize:"5"};
		commonUtil.xhr('/broadCast/list.shtml', params || {}, 'GET').done(function (result) {    				
			if ("200" == result.statuscode) {
				var broadlist=result.data;
				var timeStr="";
				var detail="";
				if(null!=broadlist&&""!=broadlist&&undefined!=broadlist){
					$.each(broadlist,function(index,item){
						var content="";
						if(item.detail){
							var detailobj= eval('(' + item.detail + ')');
							content="恭喜"+item.instName+"-"+item.userName+"与";
							$.each(detailobj.rivalUserList,function(num,detailitem){
								if(null!=detailitem.rivalInstName&&""!=detailitem.rivalInstName&&undefined!=detailitem.rivalInstName){
									content+=detailitem.rivalInstName;
									if(null!=detailitem.rivalUserName&&""!=detailitem.rivalUserName&&undefined!=detailitem.rivalUserName){
										content+="-"+detailitem.rivalUserName;
									}
									if(num!=detailobj.rivalUserList.length-1){
										content+="、";
									}
								}		    									
							});
							if (null!=item.amount&&undefined!=item.amount&&""!=item.amount) {
								if (item.amount>=10000) {
									content+="成交 "+item.amount/10000+"亿";
								} else {
									content+="成交 "+item.amount+"万";
								}
							}
						}							
						detail+="<li>";
						detail+="<div class='time-axis'>";
						detail+="<img src='"+ctxStatic+"/img/portal/index/icon-circle.jpg' />";
						detail+="</div>";
						detail+="<div class='bc-title clearfix'>";
						detail+="<div class='time'>"+commonUtil.transDiffTime(item.updateDate)+"</div>";
						if(content.length>44){
							detail+="<i class='fa fa-angle-down showangle' onclick='indexContainer.showContent(this)'></i>";
						}
						detail+="</div>";
						detail+="<div class='bc-text'>"; 
						detail+="<div class='bc-text-inner'>";
						detail+=content;	    								
						detail+="</div>";
						detail+="</div>";
						detail+="</li>";
					}); 
					$("#broadcastlist").empty();
					$("#broadcastlist").append(detail);
					//播报滑动效果
					new addScroll('bcContent', 'broadcastlist', 'scrollDiv');
				}
			} 
		});
	},
	temp:{
		listProject: '\
			<li>\
	            <div class="before">{{html transAssetData ("bizType",bizType)}}</div>\
				<div class="title">\
					<div class="titlea"></div>\
					<div class="titleb">${assetsName}</div>\
			    </div>\
				<dl class="jine">\
					<dt>\
						<sup>￥</sup>\
						<span  class="num t24">${assetsAmount}</span>\
						<span class="unit">万</span>\
					</dt>\
					<dd class="">挂牌金额</dd>\
			    </dl>\
				<ul class="info">\
					<li class="qixian">\
						<i></i>\
						<span class="mr10">融资期限</span>\
						<span>\
							<span class="t18 mr10">${assetsTerm}</span>{{html transAssetData ("termType",termType)}}</span>\
					</li>\
		           	<li class="end-time">\
						<i></i>\
						<span class="mr10">挂牌结束时间</span>\
						<span class="t16">{{html transDate (endTime)}}</span>\
					</li>\
				</ul>\
				{{if assetsStatus.stateValue==200}}\
				    <button class="btn-ckxq" assetid="${id}" onclick="indexContainer.navgateDetail(${id})">查看详情</button>\
				{{else}}\
					<button class=" btn-ckxq unclick" >公示结束</button>\
				{{/if}}\
		    </li>\
		'
	},
	navgateDetail:function(id){		
		commonUtil.auth({column: 'asset',columnoper: 'view'}, function () {
			window.open(ctx+"/asset/"+id+".shtml","_href"); 
		});
	},
	navgateFinacialDetail:function(id){	
		commonUtil.auth({column: 'newfinancial',columnoper: 'view'}, function () {
			window.open(ctx+"/newfinancial/detail/"+id+".shtml","_href"); 
		});
	},
	navgateNewsDetail:function(id){				    		
		window.open(ctx+"/news/"+id+".shtml","_href"); 
	},
	navgateFinacialIndex:function(){
		window.open(ctx+"/newfinancial.html","_self"); 
	},
	navgateAssetIndex:function(){
		window.open(ctx+"/assets.html","_self"); 
	},
	navgatePersonalIndex:function(){
		window.open(ctx+"/user/home/myIndex.shtml","_self"); 
	},
	navgateUserIndex:function(userid){
		window.open(ctx+"/userhome/"+userid+".shtml","_self"); 
	},
	navgateBraodDetail:function(userid){
		if (!!_uid) {
			window.location.href = ctx + '/fund/xjReport/index.shtml';
		} else {
			commonUtil.login(this, {callback: function () {
				window.location.href = ctx + '/fund/xjReport/index.shtml';
			}});
		}
	}
}

/**
 * 数据转换
 * @param type 数据类型
 * @param value 数据编码
 * @returns {String} 转换后数据结果
 */
function transDate (value,type) {
    if(""!=value&&undefined!=value&&null!=value){
     	var created;
 	    if (value instanceof Date){
 	    	created=value;
 	    }else{
 	    	created = new Date(value);
 	    }
 		
 		var year = created.getFullYear();
 		var month = created.getMonth()+1;
 		var day = created.getDate();
 		var hour = created.getHours();
 		var minute = created.getMinutes();
 		var second = created.getSeconds();
 		
 		if (month < 10) {
 			month = "0" + month;
 		}
 		if (day < 10) {
 			day = "0" + day;
 		}
 		if (hour < 10) {
 			hour = "0" + hour;
 		}
 		if (minute < 10) {
 			minute = "0" + minute;
 		}
 		if (second < 10) {
 			second = "0" + second;
 		}
    	if(type=='broast'){
    		if(isToday(year,month,day)){
    			return hour+":"+minute ;
    		}else{
    			return year+"-"+month+"-"+day;
    		}
    	}
	    return year+"-"+month+"-"+day ;
    }
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
	}
}

function isToday(year1,month1,day1){	
	var created = new Date();
	var year = created.getFullYear();
	var month = created.getMonth()+1;
	var day = created.getDate();
	    if (month < 10) {
			month = "0" + month;
		}
		if (day < 10) {
			day = "0" + day;
		}
	
	if(year==year1){
		
	}else{
		return false;
	}
    if(month==month1){
    	
	}else{
		return false;
	}
    if(day==day1){
    	
	}else{
		return false;
	}
    return true;
}
