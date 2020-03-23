Ext.define('XTFrame.store.WebDataDetails', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.WebDataDetails',
	model: 'XTFrame.model.WebDataDetails',
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