var pubOPT = {
	getMainView: function(){
		return Ext.getCmp('_xtframMainView');
	},
	nodeUnil: function(ls, obj){
        for (var i = 0; i < ls.length; i++) {
            if (((ls[i].menuLevel + 1) == obj.menuLevel) && (obj.menuIdPath.indexOf(ls[i].menuIdPath) == 0)) {
                if ("children" in ls[i]) {
                    ls[i].children.push(obj);
                    return;
                }
                else {
                    delete ls[i].leaf;
                    ls[i].children = new Array();
                    ls[i].children.push(obj);
                    return;
                }
            }
            else {
                if ("children" in ls[i]) {
                    this.nodeUnil(ls[i].children, obj);
                }
            }
        }
    },
    treeNodeUnil: function(da, index, change, checked){
    	var j;
    	if(typeof(change) == "object"){
    		for(var j=0; j<da.length; j++){
	    		if(change.menuId) da[j].menuId = da[j][change.menuId];
	    		if(change.menuName) da[j].menuName = da[j][change.menuName];
	    		if(change.menuLevel) da[j].menuLevel = da[j][change.menuLevel];
	    		if(change.menuIdPath) da[j].menuIdPath = da[j][change.menuIdPath];
	    		if(change.iconCls) da[j].iconCls = da[j][change.iconCls];
    		}
    	}
		if(index === undefined){
			index = 99999;
			for(j=0; j<da.length; j++){
				if(da[j].menuLevel < index) index = da[j].menuLevel;
			}
		}else{
			index = this.StrToInteger(index, 1);
		}
        var ls = new Array(), arrObj = new Array(), i;
		
		for (i = 0; i < da.length; i++) {
            var obj = this.objClone(da[i], Object);
            if(!("id" in obj)) obj.id = obj.menuId;
            if(!("text" in obj)) obj.text = obj.menuName;
            if(checked !== undefined) obj.checked = checked;
            obj.leaf = true;
            
            if (obj.menuLevel == index) {
                ls.push(obj);
            }
            else {
                arrObj.push(obj);
            }
        }
		
        for (i = 0; i < arrObj.length; i++) {
            this.nodeUnil(ls, arrObj[i]);
        }
        return ls;
    },
    easyTreeNodeUtil: function(data, config){
    	var list = new Array(), i, j;
    	for (i = 0; i < data.length; i++) {
            var obj = this.objClone(data[i], Object);
            if(!("id" in obj)) obj.id = obj[config.id];
            if(!("text" in obj)) obj.text = obj[config.name];
            if(!("pid" in obj)) obj.pid = obj[config.pid];
            obj.leaf = true;
            list.push(obj);
        }
        var nodes = new Array();
        for(i = 0; i < list.length; i++) {
        	var flag = false;
        	for(j = 0; j < list.length; j++){
        		if(list[i].pid == list[j].id){
        			if (!("children" in list[j])) {
	                    delete list[j].leaf;
	                    list[j].children = new Array();
	                }
	                list[j].children.push(list[i]);
	                flag = true;
	                break;
        		}
        	}
        	if(!flag){
        		nodes.push(list[i]);
        	}
        }
        return nodes;
    },
	getFormValues: function(form, ls){
		var ret = new Object();
		for(var i=0; i<ls.length; i ++){
			var v = form[ls[i]];
			ret[ls[i]] = (v===null || v===undefined) ? "" : v;
		}
		return ret;
	},
	getStrCount: function(str, s){
		var r = new RegExp('\\'+s,"gi");
		return str.match(r).length;
	},
    StrToInteger: function(str, defVal) {
		if(!str) return defVal;
		var iRet = parseInt(str);
		if(isNaN(iRet)){
			if(defVal){
				iRet = defVal;
			}
			else{
				iRet = 0;
			}
		}
		return iRet;
	},
	objClone: function(obj, creator) {
		if(!creator) creator = Array;
		var result = new creator();   
		for(var i in obj) result[i] = obj[i];
		return result;
	},
	downloadFile: function(href){
		//使用临时创建的超链接对象下载
		var linkGetfileObj = document.createElement("A");
		if(linkGetfileObj && (linkGetfileObj.tagName == "A")){
			linkGetfileObj.style.display = "none";
			document.body.appendChild(linkGetfileObj);
			linkGetfileObj.href = href;
			linkGetfileObj.click();
			document.body.removeChild(linkGetfileObj);
			delete linkGetfileObj;
		}
	},
	//获取url参数
	getParamObj: function(searchStr, strSplit) {
		if(!strSplit) {
			strSplit = "&";
		}
		if(searchStr.indexOf("?") == 0) {
			searchStr = searchStr.substr(1);
		}
		var searchs = searchStr.split(strSplit);
		var i, iCount = searchs.length;
		var paramObj = new Object();
		for(i = 0; i < iCount; i ++) {
			var iPos = searchs[i].indexOf("=");
			if(iPos > 0) {
				paramObj[searchs[i].substr(0, iPos)] = searchs[i].substr(iPos + 1);
			}
		}
		return paramObj;
	}
};