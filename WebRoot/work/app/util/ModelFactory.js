Ext.define('XTFrame.util.ModelFactory', {
	//数据类模型的集合
	models: Ext.create('Ext.util.MixedCollection'),
	//字段集合
	fields: Ext.create('Ext.util.MixedCollection'),
	getModelByName: function(modelName){
		if(this.models.containsKey(modelName)){
			return modelName;
		} else {
			var fields = [];
			if(this.fields.containsKey(modelName)){
				fields = this.fields.get(modelName);
			} else {
				Ext.Ajax.request({
					url: '',
					method: 'POST',
					timeout: 4000,
					async: false,
					success: function(responst, opts){
						fields = eval(response.responseText);
					}
				});
			}
			this.fields.add(modelName, fields);
			
			var newModel = Ext.define(modelName, {
				extend: 'Ext.data.Model',
				fields: fields
			});
			this.models.add(modelName, newModel);
			return modelName;
		}
	}
});
var modelFactory = Ext.create('XTFrame.util.ModelFactory');