Ext.define('XTFrame.store.SQL', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.SQL',
	model: 'XTFrame.model.SQL',
	pageSize: 16,
//	remoteSort: true, //远程排序
	autoLoad: true,
	proxy:{
	    type:'ajax',
	    url:'/server/ajax.do',
	    reader: {
	        type: 'json',
	        root: 'query',
	        totalProperty : 'total'
	    },writer:{
			type:'json'
		}
	}
});