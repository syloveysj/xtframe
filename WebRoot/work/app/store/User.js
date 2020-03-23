Ext.define('XTFrame.store.User', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.User',
	model: 'XTFrame.model.User',
	pageSize: 16,
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