Ext.define('XTFrame.store.workflow.Task', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.workflow.Task',
	model: 'XTFrame.model.workflow.Task',
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