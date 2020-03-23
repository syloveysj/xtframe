Ext.define('XTFrame.store.Role', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.Role',
	model: 'XTFrame.model.Role',
	autoLoad: true,
	proxy:{
	    type:'ajax',
	    url:'/server/ajax.do',
	    reader: {
	        type: 'json',
	        root: 'rows'
	    },writer:{
			type:'json'
		}
	}
});