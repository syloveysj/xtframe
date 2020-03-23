Ext.define('XTFrame.store.Logic', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.Logic',
	model: 'XTFrame.model.Logic',
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