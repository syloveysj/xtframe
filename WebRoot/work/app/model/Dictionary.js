Ext.define('XTFrame.model.Dictionary', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'dicid', type: 'string'},
	    {name: 'dicname', type: 'string'},
		{name: 'dicvalue', type: 'string'},
	    {name: 'dicpid', type: 'string'}
	]
});