Ext.define('XTFrame.model.User', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'userid', type: 'string'},
	    {name: 'username', type: 'string'},
	    {name: 'realname', type: 'string'},
	    {name: 'sex', type: 'string'},
	    {name: 'birthday', type: 'string'},
	    {name: 'idcard', type: 'string'},
	    {name: 'photo', type: 'string'},
	    {name: 'address', type: 'string'},
	    {name: 'tel', type: 'string'},
	    {name: 'mobile', type: 'string'},
	    {name: 'email', type: 'string'},
	    {name: 'orgid', type: 'int'},
	    {name: 'orgname', type: 'string'},
	    {name: 'jobid', type: 'int'},
	    {name: 'jobname', type: 'string'},
	    {name: 'state', type: 'int'},
	    {name: 'sortno', type: 'int'},
	    {name: 'remark', type: 'string'}
	]
});