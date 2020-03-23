Ext.define('XTFrame.model.WebData', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'defid', type: 'string'},
	    {name: 'pageid', type: 'string'},
	    {name: 'dataname', type: 'string'},
	    {name: 'exectype', type: 'string'},
	    {name: 'execsortno', type: 'int'},
	    {name: 'remark', type: 'string'}
	]
});