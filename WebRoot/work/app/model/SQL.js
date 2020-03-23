Ext.define('XTFrame.model.SQL', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'sqlid', type: 'string'},
	    {name: 'sqlname', type: 'string'},
	    {name: 'sqltemplet', type: 'string'},
	    {name: 'dataverify', type: 'string'},
	    {name: 'exectype', type: 'string'},
	    {name: 'dbtype', type: 'string'},
	    {name: 'syscode', type: 'string'},
	    {name: 'modid', type: 'int'},
	    {name: 'sortno', type: 'int'},
	    {name: 'remark', type: 'string'}
	]
});