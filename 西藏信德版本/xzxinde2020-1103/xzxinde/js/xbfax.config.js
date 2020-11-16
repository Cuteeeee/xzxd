/**
 * @file 门户网站配置
 * @author zhenghf(zhenghf@xbfax.com)
 * @date 2017-02-28
 * @version 1.0
 */
var xbfaxConfig = {
	/**
	 * 公共
	 */
	common: {
		/**
		 * 正则表达式
		 */
		reg: {
			rate: '^(([1-9][0-9]{0,1})|(([0]\\.\\d{1,4}|[1-9][0-9]{0,1}\\.\\d{1,4})))$',
			rate_quote: '^(((Shibor|拆借|质押|买断){1}(-|\\+){1}\\d{1,4})|([1-9][0-9]{0,1})|(([0]\\.\\d{1,4}|[1-9][0-9]{0,1}\\.\\d{1,4})))$',
			rate_quote_ext: '^((Shibor|加权){1}(-|\\+){1}\\d{1,4})$',
			amount: '^(([1-9][0-9]{0,6})|(([0]\\.\\d{1,2}|[1-9][0-9]{0,6}\\.\\d{1,2})))$',
			bp: '^-?[1-9]\\d{0,2}$',
			fund_term: '^[1-9]\\d{0,2}$',
			int: '^[1-9]\\d*$',
			fund_rate: '^(((\\+|-){0,1}[1-9]\\d{0,3})|([1-9][0-9]{0,1})|(([0]\\.\\d{1,4}|[1-9][0-9]{0,1}\\.\\d{1,4})))$',
			phone: '^((13[0-9])|(17[0-9])|(14[0-9])|(15[0-9])|(18[0-9]))\\d{8}$'
		},
		/**
		 * 数据字典
		 */
		constant: {
			defVal: '--'
		}
	},
	/**
	 * 挂牌交易
	 */
	asset: {},
	/**
	 * 金融市场
	 */
	financial: {
		categoryExt: ['zqfx', 'xqjy'],
		/**
		 * 数据字典
		 */
		constant: {
			local: {
				infoType: {
					id: "infoType",
					name: "种类",
					item: {
						"bank": {value: "3", name: "银行间市场", typeCode: "TYPE_SSGSRZ"},
						"financing": {value: "2", name: "融资项目", typeCode: "TYPE_WYRZ"},
						"investment": {value: "1", name: "投资需求", typeCode: "TYPE_WYTZ"}
					}
				},
				termUnit: {
					id: "termUnit",
					name: "期限单位",
					item: {
						"none": {value: "0", name: ""},
						"day": {value: "1", name: "天"},
						"month": {value: "2", name: "个月"},
						"year": {value: "3", name: "年"}
					}
				},
				amountUnit: {
					id: "amountUnit",
					name: "金额单位",
					item: {
						"wan": {value: "1", name: "万"},
						"yi": {value: "2", name: "亿"}
					}
				},
				termType: {
					id: "termType",
					name: "期限",
					item: {
						"1d": {value: "3", name: "隔夜"},
						"1w": {value: "4", name: "一周"},
						"2w": {value: "5", name: "二周"},
						"21d": {value: "6", name: "21天"},
						"1m": {value: "7", name: "一个月"},
						"3m": {value: "8", name: "三个月"},
						"6m": {value: "9", name: "六个月"},
						"9m": {value: "10", name: "九个月"},
						"1y": {value: "11", name: "一年"}
					}
				},
				commonType: {
					id: "commonType",
					name: "字段类型",
					item: {
						"none": {value: "0", name: "无"},
						"custom": {value: "1", name: "自定义"},
						"normal": {value: "2", name: "正常"}
					}
				},
				direction: {
					id: "direction",
					name: "方向",
					item: {
						"out": {value: "1", name: "出"},
						"in": {value: "2", name: "收"}
					}
				},
				infoStatus: {
					id: "infoStatus",
					name: "信息状态",
					item: {
						"normal": {value: "1", name: "正常"},
						"Reject": {value: "2", name: "驳回"},					
						"releasing": {value: "3", name: "待发布"},
						"auditing": {value: "4", name: "待审核"},
					
						
					}
				}
			}
		},
		/**
		 * 模块独享方法
		 */
		func: {
			/**
			 * 数据字典转码（根据值或者编码转码）
			 * @param module 业务模块
			 * @param type 类型
			 * @param code 编码或值
			 */
			transToHtml: function (module, type, o) {
				var self = xbfaxConfig;
				
				if ('amount' == type) {
					if (o.isPublicAmount) {
						return "面议"; 
					} 
					
					if (xbfaxConfig.financial.constant.local.commonType.item.none.value == o.amountType) {
						return '--';
					} else if (xbfaxConfig.financial.constant.local.commonType.item.custom.value == o.amountType) {
						if (!o.minAmountText && !o.maxAmountText) {
							return '--';
						} else if (!!o.minAmountText && !!o.maxAmountText) {
							if (o.minAmountText == o.maxAmountText) {
								return o.minAmountText + xbfaxConfig.func.getNameByValue(module, "amountUnit", o.amountUnit); 
							} else {
								return o.minAmountText + '-' + o.maxAmountText + xbfaxConfig.func.getNameByValue(module, "amountUnit", o.amountUnit); 
							}
						} else {
							return (o.minAmountText||'') + (o.maxAmountText||'') + xbfaxConfig.func.getNameByValue(module, "amountUnit", o.amountUnit); 
						}
					} else if (xbfaxConfig.financial.constant.local.commonType.item.normal.value == o.amountType) {
						if (!!o.minAmountText) {
							return o.minAmountText + xbfaxConfig.func.getNameByValue(module, "amountUnit", o.amountUnit); 
						}
					}
				} else if ('rate' == type) {
					if (o.isPublicRate) {
						return "面议"; 
					} 
					
					if (xbfaxConfig.financial.constant.local.commonType.item.none.value == o.rateType) {
						return '--';
					} else if (xbfaxConfig.financial.constant.local.commonType.item.custom.value == o.rateType) {
						if (!o.minRateText && !o.maxRateText) {
							return '--';
						} else if (!!o.minRateText && !!o.maxRateText) {
							if (o.minRateText == o.maxRateText) {
								return o.minRateText +'%'; 
							} else {
								return o.minRateText + '~' + o.maxRateText +'%'; 
							}
						} else {
							return (o.minRateText||'') + (o.maxRateText||'') + '%'; 
						}
					} else if (xbfaxConfig.financial.constant.local.commonType.item.normal.value == o.rateType) {
						if (!!o.minRateText) {
							return o.minRateText +'%'; 
						}
					}
				} else if ('termType' == type) {
					if (xbfaxConfig.financial.constant.local.commonType.item.none.value == o.termType) {
						return '--';
					} else if (xbfaxConfig.financial.constant.local.commonType.item.custom.value == o.termType) {
						if (!!o.minTermText && !!o.maxTermText) {
							if (o.minTermText == o.maxTermText) {
								return o.minTermText + xbfaxConfig.func.getNameByValue(module, "termUnit", o.termUnit); 
							} else {
								return o.minTermText + '-' + o.maxTermText + xbfaxConfig.func.getNameByValue(module, "termUnit", o.termUnit); 
							}
						} else {
							return (o.minTermText||'') + (o.maxTermText||'') + xbfaxConfig.func.getNameByValue(module, "termUnit", o.termUnit); 
						}
					} else if (xbfaxConfig.financial.constant.local.commonType.item.normal.value == o.termType) {
						if (!!o.minTermText) {
							return o.minTermText + xbfaxConfig.func.getNameByValue(module, "termUnit", o.termUnit);
						}
					} else {
						return xbfaxConfig.func.getNameByValue(module, type, o[type]);
					}
				} else if ('tagName' == type) {
					if ($.inArray(o.categoryCode, xbfaxConfig.financial.categoryExt) <= -1) {
						return o.tagName;
					} else {
						return o.categoryName + "-" + o.tagName;
					}
				}
				
				return self.common.constant.defVal;
			}
		}
	},
	/**
	 * 同业报价
	 */
	fund: {
		/**
		 * 数据字典
		 */
		constant: {
			local: {
				isOffline: {
					id: "isOffline",
					name: "报价类型",
					item: {
						'on': {value: '0', name: '线上资金'}, 
					    'off': {value: '1', name: '线下资金'}
					}
				},
				isIncome: {
					id: "isIncome",
					name: "资金方向",
					item: {
						'out': {value: '0', name: '出'},
						'in': {value: '1', name: '收'}
					}
				},
				isOfflineTemp:{
					id: "isOfflineTemp",
					name: "报价类型",
					item: {
						'on': {value: '0', name: '线上'}, 
					    'off': {value: '1', name: '线下'}
					}
				},
				isIncomeTemp: {
					id: "isIncomeTemp",
					name: "资金方向",
					item: {
						'out': {value: '0', name: '出'},
						'in': {value: '1', name: '收'}
					}
				},
				bizType: {
					id: "bizType",
					name: "种类",
					item: {
						'zj': {value: '1', name: '资金'},
						'jgxck': {value: '2', name: '结构性存款'}, 
						'yhtc': {value : '3', name: '银行同存'}, 
						'fytc': {value : '4', name: '非银同存'}, 
						'xyck': {value : '5', name: '协议存款'}
					}
				},
				pledgeType: {
					id: "pledgeType",
					name: "模式",
					item: {
						'cj': {value : '7', name: '拆借'}, 
						'yll': {value : '1', name: '押利率'}, 
						'yxy': {value : '2', name: '押信用'}, 
						'yzz': {value : '3', name: '押中债'}, 
						'ysq': {value : '4', name: '押上清'}, 
						'ycd': {value : '5', name: '押存单'}, 
						'qt': {value : '6', name: '其他'}
					}
				},
				termType: {
					id: "termType",
					name: "期限",
					item: {
						'1d': {value : '1', name: '隔夜'}, 
						'1w': {value : '2', name: '7天'}, 
						'2w': {value : '3', name: '14天'}, 
						'3w': {value : '9', name: '21天'}, 
						'1m': {value : '4', name: '1个月'}, 
						'3m': {value : '5', name: '3个月'}, 
						'6m': {value : '6', name: '6个月'}, 
						'9m': {value : '7', name: '9个月'}, 
						'1y': {value : '8', name: '1年'}, 
						'qt': {value : '0', name: '其他'}
					}
				},
				amount: {
					id: "amount",
					name: "金额",
					item: {
						'5k': {value : '|5000', name: '≤5000万'}, 
						'10k': {value : '5000|10000', name: '5000万-1亿'}, 
						'50k': {value : '10000|50000', name: '1亿-5亿'}, 
						'100k': {value : '50000|100000', name: '5亿-10亿'}, 
						'big100k': {value : '100000|', name: '≥10亿'}
					}
				},
				amountUnit: {
					id: "amountUnit",
					name: "金额单位",
					item: {
						'wan': {value : '0', name: '万'},
						'yi': {value : '1', name: '亿'}
					}
				},
				termUnit: {
					id: "termUnit",
					name: "期限单位",
					item: {
						'day': {value : '1', name: '天'},
						'month': {value : '2', name: '月'},
						'year': {value : '3', name: '年'}
					}
				},
				rateType: {
					id: "rateType",
					name: "利率类型",
					item: {
						'jiaquan': {value : '1', name: '加权'},
						'jiadian': {value : '2', name: '加点'},
						'jiandian': {value : '3', name: '减点'},
						'zdy': {value : '4', name: '自定义'}
					}
				}
			}
		},
		/**
		 * 模块独享方法
		 */
		func: {
			/**
			 * 数据字典转码（根据值或者编码转码）
			 * @param module 业务模块
			 * @param type 类型
			 * @param code 编码或值
			 */
			transToHtml: function (module, type, o) {
				var self = xbfaxConfig;
				
				if ('amount' == type) {
					var amount = o.amount || 0;
					var dealAmount = o.dealAmount || 0;
					var unit = o.unit;
					
					if (o.isDeal) {
						return dealAmount/10000 + ' 亿';
					} else {
						var totalAmount = new Number(amount) ;//+ new Number(dealAmount);
						if (!!totalAmount) {
							if (unit == self[module].constant.local.amountUnit.item.yi.value) {
								totalAmount = totalAmount/10000;
							}
							unit = self.func.getNameByValue(module, 'amountUnit', unit);
							return totalAmount + unit;
						}
					}
				} else if ('rate' == type) {
					var isBargain = o.isBargain;
					if (isBargain == true) {
						return "可议价";
					}
					var rate = o.rate || o.offeredRate || 0;
					if (!!rate && rate != "--" && rate != "" && rate != null) {
						var reg = new RegExp(xbfaxConfig.common.reg.rate_quote_ext);
						if (reg.test(rate)) {
							return rate;
						} else {
							return rate + '%';
						}
					}
				} else if ('termType' == type) {
					var termType = o.termType;
					if (termType == self[module].constant.local.termType.item.qt.value) {
						var minTerm = o.minTermText;
						var maxTerm = o.maxTermText;
						var termUnit = o.termUnit;
						
						if (!!termUnit) {
							termUnit = self.func.getNameByValue(module, 'termUnit', termUnit);
						}
						
						if (!!minTerm && !!maxTerm) {
							if (minTerm == maxTerm) {
								return minTerm + termUnit;
							} else {
								return minTerm + termUnit + "-" + maxTerm + termUnit;
							}
						} else if (!minTerm && !maxTerm) {
							return "";
						} else if (!!minTerm && !maxTerm) {
							return minTerm + termUnit;
						} else if (!minTerm && !!maxTerm) {
							return maxTerm + termUnit;
						}
					} else {
						return self.func.getNameByValue(module, type, termType);
					}
				} else if ('bizOrPledgetype' == type) {
					var result = "";
					var isOffline = o.isOffline;
					var fieldVal = o.pledgeType;
					var constantObj = 'pledgeType';
					
					if (self[module].constant.local.isOffline.item.off.value == isOffline) {
						fieldVal = o.bizType;
						constantObj = 'bizType';
					}
					
					if (!!fieldVal) {
						var arr = fieldVal.split(",");
						$.each(arr, function(inx, t) {
							if (!!t) {
								result += self.func.getNameByValue(module, constantObj, t) + ",";
							}
						});
						if (result.indexOf(",") != -1) {
							result = result.substring(0, result.length-1);
						}
						return result;
					}
				}
				
				return self.common.constant.defVal;
			}
		}
	},
	/**
	 * 公共方法
	 */
	func: {
		/**
		 * 数据字典转码（根据值转码）
		 * @param module 业务模块
		 * @param type 类型
		 * @param value 值
		 */
		getNameByValue: function (module, type, value) {
			var self = xbfaxConfig;
			var result = self.common.constant.defVal;
			
			if (typeof value === 'object') {
				if (!!self[module].func && typeof self[module].func.transToHtml === 'function') {
					return self[module].func.transToHtml(module, type, value);
				} else {
					console.error('xbfax.config.js 模块['+ module +']缺少数据字典转换方法transToHtml');
					return result;
				}
			}
			
			value = value + "";
			if (undefined == value || null == value || "" == value) {
				return result;
			}
			
			
			var constant = self[module].constant.local[type];
			if (!!constant) {
				for (var t in constant.item) {
					var obj = constant.item[t];
					if (obj.value == value) {
						result = obj.name;
						break;
					}
				}
			}
			
			return result;
		},
		/**
		 * 数据字典转码（根据编码转码）
		 * @param module 业务模块
		 * @param type 类型
		 * @param code 编码
		 */
		getNameByCode: function (module, type, code) {
			var self = xbfaxConfig;
			var result = self.common.constant.defVal;
			
			if (typeof code === 'object' && code != null) {
				if (!!self[module].func && typeof self[module].func.transToHtml === 'function') {
					return self[module].func.transToHtml(module, type, code);
				} else {
					console.error('xbfax.config.js 模块['+ module +']缺少数据字典转换方法transToHtml');
					return result;
				}
			}
			
			code = code + "";
			if (undefined == code || null == code ) {
				return result;
			}
			
			var constant = self[module].constant.local[type];
			if (!!constant) {
				for (var t in constant.item) {
					if (t == code) {
						var obj = constant.item[t];
						result = obj.name;
						break;
					}
				}
			}
			
			return result;
		},
		/**
		 * 数据字典转码（根据值或者编码转码）
		 * @param module 业务模块
		 * @param type 类型
		 * @param code 编码或值
		 */
		getNameByValueOrCode: function (module, type, code) {
			var result = xbfaxConfig.func.getNameByValue(module, type, code);
			
			if (xbfaxConfig.common.constant.defVal == result) {
				result = xbfaxConfig.func.getNameByCode(module, type, code);
			}
			
			return result;
		},
		/**
		 * 根据模板进行数据字典转码（根据值或者编码转码），转换后为HTML代码
		 * @param module 业务模块
		 * @param type 类型
		 * @param code 编码或值
		 * @param tmpl 模板
		 */
		transToHtmlByTmpl: function (module, type, code, tmpl) {
			var self = xbfaxConfig;
			var result = self.func.getNameByValueOrCode(module, type, code);
			if (!!tmpl && typeof tmpl === 'string') {
				$.template("xbfax.config.tmpl."+type, tmpl);
				result = $.tmpl("xbfax.config.tmpl."+type, {value: result});
			}
			return result;
		}
	}
};
