jQuery.extend(
{
	/**
	* @see  判断传递进来的值为null、undefined或者一个空的字符串
	* @param   需要测试的值
	* @return 返回boolean
	*/
	isEmpty : function (value, allowBlank){
		if(value==null && value==undefined && (allowBlank==undefined || allowBlank || value=="")) {
			return true;
		} else {
			return false;
		}
	}
});
jQuery.extend(
{
	/**
	* @see  将json字符串转换为对象
	* @param   json字符串
	* @return 返回object,array,string等对象
	*/
	evalJSON : function (strJson){
		try {
			return eval( "(" + strJson + ")");
		} catch(e){
			return "";
		}
	}
});
jQuery.extend(
{
	/**
	* @see  将javascript数据类型转换为json字符串
	* @param 待转换对象,支持object,array,string,function,number,boolean,regexp
	* @return 返回json字符串
	*/
	toJSON : function (object){
		var type = typeof object;
		if ('object' == type && object !== null)
		{
			if (Array == object.constructor)
				type = 'array';
			else if (RegExp == object.constructor)
				type = 'regexp';
			else
				type = 'object';
		}
		switch(type)
		{
			case 'undefined':
			case 'unknown': 
				return;
				break;
			case 'function':
			case 'boolean':
			case 'regexp':
				return object.toString();
				break;
			case 'number':
				return isFinite(object) ? object.toString() : 'null';
				break;
			case 'string':
				return '"' + object.replace(/(\\|\")/g,"\\$1").replace(/\n|\r|\t/g,
				function(){
					var a = arguments[0];
					return  (a == '\n') ? '\\n':
   						(a == '\r') ? '\\r':
   						(a == '\t') ? '\\t': ""
				}) + '"';
				break;
			case 'object':
				if (object === null) return 'null';
				var results = [];
				for (var property in object) {
					var value = jQuery.toJSON(object[property]);
					if (value !== undefined)
					results.push(jQuery.toJSON(property) + ':' + value);
				}
				return '{' + results.join(',') + '}';
				break;
			case 'array':
				var results = [];
				for(var i = 0; i < object.length; i++)
				{
					var value = jQuery.toJSON(object[i]);
					if (value !== undefined) results.push(value);
				}
				return '[' + results.join(',') + ']';
				break;
		}
	}
});

jQuery.extend(
{
	/**
	* @see  写入读取Cookie插件
	* 设置cookie的值 example $.cookie('the_cookie', 'the_value');
	* 新建一个cookie 包括有效期 路径 域名等 example $.cookie('the_cookie', 'the_value', {expires: 7, path:'/', domain: 'jquery.com', secure: true});
	* 新建cookie example $.cookie('the_cookie', 'the_value');
	* 删除一个cookie example $.cookie('the_cookie', null);
	*/
	cookie : function(name, value, options) { 
		if (typeof value != 'undefined') {
			options = options || {}; 
			if (value === null) { 
				value = ''; 
				options.expires = -1; 
			} 
			var expires = ''; 
			if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) { 
				var date; 
				if (typeof options.expires == 'number') { 
					date = new Date(); 
					date.setTime(date.getTime() + (options.expires * 60 * 1000)); 
				} else { 
					date = options.expires; 
				} 
				expires = '; expires=' + date.toUTCString();
			} 
			var path = options.path ? '; path=' + options.path : ''; 
			var domain = options.domain ? '; domain=' + options.domain : ''; 
			var secure = options.secure ? '; secure' : ''; 
			document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join(''); 
		} else {
			var cookieValue = null; 
			if (document.cookie && document.cookie != '') { 
				var cookies = document.cookie.split(';'); 
				for (var i = 0; i < cookies.length; i++) { 
					var cookie = jQuery.trim(cookies[i]); 
					if (cookie.substring(0, name.length + 1) == (name + '=')) { 
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1)); 
						break; 
					} 
				} 
			} 
			return cookieValue; 
		} 
	}
});

var AjaxUtil = function (){};

AjaxUtil.command = AjaxUtil.prototype = {
	AJAXACTION: '/server/ajax.do',
	LOGINPATH: '/p100012.html',
	
	//用户登录
	FUNC_LOGIN : 2,
	
	//退出登录
	FUNC_LOGOUT : 3,
	
	//查询方法
	FUNC_EXECUTEQUERY : 4,

	//更新方法
	FUNC_EXECUTEUPDATE : 5,
	
	//自增主键的插入方法
	FUNC_INSERT : 6,
	
	//事务提交
	FUNC_EXECUTETRANSACTION : 7,
	
	//批量查询
	FUNC_EXECUTEQUERYTRANSACTION : 8,
	
	//获取菜单
	FUNC_MENU : 9,
	
	//刷新服务器加载数据
	FUNC_SERVER_BREAK : 10,
	
	//获取当前用户信息
	FUNC_USERINFO : 11,
	
	//获取服务器数据
	FUNC_SERVER_DATA : 12,
	
	//批量获取服务器数据
	FUNC_SERVER_DATA_LIST : 13,
	
	//执行存储过程
	FUNC_PREPARECALL : 14,
	
	//分页查询数据
	FUNC_PAGING : 15,
	
	//获取流程定义列表
	FUNC_PROCESSDEFINITION_LIST : 51,
	
	//获取流程实例列表
	FUNC_PROCESSINSTANCE_LIST : 52,
	
	//获取任务列表
	FUNC_TASK_LIST : 53,
	
	//开启流程
	FUNC_STARTPROCESS : 54,
	
	//流程图信息
	FUNC_PROCESSVIEW : 55,
	
	//完成任务
	FUNC_COMPLETETASK : 56,
	
	//任务页面
	FUNC_TASKPAGE : 57,
	
	//删除部署
	FUNC_DELETEDEPLOYMENT : 58,
	
	//执行自定义处理
	FUNC_CUSTOM : 999,
	/**
     * 用户登录
     * @param {Array} _arrNamePwd 用户名称和密码数组
     */
	login : function (_userInfoLoin, _op){
		var _data = {
			iFunc: this.FUNC_LOGIN,
			strData: jQuery.toJSON({userInfoLoin: _userInfoLoin})
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	
	/**
     * 退出登录
     */
	logout : function (_op){
		var _data = {
			iFunc: this.FUNC_LOGOUT
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 执行查询
     * @param {String} _sqlID sql编号
     * @param {Array} _arrValue 参数值
     */
    executeQuery : function (_sqlID, _parameters, _op){
        var _data = {
			iFunc: this.FUNC_EXECUTEQUERY,
			strData: jQuery.toJSON({sqlID: _sqlID,
						parameters: _parameters})
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
    },
	
	/**
     * 执行更新
     * @param {String} _sqlID sql编号
     * @param {Array} _arrValue 参数值
     */
	executeUpdate : function (_sqlID, _parameters, _op){
		var _data = {
			iFunc: this.FUNC_EXECUTEUPDATE,
			strData: jQuery.toJSON({sqlID: _sqlID,
						parameters: _parameters})
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 执行自增主键的插入
     * @param {String} _sqlID sql编号
     * @param {Array} _arrValue 参数值
     */
	executeInsert : function (_sqlID, _arrValue, _op){
		var _data = {
			iFunc: this.FUNC_INSERT,
			strData: jQuery.toJSON({sqlID: _sqlID,
						arrValue: _arrValue})
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 执行事务
     * @param {Array} _arrSqlValue sql编号，参数值
     */
	executeTransaction : function (_arrSqlObject, _op){
		var _data = {
			iFunc: this.FUNC_EXECUTETRANSACTION,
			strData: jQuery.toJSON({arrSqlObject: _arrSqlObject})
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 执行批量查询
     * @param {Array} _arrSqlValue sql编号，参数值
     */
	executeQueryTransaction : function (_arrSqlObject, _op){
		var _data = {
			iFunc: this.FUNC_EXECUTEQUERYTRANSACTION,
			strData: jQuery.toJSON({arrSqlObject: _arrSqlObject})
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 菜单
     */
	menu : function (_op){
		var _data = {
			iFunc: this.FUNC_MENU
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 刷新服务器加载数据
     */
	serverBreak : function (_type, _op){
		var _data = {
			iFunc: this.FUNC_SERVER_BREAK,
			strData: jQuery.toJSON({type: _type})
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 获取当前用户信息
     */
	userInfo : function (_op){
		var _data = {
			iFunc: this.FUNC_USERINFO
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 获取服务器数据
     */
	serverData : function (_name, _parameters, _op){
		var _data = {
			iFunc: this.FUNC_SERVER_DATA,
			strData: jQuery.toJSON({name: _name,
						parameters: _parameters})
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 批量获取服务器数据
     */
	serverDataList : function (_arrNameValue, _op){
		var _data = {
			iFunc: this.FUNC_SERVER_DATA_LIST,
			strData: jQuery.toJSON({arrNameValue: _arrNameValue})
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 分页查询数据
     */
	paging : function (_sqlID, _parameters, _offset, _maxsize, _op){
		var _data = {
			iFunc: this.FUNC_PAGING,
			strData: jQuery.toJSON({sqlID: _sqlID,
				parameters: _parameters,
				offset: _offset,
				maxsize: _maxsize
			})
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 获取流程定义列表
     */
	processDefinitionList : function (_op){
		var _data = {
			iFunc: this.FUNC_PROCESSDEFINITION_LIST
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 获取流程实例列表
     */
	processInstanceList : function (_id, _op){
		var _data = {
			iFunc: this.FUNC_PROCESSINSTANCE_LIST
		};
		if(!jQuery.isEmpty(_id)) _data.strData = jQuery.toJSON({id: _id});
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 获取任务列表
     */
	taskList : function (_op){
		var _data = {
			iFunc: this.FUNC_TASK_LIST
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 开启流程
     */
	startProcess : function (_id, _processName, _op){
		var _data = {
			iFunc: this.FUNC_STARTPROCESS
		};
		var _strData = {id: _id};
		if(!jQuery.isEmpty(_processName)) _strData.processName = _processName;
		_data.strData = jQuery.toJSON(_strData);
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 流程图信息
     */
	processView : function (_iType, _id, _op){
		var _data = {
			iFunc: this.FUNC_PROCESSVIEW,
			strData: jQuery.toJSON({iType: _iType,
						id: _id})
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 完成任务
     */
	completeTask : function (_taskId, _pageId, _opinion, _outcome, _variables, _op){
		var _data = {
			iFunc: this.FUNC_COMPLETETASK
		};
		var _strData = {taskId: _taskId,
			pageId: _pageId,
			opinion: _opinion
		};
		if(!jQuery.isEmpty(_outcome)) _strData.outcome = _outcome;
		if(!jQuery.isEmpty(_variables)) _strData.variables = _variables;
		_data.strData = jQuery.toJSON(_strData);
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 任务页面
     */
	taskPage : function (_taskId, _op){
		var _data = {
			iFunc: this.FUNC_TASKPAGE,
			strData: jQuery.toJSON({taskId: _taskId})
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 删除部署
     */
	deleteDeployment : function (_deploymentId, _op){
		var _data = {
			iFunc: this.FUNC_DELETEDEPLOYMENT,
			strData: jQuery.toJSON({deploymentId: _deploymentId})
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
     * 执行自定义处理
     */
	custom : function (_execAction, _parameters, _op){
		var _data = {
			iFunc: this.FUNC_CUSTOM,
			strData: jQuery.toJSON({execAction: _execAction, parameters: _parameters})
		};
		
		if ((typeof(_op) != "undefined") && ("async" in _op) && _op.async) {
			this.t_async(_data, _op);
		}else{
			return this.f_async(_data);
		}
	},
	
	/**
	* @see  将json字符串转换为对象
	* @param   json字符串
	* @return 返回object,array,string等对象
	*/
	evalJSON : function (_strJson){
		try {
			return eval( "(" + _strJson + ")");
		} catch(e){
			return "";
		}
	},
	
	/**
     * 判断是否成功得到数据
     */
	isSucceed : function(_data) {
		if((typeof(_data) == "object") && ("bSucceed" in _data) && _data.bSucceed) return true;
		else return false;
	},
	
	/**
     * 判断是否要重新登录
     */
	isLogin : function (_data, _bForward) {
		if ((typeof(_data) == "object") && (_data !== null)) {
			if ("bLogin" in _data) 
				if (_data.bLogin){
					if(_bForward==undefined || _bForward) window.top.location = this.LOGINPATH;
					return true;
				}
		}
		return false;
	},
	
	/**
     * 异步加载服务器数据
     */
	t_async : function (_data, _op) {
		var suc = function(msg){
			var data = jQuery.evalJSON(msg);
			if(typeof(_op.success) == "function") _op.success(data);
		};
		
		var err = function(){
			if(typeof(_op.error) == "function") _op.error();
		};
		
		jQuery.ajax({
			url: this.AJAXACTION,
			type: "POST",
			dataType: "html",
			timeout: 90000,
			data: _data,
			success: suc,
			error: err
		});
	},
	
	/**
     * 同步加载服务器数据
     */
	f_async : function(_data) {
		var html = jQuery.ajax({
			url: this.AJAXACTION,
			type: "POST",
			dataType: "html",
			timeout: 90000,
			data: _data,
			async: false
		}).responseText;
		var data = jQuery.evalJSON(html);
		return data;
	},
	
	/**
	 * 同步获取网页内容
	 */
	f_async_html : function(url){
		var flag = true;
		var html = jQuery.ajax({
			url: url,
			type: "POST",
			dataType: "html",
			timeout: 90000,
			async: false,
			error:function() {flag = false}
		}).responseText;
		if(flag){
			return html;
		} else {
			return null;
		}
	}
};