$(document).ready(function(e) {
	$('#js-modify').click(function(){
		var pass = $('#pastPassWord').val($.trim($('#pastPassWord').val())).val();	//旧密码
		var pass1 = $('#newPassWord').val($.trim($('#newPassWord').val())).val();	//新密码
		var pass2 = $('#newPassWords').val($.trim($('#newPassWords').val())).val();//重复密码
		if(typeof(pass) == 'undefined' || pass == ''){
			alert('请输入你的旧密码。');
			return;
		} else if (pass1 == '') {
			alert('新密码不能为空。');
			return;
		} else if (pass1.length < 6) {
			alert('新密码长度不能少于6位。');
			return;
		} else if (pass1 != pass2) {
			alert('重复密码错误。');
			return;
		}else {
			//查询数据库判断
			var modi = AjaxUtil.command.executeQuery("wx_setting_1", {pwd:pass});
			//写if，判断查询数据数是否大于1条
			if(!(AjaxUtil.command.isSucceed(modi) && modi.rows.length>0)){
				alert('旧密码错误。');
				return;
			}
			if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_setting_2", {pwd:pass1}))){
				$('#pastPassWord').val("");
				$('#newPassWord').val("");
				$('#newPassWords').val("");
				alert('密码修改成功。');
			}else{
				alert('密码修改失败！');
			}
		}
	});
});
