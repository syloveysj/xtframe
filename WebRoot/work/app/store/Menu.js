Ext.define('XTFrame.store.Menu', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.Menu',
	model: 'XTFrame.model.Menu',
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