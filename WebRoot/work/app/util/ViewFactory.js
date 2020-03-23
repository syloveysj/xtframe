Ext.define('XTFrame.util.ViewFactory', {
	//视图的集合
	views: Ext.create('Ext.util.MixedCollection'),
	//窗体的集合
	wins: Ext.create('Ext.util.MixedCollection'),
	//组件的集合
	components: Ext.create('Ext.util.MixedCollection'),
	getView: function(viewId, viewLayout, viewClass){
		if(this.views.containsKey(viewId)){
			return this.views.get(viewId);
		}
		var ls = new Array();
		Ext.Array.each(viewClass, function(cls) {
	        ls.push(Ext.create(cls));
	    });
		var view = Ext.create(viewLayout, {
			items: ls
		});
		this.views.add(viewId, view);
		return view;
	},
	getWindow: function(winId, winClass){
		if(this.wins.containsKey(winId)){
			return this.wins.get(winId);
		}
		var win = Ext.create(winClass, {winId: winId});
		this.wins.add(winId, win);
		return win;
	},
	getComponent: function(comId){
		if(this.components.containsKey(comId)){
			return this.components.get(comId);
		}
		return null;
	},
	addComponent: function(comId, com){
		this.components.add(comId, com);
	}
});
var viewFactory = Ext.create('XTFrame.util.ViewFactory');