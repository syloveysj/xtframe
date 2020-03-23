package org.xtframe.service.web.impl.custom;

import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xtframe.dao.DataBaseFactory;
import org.xtframe.dao.IDataBase;
import org.xtframe.entity.Application;
import org.xtframe.entity.SQL;
import org.xtframe.entity.User;
import org.xtframe.entity.WebPageDefined;
import org.xtframe.service.AbstractBasicExecute;
import org.xtframe.service.SqlCheck;
import org.xtframe.service.ajax.AjaxDataHandlerException;
import org.xtframe.service.ajax.AjaxDataHandlerException.AjaxExceptionType;
import org.xtframe.service.web.IWebDataHandler;
import org.xtframe.util.ContextUtil;

/**
 * @ClassName: GoodsListDataHandler 
 * @Description: 分类进入处理
 * @author wen.xu
 * @date 2015-11-19
 */
public class GoodsListDataHandler extends AbstractBasicExecute implements IWebDataHandler {
	private final Log logger = LogFactory.getLog(getClass());
	
	public Object execute(Map<String, Object> parame, Map<String, Object> data, WebPageDefined wpd) {
		try {
			User user = ContextUtil.getCurrentUser();
			Application application = ContextUtil.getApplication();
			
			String sqlID = data.get("query_sqlid").toString();
			SqlCheck sqlCheck = check(sqlID, parame, user, application);
			switch(sqlCheck.getResult()){
				case SqlCheck.SQLID_NULL:
					throw new AjaxDataHandlerException("sqlID为空");
				case SqlCheck.SQLID_NO_RIGHT:
					throw new AjaxDataHandlerException("不具有该sql("+sqlID+")的执行权限", AjaxExceptionType.login_again);
				case SqlCheck.SQLID_INEXISTENCE:
					throw new AjaxDataHandlerException("该sql("+sqlID+")不存在");
				case SqlCheck.CHECK_FAILED:
					throw new AjaxDataHandlerException("sql("+sqlID+")数据格式校验失败");
				case SqlCheck.LOGIN_AGAIN:
					throw new AjaxDataHandlerException("需要进行登录", AjaxExceptionType.login_again);
			}
			
			IDataBase dataBase = DataBaseFactory.getDataBaseForSqlId(sqlID);
			SQL sql = Application.getInstance().getSql(sqlID);
			if(SQL.SELECT.equals(sql.getExecType())) {
				List<Map<String, Object>> result = dataBase.executeQuery(sqlCheck.getSqlData().getSql(), sqlCheck.getSqlData().getPreparedParameters());
				return result;
			} else {
				int result = dataBase.executeUpdate(sqlCheck.getSqlData().getSql(), sqlCheck.getSqlData().getPreparedParameters());
				return result;
			}
		} catch (Exception e) {
			logger.error(e.toString());
		}
		
		return null;
	}
}
