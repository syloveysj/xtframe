Ext.define('XTFrame.model.workflow.Task', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'string'},
	    {name: 'executionId', type: 'string'},
	    {name: 'name', type: 'string'},
	    {name: 'activityName', type: 'string'},
	    {name: 'formResourceName', type: 'string'},
	    {name: 'priority', type: 'int'},
	    {name: 'duedate', type: 'auto'},
	    {name: 'assignee', type: 'string'},
	    {name: 'progress', type: 'int'},
	    {name: 'description', type: 'string'},
	    {name: 'createTime', type: 'auto'}
	]
});