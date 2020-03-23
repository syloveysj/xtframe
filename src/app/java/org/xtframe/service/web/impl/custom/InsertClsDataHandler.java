package org.xtframe.service.web.impl.custom;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.solr.SolrUtil;
import org.xtframe.dao.DataBaseFactory;
import org.xtframe.dao.IDataBase;
import org.xtframe.entity.Application;
import org.xtframe.entity.User;
import org.xtframe.service.AbstractBasicExecute;
import org.xtframe.service.ajax.IAjaxDataHandler;
import org.xtframe.sql.PreparedParameter;
import org.xtframe.util.ContextUtil;

/**
 * @ClassName: InsertClsDataHandler 
 * @Description: 确定收货处理
 * @author wen.xu
 * @date 2015-11-06
 */
public class InsertClsDataHandler extends AbstractBasicExecute implements IAjaxDataHandler{
	private final Log logger = LogFactory.getLog(getClass());
	
	@SuppressWarnings("unused")
	public Map<String, Object> execute(String strData) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			User user = ContextUtil.getCurrentUser();
			Application application = ContextUtil.getApplication();
			IDataBase dataBase = DataBaseFactory.getDataBaseForJndiName("dataBase");
			GetCls getCls = new GetCls();
			List<String> sqlList = new ArrayList<String>();
			List<String> aList = new ArrayList<String>();
			aList.add("dj_time");
			List<List<PreparedParameter>> preparedParametersList = new ArrayList<List<PreparedParameter>>();
			List<Map<String, Object>> total = SolrUtil.solrQuery(0, 10,"collection1", "*:*","",aList);
			for(int v = 0;v<=SolrUtil.getTotal();v+=10){
				List<String> keyList = new ArrayList<String>();
				keyList.add("bk_code");
				List<Map<String, Object>> al = SolrUtil.solrQuery(v, 10,"collection1", "*:*","",aList);
				for(Map<String,Object> row : al){
					String isbn = (String) row.get("bk_code");
					String cls = getCls.getCls(isbn);
					sqlList.add("INSERT INTO bk_cls (isbn, cls, add_time, edit_time) VALUES ('"+isbn+"', '"+cls+"', NOW(), NOW()) ON DUPLICATE KEY UPDATE cls = '"+cls+"',edit_time = NOW()");
					preparedParametersList.add(null);
				}
				int[] result = dataBase.excuteTransaction(sqlList, preparedParametersList);
				sqlList.clear();
				preparedParametersList.clear();
			}
			return map;
		} catch (Exception e) {
			logger.error(e.toString());
		}
		
		return null;
	}
	
    
}
