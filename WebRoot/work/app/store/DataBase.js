Ext.define('XTFrame.store.DataBase', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.DataBase',
	model: 'XTFrame.model.DataBase',
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