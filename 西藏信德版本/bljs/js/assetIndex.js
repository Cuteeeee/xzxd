/**
 * @file 我的询价相关js方法
 */
new WOW().init();
// 查询条件
var param = {
	bizType: biztype,  // 业务类型	
	termType: '', //期限	
	minAmount:'',
	maxAmount:'',
	date:'',
	isAuthView:1,
	kwd: kwd
	
};
//项目查询参数
var sparam = {
		bizType: '',  // 业务类型
		termType: '', //期限	
		minAmount:'',
		maxAmount:'',
		date:'',
		isAuthView:0,
		searchType:'',
		searchkey: ''
}
var assetsTrans={
		
}
$(document).ready(function() {
	init();
	initEvent();
	initData("assetindex", ctx + '/asset/list.shtml', param);
});

function init(){
	var bannerText = '<div class="wrapper1 banner-text banner-text1 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.5s">\
		  <p class="white font-30">着眼未来，携手共进，开创金融新格局</p>\
		  </div><div class="wrapper1 banner-text banner-text1 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.9s">\
	  	  <p class="white font-20" style="margin-top:10px;">&nbsp;把金融产品的风险关在笼子里</p>\
	  	  </div>';
	//$(".head").append(bannerText);
	$(".muser-banner").removeClass("muser-banner").addClass("asset-banner");
}

function initData(dataid,url,param){
	var formatters = {
			"assetsNo": function(column, row) {
				var status = row.assetsStatus.stateValue;
				var title = '';
				if (status == 200) {
					title = '<a data-column="asset" data-columnoper="view" href="javascript:;" onclick="gotoUrl(this, '+row.id+')">'
					+ '<dl><dt class="asset-left">'+row.assetsNo+'</dt><dt class="asset-left">'+row.assetsName+'</dt></dl>' 
					+ '</a>';
				} else {
					title = '<dl><dt class="asset-left">'+row.assetsNo+'</dt><dt class="asset-left">'+row.assetsName+'</dt></dl>';
				}
				
				return  title;
			},									
			"bizType": function(column, row) {			
				return transAssetData("bizType", row[column.id]);
			},
			"assetsAmount": function(column, row) {
				var amount = row[column.id];
				var unit = "万元";
				if (!amount) {
					amount = "--";
					unit = "";
				}
				return "<dl><dt><span class='blackone font-18 reda'>"+amount+"</span>"+ unit +"</dt><dd class='graya'>挂牌金额</dd></dl>";				
			},
			"assetsTerm": function(column, row) {
				var term = row[column.id];
				var unit = row["termType"];
				if (!term) {
					term = "--";
					unit = "";
				} else {
					unit = transAssetData("termType", unit);
				}
				return   "<dl><dt><span class='blackone font-18'>"+ term +"</span>"+ unit +"</dt><dd class='graya'>融资期限</dd></dl>";
			},
			"currRate": function(column, row) {	
				return "<dl><dt><span class='reda font-18'>"+row.currRate+"</span>%</dt><dd class='graya'>融资利率</dd></dl>";				
			},
			"endTime": function(column, row) {
				return 	"<dl><dt><span class='blackone font-16'>"+getDateStr(row.endTime)+"</span></dt><dd class='graya'>挂牌结束时间</dd></dl>";				
			},
			"status": function(column, row) {
				var status = row.assetsStatus.stateValue;
				var title = '';
				if (status == 200) {
					title = '<span style="color:#98a4b8;">公示中</span>';
				}else{
					title = '<span style="color:#98a4b8;">公示结束</span>';
				}
				return title ;
			},
			"detail": function(column, row) {
				var status = row.assetsStatus.stateValue;
				var title = '';
				if (status == 200) {
					title = '<a data-column="asset" data-columnoper="view" onclick="gotoUrl(this, \''+row.id+'\');" class="green click-def" href="javascript:;">查看详情</a>';
				} else {
					//title = '<a data-column="asset" data-columnoper="view" onclick="gotoUrlForEnd(this, \''+row.id+'\');" class="green click-def" href="javascript:;">查看详情</a>';
					title = '<span style="color:#a5a5a5;">查看详情</span>';
				}
				return title;
			}
		}
	    initGrid(dataid, url, param, formatters, false);
}
/**
 * 项目查询
 * @param dataid
 * @param url
 * @param param
 */
function initDataSearch(dataid,url,sparam,notitle){
	var formatters = {
			"assetsNo": function(column, row) {
				var status = row.assetsStatus.stateValue;
				var title = '<dl><dt class="asset-left">'+row.assetsNo+'</dt><dt class="asset-left">'+row.assetsName+'</dt></dl>';
				return  title;
			},	
			"assetsName": function(column, row) {
				return  '<dt >'+row.assetsName+'</dt></dl>';
			},
			"bizType": function(column, row) {			
				return transAssetData("bizType", row[column.id]);
			},
			"assetsAmount": function(column, row) {
				var amount = row[column.id];
				var unit = "万元";
				if (!amount) {
					amount = "--";
					unit = "";
				}
				return "<dl><dt><span class='blackone font-18 reda'>"+amount+"</span>"+ unit +"</dt></dl>";				
			},
			"assetsTerm": function(column, row) {
				var term = row[column.id];
				var unit = row["termType"];
				if (!term) {
					term = "--";
					unit = "";
				} else {
					unit = transAssetData("termType", unit);
				}
				return   "<dl><dt><span class='blackone font-18'>"+ term +"</span>"+ unit +"</dt></dl>";
			},
			"currRate": function(column, row) {	
				return "<dl><dt><span class='reda font-18'>"+row.currRate+"</span>%</dt></dl>";				
			},
			"endTime": function(column, row) {
				return 	"<dl><dt><span class='blackone font-16'>"+getDateStr(row.endTime)+"</span></dt></dl>";				
			},
			"status": function(column, row) {
				var status = row.assetsStatus.stateValue;
				var title = '';
				if (status == 200) {
					title = '<span style="color:#98a4b8;">公示中</span>';
				}else{
					title = '<span style="color:#98a4b8;">公示结束</span>';
				}
				return title ;
			},
			"detail": function(column, row) {
				/*var status = row.assetsStatus.stateValue;
				//var code=encodeStr64(row.code);
				  var code=BASE64.encoder(row.code);
				var title = '<a data-column="asset" data-columnoper="view" onclick="searchGotoUrl(this, \''+row.id+'\',\''+code+'\');" class="green click-def" href="javascript:;">查看详情</a>';
				return title;*/
				viewLatterfile(row.id);
				return "<dl class='codelatterfile'></dl>" ;
			}
		}
	   initGridSearch(dataid, url, sparam,notitle, formatters, false);
}

/**
 * 获取备案函,这里是单独查询接口
 * @param assetid
 */
function viewLatterfile(assetid){
	$.ajax({
        type: "GET",
        url: ctx+"/asset/findCodeLatterFile.shtml",
        data: {id:assetid},
        success: function(data){
        	var codelatterfile=$(".codelatterfile");
    	 	if(data != undefined && data.files != undefined && data.files.length>0){
    	 		
    	 		//目前只会有一个附件
    	 		$.each(data.files, function(i, obj) {
    	 			var extensionName = obj.fpath.substr(obj.fpath.lastIndexOf(".") + 1);    // 文件扩展名
    	 			codelatterfile.append('<dt><a class="dowLatterFile" href="javascript:void(0)" target="_blank" fpath="'+obj.fpath+'" fname="'+obj.upName+'">查看相关文件</a></dt>');
    	 			if(extensionName=="jpg" || extensionName=="jpge" || extensionName=="png" || extensionName=="gif" || extensionName=="bmp"){
    	 				$(".dowLatterFile").attr("href",obj.fpath);
    	 				$(".dowLatterFile").attr("fpath","");
    	 				//$(".dowLatterFile").attr("title",obj.upName);
    	 				$(".dowLatterFile").attr("rel","gallery");
    	 				$(".dowLatterFile").addClass("boxer boxer_image");
    	 				/*var parmsobj={
    	 						labels:{
    	 							next:"1",
    	 							previous:"2"
    	 						}
    	 				}*/
    	 				 $(".boxer").not(".retina, .boxer_fixed").boxer();//.defaults(parmsobj);
    	 				 
    	 			} 
    	 			$(".dowLatterFile").click(function(){
    	 				var fpath=$(this).attr("fpath"),fname=$(this).attr("fname");
    	 				//$.download(ctx+'/asset/downfile.shtml','fpath='+$(this).attr("fpath")+"&fname="+$(this).attr("fname"),'post' );
    	 				 switch (extensionName) {
	    	 	            case "pdf":
	    	 	            case "PDF":
	        	 				viewPdfDocument(assetid);
	    	 	                break;
	    	 	            case "jpg":
	    	 	            case "jpge":
	    	 	            case "png":
	    	 	            case "gif":
	    	 	            case "bmp":
	    	 	                break;
	    	 	            default:
	    	 	            	$.download(ctx+'/asset/downfile.shtml','fpath='+fpath+"&fname="+fname,'post' );
	    	 	                break;
	    	 	        }
    	 				
    	 			});
    	 		});
    	 	}else{
    	 		codelatterfile.append("<dt>&nbsp;</dt>");
    	 	}
        }
    });
}

/**
 * pdf预览
 * @param fpath
 * @param fname
 */
function viewPdfDocument(assetid){
//	window.open(ctx+"/static/js/commons/pdfjs/onlineBrowse.html?fileUrl="
//			 +encodeURIComponent(ctx+"/asset/pdfStreamHandeler.shtml?fpath="+fpath+"&fname="+fname));
	window.open(ctx+"/asset/toview.shtml?id="+assetid);
} 


 
function initEvent(){
	// 根据报价机构进行搜索
	$('#kwd').on('keypress',function(event){
        if(event.keyCode == "13") {
        	getData();
        }
    });
	// 注册关键词输入框按键事件，如果没有值，清空图标消失，有值，则显示
	$("#kwd").on('keyup', function (event) {
		var kwd = $(this).val();
		if ("" == kwd) {
			$(".qingkong").hide();
		} else {
			$(".qingkong").show();
		}
		
		// 如果按下回车键，进行查询
		if(event.keyCode == "13") {
			getData();
        }
	});
	$(".qingkong").click(function () {
		var dept = $('#kwd').val();
		if ("" != dept) {
			$('#kwd').val('');
			$(this).hide();
			getData();
		}
	});
	
	$(".serch-icoa, .indexserch").click(function () {
		getData();
	});
	
	
	//项目列表、项目查询切换
	$(".tab-title li a").on("click",function(){
		var control=$(this).attr("aria-controls");
		if(control=="profilesearch"){
			$("#profile").hide();
			$("#profilesearch").show();
			//initGridByOption("assetindexsearch", ctx + '/asset/list.shtml', param);
			sparam.searchType="init";
			sparam.isAuthView=0;
			initDataSearch("assetindexsearch", ctx + '/asset/list.shtml', sparam,"请通过完整的备案编号查询");
			$("#assetindexsearch").show(); 
			enterKey();
		}else{
			$("#profile").show();
			$("#profilesearch").hide();
			param.isAuthView=1;
			getData();
		}
	});
	
	
	
	//项目查询关键字输入框清空事件
	$("#searchkey").on('keyup', function (event) {
		var searchkey = $(this).val();
		if ("" == searchkey) {
			$(".sqingkong").hide();
		} else {
			$(".sqingkong").show();
		}
		// 如果按下回车键，进行查询
		if(event.keyCode == "13") {
			enterKey();
        }
	});
	$(".sqingkong").click(function () {
		var searchkey = $('#searchkey').val();
		if ("" != searchkey) {
			$('#searchkey').val('');
			$(this).hide();
			enterKey();
		}
	});
	
	//项目查询，关键字为空时不查询
	$(".serch-icoa, .prosearch").click(function () {
		var searchkey=$("#searchkey").val();
		sparam.searchkey=searchkey;
		sparam.searchType="";
		if(searchkey){
			reloadGrid ("assetindexsearch", sparam);	
		}else{
			sparam.searchType="init";
			reloadGrid ("assetindexsearch", sparam);
			//$("#assetindexsearch").hide(); // 隐藏表格主体
	    	//$("#assetindexsearch-footer").hide(); // 隐藏表格底部（分页栏）
	    	//$("#assetindexsearch_noResultDiv").remove(); // 清空无数据div
	    	//$("#assetindexsearch").after(noResultDiv("assetindexsearch"));
		}
	});
	

}
/**
 * 项目查询
 */
function enterKey(){
	var searchkey=$("#searchkey").val();
	sparam.searchkey=searchkey;
	if(searchkey){
		sparam.searchType="";
		reloadGrid ("assetindexsearch", sparam);	
	}else{
		sparam.searchType="init";
		reloadGrid ("assetindexsearch", sparam);
	}
}

/**
 * 在新窗口打开资产详情页面
 * 
 * @param id
 */
function gotoUrl(obj, id){
	// 校验是否拥有机构权限
	commonUtil.authcheck(obj, function () {
		commonUtil.targetClick(ctx + "/asset/"+id+".shtml");
	});
}
/**
 * 项目查询查看状态为非挂牌中项目详情
 * @param obj
 * @param id
 * @param code
 */
function searchGotoUrl(obj, id,code){
	// 校验是否拥有机构权限
	commonUtil.authcheck(obj, function () {
//		var tempForm = document.createElement("form");
//		tempForm.method = "post";
//		tempForm.action = ctx + "/asset/detailpost/"+id+".shtml";
//		tempForm.target="_blank"; 
//		
//		var codeInput = document.createElement("input");
//		codeInput.type ="hidden";    
//		codeInput.setAttribute("name", "code"); // 为input对象设置name  
//		codeInput.setAttribute("value", code); // 为input对象设置value  
//		tempForm.appendChild(codeInput);
//		document.body.appendChild(tempForm);
//		tempForm.submit();
//		document.body.removeChild(tempForm); // 提交后移除创建的form  
		commonUtil.targetClick(ctx + "/asset/assetsCode/"+id+".shtml?code="+code);
	});
}


/**
 * 根据条件进行查询
 */
function searchData(obj, type, value, className) {
	if ('bizType' == type) {
		// 样式转换
		$(obj).parent().children("li").removeClass(className);
		$(obj).addClass(className);			
		param.bizType = value;		
		
	} 
	if ('lisAmount' == type) {
		// 样式转换
		$(obj).parent().children("li").removeClass(className);
		$(obj).addClass(className);		
		if(value=="0"){
			param.maxAmount = 0;
			param.minAmount=0;
		}	
		if(value=="1"){		
			param.maxAmount = 1000;	
			param.minAmount=500;
		}
		if(value=="2"){		
			param.maxAmount = 10000;	
			param.minAmount=1000;
		}
		if(value=="3"){		
			param.maxAmount = 100000;	
			param.minAmount=10000;
		}
		if(value=="4"){		
			param.maxAmount = 1000000000;	
			param.minAmount=100000;
		}
				
		
	}
	if ('termType' == type) {
		// 样式转换
		$(obj).parent().children("li").removeClass(className);
		$(obj).addClass(className);				
		param.termType = value;		
		
	}
	if ('listDate' == type) {
		// 样式转换
		$(obj).parent().children("li").removeClass(className);
		$(obj).addClass(className);				
		param.date = value;		
		
	}
	// 调用后台服务，获取数据
	getData();
}

 

/**
 * 获取我的询价数据列表
 * @param pageNumber 页码
 */
function getData () {
	param.kwd = $("#kwd").val();
	reloadGrid ("assetindex", param);	
}
function getDataLabel(type,value) {
	var termTypeName;
	if(type=='termType'){
		if(value==1){
			termTypeName="天";			
		}else if(value==2){
			termTypeName="月";
		}
        else if(value==3){
        	termTypeName="年";
		}
		
	}
	return termTypeName;
}