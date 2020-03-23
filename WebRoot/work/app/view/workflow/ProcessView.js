Ext.define("XTFrame.view.workflow.ProcessView",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.workflowProcessView',
	image: Ext.create('Ext.Img', {x: 0, y: 0, src:null}),
	draw: null,
	width: 500,
	height: 400,
	initComponent: function(){
		var me = this;
		Ext.apply(this, {
			 layout: 'absolute',
			 items: [me.image],
			 setSrc: function(src){
			 	me.image.setSrc(src);
			 },
			 setDrawComponent: function(x, y, width, height){
			 	if(me.draw != null){
			 		me.remove(me.draw);
			 		me.draw = null;
			 	}
			 	me.draw = Ext.create('Ext.draw.Component', {
					viewBox: false,//使图形保持原始大小
					x: x,
					y: y,
					width: width,
					height: height,
					items: [{
						type: 'rect',//矩形
						fill: '#FF0000',//填充的颜色 
						stroke : "#CCFFFF",//边线的填充颜色
						opacity: 0.5,//设置透明度
						x: 0,
						y: 0,
						width: width,
						height: height
					}]
				});
				me.add(me.draw);
			 },
			 removeDraw: function(){
			 	if(me.draw != null){
			 		me.remove(me.draw);
			 		me.draw = null;
			 	}
			 }
		});
		this.callParent(arguments);
	}
});