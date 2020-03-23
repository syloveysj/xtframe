$(document).ready(function(e){
	$('#mySwitch').click(function(){
		$('#123').toggle(500);
	});
	
	
	$('#js-submit').click(function(){
		
		var book = $('#book').val($.trim($('#book').val())).val(); //获取用户输入内容
		if(typeof(book ) == 'undefined' || book  == ''){
			return;
		}else{
			$('#submit').submit();
		}
	});
});
