var jsLoadDelay = 260;
var PubOPT = {
	/**
	 * 获取浏览器类型
	 * @return {String}
	 */
	getOs : function() {
		if(navigator.userAgent.indexOf("MSIE")>0) {
			return "MSIE";
		}
		if(isFirefox=navigator.userAgent.indexOf("Firefox")>0) {
			return "Firefox";
		}
		if(isSafari=navigator.userAgent.indexOf("Safari")>0) {
			return "Safari";
		}
		if(isCamino=navigator.userAgent.indexOf("Camino")>0) {
			return "Camino";
		}
		if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0) {
			return "Gecko";
		}
	},
	/**
	 * IE浏览器下进行延时执行脚本处理
	 * @param {} func
	 * @param {} millisec
	 */
	jsEventLoad : function(func, millisec) {
		if(this.getOs() == "MSIE") {
			if(millisec == undefined) millisec = jsLoadDelay;
			setTimeout(func, millisec);
		} else {
			func();
		}
	}
};