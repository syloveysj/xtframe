Ext.define('XTFrame.controller.demo.RichTextEditor', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'demoRichTextEditor button[action=getContent]': {
				click: function (o){
					alert(o.up('demoRichTextEditor').down('xtframeIframe').iframe.getContent());
				}
			},
			'demoRichTextEditor button[action=setContent]': {
				click: function (o){
					o.up('demoRichTextEditor').down('xtframeIframe').iframe.setContent('');
				}
			},
			'demoRichTextEditor xtframeIframe': {
				testshow: function (o){
					alert('good!');
				}
			}
		});
	}
});