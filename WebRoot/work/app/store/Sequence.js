Ext.define('XTFrame.store.Sequence', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.Sequence',
	model: 'XTFrame.model.Sequence',
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