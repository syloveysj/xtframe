Ext.define('XTFrame.util.AjaxUtil', {
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
			strData: Ext.JSON.encode({userInfoLoin: _userInfoLoin})
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
			strData: Ext.JSON.encode({sqlID: _sqlID,
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
			strData: Ext.JSON.encode({sqlID: _sqlID,
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
			strData: Ext.JSON.encode({sqlID: _sqlID,
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
			strData: Ext.JSON.encode({arrSqlObject: _arrSqlObject})
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
			strData: Ext.JSON.encode({arrSqlObject: _arrSqlObject})
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
			strData: Ext.JSON.encode({type: _type})
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
			strData: Ext.JSON.encode({name: _name,
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
			strData: Ext.JSON.encode({arrNameValue: _arrNameValue})
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
			strData: Ext.JSON.encode({sqlID: _sqlID,
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
		if(!Ext.isEmpty(_id)) _data.strData = Ext.JSON.encode({id: _id});
		
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
		if(!Ext.isEmpty(_processName)) _strData.processName = _processName;
		_data.strData = Ext.JSON.encode(_strData);
		
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
			strData: Ext.JSON.encode({iType: _iType,
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
		if(!Ext.isEmpty(_outcome)) _strData.outcome = _outcome;
		if(!Ext.isEmpty(_variables)) _strData.variables = _variables;
		_data.strData = Ext.JSON.encode(_strData);
		
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
			strData: Ext.JSON.encode({taskId: _taskId})
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
			strData: Ext.JSON.encode({deploymentId: _deploymentId})
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
			strData: Ext.JSON.encode({execAction: _execAction, parameters: _parameters})
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
	isLogin : function (_data) {
		if ((typeof(_data) == "object") && (_data !== null)) {
			if ("bLogin" in _data) 
				if (_data.bLogin){
					viewFactory.getWindow('loginWindow', 'XTFrame.view.Login').show();
					return true;
				}
		}
		return false;
	},
	
	/**
     * 异步加载服务器数据
     */
	t_async : function (_data, _op) {
		var me = this;
		var success = function(response, options){
			var data = me.evalJSON(response.responseText);
			me.isLogin(data);
			if(typeof(_op.success) == "function") _op.success(data);
		};
		
		var failure = function(response, options){
			if(typeof(_op.failure) == "function") _op.failure();
		};
		
		Ext.Ajax.request({
			url: "/server/ajax.do",
			method: "POST",
			timeout: 60000,
			params: _data,
			success: success,
			failure: failure
		});
	},
	
	/**
     * 同步加载服务器数据
     */
	f_async : function(_data) {
		var html = Ext.Ajax.request({
			url: "/server/ajax.do",
			method: "POST",
			timeout: 60000,
			params: _data,
			async: false
		}).responseText;
		var data = this.evalJSON(html);
		this.isLogin(data);
		return data;
	}
});

var ajaxUtil = Ext.create('XTFrame.util.AjaxUtil');