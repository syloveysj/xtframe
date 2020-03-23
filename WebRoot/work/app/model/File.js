Ext.define('XTFrame.model.File', {
    extend: 'Ext.data.Model',
	fields: [
		{name: 'fileid', type: 'string'},
	    {name: 'userid', type: 'string'},
		{name: 'filename', type: 'string'},
	    {name: 'filetype', type: 'string'},
	    {name: 'filepath', type: 'string'},
	    {name: 'filesize', type: 'int'},
	    {name: 'safetype', type: 'int'},
	    {name: 'savetime', type: 'auto'},
	    {name: 'remark', type: 'string'}
	]
});