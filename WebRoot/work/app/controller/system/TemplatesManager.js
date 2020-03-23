Ext.define('XTFrame.controller.system.TemplatesManager', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'systemTemplatesManagerTree': {
				itemclick: function(tree, record, item, index, e){
					if (record.get('leaf')) {
						var path = record.raw ? record.raw.path : record.data.path;
						var charset = record.raw ? record.raw.charset : record.data.charset;
						var template = this.getTemplate(path, charset);
						
						var layout = tree.up('panelBorder');
						var editor = layout.down('systemTemplatesManager');
						editor.down('xtframeIframe').iframe.setContent(template);
					}
				},
				initcomplete: function(tree){
					this.refreshTree(tree);
				}
			},
			'systemTemplatesManagerTree tool[type=refresh]': {
				click: function(o, e){
					this.refreshTree(o.up('systemTemplatesManagerTree'));
				}
			},
			'systemTemplatesManager button[action=getContent]': {
				click: function (o){
					alert(o.up('systemTemplatesManager').down('xtframeIframe').iframe.getContent());
				}
			},
			'systemTemplatesManager button[action=setContent]': {
				click: function (o){
					o.up('systemTemplatesManager').down('xtframeIframe').iframe.setContent('');
				}
			},
			'systemTemplatesManager xtframeIframe': {
				iframeOnload: function (o){
//					alert('iframeOnload!');
				}
			}
		});
	},
	getTemplate: function(path, charset){
		var data = ajaxUtil.serverData('gettemplate', [path, charset]);
		if(!ajaxUtil.isSucceed(data)){
			Ext.xtframe.msg("提示", "模版数据获取失败！");
		} else {
			return data.data;
		}
		return "";
	},
	refreshTree: function(tree){
		var data, treeData = ajaxUtil.serverData('templatestree');
		if(!ajaxUtil.isSucceed(treeData)){
			Ext.xtframe.msg("提示", "模版目录获取失败！");
		} else {
			data = treeData.data;
			tree.getRootNode().removeAll(false);
			if(data.length > 0) {
				tree.getRootNode().appendChild(data);
				tree.expandAll();
			}
		}
	}
});