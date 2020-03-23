Ext.define('XTFrame.controller.system.FileManager', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'systemFileManager': {
				uploadsuccess: function(win, data, action){
					var grid = win.parentView;
					var arrValue = {fileid:'',userid:'',filename:data.filename,filetype:data.filetype,filepath:data.url,filesize:data.filesize,safetype:1,savetime:''};
					var data = ajaxUtil.executeUpdate('xtframe_file_upload', arrValue);
					if(ajaxUtil.isSucceed(data)){
						win.close();
						Ext.xtframe.msg("提示", "上传成功！");
						grid.getStore().loadPage(1);
					} else {
						Ext.xtframe.msg("提示", "上传失败！");
					}
				}
			},
			'systemFileManager button[action=downloadFile]': {
				click: function (button, e){
					var grid = button.up('grid');
					var rows = grid.getSelectionModel().getSelection();
					if(rows.length == 1){
						pubOPT.downloadFile(rows[0].data.filepath);
					} else {
						Ext.xtframe.msg("提示", "请您选择一个下载文件");
					}
				}
			}
		});
	}
});