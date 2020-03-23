Ext.define('XTFrame.store.SystemData', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.SystemData',
	model: 'XTFrame.model.SystemData',
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