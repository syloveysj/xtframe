$(document).ready(function(e) {
	$('#ck').click(function(){
		if($(this).is(":checked")){
			$('#pwd')[0].type = 'text';
		}else{
			$('#pwd')[0].type = 'password';
		}
	});
	
	$('#js-register').click(function(){
		var phone = $('#username').val($.trim($('#username').val())).val();
		var password = $('#pwd').val($.trim($('#pwd').val())).val();
        if(typeof(phone) == 'undefined' || phone == ''){
            alert('请输入您的账号。');
            return false;
        }
		if(typeof(password) == 'undefined' || password == ''){
            alert('请输入您的密码。');
            return false;
        }
        $('#js-register-form').submit();
	});
});