Ext.define('XTFrame.model.Menu', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'menuid', type: 'int'},
		{name: 'menupid', type: 'int'},
	    {name: 'menuname', type: 'string'},
	    {name: 'menuicon', type: 'string'},
	    {name: 'menutype', type: 'int'},
	    {name: 'menuidpath', type: 'string'},
	    {name: 'menulevel', type: 'int'},
	    {name: 'url', type: 'string'},
	    {name: 'swfurl', type: 'string'},
	    {name: 'sortno', type: 'int'},
	    {name: 'remark', type: 'string'}
	]
});