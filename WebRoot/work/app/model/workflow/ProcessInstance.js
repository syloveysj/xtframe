Ext.define('XTFrame.model.workflow.ProcessInstance', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'string'},
	    {name: 'name', type: 'string'},
	    {name: 'processDefinitionId', type: 'string'},
	    {name: 'key', type: 'string'},
	    {name: 'priority', type: 'int'},
	    {name: 'activeActivityNames', type: 'auto'},
	    {name: 'state', type: 'string'}
	]
});