Ext.define('XTFrame.store.Job', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.Job',
	model: 'XTFrame.model.Job',
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