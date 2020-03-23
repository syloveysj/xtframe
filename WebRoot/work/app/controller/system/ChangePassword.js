Ext.define('XTFrame.controller.system.ChangePassword', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'systemChangePasswordWindow button[action=savePwd]': {
				click: function (button, e){
					var panel = button.up('form');
					var form = panel.getForm();
					var formObject = form.getValues();
					var arrValue = pubOPT.getFormValues(formObject, ['userid', 'pwd', 'newpwd']);
					var data = ajaxUtil.executeUpdate("xtframe_change_pass", arrValue);
					if(ajaxUtil.isSucceed(data) && data.rows>0) Ext.xtframe.msg("提示", "密码修改成功!");
					else Ext.xtframe.msg("提示", "密码修改失败！");
				}
			},
			'systemChangePasswordWindow button[action=resetForm]': {
				click: function (button, e){
					var panel = button.up('form');
					var form = panel.getForm();
					form.reset();
				}
			}
		});
	}
});