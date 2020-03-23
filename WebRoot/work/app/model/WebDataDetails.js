Ext.define('XTFrame.model.WebDataDetails', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'detid', type: 'string'},
	    {name: 'defid', type: 'string'},
	    {name: 'execcontent', type: 'string'},
	    {name: 'execsortno', type: 'int'}
	]
});