Ext.define('XTFrame.view.UploadFile', {
	extend: 'Ext.window.Window',
	alias: 'widget.uploadFile',
	requires: [ 'Ext.form.*' ],
	title: '文件上传',
	closeAction: 'hide',
	closable: true, 
	iconCls: 'win',
	layout: 'fit',
	modal: true, 
	plain: true,
	resizable: false,
	parentView: null,//上传成功后事件派发的对象
	uploadUrl: "",//上传路径
	initComponent: function(){
		var me = this;
		this.uploadField = Ext.create('Ext.form.field.File', {
			name: 'file',
	        fieldLabel: '文件',
	        labelWidth: 50,
	        msgTarget: 'side',
	        allowBlank: false,
	        anchor: '100%',
	        buttonText: '选择文件...'
		});
		Ext.apply(this, {
			items: {
				xtype: 'form',
				width: 400,
			    bodyPadding: 10,
			    frame: true,
			    renderTo: Ext.getBody(),
			    items: [ this.uploadField ],
			    buttons: [{
			        text: '上传',
			        handler: function() {
			            var form = this.up('form').getForm();
			            if(form.isValid()){
			                form.submit({
			                    url: me.uploadUrl,
			                    waitMsg: '文件上传中...',
			                    success: function(fp, o) {
			                    	me.parentView.fireEvent('uploadsuccess', me, o.result, o);
			                    },
			                    failure: function(fp, o) {
			                    	if('message' in o.result){
										Ext.Msg.alert('失败', o.result.message);
			                    	} else {
										Ext.Msg.alert('失败', me.title + '失败！');
			                    	}
			                    }
			                });
			            }
			        }
			    }]
			}
		});
		this.callParent(arguments);
	}
});