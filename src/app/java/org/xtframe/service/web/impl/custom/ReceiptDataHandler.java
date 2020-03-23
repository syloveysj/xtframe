package org.xtframe.service.web.impl.custom;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xtframe.dao.DataBaseFactory;
import org.xtframe.dao.IDataBase;
import org.xtframe.entity.Application;
import org.xtframe.entity.User;
import org.xtframe.entity.WebPageDefined;
import org.xtframe.service.AbstractBasicExecute;
import org.xtframe.service.SqlCheck;
import org.xtframe.service.web.IWebDataHandler;
import org.xtframe.util.ContextUtil;

/**
 * @ClassName: ReceiptDataHandler 
 * @Description: 确定收货处理
 * @author wen.xu
 * @date 2015-11-06
 */
public class ReceiptDataHandler extends AbstractBasicExecute implements IWebDataHandler {
	private final Log logger = LogFactory.getLog(getClass());
	
	public Object execute(Map<String, Object> parame, Map<String, Object> data, WebPageDefined wpd) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			User user = ContextUtil.getCurrentUser();
			Application application = ContextUtil.getApplication();
			String sqlID = "wx_order_receipt_1";
			Map<String,Object> pm = new HashMap<String,Object>();
			pm.put("orders_id", parame.get("orders_id").toString());
			IDataBase dataBase = DataBaseFactory.getDataBaseForSqlId(sqlID);
			SqlCheck sqlCheck = check(sqlID,pm,user,application);
			List<Map<String, Object>> ret = dataBase.executeQuery(sqlCheck.getSqlData().getSql(), sqlCheck.getSqlData().getPreparedParameters());
			map.put("rows", ret);
			return map;
		} catch (Exception e) {
			logger.error(e.toString());
		}
		
		return null;
	}
	
    
}
