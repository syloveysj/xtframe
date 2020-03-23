Ext.define('XTFrame.model.workflow.Page', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'pageid', type: 'string'},
	    {name: 'formvalue', type: 'string'},
	    {name: 'processdefinitionid', type: 'string'},
	    {name: 'parameters', type: 'string'},
	    {name: 'remark', type: 'string'},
	    {name: 'currenttime', type: 'auto'}
	]
});