Ext.define('XTFrame.store.File', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.File',
	model: 'XTFrame.model.File',
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