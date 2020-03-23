Ext.define("XTFrame.view.contact.UserContactPanel",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.contactUserContactPanel',
	region: 'east',
	hidden: true,
    title: '联系',
    width: 200,
    layout: {
		type: 'vbox',
		align: 'stretch',
		padding: 2
	},
	tools: [{type:'left'}],
    initComponent: function(){
    	Ext.apply(this, {
    		userid: '',
    		items: [{
				xtype: 'image',
				name: 'showPhoto',
				src: '/images/icons/defaultphoto.png',
				height: 200
			},{
    			xtype: 'label',
    			name: 'userName',
    			height: 20
    		},{
    			xtype: 'label',
    			name: 'realName',
    			height: 20
    		},{
    			xtype: 'tbfill'
    		},{
    			xtype: 'button',
    			iconCls: 'icon-mail',
    			action: 'sendMail',
    			text: '发送邮件'
    		}]
    	});
    	this.callParent(arguments);
    }
});