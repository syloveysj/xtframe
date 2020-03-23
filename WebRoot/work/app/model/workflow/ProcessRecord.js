Ext.define('XTFrame.model.workflow.ProcessRecord', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'recordid', type: 'string'},
	    {name: 'processinstanceid', type: 'string'},
	    {name: 'taskid', type: 'string'},
	    {name: 'userid', type: 'string'},
	    {name: 'pageid', type: 'string'},
	    {name: 'subject', type: 'string'},
	    {name: 'opinion', type: 'string'},
	    {name: 'outcome', type: 'string'},
	    {name: 'currenttime', type: 'auto'}
	]
});