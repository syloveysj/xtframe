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
import org.xtframe.service.SqlCheck;
import org.xtframe.service.ajax.AjaxDataHandlerException;
import org.xtframe.service.ajax.IAjaxDataHandler;
import org.xtframe.service.ajax.AjaxDataHandlerException.AjaxExceptionType;
import org.xtframe.sql.PreparedParameter;
import org.xtframe.util.ContextUtil;

/**
 * @ClassName: ReceiptDataHandler 
 * @Description: 确定收货处理
 * @author wen.xu
 * @date 2015-11-06
 */
public class SolrSaveDataHandler extends AbstractBasicExecute implements IAjaxDataHandler{
	private final Log logger = LogFactory.getLog(getClass());
	
	@SuppressWarnings("unused")
	public Map<String, Object> execute(String strData) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String sqlID = "wx_solr_1";
			String sqlID1 = "wx_solr_2";
			String sqlID2 = "wx_solr_3";
			User user = ContextUtil.getCurrentUser();
			Application application = ContextUtil.getApplication();
			IDataBase dataBase = DataBaseFactory.getDataBaseForJndiName("dataBase");
			List<String> sqlList = new ArrayList<String>();
			List<String> aList = new ArrayList<String>();
			aList.add("dj_time");
			List<List<PreparedParameter>> preparedParametersList = new ArrayList<List<PreparedParameter>>();
			List<Map<String, Object>> total = SolrUtil.solrQuery(0, 10,"collection1", "*:*","",aList);
			for(int v = 0;v<=SolrUtil.getTotal();v+=10){
				Map<String,List<String>> keyMap = new HashMap<String, List<String>>();
				List<String> keyList = new ArrayList<String>();
				keyList.add("bk_code");
				keyMap.put("core1", keyList);
				List<Map<String, Object>> al = SolrUtil.solrQuery(v, 10,"collection1", "*:*","",aList,keyMap);
				int vi = v;
				for(Map<String,Object> row : al){
					String img_path = "";
					String cls = "";
					String yj = "0";
					String sj = "0";
					String zz = "";
					String zz_id = "";
					if(row.containsKey("img_path") && row.get("img_path") != null && row.get("img_path") != ""){
						img_path = row.get("img_path").toString();
					}
					if(row.containsKey("cls") && row.get("cls") != null && row.get("cls") != ""){
						cls = row.get("cls").toString();
					}
					if(row.containsKey("yj") && row.get("yj") != null && row.get("yj") != ""){
						yj = row.get("yj").toString();
					}
					if(row.containsKey("sj") && row.get("sj") != null && row.get("sj") != ""){
						sj = row.get("sj").toString();
					}
					if(row.containsKey("zz") && row.get("zz") != null && row.get("zz") != ""){
						zz = row.get("zz").toString();
						Map<String, Object> pm = new HashMap<String, Object>();
						pm.put("zz", zz);
						SqlCheck sqlCheck = check(sqlID, pm, user, application);
						switch (sqlCheck.getResult()) {
							case SqlCheck.SQLID_NULL:
								throw new AjaxDataHandlerException("sqlID为空");
							case SqlCheck.SQLID_NO_RIGHT:
								throw new AjaxDataHandlerException("不具有该sql(" + sqlID + ")的执行权限", AjaxExceptionType.login_again);
							case SqlCheck.SQLID_INEXISTENCE:
								throw new AjaxDataHandlerException("该sql(" + sqlID + ")不存在");
							case SqlCheck.CHECK_FAILED:
								throw new AjaxDataHandlerException("sql(" + sqlID + ")数据格式校验失败");
							case SqlCheck.LOGIN_AGAIN:
								throw new AjaxDataHandlerException("需要进行登录", AjaxExceptionType.login_again);
						}
						List<Map<String, Object>> ret = dataBase.executeQuery(sqlCheck.getSqlData().getSql(), sqlCheck.getSqlData().getPreparedParameters());
						if(ret != null && ret.size() >0){
							zz_id = (String) ret.get(0).get("author_id");
						}else{
							Map<String, Object> pm2 = new HashMap<String, Object>();
							SqlCheck sqlCheck2 = check(sqlID2, pm2, user, application);
							switch (sqlCheck2.getResult()) {
								case SqlCheck.SQLID_NULL:
									throw new AjaxDataHandlerException("sqlID为空");
								case SqlCheck.SQLID_NO_RIGHT:
									throw new AjaxDataHandlerException("不具有该sql(" + sqlID + ")的执行权限", AjaxExceptionType.login_again);
								case SqlCheck.SQLID_INEXISTENCE:
									throw new AjaxDataHandlerException("该sql(" + sqlID + ")不存在");
								case SqlCheck.CHECK_FAILED:
									throw new AjaxDataHandlerException("sql(" + sqlID + ")数据格式校验失败");
								case SqlCheck.LOGIN_AGAIN:
									throw new AjaxDataHandlerException("需要进行登录", AjaxExceptionType.login_again);
							}
							List<Map<String, Object>> ret2 = dataBase.executeQuery(sqlCheck2.getSqlData().getSql(), sqlCheck2.getSqlData().getPreparedParameters());
							Map<String, Object> pm1 = new HashMap<String, Object>();
							pm1.put("author_name", zz);
							pm1.put("author_id", ret2.get(0).get("next_id"));
							SqlCheck sqlCheck1 = check(sqlID1, pm1, user, application);
							switch (sqlCheck1.getResult()) {
								case SqlCheck.SQLID_NULL:
									throw new AjaxDataHandlerException("sqlID为空");
								case SqlCheck.SQLID_NO_RIGHT:
									throw new AjaxDataHandlerException("不具有该sql(" + sqlID + ")的执行权限", AjaxExceptionType.login_again);
								case SqlCheck.SQLID_INEXISTENCE:
									throw new AjaxDataHandlerException("该sql(" + sqlID + ")不存在");
								case SqlCheck.CHECK_FAILED:
									throw new AjaxDataHandlerException("sql(" + sqlID + ")数据格式校验失败");
								case SqlCheck.LOGIN_AGAIN:
									throw new AjaxDataHandlerException("需要进行登录", AjaxExceptionType.login_again);
							}
							int result = dataBase.executeUpdate(sqlCheck1.getSqlData().getSql(), sqlCheck1.getSqlData().getPreparedParameters());
							if(result != -1){
								zz_id =  ret2.get(0).get("next_id")+"";
							}
						}
					}
					sqlList.add("INSERT INTO bk_image (img_id,small_relative_path) VALUES ('"+vi+"','"+img_path+"') ON DUPLICATE KEY UPDATE small_relative_path = '"+img_path+"'");
					preparedParametersList.add(null);
					sqlList.add("INSERT INTO bk_goods (goods_id,goods_name,goods_factory,author_id,goods_author,add_time,goods_img_id,goods_old_price,goods_price) VALUES ('"+row.get("bk_code")+"', '"+row.get("bk_name")+"','"+row.get("cbs")+"','"+zz_id+"','"+zz+"',now(),'"+vi+"','"+yj+"','"+sj+"') ON DUPLICATE KEY UPDATE goods_name = '"+row.get("bk_name")+"',goods_img_id = '"+vi+"',author_id = '"+zz_id+"',goods_factory = '"+row.get("cbs")+"',goods_author = '"+row.get("zz")+"',goods_old_price = '"+yj+"',goods_price = '"+sj+"' ");
					preparedParametersList.add(null);
					vi++;
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
