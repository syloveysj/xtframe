Ext.define('XTFrame.model.Res', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'resid', type: 'string'},
	    {name: 'resname', type: 'string'},
	    {name: 'uri', type: 'string'},
	    {name: 'sortno', type: 'int'},
	    {name: 'remark', type: 'string'}
	]
});