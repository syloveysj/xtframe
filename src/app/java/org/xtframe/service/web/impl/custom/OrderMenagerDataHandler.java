package org.xtframe.service.web.impl.custom;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xtframe.dao.DataBaseFactory;
import org.xtframe.dao.IDataBase;
import org.xtframe.entity.User;
import org.xtframe.entity.WebPageDefined;
import org.xtframe.service.AbstractBasicExecute;
import org.xtframe.service.web.IWebDataHandler;
import org.xtframe.util.ContextUtil;
import org.xtframe.util.StringUtil;

public class OrderMenagerDataHandler extends AbstractBasicExecute implements IWebDataHandler {
private final Log logger = LogFactory.getLog(getClass());
	
	public Object execute(Map<String, Object> parame, Map<String, Object> data, WebPageDefined wpd) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			User user = ContextUtil.getCurrentUser(); 
			String start = StringUtil.toString(parame.get("start"),"0");
			String size = StringUtil.toString(parame.get("size"),"4");
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
			
			map.put("rows", resultList);
			map.put("start", start);
			map.put("size", size);
		} catch (Exception e) {
			logger.error(e.toString());
		}
		return map;
	}
}
