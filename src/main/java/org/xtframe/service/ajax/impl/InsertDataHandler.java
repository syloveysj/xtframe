package org.xtframe.service.ajax.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.xtframe.common.json.JSON2Java;
import org.xtframe.dao.DataBaseFactory;
import org.xtframe.dao.IDataBase;
import org.xtframe.entity.Application;
import org.xtframe.entity.User;
import org.xtframe.service.AbstractBasicExecute;
import org.xtframe.service.SqlCheck;
import org.xtframe.service.ajax.AjaxDataHandlerException;
import org.xtframe.service.ajax.IAjaxDataHandler;
import org.xtframe.service.ajax.AjaxDataHandlerException.AjaxExceptionType;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.ContextUtil;
import org.xtframe.util.StringUtil;

/**
 * @ClassName: InsertDataHandler 
 * @Description: 插入并返回主键ID
 * @author yong.sun
 * @date 2013-9-23
 */
@Service
@Scope("prototype")
public class InsertDataHandler extends AbstractBasicExecute implements IAjaxDataHandler {
	private final Log logger = LogFactory.getLog(getClass());

	public Map<String, Object> execute(String strData) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			User user = ContextUtil.getCurrentUser();
			Application application = ContextUtil.getApplication();

			Map<String, Object> objJson = JSON2Java.optMap(CommonUtil.getJavaObject(strData));
			String sqlID = StringUtil.toString(objJson.get("sqlID"), "");
			SqlCheck sqlCheck = check(sqlID, JSON2Java.optMap(objJson.get("parameters"), new HashMap<String, Object>()), user,
					application);
			switch (sqlCheck.getResult()) {
				case SqlCheck.SQLID_NULL:
					throw new AjaxDataHandlerException("sqlID为空");
				case SqlCheck.SQLID_NO_RIGHT:
					map.put(STATUS, false);
					map.put(RIGHT, false);
					throw new AjaxDataHandlerException("不具有该sql(" + sqlID + ")的执行权限", AjaxExceptionType.login_again);
				case SqlCheck.SQLID_INEXISTENCE:
					throw new AjaxDataHandlerException("该sql(" + sqlID + ")不存在");
				case SqlCheck.CHECK_FAILED:
					throw new AjaxDataHandlerException("sql(" + sqlID + ")数据格式校验失败");
				case SqlCheck.LOGIN_AGAIN:
					map.put(STATUS, false);
					map.put(RIGHT, false);
					map.put(LOGIN, true);
					throw new AjaxDataHandlerException("需要进行登录", AjaxExceptionType.login_again);
			}

			IDataBase dataBase = DataBaseFactory.getDataBaseForSqlId(sqlID);
			int result = dataBase.insert(sqlCheck.getSqlData().getSql(), sqlCheck.getSqlData().getPreparedParameters());
			if (result <= 0) {
				map.put(STATUS, false);
			} else {
				map.put(STATUS, true);
				map.put(ID, result);
			}
		} catch (AjaxDataHandlerException ex) {
			logger.warn(ex.toString());
			if (ex.getFlag() == AjaxExceptionType.general) {
				map.clear();
				map.put(STATUS, false);
			}
		} catch (Exception e) {
			logger.error(e.toString());
			map.clear();
			map.put(STATUS, false);
		}

		return map;
	}
}
