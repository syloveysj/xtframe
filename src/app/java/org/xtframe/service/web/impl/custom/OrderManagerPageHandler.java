package org.xtframe.service.web.impl.custom;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.xtframe.common.json.JSON2Java;
import org.xtframe.dao.DataBaseFactory;
import org.xtframe.dao.IDataBase;
import org.xtframe.entity.User;
import org.xtframe.service.AbstractBasicExecute;
import org.xtframe.service.ajax.IAjaxDataHandler;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.ContextUtil;
import org.xtframe.util.StringUtil;
@Service
@Scope("prototype")
public class OrderManagerPageHandler  extends AbstractBasicExecute implements IAjaxDataHandler{
	private final Log logger = LogFactory.getLog(getClass());
	public Map<String, Object> execute(String strData) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			User user = ContextUtil.getCurrentUser(); 
			Map<String, Object> objJson = JSON2Java.optMap(CommonUtil.getJavaObject(strData));
			Map<String, Object> parameters = JSON2Java.optMap(objJson.get("parameters"));
			String start = StringUtil.toString(parameters.get("start"), "");
			String size = StringUtil.toString(parameters.get("size"), "");
			
			IDataBase dataBase = DataBaseFactory.getDataBaseForJndiName("dataBase");
			String sql1="select o.*,h.kdbh,h.kddh from bk_orders o LEFT JOIN bk_hair h ON h.orders_id = o.orders_id WHERE userid = '"+user.getUserInfo().getUserId()+"' order by o.orders_time desc, o.orders_id desc limit "+start+","+size;
			List<Map<String, Object>> resultList=new ArrayList<Map<String, Object>>();
			
			List<Map<String, Object>> ret1 = dataBase.executeQuery(sql1, null);
			for(int i=0;i<ret1.size();i++){
				Map<String, Object> orderMap=ret1.get(i);
				String order_id= orderMap.get("orders_id").toString();
				String sql2 = " SELECT t.goods_id,t.goods_name,t.goods_price,g.goods_author,g.goods_factory,i.small_relative_path,t.orders_id,t.num,t.total_price "+
							  " FROM bk_orders_details t LEFT JOIN bk_goods g on t.goods_id=g.goods_id LEFT JOIN bk_image i ON i.img_id = g.goods_img_id WHERE t.userid='"+user.getUserInfo().getUserId()+"' and t.orders_id = '"+order_id+"'"+
							  " ORDER BY t.details_id DESC";
				List<Map<String, Object>> ret2 = dataBase.executeQuery(sql2, null);
				orderMap.put("order_details", ret2);
				resultList.add(orderMap);
			}
			resultMap.put(STATUS, true);
			resultMap.put("rows", resultList);
			resultMap.put("start", start);
			resultMap.put("size", size);
		} catch (Exception e) {
			resultMap.put(STATUS, false);
			logger.error(e.toString());
		}
		return resultMap;
	}	
}
