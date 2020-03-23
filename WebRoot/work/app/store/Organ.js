Ext.define('XTFrame.store.Organ', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.Organ',
	model: 'XTFrame.model.Organ',
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