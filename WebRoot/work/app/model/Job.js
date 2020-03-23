Ext.define('XTFrame.model.Job', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'jobid', type: 'int'},
	    {name: 'jobname', type: 'string'},
	    {name: 'jobidpath', type: 'string'},
	    {name: 'jobpid', type: 'int'},
	    {name: 'joblevel', type: 'int'},
	    {name: 'sortno', type: 'int'},
	    {name: 'remark', type: 'string'}
	]
});