Ext.define('XTFrame.store.WebData', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.WebData',
	model: 'XTFrame.model.WebData',
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