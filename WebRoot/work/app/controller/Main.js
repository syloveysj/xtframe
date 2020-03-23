Ext.define('XTFrame.controller.Main', {
	extend: 'Ext.app.Controller',
	requires: [ 'XTFrame.view.Login' ],
	init: function(){
		this.control({
			// 点击登录按钮触发的登录事件
			'loginForm button[action=login]': {
				click: this.loginSystem
			},
			'loginForm': {
				show: function (o){
					var panel = o.down('form');
					var form = panel.getForm();
					var checkCode = panel.getComponent('checkCode');
					form.reset();
					checkCode.loadCodeImg();
					var system_username = Cookies.get('system_username');
					if(!Ext.isEmpty(system_username)) {
						form.findField("userName").setValue(system_username);
					}
				}
			},
			'viewportBorder': {
				addtabitem: function (config){
					/* 示范例子
					pubOPT.getMainView().fireEvent('addtabitem', {
						pid: '7',
						viewLayout: 'XTFrame.view.templet.PanelBorder',
						viewClass: ['XTFrame.view.system.SQLManager'],
//						controllers: '',
						closeAction: 'hide',
						title: 'SQL管理',
						tooltip: 'SQL管理',
						closable: true,
						autoScroll: true,
						autoDestroy: false
					});*/
					var pid = '_'+config.pid;
					var me = this;
					var main = this.getViewPanel().down("tabpanel");
					var panel = main.getComponent(pid);
					if(!panel){
						if(!Ext.isEmpty(config.controllers)){
							Ext.Array.each(config.controllers, function(controller){
								me.addController(controller);
							});
						}
						panel = viewFactory.getView(pid, config.viewLayout, config.viewClass);
						Ext.apply(panel, config);
					}
					this.openTab(panel, pid);
				},
				addcontroller: function (name){
					this.addController(name);
				}
			},
			'viewportBorder systemMenus': {
				itemclick: function (o, record, item, index, e){
					var me = this;
					var main = this.getViewPanel().down("tabpanel");
					if (record.get('leaf')){
						var pid = '_'+record.get('id');
						var menu = record.raw ? record.raw : record.data,
							configString,config,paramsString,params,viewLayout,viewClass,controllers;
						if(menu.menuType == 1){
							var panel = main.getComponent(pid);
							if(!panel){
								if(menu.url.indexOf('?') > -1){
									configString = menu.url.substring(0, menu.url.indexOf("?"));
									paramsString = menu.url.substring(menu.url.indexOf("?")+1);
								} else {
									configString = menu.url;
									paramsString = "";
								}
								config = configString.split('!');
								params = paramsString=="" ? null : pubOPT.getParamObj(paramsString);
								viewLayout = config[0];
								viewClass = config[1].split('&');
								controllers = config.length>=3 ? config[2].split('&') : "";
								
								if(!Ext.isEmpty(controllers)){
									Ext.Array.each(controllers, function(controller){
										me.addController(controller);
									});
								}
								panel = viewFactory.getView(pid, viewLayout, viewClass);
								panel.title = record.get('text');
								panel.tooltip = record.get('text');
								panel.closable = true;
								panel.autoScroll = true;
								panel.autoDestroy = false;
								panel.closeAction = 'hide';
								panel.params = params;
							}
							this.openTab(panel, pid);
						} else if(menu.menuType == 2){
							if(menu.url.indexOf('?') > -1){
								configString = menu.url.substring(0, menu.url.indexOf("?"));
								paramsString = menu.url.substring(menu.url.indexOf("?")+1);
							} else {
								configString = menu.url;
								paramsString = "";
							}
							config = configString.split('!');
							params = paramsString=="" ? null : pubOPT.getParamObj(paramsString);
							viewClass = config[0];
							controllers = config.length>=2 ? config[1].split('&') : "";
							
							if(!Ext.isEmpty(controllers)){
								Ext.Array.each(controllers, function(controller){
									me.addController(controller);
								});
							}
							var win = viewFactory.getWindow(pid, viewClass);
							win.params = params;
							win.show();
						}
					}
				}
			},
			'viewportBorder contentPanel': {
				resize: function(o, w, h, e){
					o.doLayout();
				}
			},
			'viewportBorder southPanel menuitem[action=refreshServers]': {
				click: function(o, e){
					var data = ajaxUtil.serverBreak(o.command);
					if (ajaxUtil.isSucceed(data)) {
						this.showMessage("成功",o.text+"成功!");
					}else{
						this.showMessage("失败",o.text+"失败!");
					}
				}
			},
			'viewportBorder southPanel menuitem[action=logout]': {
				click: function(o, e){
					var data = ajaxUtil.logout();
					if (ajaxUtil.isSucceed(data)) {
						document.location.reload(true);
					}else{
						viewFactory.getWindow('loginWindow', 'XTFrame.view.Login').show();
					}
				}
			},
			'viewportBorder southPanel button[action=searchUser]': {
				click: function(o, e){
					this.addController('contact.UsersListWindow');
					viewFactory.getWindow('usersListWindow', 'XTFrame.view.contact.UsersListWindow').show();
				}
			}
		});
	},
	onLaunch: function(){
		if(!this.initSystem()){
			this.showLoginWindow();
		} else {
			this.show();
		}
//		console.log(info);
//		debugger;
	},
	config: {
		userInfo: null,
		menuData: null,
		viewPanel: null
	},
	addController: function(name){
		var flag = false;
		this.application.controllers.eachKey(function(v,o,i){
			if(v == name) flag = true;
		});
		if(!flag){
			var controller = this.getController(name);
//			controller.init();
		}
	},
	show: function(){
		var viewPanel = Ext.create('XTFrame.view.templet.ViewportBorder', {
			id: '_xtframMainView',
			items: [Ext.create('XTFrame.view.Header'),
			Ext.create('XTFrame.view.Menu'),
			Ext.create('XTFrame.view.TabPanel'),
			Ext.create('XTFrame.view.South')]
		});
		viewPanel.addEvents({'addtabitem': true});
		viewPanel.addEvents({'addcontroller': true});
		
		this.setViewPanel(viewPanel);
		var bottom = this.getViewPanel().down("toolbar");
		bottom.userInfo.setText("当前用户："+this.getUserInfo().username);
		if(this.getUserInfo().username == 'admin'){
			bottom.startMenu.add([{
				text: '服务器刷新',
				menu: Ext.createWidget('menu', {
					items: [
                        {text: 'SQL刷新', action: 'refreshServers', command: 'sql'},
						{text: '菜单刷新', action: 'refreshServers', command: 'menu'},
						{text: '逻辑刷新', action: 'refreshServers', command: 'logic'},
						{text: '资源刷新', action: 'refreshServers', command: 'res'},
						{text: '字典刷新', action: 'refreshServers', command: 'dictionary'},
						{text: '角色刷新', action: 'refreshServers', command: 'role'},
						{text: '数据刷新', action: 'refreshServers', command: 'systemdata'},
						{text: '数据库配置刷新', action: 'refreshServers', command: 'database'},
						{text: 'Web页面配置刷新', action: 'refreshServers', command: 'webpages'},
						{text: '全部刷新', action: 'refreshServers', command: 'server'},
						{text: '刷新缓存', action: 'refreshServers', command: 'oscache'}
					]
				})
            }]);
		}
		bottom.startMenu.add([{text: '退出系统', action: 'logout'}]);
		var menuTree = this.getViewPanel().down("treepanel");
		var rootNode = menuTree.getStore().getRootNode();
		rootNode.appendChild(this.getMenuData());
	},
	initSystem: function (){
		var userInfo = ajaxUtil.userInfo();
		if(!ajaxUtil.isSucceed(userInfo)) return false;
		this.setUserInfo(userInfo);
		var menuData = ajaxUtil.menu();
		if(!ajaxUtil.isSucceed(menuData)) return false;
		
		/*删除88888菜单*/
		for(var i=menuData.rows.length-1; i>=0; i--) {
			if(menuData.rows[i].menuIdPath.indexOf('88888') == 0) {
				menuData.rows.splice(i, 1);
			}
		}
		
		this.setMenuData(pubOPT.treeNodeUnil(menuData.rows, undefined, {iconCls: 'menuIcon'}));
		return true;
	},
	showLoginWindow: function (){
		viewFactory.getWindow('loginWindow', 'XTFrame.view.Login').show();
	},
	loginSystem: function(o, e){
		var me = this;
		var panel = o.up('form');
		var form = panel.getForm();
		var win = o.up('window');
		if(form.isValid()){
			var obj = form.getValues();
			var userInfoLoin = {userName: obj.userName, pwd: obj.passWord, rand: obj.checkCode};
			Ext.get(panel.getId()).mask('请稍后...');
			ajaxUtil.login(userInfoLoin, {
				async: true,
				success: function(data) {
					Ext.get(panel.getId()).unmask();
					if(ajaxUtil.isSucceed(data)){
						Cookies.set('system_username', obj.userName);
						if(me.getUserInfo()){
							if(me.getUserInfo().username!=obj.userName){
								document.location.reload(true);
							} else {
								win.hide();
							}
						} else {
							win.hide();
							me.initSystem();
							me.show();
						}
					}else{
						if(data.bRand == false){
							me.showMessage("登录失败", "验证码错误！");
						}else{
							me.showMessage("登录失败", "用户名或密码错误！");
							form.findField("passWord").setValue("");
						}
						form.findField("checkCode").loadCodeImg();
					}
				},
				failure: function() {
					Ext.get(panel.getId()).unmask();
					me.showMessage("登录失败", "连接失败！");
				}
			});
		}
	},
	openTab: function (panel, id){ 
        var pid = (typeof panel == "string" ? panel : id || panel.id);
		var main = this.getViewPanel().down("tabpanel");
        var tab = main.getComponent(pid);      
        if (tab) {
            main.setActiveTab(tab); 
        } else if(typeof panel!="string"){
            panel.id = pid;
            main.add(panel.show());
            main.setActiveTab(panel);
        }
    },
	showMessage: function(title, msg){
		Ext.MessageBox.show({
			width:150,
			title:title,
			buttons: Ext.MessageBox.OK,
			msg:msg
		});
	}
});