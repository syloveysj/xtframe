/*在IE下无阻
document.onkeydown = function(evt) {
	var isie = (document.all) ? true : false;
	var key;
	var srcobj;
	if (isie) {
		key = event.keyCode;
		srcobj = event.srcElement;
	} else {
		key = evt.which;
		srcobj = evt.target;
	}
	if (key == 13 && srcobj.type != 'button' && srcobj.type != 'submit'
			&& srcobj.type != 'reset' && srcobj.type != 'textarea'
			&& srcobj.type != '') {
		if (isie) {
			event.keyCode = 9;
		} else {
			var el = getNextElement(evt.target);
			if (el.type != 'hidden')
				el.focus();
			else
				while (el.type == 'hidden')
					el = getNextElement(el);
			el.focus();
			return false;
		}
	}
}
function getNextElement(field) {
	var form = field.form;
	for (var e = 0; e < form.elements.length; e++) {
		if (field == form.elements[e])
			break;
	}
	return form.elements[++e % form.elements.length];
}*/

var Cookies = {};
Cookies.set = function(name, value){
     var argv = arguments;
     var argc = arguments.length;
     var expires = (argc > 2) ? argv[2] : null;
     var path = (argc > 3) ? argv[3] : '/';
     var domain = (argc > 4) ? argv[4] : null;
     var secure = (argc > 5) ? argv[5] : false;
     if(expires == null) {
     	expires = new Date();
     	expires.setTime(expires.getTime() + xtframeConfig.cookieOverdueDays*3600*1000);
     }
     document.cookie = name + "=" + escape (value) +
       ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
       ((path == null) ? "" : ("; path=" + path)) +
       ((domain == null) ? "" : ("; domain=" + domain)) +
       ((secure == true) ? "; secure" : "");
};

Cookies.get = function(name){
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	var j = 0;
	while(i < clen){
		j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return Cookies.getCookieVal(j);
		i = document.cookie.indexOf(" ", i) + 1;
		if(i == 0)
			break;
	}
	return null;
};

Cookies.clear = function(name) {
  if(Cookies.get(name)){
    document.cookie = name + "=" +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
};

Cookies.getCookieVal = function(offset){
   var endstr = document.cookie.indexOf(";", offset);
   if(endstr == -1){
       endstr = document.cookie.length;
   }
   return unescape(document.cookie.substring(offset, endstr));
};