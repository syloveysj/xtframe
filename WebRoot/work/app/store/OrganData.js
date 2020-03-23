Ext.define('XTFrame.store.OrganData', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.OrganData',
	model: 'XTFrame.model.OrganData',
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