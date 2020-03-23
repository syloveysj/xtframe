Ext.define('XTFrame.view.South', {
	extend: 'Ext.Toolbar',
	alias: 'widget.southPanel',
	id: "bottom",
	frame: true,
	region: "south",
	height: 23,
	initComponent:function(){
		this.userInfo = Ext.create('Ext.toolbar.TextItem');
		this.startMenu = Ext.create('Ext.menu.Menu', {
			items: [
//				{text: '我的简历', handler: function(){ alert("我的简历 clicked"); }}
			]
		});
		Ext.apply(this,{
			items: [ {xtype: 'button', text: '开始', iconCls: 'icon-start', menu:this.startMenu},
				{xtype: 'tbseparator'},
				{xtype: 'tbspacer', width: 10},
				this.userInfo,
				'->',
				{xtype: 'button', text: '在线联系', action: 'searchUser', iconCls: 'icon-users'},
				{xtype: 'tbseparator'},
				"技术支持:<a href='http://www.xtframe.net' target='_blank' style='text-decoration:none;'><font color='#0000FF'> http://www.xtframe.net</font></a>&nbsp;&nbsp;" ]
		});
		this.callParent(arguments);
	}
})