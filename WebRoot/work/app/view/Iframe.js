Ext.define('XTFrame.view.Iframe',{
	extend: 'Ext.Component', 
	alias: 'widget.xtframeIframe',
	src: null,
	iframe: null,
	isLoader:true,
	onRender:function(ct, position){
		this.callParent(arguments);
		this.codeEl = ct.createChild({tag: 'iframe', src: this.src, marginwidth: 0, framespacing: 0, marginheight: 0, frameborder: 0, width: '100%', height: '100%'});
		this.codeEl.on('load', this.loadInit, this);
	},
	loadInit: function() {
	//	this.codeEl.set({ src: null });
		if(!Ext.isEmpty(this.codeEl.dom.contentWindow)){
			this.iframe = this.codeEl.dom.contentWindow;
			if(!Ext.isEmpty(this.iframe.setParent)){
				this.iframe.setParent(this);
			}
			this.fireEvent('iframeOnload', this);
		}
	}
});