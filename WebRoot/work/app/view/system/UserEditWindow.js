Ext.define('XTFrame.view.system.UserEditWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.systemUserEditWindow',
	requires: [ 'Ext.form.*',
				'Ext.data.Store'],
	action: 'gridEditWindow',
	title: '用户编辑',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	initComponent:function(){
		var me = this;
		this.organStore = Ext.create('Ext.data.Store', {
			fields: ['orgid', 'orgname'],
		    data : []
		});
		this.jobStore = Ext.create('Ext.data.Store', {
			fields: ['jobid', 'jobname'],
		    data : []
		});
		this.stateStore = Ext.create('Ext.data.Store', {
			fields: ['text', 'value'],
		    data : [{text: '待定', value: 0},
		    		{text: '在职', value: 1},
		    		{text: '离职', value: 2}]
		});
		
		Ext.apply(this,{
			items: {
				xtype: 'form',
				width: 600,
				height: 506,
				border: false,
		        bodyPadding: 5,
		        frame: true,
		        layout: 'column',
				fieldDefaults: {
					labelAlign: 'right',
		            labelWidth: 60,
		            anchor: '98%'
				},
				items: [{
					xtype: 'fieldset',
					title: '基本信息',
					columnWidth: .5,
					layout: 'column',
					items:[{
						xtype: 'textfield',
						name:'userid',
						fieldLabel: '用户编号',
						selectOnFocus:true,
						readOnly: true,
						columnWidth: 1.
					},{
						xtype: 'textfield',
						name:'username',
						fieldLabel: '账号',
						allowBlank:false,
						blankText:"不能为空，请填写",
						vtype: 'alphanum',
						columnWidth: 1.
					},{
						xtype: 'textfield',
						name:'realname',
						fieldLabel: '真实姓名',
						columnWidth: 1.
					},{
						xtype: 'radiogroup',
						fieldLabel: '性别',
						columnWidth: 1.,
		                items: [
							{boxLabel: '男', checked: true, inputValue: '男', name: 'sex'},
							{boxLabel: '女', inputValue: '女', name: 'sex'}
		                ]
					},{
						xtype: 'datefield',
						format: 'Y-m-d',
						name:'birthday',
						fieldLabel: '出身日期',
						selectOnFocus:true,
						editable:false,
						columnWidth: 1.,
						maxValue: new Date()
					},{
						xtype: 'textfield',
						name:'idcard',
						fieldLabel: '身份证号',
						columnWidth: 1.
					},{
						xtype: 'combo',
						name:'orgid',
						fieldLabel: '所在机构',
						store : this.organStore,
						emptyText: '请选择',
						allowBlank: false,
						queryMode: 'local',
						displayField: 'orgname',
						valueField: 'orgid',
						selectOnFocus:true,
						editable:false,
						columnWidth: 1.
					},{
						xtype: 'combo',
						name:'jobid',
						fieldLabel: '所在岗位',
						store : this.jobStore,
						emptyText: '请选择',
						queryMode: 'local',
						displayField: 'jobname',
						valueField: 'jobid',
						value: 0,
						selectOnFocus:true,
						editable:false,
						columnWidth: 1.
					},{
						xtype: 'textfield',
						name:'address',
						fieldLabel: '家庭住址',
						columnWidth: 1.
					}]
				},{
					xtype: 'tbtext',
					columnWidth: .02,
					text:'&nbsp'
				},{
					xtype: 'fieldset',
					title: '个人照片',
					columnWidth: .48,
					height: 262,
					padding: '5 5 5 5',
					layout: 'column',
					items:[{
						xtype: 'image',
						name: 'showPhoto',
						src: '/work/resources/images/icons/defaultphoto.png',
						height: 200,
						columnWidth: 1.
					},{
						xtype: 'tbtext',
						height: 10,
						columnWidth: 1.,
						text:'&nbsp'
					},{
						xtype: 'button',
						action: 'uploadFile',
						parentView: me,
						windowTitle: '照片上传',
						linkUrl: '/server/imageUpload.do',
						text: '更改照片',
						columnWidth: 1.
					},{
				        xtype: 'hiddenfield',
				        name: 'photo',
				        value: ''
				    }]
				},{
					xtype: 'fieldset',
					title: '联系方式',
					columnWidth: .5,
					layout: 'column',
					items:[{
						xtype: 'textfield',
						name:'tel',
						fieldLabel: '联系电话',
						vtype: 'phone',
						columnWidth: 1.
					},{
						xtype: 'textfield',
						name:'mobile',
						fieldLabel: '手机',
						vtype: 'mobilephone',
						columnWidth: 1.
					},{
						xtype: 'textfield',
						name:'email',
						vtype: 'email',
						fieldLabel: '电子邮件',
						columnWidth: 1.
					}]
				},{
					xtype: 'tbtext',
					columnWidth: .02,
					text:'&nbsp'
				},{
					xtype: 'fieldset',
					title: '密码设置',
					columnWidth: .48,
					layout: 'column',
					items:[{
						xtype: 'textfield',
						id: 'userPwd',
						name:'pwd',
						fieldLabel: '密码',
						columnWidth: 1.,
						inputType : 'password'
					},{
						xtype: 'textfield',
						name:'rpwd',
						fieldLabel: '重复密码',
						vtype: 'passwd',
						initialPassField: 'userPwd',
						columnWidth: 1.,
						inputType : 'password'
					}]
				},{
					xtype: 'fieldset',
					title: '其它',
					columnWidth: 1.,
					layout: 'column',
					items:[{
						xtype: 'textarea',
						name:'remark',
						height: 49,
						fieldLabel: '备注',
						columnWidth: .7
					},{
						xtype: 'textfield',
						name:'sortno',
						fieldLabel: '序号',
						value: 99,
						selectOnFocus:true,
						allowBlank:false,
						blankText:"不能为空，请填写",
						vtype: 'integer',
						columnWidth: .3
					},{
						xtype: 'combo',
						name:'state',
						fieldLabel: '状态',
						store : this.stateStore,
						emptyText: '请选择',
						queryMode: 'local',
						displayField: 'text',
						valueField: 'value',
						value: 1,
						selectOnFocus:true,
						editable:false,
						columnWidth: .3
					}]
				}],
				buttons: [{
					text:'保　存',
					action: 'gridEditSave',
					formBind: true
				},{
					text:'取　消',
					action: 'gridEditCancel'
				}]
			}
		});
		this.addEvents({'uploadsuccess': true});
		this.callParent(arguments);
	}
});