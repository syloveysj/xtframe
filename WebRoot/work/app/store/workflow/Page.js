Ext.define('XTFrame.store.workflow.Page', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.workflow.Page',
	model: 'XTFrame.model.workflow.Page',
	pageSize: 10,
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