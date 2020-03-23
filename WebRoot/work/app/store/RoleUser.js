Ext.define('XTFrame.store.RoleUser', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.RoleUser',
	model: 'XTFrame.model.RoleUser',
	pageSize: 16,
	autoLoad: false,
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