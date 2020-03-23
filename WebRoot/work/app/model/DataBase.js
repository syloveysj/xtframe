Ext.define('XTFrame.model.DataBase', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'jndiname', type: 'string'},
	    {name: 'dbname', type: 'string'},
		{name: 'dbtype', type: 'int'},
	    {name: 'driverclassname', type: 'string'},
	    {name: 'url', type: 'string'},
	    {name: 'username', type: 'string'},
	    {name: 'password', type: 'string'},
	    {name: 'remark', type: 'string'}
	]
});