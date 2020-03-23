Ext.define('XTFrame.store.contact.User', {
	extend: 'Ext.data.Store',
	requires: 'XTFrame.model.User',
	model: 'XTFrame.model.User',
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