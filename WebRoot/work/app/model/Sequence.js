Ext.define('XTFrame.model.Sequence', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'name', type: 'string'},
	    {name: 'currval', type: 'int'},
	    {name: 'increment', type: 'int'}
	]
});