Ext.define('XTFrame.view.demo.ReportDisplay', {
	extend: 'Ext.panel.Panel',
	region: 'center',
//	style: {
//		backgroundColor:'#FFFFFF'
//	},
//	xtype: 'label',
//	html: '<iframe id="_ifr_report" name="_ifr_report" marginwidth="0" framespacing="0" marginheight="0" frameborder="0" width="100%" height="100%" src="/ReportServer?reportlet=book.cpt"></iframe>'
	items:[Ext.create('XTFrame.view.Iframe', {src:'/ReportServer?reportlet=book.cpt'})]
});