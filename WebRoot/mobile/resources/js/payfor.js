$(document).ready(function(e) {
	$('#savePay').click(function(){
		savePayfor();
	});
});

function savePayfor() {
	$('#js-save-form').submit();
}