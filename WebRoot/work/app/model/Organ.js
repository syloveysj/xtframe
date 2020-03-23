Ext.define('XTFrame.model.Organ', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'orgid', type: 'int'},
	    {name: 'orgname', type: 'string'},
	    {name: 'orgidpath', type: 'string'},
	    {name: 'orgpid', type: 'int'},
	    {name: 'orglevel', type: 'int'},
	    {name: 'sortno', type: 'int'},
	    {name: 'remark', type: 'string'}
	]
});