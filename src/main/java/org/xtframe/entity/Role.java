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
 * @ClassName: Role
 * @Description: 角色类
 * @author yong.sun
 * @date 2013-9-14
 */
public class Role {
	private final Log logger = LogFactory.getLog(getClass());

	private IDataBase dataBase;
	private ApplicationConfig applicationConfig;

	// 角色ID
	private String roleId;
	// 角色名称
	private String roleName;
	// 角色顺序号
	private int sortNo;
	// 角色对应的所有菜单
	private ArrayList<Integer> menu;
	// 角色对应的所有sql
	private ArrayList<String> sqls;
	// 角色对应的所有逻辑
	private ArrayList<String> logic;
	// 角色对应的所有资源
	private ArrayList<String> resources;

	public Role() {
		dataBase = (IDataBase) SpringUtil.getBean("dataBase");
		applicationConfig = ApplicationConfigUtil.getApplicationConfig();

		menu = new ArrayList<Integer>();
		sqls = new ArrayList<String>();
		logic = new ArrayList<String>();
		resources = new ArrayList<String>();
	}

	/**
	 * 初始化角色相关数据
	 * 
	 * @return
	 */
	public boolean init() {
		try {
			if (roleId == null)
				return false;

			Application application = ContextUtil.getApplication();
			menu.clear();
			SQL sql = application.getSql(dataBase.getDBType(), applicationConfig.getConfig("roleInitMenu"));
			Map<String, Object> parame = new HashMap<String, Object>();
			parame.put("roleid", roleId);
			String strSql = CommonUtil.createSql(sql.getSqlTemplet(), parame);
			List<String> result = dataBase.executeQuery(strSql, 1, null);
			if (result == null)
				return false;
			for (String str : result) {
				menu.add(Integer.valueOf(str));
			}

			sqls.clear();
			sql = application.getSql(dataBase.getDBType(), applicationConfig.getConfig("roleInitSql"));
			strSql = CommonUtil.createSql(sql.getSqlTemplet(), parame);
			result = dataBase.executeQuery(strSql, 1, null);
			if (result == null)
				return false;
			for (String str : result) {
				sqls.add(str.trim());
			}

			logic.clear();
			sql = application.getSql(dataBase.getDBType(), applicationConfig.getConfig("roleInitLogic"));
			strSql = CommonUtil.createSql(sql.getSqlTemplet(), parame);
			result = dataBase.executeQuery(strSql, 1, null);
			if (result == null)
				return false;
			for (String str : result) {
				logic.add(str.trim());
			}

			resources.clear();
			sql = application.getSql(dataBase.getDBType(), applicationConfig.getConfig("roleInitResources"));
			strSql = CommonUtil.createSql(sql.getSqlTemplet(), parame);
			result = dataBase.executeQuery(strSql, 1, null);
			if (result == null)
				return false;
			for (String str : result) {
				resources.add(str.trim());
			}

			return true;
		} catch (NumberFormatException e) {
			logger.error(e.toString());
		}
		return false;
	}

	/**
	 * 判断是否拥有sql权限
	 * 
	 * @param sqlId
	 * @return
	 */
	public boolean isInSQL(String sqlId) {
		boolean result = false;
		for (String str : sqls) {
			if (str.equals(sqlId)) {
				result = true;
				break;
			}
		}
		return result;
	}

	/**
	 * 判断是否拥有逻辑权限
	 * 
	 * @param logicId
	 * @return
	 */
	public boolean isInLogic(String logicId) {
		boolean result = false;
		for (String str : logic) {
			if (str.equals(logicId)) {
				result = true;
				break;
			}
		}
		return result;
	}

	public boolean isInRes(String resId) {
		boolean result = false;
		for (String str : resources) {
			if (str.equals(resId)) {
				result = true;
				break;
			}
		}
		return result;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public int getSortNo() {
		return sortNo;
	}

	public void setSortNo(int sortNo) {
		this.sortNo = sortNo;
	}

	public ArrayList<Integer> getMenu() {
		return menu;
	}

	public ArrayList<String> getLogic() {
		return logic;
	}
}
