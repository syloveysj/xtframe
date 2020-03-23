jQuery.extend(jQuery, {
	// jQuery confirm弹出确认提示
	jqconfirm : function(text, title, fn) {
		var title = title ? title : "确认信息";
		if(jQuery("#__dialog_confirm").length > 0) jQuery("#__dialog_confirm").remove();
		var html = '<div id="__dialog_confirm" class="zhezhao">'
				+ '  <div class="zz_bg">' 
				+ '    <h4 id="__dialog_title">' + title + '</h4>'
				+ '    <p id="__dialog_text">' + text + '</p>'
				+ '    <a id="__dialog_ok" href="javascript:void(0);" class="fl">确定</a>' 
				+ '    <a id="__dialog_close" href="javascript:void(0);" class="fr fubtn">关闭</a>' 
				+ '  </div>'
				+ '</div>';
		var dialog = jQuery(html);
		jQuery(document.body).prepend(dialog);
		dialog.find("#__dialog_ok").click(function() {
			if(fn) {fn()};
			jQuery("#__dialog_confirm").hide();
			jQuery("#__dialog_confirm").remove();
		});
		dialog.find("#__dialog_close").click(function() {
			jQuery("#__dialog_confirm").hide();
			jQuery("#__dialog_confirm").remove();
		});
	},
	
	// jQuery alert弹出信息提示
	jqalert : function(text, title) {
		var title = title ? title : "提示信息";
		if(jQuery("#__dialog_alert").length > 0) jQuery("#__dialog_alert").remove();
		var html = '<div id="__dialog_alert" class="zhezhao">'
				+ '  <div class="zz_bg">' 
				+ '    <h4 id="__dialog_title">' + title + '</h4>'
				+ '    <p id="__dialog_text">' + text + '</p>'
				+ '    <a id="__dialog_ok" href="javascript:void(0);" class="fl">确定</a>' 
				+ '  </div>'
				+ '</div>';
		var dialog = jQuery(html);
		jQuery(document.body).prepend(dialog);
		dialog.find("#__dialog_ok").click(function() {
			jQuery("#__dialog_alert").hide();
			jQuery("#__dialog_alert").remove();
		});
	}
});