package org.xtframe.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xtframe.dao.IDataBase;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.ContextUtil;
import org.xtframe.util.SpringUtil;
import org.xtframe.util.ApplicationConfigUtil;

/**
 * @ClassName: DataBaseInfo
 * @Description: 数据库信息
 * @author yong.sun
 * @date 2013-9-14
 */
public class DataBaseInfo {
	private final Log logger = LogFactory.getLog(getClass());

	private IDataBase dataBase;
	private ApplicationConfig applicationConfig;

	// jndiName
	private String jndiName;
	// 名称
	private String dbName;
	// 数据库类型
	private String dbType;
	// 适配器
	private String driverClassName;
	// 连接地址
	private String url;
	// 用户名
	private String username;
	// 密码
	private String password;
	// 描述
	private String remark;
	// 数据库对应的所有sql
	private ArrayList<String> sqlList;

	public DataBaseInfo() {
		dataBase = (IDataBase) SpringUtil.getBean("dataBase");
		applicationConfig = ApplicationConfigUtil.getApplicationConfig();
		sqlList = new ArrayList<String>();
	}

	/**
	 * 初始化数据库对应的所有sql
	 * 
	 * @return
	 */
	public boolean init() {
		try {
			sqlList.clear();
			SQL sql = ContextUtil.getApplication().getSql(dataBase.getDBType(), applicationConfig.getConfig("dataBaseInitSql"));
			Map<String, Object> parame = new HashMap<String, Object>();
			parame.put("jndiname", jndiName);
			String strSql = CommonUtil.createSql(sql.getSqlTemplet(), parame);
			List<String> result = dataBase.executeQuery(strSql, 1, null);
			if (result == null)
				return false;
			for (String str : result) {
				sqlList.add(str.trim());
			}
			return true;
		} catch (Exception e) {
			logger.error(e.toString());
		}
		return false;
	}

	/**
	 * 根据sqlId判断sql是否在改数据库上
	 * 
	 * @param sqlId
	 * @return
	 */
	public boolean isInSQL(String sqlId) {
		boolean result = false;
		for (String str : sqlList) {
			if (str.equals(sqlId)) {
				result = true;
				break;
			}
		}
		return result;
	}

	public String getJndiName() {
		return jndiName;
	}

	public void setJndiName(String jndiName) {
		this.jndiName = jndiName;
	}

	public String getDbName() {
		return dbName;
	}

	public void setDbName(String dbName) {
		this.dbName = dbName;
	}

	public String getDbType() {
		return dbType;
	}

	public void setDbType(String dbType) {
		this.dbType = dbType;
	}

	public String getDriverClassName() {
		return driverClassName;
	}

	public void setDriverClassName(String driverClassName) {
		this.driverClassName = driverClassName;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public ArrayList<String> getSqlList() {
		return sqlList;
	}

	public void setSqlList(ArrayList<String> sqlList) {
		this.sqlList = sqlList;
	}
}
