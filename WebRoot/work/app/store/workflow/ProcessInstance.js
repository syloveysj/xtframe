Ext.define('XTFrame.store.workflow.ProcessInstance', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.workflow.ProcessInstance',
	model: 'XTFrame.model.workflow.ProcessInstance',
	autoLoad: true,
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