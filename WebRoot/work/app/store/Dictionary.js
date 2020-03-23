Ext.define('XTFrame.store.Dictionary', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.Dictionary',
	model: 'XTFrame.model.Dictionary',
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