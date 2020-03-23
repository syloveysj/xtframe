Ext.define('XTFrame.model.OrganData', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'parameid', type: 'string'},
	    {name: 'orgid', type: 'int'},
		{name: 'paramename', type: 'string'},
	    {name: 'paramevalue', type: 'string'},
	    {name: 'remark', type: 'string'}
	]
});