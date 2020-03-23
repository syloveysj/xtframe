Ext.define('XTFrame.store.workflow.ProcessRecord', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.workflow.ProcessRecord',
	model: 'XTFrame.model.workflow.ProcessRecord',
	proxy:{
	    type:'ajax',
	    url:'/server/ajax.do',
	    reader: {
	        type: 'json',
	        root: 'arrData'
	    },writer:{
			type:'json'
		}
	}
});