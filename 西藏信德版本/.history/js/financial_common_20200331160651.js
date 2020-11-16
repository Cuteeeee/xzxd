/**
 * @file 金融市场公共方法
 * @author zhenghf(zhenghf@xbfax.com)
 * @date 2016-11-02
 * @version 1.0
 */
var financialCommonJs = {
	/**
	 * 判断某用户类型是否为经纪商用户组下用户类型
	 * @param userType
	 * @returns {Boolean}
	 */
	showUserType: function (userRole) {
		var self = this;
		
		if (userRole == financialCommonJs.constant.local.userRole.item.jingji.value) {
			return '<span class="identity">经纪商</span>';
		} else if (userRole == financialCommonJs.constant.local.userRole.item.company.value) {
			return '<span class="identity">上市公司</span>';
		} else {
			return '<i class="icon-unknown-user"></i>';
		}
	},
	/**
	 * 显示银行间市场出和收效果
	 * @param infoType 
     * @param direction
	 * @returns {Boolean}
	 */
	showBankDirection: function (infoType, direction) {
		if (infoType == xbfaxConfig.financial.constant.local.infoType.item.bank.value) {
			if (direction == xbfaxConfig.financial.constant.local.direction.item.out.value) {
				return '<span class="bank out">出</span>';
			} else {
				return '<span class="bank in">收</span>';
			}
		} else {
			return '';
		}
	},
	/**
	 * 数据字典转码默认返回值
	 */
	defaultReturn: '--',
	/**
	 * 数据字典中不限的值
	 */
	all: '',
	/**
	 * 正则表达式
	 */
	reg: {
		// 金额
		amount: '^(([1-9][0-9]{0,6})|(([0]\\.\\d{1,2}|[1-9][0-9]{0,6}\\.\\d{1,2})))$',
		// 手机号码
		telphone: '^((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\\d{8}$',
		// 利率
		regRate: '^(([1-9][0-9]{0,1})|(([0]\\.\\d{1,4}|[1-9][0-9]{0,1}\\.\\d{1,4})))$',
		// 利率2
		regRate2: '^(0|([1-9][0-9]{0,1})|(([0]\\.\\d{1,4}|[1-9][0-9]{0,1}\\.\\d{1,4})))$',
		remark: '^.{0,200}$'
	},
	/**
	 * 数据字典
	 */
	constant: {
		// 从服务器获取的数据
		remote : {},
		// 本地存储的数据
		local: {
			userRole: {
				id: "userRole",
				name: "发布人",
				item: {
					"jingji": {value: "2", name: "只看经纪商"},
					"company": {value: "1", name: "只看上市公司"}
				}
			},
			rate: {
				id: "rate",
				name: "利率",
				item: {
					"small3": {value: "|3", name: "≤3%"},
					"3and5": {value: "3|5", name: "3%-5%"},
					"5and10": {value: "5|10", name: "5%-10%"},
					"big10": {value: "10|", name: "≥10%"}
				}
			},
			amount: {
				id: "amount",
				name: "金额",
				item: {
				    "3": {value: "|2000", name: "≤2000万"},
				    "4": {value: "2000|5000", name: "2000万-5000万"},
				    "5": {value: "5000|10000", name: "5000万-1亿"},
				    "6": {value: "10000|50000", name: "1亿-5亿"},
				    "7": {value: "50000|100000", name: "5亿-10亿"},
				    "8": {value: "100000|", name: "≥10亿"}
				}
			},
			term: {
				id: "term",
				name: "期限",
				item: {
					"small3": {value: "|6", name: "≤6M"},
					"3and5": {value: "6|12", name: "6M-12M"},
					"5and10": {value: "12|24", name: "12M-24M"},
					"big10": {value: "24|", name: "≥24M"}
				}
			},
			direction: {
				id: "direction",
				name: "方向",
				item: {
					"out": {value: "1", name: "出"},
					"in": {value: "2", name: "收"}
				}
			}
		},
		//发布需求
		publishNeed:{
			//用于自动生成标题使用的 /*定义一个标题格式的模板*/
			map:{
				come:"",/*出，或者收*/
				tspjzl:"",/*种类 第一个种类**/
				pjzl:"", /*种类 */
				cdzl:"", /*种类*/
				zgzl:"", /*种类*/
				gxdiqu:"", /*地区 */
				ssgsxq:"", /*需求方向：融资、投资*/
				ssgsrzBreed:"",/*融资方式*/
				ssbdhy:"", /*所属行业*/
				bdhy:"", /*所属类别*/
				licaileix:"", /*品种*/
				gqlx:"",/*股权类型*/
				zqjc:"", /*债券简称*/
				cdjc:"",/*存单简称*/
				hylyzl:"",/*行业领域*/
				ywbq11:"",/*业务标签*/
				pjms:"",/*模式*/
				zcsc:"",/*市场*/
				cdsc:"",/*市场*/
				minAmount:"", /*金额  */
				splitAmount:"",
				maxAmount:"",/*金额单位万/亿 */
				minTerm:"", /*期限 天、月、年*/
				splitTerm:"",
				maxTerm:"", /*期限*/
				minRate:"", /*利率*/
				splitRate:"",
				maxRate:"" /*利率*/
			},
			mapPro:[
			    "pjzl","zgzl","cdzl","gxdiqu","bdhy","ssgsrzBreed","licaileix","gqlx","hylyzl","ywbq11","pjms","zcsc","cdsc","ssbdhy"
			],
			isShowCome:[
			    "licai","xianquan","paioju","cd","fft","qt","tzlc","tzxqjy","tzpj","tzcd","tzfft","tzqt"
			],
			attubuteType:{
				//字符串文本
				"SMALL_TEXT":1,
				"MEDIUM_TEXT":1,
				"LARGE_TEXT":2,
				//数字类
				"INTEGER":3,
				"DECIMAL":4,
				"CURRENCY":5,
				//日期，时间类
				"DATE_PICKER":6,
				"TIME_PICKER":302,
				"DATE_TIME_PICKER":303,
				"DATE_TERM":304,
				//选择类
				"SELECT_BOX":401,
				"CHECK_BOX":100, //单选
				"RADIO_BOX":99,	//多选
				"RADIO_LABEL":9, //单选菜单
				"CHECK_LABEL":10, //多选菜单
				//附件
				"FILE_SINGLE":7,
				"FILE_MONEY":8,
				//地区
				"AREA":11,
				"HANGYE":12,
				//特殊类型
				"AMOUNT":15,
				"RATE":16,
				"TERM":17,
				//其他
				"PLUGIN":501,
				"ATTACH":502
			},
			needItem:[{name:"我要融资"},{name:"我要投资"},{name:"上市公司需求"}],
			//融资
			myRz:[{
				
			}],
			//投资
			myTz:[{
				
			}],
			//上市公司融资
			ssgsRz:[{
					//融资方式
					methodType:{
							id: "ssgsRzMethod",
							name: "融资方式",
							item:[
								    {value: "0", name: "不限"},
								    {value: "1", name: "并购"},
								    {value: "2", name: "股票质押"},
								    {value: "3", name: "信用贷款"},
								    {value: "4", name: "可转换债"}
							    ]
						}
					},{
						//标的行业
						methodType:{
							id: "ssgsRzIndustry",
							name: "标的行业",
							item:[
							    {value: "0", name: "房地产"},
							    {value: "1", name: "能源化工"},
							    {value: "2", name: "金融资产"},
							    {value: "3", name: "农林牧副渔"},
							    {value: "4", name: "节能环保"},
							    {value: "5", name: "仓储物流"},
							    {value: "6", name: "医疗保健"},
							    {value: "7", name: "矿产治金"},
							    {value: "8", name: "旅游酒店"},
							    {value: "9", name: "航空航天"},
							    {value: "10", name: "商务贸易"},
							    {value: "11", name: "园林园艺"},
							    {value: "12", name: "基础设施"},
							    {value: "13", name: "家电数码"},
							    {value: "14", name: "化工化学"},
							    {value: "15", name: "教育培训"},
							    {value: "16", name: "建筑建材"},
							    {value: "17", name: "IT互联网"},
							    {value: "18", name: "生物医药"},
							    {value: "19", name: "行政事业机构"},
							    {value: "20", name: "电气设备"},
							    {value: "21", name: "文化传媒广告"},
							    {value: "22", name: "电子通信"},
							    {value: "23", name: "海洋开发"},
							    {value: "24", name: "机械机电"},
							    {value: "25", name: "交通运输"},
							    {value: "26", name: "汽车汽配"},
							    {value: "27", name: "纺织服装饰品"},
							    {value: "28", name: "餐饮休闲娱乐"},
							    {value: "29", name: "家居日用"},
							    {value: "30", name: "食品饮料烟草"},
							    {value: "31", name: "其他行业"}
							]
						}
					}],
		},
		//我的约单的查询条件
		// 日期
		registerDate: {
			id: "registerDate",
			name: "登记日期",
			item: {
			    "3d": {value: "3d", name: "最近三天"},
			    "1w": {value: "1w", name: "最近一周"},
			    "1m": {value: "1m", name: "最近一月"},
			    "3m": {value: "3m", name: "最近三月"},
			    "6m": {value: "6m", name: "最近半年"},
			    "1y": {value: "1y", name: "最近一年"}
			}
		},
		//约单的项目名称
		projectName:{
			type: 'text',
 	    	label: '信息标题',
 	    	name: 'kwd'
		},
		//我的收藏
		collectionProjectName:{
 	    	type: 'text',
 	    	label: '信息标题',
 	    	name: 'kwd'
		}
		
	},
	/**
	 * 获取查询条件候选项
	 * @param channelId
	 * @param type
	 */
	getFilterList: function (id, type, code) {
		var self = this;
		var itemsObj = {};
		
		if (!!self.constant.remote && !!self.constant.remote[id] && !!self.constant.remote[id][code]) {
			return;
		}
		
		if ('type' == type) {
			self.getTypes(code, function (data) {
				if (!!data && data.length > 0) {
					$.each(data, function () {
						var item = {};
						
						if (this.isDisplay) {
							itemsObj[this.typeCode] = {value: this.typeCode, name: this.displayName || this.typeName};
						}
					});
				}
				if (!self.constant.remote[id]) {
					self.constant.remote[id] = {};
				}
				self.constant.remote[id][code] = {"id": code, "item": itemsObj};
			})
		} else if ('beed' == type) {
			self.getBeeds(code, function (data) {
				if (!!data && data.length > 0) {
					$.each(data, function () {
						var item = {};
						
						if (this.isDisplay != false) {
							itemsObj[this.breedCode] = {value: this.breedCode, name: this.displayName || this.breedName};
						}
					});
				}
				if (!self.constant.remote[id]) {
					self.constant.remote[id] = {};
				}
				self.constant.remote[id][code] = {"id": code, "item": itemsObj};
			});
		} else if ('attr' == type) {
			self.getAttrs(code, function (data) {
				if (!!data && !!data.specDatas && data.specDatas.length > 0) {
					$.each(data.specDatas, function () {
						var item = {};
						itemsObj[this.normalData+""] = {value: this.normalData, name: this.dataName};
					});
				}
				if (!self.constant.remote[id]) {
					self.constant.remote[id] = {};
				}
				self.constant.remote[id][code] = {"id": code, "item": itemsObj};
			});
		} else if ('instType' == type) {
			self.getInstType(function (data) {
				if (!!data && data.length > 0) {
					$.each(data, function () {
						var item = {};
						itemsObj["_" + this.value] = {value: this.value, name: this.name, count: this.count};
					});
				}
				if (!self.constant.remote[id]) {
					self.constant.remote[id] = {};
				}
				self.constant.remote[id][code] = {"id": code, "item": itemsObj};
			});
		}
	},
	/**
	 * 获取金融市场栏目下的类型
	 */
	getCategoryOfChannel: function (callback) {
		var self = this;
		
		commonUtil.xhr('/category/channel/financial.shtml', {}, 'GET').done(function (rsp) {
			if ("200" == rsp.code) {
				if (typeof callback === 'function') {
					callback(rsp.data);
				}
			}
		});
	},
	/**
	 * 查找类下的子类
	 * 
	 * @param categoryCode 父类的编码
	 */
	getTypes: function (categoryCode, callback) {
		var self = this;
		
		commonUtil.xhr('/category/'+ categoryCode +'/chirdren.shtml', {}, 'GET', false).done(function (rsp) {
			if ("200" == rsp.code) {
				if (typeof callback === 'function') {
					callback(rsp.data);
				}
			}
		});
	},
	/**
	 * 查找品种下的种类
	 * 
	 * @param categoryCode 类的编码
	 */
	getBeeds: function (categoryCode, callback) {
		var self = this;
		
		commonUtil.xhr('/category/'+ categoryCode +'/breeds.shtml', {}, 'GET', false).done(function (rsp) {
			if ("200" == rsp.code) {
				if (typeof callback === 'function') {
					callback(rsp.data);
				}
			}
		});
	},
	/**
	 * 查询属性
	 * 
	 * @param specCode 属性编码
	 */
	getAttrs: function (specCode, callback) {
		var self = this;
		
		commonUtil.xhr('/category/attribute/'+ specCode +'.shtml', {}, 'GET', false).done(function (rsp) {
			if ("200" == rsp.code) {
				if (typeof callback === 'function') {
					callback(rsp.data);
				}
			}
		});
	},
	/**
	 * 查询机构类型
	 */
	getInstType: function (callback) {
		var self = this;
		
		commonUtil.xhr('/financial/insttype/list.shtml', {}, 'GET', false).done(function (rsp) {
			if ("200" == rsp.code) {
				if (typeof callback === 'function') {
					callback(rsp.data);
				}
			}
		});
	},
	/**
	 * 查询机构类型下已发布需求的机构名称列表
	 */
	getInstnameList: function (usertype, callback) {
		var self = this;
		
		commonUtil.xhr('/financial/insttype/instname/list.shtml', {usertype: usertype}).done(function (rsp) {
			if ("200" == rsp.code) {
				if (typeof callback === 'function') {
					callback(rsp.data);
				}
			}
		});
	},
	/**
	 * 弹出约单模态框
	 * @param obj 触发弹出的对象
	 * @param param 参数
	 */
	openOrderModal: function (obj, param) {
		// 校验是否拥有公共权限
		commonUtil.auth({column: 'financial',columnoper: 'order'}, function () {
			if ($(obj).attr('data-uid') == _uid) {
				commonUtil.msg.error('提示', "不能约单自己发布的项目");
				return;
			}
			
			if (typeof $.fn.OrderModal === 'function') {
				$(obj).OrderModal(param || {});
			} else {
				commonUtil.getScript(ctxStatic + '/js/portal/financial/jquery.order.modal.js', function () {
					$(obj).OrderModal(param || {});
				});
			}
		});
	},
	/**
	 * 弹出查看联系方式模态框
	 * @param obj 触发弹出的对象
	 * @param param 参数
	 */
	openContactModal: function (obj, param) {
		if (typeof $.fn.ContactModal === 'function') {
			$(obj).ContactModal(param || {});
		} else {
			commonUtil.getScript(ctxStatic + '/js/portal/financial/jquery.contact.modal.js', function () {
				$(obj).ContactModal(param || {});
			});
		}
	},
	/**
	 * 弹出分享模态框
	 * @param obj 触发弹出的对象
	 * @param param 参数
	 */
	openShareModal: function (obj, param) {
		if (typeof $.fn.SaveokModal === 'function') {
			$(obj).SaveokModal(param || {});
		} else {
			commonUtil.getScript(ctxStatic + '/js/portal/financial/jquery.saveok.modal.js', function () {
				$(obj).SaveokModal(param || {});
			});
		}
	},
	/**
	 * 弹出发布需求模态框
	 */
	openAddPage: function (obj, param) {
		param = param || {};
		var type = param.clickItem;
		if (type == 'tzzj') {
			type = 'touzi';
		} else if (type == 'rzxm') {
			type = 'rongzi';
		} else if (type == 'yxjsc') {
			type = 'shgs';
		} else if (!type) {
			type = 'need';
		}
		if(param.isAnonymous){
			if (typeof $.fn.NeedModal === 'function') {
				$(obj).NeedModal(param || {});
			} else {
				commonUtil.getScript(ctxStatic + '/js/portal/financial/jquery.need.modal.js??v='+version, function () {
					$(obj).NeedModal(param || {});
				});
			}
			return ;
		}
		// 校验是否拥有公共权限
		commonUtil.auth({column: 'financial',columnoper: type}, function () {
			param = $.extend({}, {clickItem: $(obj).attr("opt")}, param || {});
			
			if (typeof $.fn.NeedModal === 'function') {
				$(obj).NeedModal(param || {});
			} else {
				commonUtil.getScript(ctxStatic + '/js/portal/financial/jquery.need.modal.js?v='+version, function () {
					$(obj).NeedModal(param || {});
				});
			}
		});
	},
	/**
	 * 悬浮显示联系方式
	 */
	contactTips: function (obj) {
		if (typeof $.fn.FinancialTips === 'function') {
			$(obj).FinancialTips();
		} else {
			commonUtil.getScript(ctxStatic + '/js/portal/financial/jquery.financial.tips.js', function () {
				$(obj).FinancialTips();
			});
		}
	},
	/**
	 * 跳转到智能匹配页面
	 */
	gotoMatchPage: function () {
		var self =  this;
		
		// 判断是否有发布过需求，必须发布过需求才能智能匹配
		self.hasSupermarketData(function (hasSupermarketData) {
			if (hasSupermarketData) {
				window.location.href = ctx + '/financial/match/index.shtml';
			} else {
				// 如果未发布过需求，出现无权限弹框
				var tips = commonUtil.tips({
					content: '您还没有发布需求，先告诉我您的需求，再帮您匹配吧！',
					contentExt: '\
						<a opt="2" href="javascript:;" onclick="financialCommonJs.openAddPage(this);">我有融资需求</a>\
						<a opt="1" href="javascript:;" onclick="financialCommonJs.openAddPage(this);">我有投资需求</a>\
					'
				});
			}
		});
	},
	/**
	 * 获取用戶是否开启智能匹配开关
	 */
	getOpenStatus: function (callback) {
		var self = this;
		
		commonUtil.xhr('/financial/match/status.shtml', {}, 'GET').done(function (result) {
			if ("success" == result.statue) {
				if(!!result.rsp){
					if (typeof callback === 'function') {
						callback(result.rsp);
					}
				}
			}
		});
	},
	/**
	 * 是否发布过金融市场数据
	 */
	hasSupermarketData: function (callback) {
		var self = this;
		
		commonUtil.xhr('/financial/match/hasSupermarketData.shtml', {}, 'GET').done(function (result) {
			if ("success" == result.statue) {
				if(!!result.rsp){
					if (result.rsp.success) {
						if (typeof callback === 'function') {
							callback(result.rsp.result);
						}
					} else {
						
					}
				}
			}
		});
	},
	/**
	 * 保存用戶开启智能匹配开关
	 */
	saveOpenStatus: function (hasOpen, callback) {
		var self = this;
		
		commonUtil.xhr('/financial/match/status.shtml', {hasOpen: hasOpen}, 'POST').done(function (result) {
			if ("success" == result.statue) {
				if(!!result.rsp){
					if (typeof callback === 'function') {
						callback(result.rsp);
					}
				}
			}
		});
	},
	/**
	 * 处理推送数据，单条（新增、修改、删除）
	 * @param content
	 */
	pushData: function (content) {
		if (!!content) {
			var delList = content.delList;
			var newList = content.newList;
			
			/******************* 处理新增推送 ********************/
			var newAddCount_rz = 0;
			var newAddCount_tz = 0;
			if (!!newList && newList.length > 0) {
				for (var n=0; n<newList.length; n++) {
					// 如果新增的是融资项目
					if (newList[n].infoType == xbfaxConfig.financial.constant.local.infoType.item.financing.value) {
						newAddCount_rz++;
					}
					// 如果新增的是投资项目
					else if (newList[n].infoType == financialCommonJs.constant.infoType.type.item.investment.value) {
						newAddCount_tz++;
					}
				}
			}
			
			/******************* 处理删除推送 ********************/
			var newDelCount_rz = 0;
			var newDelCount_tz = 0;
			if (!!delList && delList.length > 0) {
				for (var i=0; i<delList.length; i++) {
					// 如果删除的是融资项目
					if (delList[i].infoType == xbfaxConfig.financial.constant.local.infoType.item.financing.value) {
						newDelCount_rz++;
					}
					// 如果删除的是投资项目
					else if (delList[i].infoType == xbfaxConfig.financial.constant.local.infoType.item.investment.value) {
						newDelCount_tz++;
					}
				}
			}

			var oldNew_rz = $('#rz-new').attr('data-new');
			var oldNew_tz = $('#tz-new').attr('data-new');
			var new_rz = new Number(oldNew_rz) + new Number(newAddCount_rz) - new Number(newDelCount_rz);
			var new_tz = new Number(oldNew_tz) + new Number(newAddCount_tz) - new Number(newDelCount_tz);
			
			$('#rz-new').attr('data-new', new_rz);
			$('#tz-new').attr('data-new', new_tz);

			if (new_rz > 0) {
				$('#rz-new').text("+" + new_rz);
			} else if (new_rz < 0)  {
				$('#rz-new').text(new_rz);
			} else {
				$('#rz-new').text("");
			}
			if (oldNew_rz != new_rz) {
				$('#rz-new').css({"margin-top":"0px"}).stop().animate({"margin-top":"-10px"},800);
			}
			
			if (new_tz > 0) {
				$('#tz-new').text("+" + new_tz);
			} else if (new_tz < 0) {
				$('#tz-new').text(new_tz);
			} else {
				$('#tz-new').text("");
			}
			if (oldNew_tz != new_tz) {
				$('#tz-new').css({"margin-top":"0px"}).stop().animate({"margin-top":"-10px"},800);
			}
		}
	},
	/**
	 * 模拟a标签在另一个标签打开页面
	 * @param obj
	 * @param param
	 */
	targetClick: function (obj, param) {
		var projectId = $(obj).attr('data-id'); // 项目id
		
		// 校验是否拥有机构权限
		commonUtil.auth({column: 'financial',columnoper: 'view'}, function () {
			commonUtil.targetClick(ctx + '/financial/detail/'+ projectId +'.shtml');
		});
	},
	/**
	 * 数据显示
	 */
	transData: function (type, row, ext) {
		var result = "";
		
		if ('rate' == type) {
			if (row.isPublicRate) {
				result = "<span class='t20'>面议</span>"; 
			} else {
				if ('0' == row.rateType) {
					result = '--';
				} else if ('1' == row.rateType) {
					if (!row.minRateText && !row.maxRateText) {
						result = '--';
					} else if (!!row.minRateText && !!row.maxRateText) {
						if (row.minRateText == row.maxRateText) {
							result = "<span>" + row.minRateText + '</span>' + '<span class="t14">%</span>'; 
						} else {
							result = "<span>" + row.minRateText + '~' + row.maxRateText + '</span>' + '<span class="t14">%</span>'; 
						}
						
					} else {
						result = "<span>" + (row.minRateText||'') + (row.maxRateText||'') + '</span>' + '<span class="t14">%</span>'; 
					}
				} else if ('2' == row.rateType) {
					if (!row.minRateText) {
						result = '--';
					} else if (!!row.minRateText) {
						result = "<span>" + row.minRateText + '</span>' + '<span class="t14">%</span>'; 
					}
				}
			}
		} else if ('amount' == type) {
			if (row.isPublicAmount) {
				result = "<span class='t20'>面议</span>"; 
			} else {
				if ('0' == row.amountType) {
					result = '--';	
				} else if ('1' == row.amountType) {
					if (!row.minAmountText && !row.maxAmountText) {
						result = '--';
					} else if (!!row.minAmountText && !!row.maxAmountText) {
						if (row.minAmountText == row.maxAmountText) {
							result = "<span>" + row.minAmountText + '</span>' + '<span class="t14">'+ commonUtil.trans("financial", "amountUnit", row.amountUnit) +'</span>'; 
						} else {
							result = "<span>" + row.minAmountText + '-' + row.maxAmountText + '</span>' + '<span class="t14">'+ commonUtil.trans("financial", "amountUnit", row.amountUnit) +'</span>'; 
						}
					} else {
						result = "<span>" + (row.minAmountText||'') + (row.maxAmountText||'') + '</span>' + '<span class="t14">'+ commonUtil.trans("financial", "amountUnit", row.amountUnit) +'</span>'; 
					}
				} else if ('2' == row.amountType) {
					if (!row.minAmountText) {
						result = '--';
					} else if (!!row.minAmountText) {
						result = "<span>" + row.minAmountText + '</span>' + '<span class="t14">'+ commonUtil.trans("financial", "amountUnit", row.amountUnit) +'</span>'; 
					}
				}
			}
		} else if ('termType' == type) {
			if ('0' == row.termType) {
				result = '--';	
			} else if ('1' == row.termType) {
				if (!row.minTermText && !row.maxTermText) {
					result = '--';
				} else if (!!row.minTermText && !!row.maxTermText) {
					if (row.minTermText == row.maxTermText) { 
						result = "<span>" + row.minTermText + '</span>' + '<span class="t14">'+ commonUtil.trans("financial", "termUnit", row.termUnit) +'</span>'; 
					} else {
						result = "<span>" + row.minTermText + '-' + row.maxTermText + '</span>' + '<span class="t14">'+ commonUtil.trans("financial", "termUnit", row.termUnit) +'</span>'; 
					}
				} else {
					result = "<span>" + (row.minTermText||'') + (row.maxTermText||'') + '</span>' + '<span class="t14">'+ commonUtil.trans("financial", "termUnit", row.termUnit) +'</span>'; 
				}
			} else if ('2' == row.termType) {
				if (!row.minTermText && !row.maxTermText) {
					result = '--';
				} else if (!!row.minTermText) {
					result = "<span>" + row.minTermText + '</span>' + '<span class="t14">'+ commonUtil.trans("financial", "termUnit", row.termUnit) +'</span>'; 
				}
			} else {
				result = "<span>" + commonUtil.trans("financial", type, row[type]) + '</span>';
			}
		} else if ('infoType' == type) {
			if ("2" == row.direction) {
				return '投资';
			} else if ("1" == row.direction) {
				return '融资';
			} else {
				return "";
			}
		} else if ('province' == type || 'industryName' == type) {
			if ('province' == type) {
				result = row.province || row.areaName || "--";
			} else {
				result = row[type] || "--";
			}
		} else {
			result = commonUtil.trans("financial", type, row[type]);
		}
		
		return result;
	},
	/**
	 * 模板
	 */
	tmpl: {
		// 数据行模板
		rowTmpl: '\
			<li class="financial_record {{if isRecommend}}recommend{{else}}financial{{/if}} {{if direction==xbfaxConfig.financial.constant.local.direction.item.out.value}}li-chu{{else}}li-shou{{/if}} clearfix" data-id="${id}" data-updatetime="${updateTime}" id="project_${id}">\
				<div class="li-left">\
					<div class="cs">{{html commonUtil.trans("financial", "direction", direction)}}</div>\
					<div class="sort">{{html commonUtil.trans("financial", "tagName", $data)}}</div>\
				</div>\
				<div class="li-head">\
					{{if isMatchRecord}}\
						<a class="right ppfw setRule" data-resid="${id}" href="javascript:;">调整匹配范围</a>\
					{{else}}\
						<span class="right contact-link" data-uid="${userId}" data-flag="${isAnonymous}" data-tel="${tel}" data-contactPerson="${contactPerson}" data-state="0">\
							<i class="fa fa-mobile-phone"></i>\
						</span>\
							<span class="right" style="margin-right: 10px;">\
							{{html financialCommonJs.showUserType(userRole)}}${instName}-${userName}\
						</span>\
					{{/if}}\
					<a href="javascript:;" title="${infoTitle}">${infoTitle}</a>\
					{{if isRecommend}}<img class="left icon-tuijian" src="${ctxStatic}/img/portal/financial/tuijian.png">{{/if}}\
					<span class="left t12">{{html commonUtil.transDiffTime(typeof updateTime==="undefined"?"":updateTime, "2")}}</span>\
				</div>\
				<div class="li-body clearfix">\
					<dl class="dla">\
						<dt class="t24">\
							{{html financialCommonJs.transData("amount", $data, "t14")}}\
						</dt>\
						<dd>金额</dd>\
					</dl>\
					<dl class="dlb">\
						<dt class="t24">\
							{{html financialCommonJs.transData("rate", $data, "t14")}}\
						</dt>\
						<dd>利率</dd>\
					</dl>\
					<dl class="dlc">\
						<dt class="t24">\
							{{html financialCommonJs.transData("termType", $data, "t14")}}\
						</dt>\
						<dd>期限</dd>\
					</dl>\
					<dl class="dle dls">\
						<dt class="t16" title="{{html financialCommonJs.transData("province", $data, "t3")}}">\
							<span>{{html financialCommonJs.transData("province", $data, "t3")}}</span>\
						</dt>\
						<dd>区域</dd>\
					</dl>\
					<dl class="dlf dls">\
						<dt class="t16" title="{{html financialCommonJs.transData("industryName", $data, "t3")}}">\
							<span>{{html financialCommonJs.transData("industryName", $data, "t3")}}</span>\
						</dt>\
						<dd>行业</dd>\
					</dl>\
					{{if isMatchRecord}}\
						<div class="right btn0 open-pro">\
							<button class="expand">匹配 <span class="matchTotal">{{html $data.matchList.length}}</span> 条 <span class="switch">展开</span></button>\
						</div>\
					{{else}}\
						<div class="right btn0">\
							<button class="openOrder" data-uid="${userId}" data-resid="${id}">约单</button>\
						</div>\
					{{/if}}\
				</div>\
			</li>\
		'
	},
	// 用户中心-过滤条件模板
	filterFieldTrans: function (type) {
		var self = this;
		var result = {};
		var items = [{label: '全部', name: '', selected: true}];

		var constant = self.constant[type];
		if (!!constant) {
			for (var t in constant.item) {
				var obj = constant.item[t];
				
				var jo = {};
				jo.label = obj.name;
				jo.name = obj.value;
				items.push(jo);
			}
		}
		if(undefined != constant && null != constant ){
			result.label = constant.name;
			result.name = constant.id;
		}

		result.items = items;	
		return result;
	},
	initUrlToDetail:function(){
		$("li[id^='project_']").click(function(){
			window.open(ctx + '/financial/detail/'+$(this).attr('data-id')+'.shtml');
		});
	}
};

/**
 * 获取当前时间
 * @returns {String} 时间戳
 */
function getTimeStr (value) {
	var created;
	
	if (!!value) {
		created = new Date(value);
	} else {
		created = new Date();
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
    return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
}