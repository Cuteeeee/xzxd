Date.prototype.Format = function(fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o)
    if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1) ?(o[k]) :(("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/* 
 *  方法:Array.remove(dx) 
 *  功能:根据元素位置值删除数组元素. 
 *  参数:元素值 
 *  返回:在原数组上修改数组 
 *  作者：pxp 
 */  
Array.prototype.remove = function(dx) { 
    if(isNaN(dx) || dx > this.length) {  
        return false;  
    }  
    for(var i = 0, n = 0; i < this.length; i++) {  
        if(this[i] != this[dx]) {  
            this[n++] = this[i];  
        }  
    }  
    this.length -= 1;  
}; 
/*
 * @brief: 定义堆栈类
 * @remark: 实现堆栈基本功能
 */
function Stack(){
    //存储元素数组
    var aElement = new Array();
    /*
    * @brief: 元素入栈
    * @param: 入栈元素列表
    * @return: 堆栈元素个数
    * @remark: 1.Push方法参数可以多个
    *    2.参数为空时返回-1
    */
    Stack.prototype.Push = function(vElement){
        if(arguments.length == 0)
            return - 1;
        //元素入栈
        for(var i = 0; i < arguments.length; i++){
            aElement.push(arguments[i]);
        }
        return aElement.length;
    }
    /*
    * @brief: 元素出栈
    * @return: vElement
    * @remark: 当堆栈元素为空时,返回null
    */
    Stack.prototype.Pop = function(){
        if(aElement.length == 0)
            return null;
        else
            return aElement.pop();
    }
    /*
     * @brief: 元素出栈
     * @return: vElement
     * @remark: 当堆栈元素为空时,返回null
     */
     Stack.prototype.remove = function(){
    	 aElement.remove(aElement.length);
     }
    /*
    * @brief: 获取堆栈元素个数
    * @return: 元素个数
    */
    Stack.prototype.GetSize = function(){
        return aElement.length;
    }
    /*
    * @brief: 返回栈顶元素值
    * @return: vElement
    * @remark: 若堆栈为空则返回null
    */
    Stack.prototype.GetTop = function(){
        if(aElement.length == 0)
            return null;
        else
            return aElement[aElement.length - 1];
    }
    /*
    * @brief: 将堆栈置空  
    */
    Stack.prototype.MakeEmpty = function(){
        aElement.length = 0;
    }
    /*
    * @brief: 判断堆栈是否为空
    * @return: 堆栈为空返回true,否则返回false
    */
    Stack.prototype.IsEmpty = function(){
        if(aElement.length == 0)
            return true;
        else
            return false;
    }
    /*
    * @brief: 将堆栈元素转化为字符串
    * @return: 堆栈元素字符串
    */
    Stack.prototype.toString = function(){
        var sResult =(aElement.reverse()).toString();
        aElement.reverse()
        return sResult;
    }
}
