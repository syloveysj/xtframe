Ext.define('XTFrame.model.Logic', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'logicid', type: 'string'},
	    {name: 'logicname', type: 'string'},
	    {name: 'sortno', type: 'int'},
	    {name: 'remark', type: 'string'}
	]
});