Ext.define('XTFrame.controller.File', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'button[action=uploadFile]': {
				click: this.uploadFileClick
			}
		});
	},
	uploadFileClick: function(button){
		var win = viewFactory.getWindow('uploadFile', 'XTFrame.view.UploadFile');
		win.parentView = button.parentView;
		win.title = button.windowTitle;
		win.uploadUrl = button.linkUrl;
		win.show();
	}
});