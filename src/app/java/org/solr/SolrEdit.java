package org.solr;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.xtframe.dao.DataBaseFactory;
import org.xtframe.dao.IDataBase;
import org.xtframe.entity.Application;
import org.xtframe.entity.User;
import org.xtframe.service.AbstractBasicExecute;
import org.xtframe.service.SqlCheck;
import org.xtframe.service.ajax.AjaxDataHandlerException;
import org.xtframe.service.ajax.AjaxDataHandlerException.AjaxExceptionType;
import org.xtframe.util.ContextUtil;

public class SolrEdit extends AbstractBasicExecute{
	public  void core0Edit(String bk_code,String dw_code) throws Exception{
		User user = ContextUtil.getCurrentUser();
		Application application = ContextUtil.getApplication();
		String sqlID = "book_stock_8";
		IDataBase dataBase = DataBaseFactory.getDataBaseForSqlId(sqlID);
		Map<String, Object> pm = new HashMap<String, Object>();
		pm.put("bk_code", bk_code);
		pm.put("dw_code", dw_code);
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
		String key = "bk_code:"+bk_code+" AND dw_code :"+dw_code;
		if(SolrUtil.isAs("core0", key)){
			SolrUtil.deleteFiled("core0", key);
		}
		List<String> strDateList = new ArrayList<String>();
		strDateList.add("gx_time");
		SolrUtil.addFiled("core0", ret.get(0), strDateList);
	}
	
	public  void conEdit(String bk_code) throws Exception{
		User user = ContextUtil.getCurrentUser();
		Application application = ContextUtil.getApplication();
		String sqlID = "book_info_8";
		IDataBase dataBase = DataBaseFactory.getDataBaseForSqlId(sqlID);
		Map<String, Object> pm = new HashMap<String, Object>();
		pm.put("bk_code", bk_code);
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
		String key = "bk_code:"+bk_code;
		if(SolrUtil.isAs("collection1", key)){
			SolrUtil.deleteFiled("collection1", key);
		}
		List<String> strDateList = new ArrayList<String>();
		strDateList.add("dj_time");
		SolrUtil.addFiled("collection1", ret.get(0), strDateList);
	}

	public static void core0Delete(String bk_code, String dw_code) {
		String key = "bk_code:"+bk_code+" AND dw_code :"+dw_code;
		if(SolrUtil.isAs("core0", key)){
			SolrUtil.deleteFiled("core0", key);
		}
	}

	public static void conDelete(String bk_code) {
		String key = "bk_code:"+bk_code;
		if(SolrUtil.isAs("collection1", key)){
			SolrUtil.deleteFiled("collection1", key);
		}
	}
}
