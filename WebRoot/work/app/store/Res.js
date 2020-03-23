Ext.define('XTFrame.store.Res', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.Res',
	model: 'XTFrame.model.Res',
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