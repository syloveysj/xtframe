package org.xtframe.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xtframe.dao.DataBaseFactory;
import org.xtframe.dao.IDataBase;
import org.xtframe.filter.SecurityFilter;
import org.xtframe.sql.SqlBuildVerify;
import org.xtframe.util.ApplicationConfigUtil;
import org.xtframe.util.SpringUtil;
import org.xtframe.util.StringUtil;

/**
 * @ClassName: Application
 * @Description: 应用程序类
 * @author yong.sun
 * @date 2013-9-14
 */
public class Application {
	private final Log logger = LogFactory.getLog(getClass());

	private IDataBase dataBase;
	private ApplicationConfig applicationConfig;
	private SecurityFilter securityFilter;

	// 所有角色
	private Map<String, Role> role;
	// 所有菜单
	private ArrayList<Menu> menu;
	// 所有sql
	private Map<String, Map<String, SQL>> sqls;
	// 所有逻辑
	private Map<String, Logic> logic;
	// 所有资源
	private Map<String, Resources> resources;
	// 所有字典数据
	private ArrayList<Dictionary> dictionary;
	// 数据字典
	private Map<String, ArrayList<Map<String, String>>> dicMap;
	// 角色权权
	private ArrayList<Map<String, String>> optRole;
	// 系统数据
	private Map<String, SystemParameter> systemParameter;
	// 所有数据库
	private ArrayList<DataBaseInfo> dataBaseInfo;
	
	// 所有页面配置
	private Map<String, WebPage> pages;
	// 所有页面定义配置
	private Map<String, WebPageDefined> wpds;
	// 所有页面定义明细配置
	private Map<String, WebPageDefinedDetails> wpdds;

	private static class ApplicationHolder {  
		 private static final Application INSTANCE = new Application();  
	}
	 
	private Application() {
		dataBase = (IDataBase) SpringUtil.getBean("dataBase");
		applicationConfig = ApplicationConfigUtil.getApplicationConfig();
		securityFilter = (SecurityFilter) SpringUtil.getBean("securityFilter");

		role = new TreeMap<String, Role>();
		menu = new ArrayList<Menu>();
		sqls = new HashMap<String, Map<String, SQL>>();
		logic = new TreeMap<String, Logic>();
		resources = new TreeMap<String, Resources>();
		dictionary = new ArrayList<Dictionary>();
		dicMap = new TreeMap<String, ArrayList<Map<String, String>>>();
		optRole = new ArrayList<Map<String, String>>();
		systemParameter = new TreeMap<String, SystemParameter>();
		dataBaseInfo = new ArrayList<DataBaseInfo>();
		
		pages = new TreeMap<String, WebPage>();
		wpds = new LinkedHashMap<String, WebPageDefined>();
		wpdds = new LinkedHashMap<String, WebPageDefinedDetails>();
	}
	
	public static final Application getInstance() {  
		return ApplicationHolder.INSTANCE;
	} 

	public boolean initAll() {
		return (initSQL() && initDataBase() && initRole() && initMenu() && initLogic() && initResources() && initDictionary() && initSystemParameter() && initWebPages());
	}

	/**
	 * SQL初始化
	 * 
	 * @return
	 */
	public boolean initSQL() {
		try {
			List<Map<String, Object>> result = dataBase.executeQuery(applicationConfig.getInitSqlData(), null);
			if (result == null)
				return false;
			sqls.clear();

			String[] dbTypes = applicationConfig.getConfig("dbTypes").split(",");
			for (String dbType : dbTypes) {
				if(!dbType.trim().isEmpty()) sqls.put(dbType.trim(), new TreeMap<String, SQL>());
			}
			for (Map<String, Object> obj : result) {
				SQL tem_sql = new SQL();
				tem_sql.setSqlId(StringUtil.toString(obj.get("sqlid"), "").trim());
				tem_sql.setSqlName(StringUtil.toString(obj.get("sqlname"), ""));
				tem_sql.setSysCode(StringUtil.toString(obj.get("syscode"), ""));
				tem_sql.setSqlTemplet(StringUtil.toString(obj.get("sqltemplet"), ""));
				tem_sql.setSqlBuildVerify(new SqlBuildVerify(tem_sql, StringUtil.toString(obj.get("dataverify"), "")));
				tem_sql.setDbType(StringUtil.toString(obj.get("dbtype"), ""));
				tem_sql.setExecType(StringUtil.toString(obj.get("exectype"), ""));
				tem_sql.setSortNo(Integer.valueOf(StringUtil.toString(obj.get("sortno"), "")));
				tem_sql.setRemark(StringUtil.toString(obj.get("remark"), ""));
				tem_sql.setModId(Integer.valueOf(StringUtil.toString(obj.get("modid"), "")));
				tem_sql.setCreateTime(StringUtil.toString(obj.get("createtime"), ""));

				if (sqls.containsKey(tem_sql.getDbType())) {
					sqls.get(tem_sql.getDbType()).put(tem_sql.getSqlId(), tem_sql);
				}
			}
			logger.info("SQL初始化成功！");
			return true;
		} catch (NumberFormatException e) {
			logger.error("SQL初始化失败！ " + e.toString());
		}
		return false;
	}

	/**
	 * 数据库集初始化
	 * 
	 * @return
	 */
	public boolean initDataBase() {
		try {
			SQL sql = getSql(dataBase.getDBType(), applicationConfig.getConfig("initDataBaseInfo"));
			List<Map<String, Object>> result = dataBase.executeQuery(sql.getSqlTemplet(), null);
			if (result == null)
				return false;

			dataBaseInfo.clear();
			for (Map<String, Object> obj : result) {
				DataBaseInfo tem_database = new DataBaseInfo();
				tem_database.setJndiName(StringUtil.toString(obj.get("jndiname"), "").trim());
				tem_database.setDbName(StringUtil.toString(obj.get("dbname"), ""));
				tem_database.setRemark(StringUtil.toString(obj.get("remark"), ""));
				tem_database.setDbType(DataBaseFactory.getDataBaseForJndiName(tem_database.getJndiName()).getDBType());
				tem_database.init();
				dataBaseInfo.add(tem_database);
			}
			logger.info("数据库集初始化成功！");
			return true;
		} catch (Exception e) {
			logger.error("数据库集初始化失败！ " + e.toString());
		}
		return false;
	}

	/**
	 * 角色初始化
	 * 
	 * @return
	 */
	public boolean initRole() {
		try {
			SQL sql = getSql(dataBase.getDBType(), applicationConfig.getConfig("initRoleData"));
			List<Map<String, Object>> result = dataBase.executeQuery(sql.getSqlTemplet(), null);
			if (result == null)
				return false;

			role.clear();
			optRole.clear();
			for (Map<String, Object> obj : result) {
				Role tem_role = new Role();
				tem_role.setRoleId(StringUtil.toString(obj.get("roleid"), ""));
				tem_role.setRoleName(StringUtil.toString(obj.get("rolename"), ""));
				tem_role.setSortNo(Integer.valueOf(StringUtil.toString(obj.get("sortno"), "")));
				tem_role.init();
				role.put(tem_role.getRoleId(), tem_role);

				Map<String, String> temp = new HashMap<String, String>();
				temp.put("roleId", tem_role.getRoleId());
				temp.put("roleName", tem_role.getRoleName());
				optRole.add(temp);
			}
			logger.info("角色初始化成功！");
			return true;
		} catch (NumberFormatException e) {
			logger.error("角色初始化失败！ " + e.toString());
		}
		return false;
	}

	/**
	 * 菜单初始化
	 * 
	 * @return
	 */
	public boolean initMenu() {
		try {
			SQL sql = getSql(dataBase.getDBType(), applicationConfig.getConfig("initMenuData"));
			List<Map<String, Object>> result = dataBase.executeQuery(sql.getSqlTemplet(), null);
			if (result == null)
				return false;

			menu.clear();
			for (Map<String, Object> obj : result) {
				Menu tem_menu = new Menu();
				tem_menu.setMenuId(Integer.valueOf(StringUtil.toString(obj.get("menuid"), "")));
				tem_menu.setMenuName(StringUtil.toString(obj.get("menuname"), ""));
				tem_menu.setMenuIcon(StringUtil.toString(obj.get("menuicon"), ""));
				tem_menu.setMenuType(StringUtil.toString(obj.get("menutype"), ""));
				tem_menu.setMenuIdPath(StringUtil.toString(obj.get("menuidpath"), ""));
				tem_menu.setMenuLevel(Integer.valueOf(StringUtil.toString(obj.get("menulevel"), "")));
				tem_menu.setUrl(StringUtil.toString(obj.get("url"), ""));
				tem_menu.setSwfUrl(StringUtil.toString(obj.get("swfurl"), ""));
				tem_menu.setSortNo(Integer.valueOf(StringUtil.toString(obj.get("sortno"), "")));
				tem_menu.setRemark(StringUtil.toString(obj.get("remark"), ""));
				menu.add(tem_menu);
			}
			logger.info("菜单初始化成功！");
			return true;
		} catch (NumberFormatException e) {
			logger.error("菜单初始化失败！ " + e.toString());
		}
		return false;
	}

	/**
	 * 逻辑初始化
	 * 
	 * @return
	 */
	public boolean initLogic() {
		try {
			SQL sql = getSql(dataBase.getDBType(), applicationConfig.getConfig("initLogicData"));
			List<Map<String, Object>> result = dataBase.executeQuery(sql.getSqlTemplet(), null);
			if (result == null)
				return false;

			logic.clear();
			for (Map<String, Object> obj : result) {
				Logic tem_logic = new Logic();
				tem_logic.setLogicId(StringUtil.toString(obj.get("logicid"), "").trim());
				tem_logic.setLogicName(StringUtil.toString(obj.get("logicname"), ""));
				tem_logic.setSortNo(Integer.valueOf(StringUtil.toString(obj.get("sortno"), "")));
				tem_logic.setRemark(StringUtil.toString(obj.get("remark"), ""));
				logic.put(tem_logic.getLogicId(), tem_logic);
			}
			logger.info("逻辑初始化成功！");
			return true;
		} catch (NumberFormatException e) {
			logger.error("逻辑初始化失败！ " + e.toString());
		}
		return false;
	}

	/**
	 * 资源初始化
	 * 
	 * @return
	 */
	public boolean initResources() {
		try {
			SQL sql = getSql(dataBase.getDBType(), applicationConfig.getConfig("initResourcesData"));
			List<Map<String, Object>> result = dataBase.executeQuery(sql.getSqlTemplet(), null);
			if (result == null)
				return false;

			resources.clear();
			Set<Resources> restrictedResources = new HashSet<Resources>();
			for (Map<String, Object> obj : result) {
				Resources tem_res = new Resources();
				tem_res.setResId(StringUtil.toString(obj.get("resid"), "").trim());
				tem_res.setResName(StringUtil.toString(obj.get("resname"), ""));
				tem_res.setUri(StringUtil.toString(obj.get("uri"), ""));
				tem_res.setSortNo(Integer.valueOf(StringUtil.toString(obj.get("sortno"), "")));
				tem_res.setRemark(StringUtil.toString(obj.get("remark"), ""));
				resources.put(tem_res.getResId(), tem_res);
				restrictedResources.add(tem_res);
			}
			securityFilter.setRestrictedResources(restrictedResources);
			logger.info("资源初始化成功！");
			return true;
		} catch (NumberFormatException e) {
			logger.error("资源初始化失败！ " + e.toString());
		}
		return false;
	}

	/**
	 * 数据字典初始化
	 * 
	 * @return
	 */
	public boolean initDictionary() {
		try {
			SQL sql = getSql(dataBase.getDBType(), applicationConfig.getConfig("initDictionaryData"));
			List<Map<String, Object>> result = dataBase.executeQuery(sql.getSqlTemplet(), null);
			if (result == null)
				return false;

			dicMap.clear();
			dictionary.clear();
			for (Map<String, Object> obj : result) {
				Dictionary tem_dictionary = new Dictionary();
				tem_dictionary.setDicId(StringUtil.toString(obj.get("dicid"), "").trim());
				tem_dictionary.setDicPId(StringUtil.toString(obj.get("dicpid"), "").trim());
				tem_dictionary.setDicName(StringUtil.toString(obj.get("dicname"), ""));
				tem_dictionary.setDicValue(StringUtil.toString(obj.get("dicvalue"), ""));
				dictionary.add(tem_dictionary);
			}
			logger.info("数据字典初始化成功！");
			return true;
		} catch (Exception e) {
			logger.error("数据字典初始化失败！ " + e.toString());
		}
		return false;
	}

	/**
	 * 系统参数初始化
	 * 
	 * @return
	 */
	public boolean initSystemParameter() {
		try {
			SQL sql = getSql(dataBase.getDBType(), applicationConfig.getConfig("initSystemParameter"));
			List<Map<String, Object>> result = dataBase.executeQuery(sql.getSqlTemplet(), null);
			if (result == null)
				return false;

			systemParameter.clear();
			for (Map<String, Object> obj : result) {
				SystemParameter tem_systemparame = new SystemParameter();
				tem_systemparame.setParameName(StringUtil.toString(obj.get("paramename"), "").trim());
				tem_systemparame.setParameValue(StringUtil.toString(obj.get("paramevalue"), ""));
				tem_systemparame.setRemark(StringUtil.toString(obj.get("remark"), ""));
				systemParameter.put(tem_systemparame.getParameName(), tem_systemparame);
			}
			logger.info("系统数据初始化成功！");
			return true;
		} catch (Exception e) {
			logger.error("系统数据初始化失败！ " + e.toString());
		}
		return false;
	}
	
	/**
	 * Web页面初始化
	 * 
	 * @return
	 */
	public boolean initWebPages() {
		try {
			SQL sql = getSql(dataBase.getDBType(), applicationConfig.getConfig("initWebPage"));
			List<Map<String, Object>> result = dataBase.executeQuery(sql.getSqlTemplet(), null);
			if (result == null)
				return false;
			
			pages.clear();
			for (Map<String, Object> obj : result) {
				WebPage wp = new WebPage();
				wp.setPageId(StringUtil.toString(obj.get("pageid"), "").trim());
				wp.setPageName(StringUtil.toString(obj.get("pagename"), ""));
				wp.setAbleCache(Integer.valueOf(StringUtil.toString(obj.get("ablecache"), "")));
				wp.setPageTempletType(StringUtil.toString(obj.get("pagetemplettype"), ""));
				wp.setPageTempletPath(StringUtil.toString(obj.get("pagetempletpath"), ""));
				wp.setErrorPageTempletType(StringUtil.toString(obj.get("errorpagetemplettype"), ""));
				wp.setErrorPageTempletPath(StringUtil.toString(obj.get("errorpagetempletpath"), ""));
				wp.setSortNo(Integer.valueOf(StringUtil.toString(obj.get("sortno"), "")));
				pages.put(wp.getPageId(), wp);
			}
			
			sql = getSql(dataBase.getDBType(), applicationConfig.getConfig("initWebPageDefined"));
			result = dataBase.executeQuery(sql.getSqlTemplet(), null);
			if (result == null)
				return false;
			
			wpds.clear();
			for (Map<String, Object> obj : result) {
				WebPageDefined wpd = new WebPageDefined();
				wpd.setDefId(StringUtil.toString(obj.get("defid"), "").trim());
				wpd.setPageId(StringUtil.toString(obj.get("pageid"), "").trim());
				wpd.setDataName(StringUtil.toString(obj.get("dataname"), ""));
				wpd.setExecType(StringUtil.toString(obj.get("exectype"), ""));
				wpd.setExecSortNo(Integer.valueOf(StringUtil.toString(obj.get("execsortno"), "")));
				wpds.put(wpd.getDefId(), wpd);
				
				if(pages.containsKey(wpd.getPageId())){
					pages.get(wpd.getPageId()).getWpd().put(wpd.getDefId(), wpd);
				}
			}

			sql = getSql(dataBase.getDBType(), applicationConfig.getConfig("initWebPageDefinedDetails"));
			result = dataBase.executeQuery(sql.getSqlTemplet(), null);
			if (result == null)
				return false;
			
			wpdds.clear();
			for (Map<String, Object> obj : result) {
				WebPageDefinedDetails wpdd = new WebPageDefinedDetails();
				wpdd.setDetId(StringUtil.toString(obj.get("detid"), "").trim());
				wpdd.setDefId(StringUtil.toString(obj.get("defid"), "").trim());
				wpdd.setExecContent(StringUtil.toString(obj.get("execcontent"), ""));
				wpdd.setExecSortNo(Integer.valueOf(StringUtil.toString(obj.get("execsortno"), "")));
				wpdds.put(wpdd.getDetId(), wpdd);
				
				if(wpds.containsKey(wpdd.getDefId())){
					wpds.get(wpdd.getDefId()).getWpdd().put(wpdd.getDetId(), wpdd);
				}
			}
			
			logger.info("Web页面初始化成功！");
			return true;
		} catch (Exception e) {
			logger.error("Web页面初始化失败！ " + e.toString());
		}
		return false;
	}
	
	/**
	 * 根据sqlId获取SQL
	 * 
	 * @param sqlId
	 * @return
	 */
	public SQL getSql(String sqlId) {
		String dbType = dataBase.getDBType();
		for (DataBaseInfo dbi : dataBaseInfo) {
			if (dbi.isInSQL(sqlId)) {
				dbType = dbi.getDbType();
				break;
			}
		}
		return getSql(dbType, sqlId);
	}

	/**
	 * 根据数据库类型+sqlId获取SQL
	 * 
	 * @param dbType
	 * @param sqlId
	 * @return
	 */
	public SQL getSql(String dbType, String sqlId) {
		if (sqls.containsKey(dbType))
			return sqls.get(dbType).get(sqlId);
		return null;
	}

	/**
	 * 根据角色id获取角色对象，无此角色则返回null
	 * 
	 * @param roleid
	 * @return
	 */
	public Role getRole(String roleid) {
		return role.get(roleid);
	}

	/**
	 * 根据角色id链表获取角色对象链表，无此角色则返回空对象链表
	 * 
	 * @param roleIdList
	 * @return
	 */
	public ArrayList<Role> getRoleList(List<String> roleIdList) {
		if (roleIdList == null || roleIdList.size() == 0)
			return null;
		ArrayList<Role> roleList = new ArrayList<Role>();
		for (String roleId : roleIdList) {
			Role tem = getRole(roleId);
			if (tem != null)
				roleList.add(tem);
		}
		return roleList;
	}

	/**
	 * 根据角色id链表获取角色权权链表，无此角色则返回空对象链表
	 * 
	 * @param roleIdList
	 * @return
	 */
	public ArrayList<Map<String, String>> getOptRoleList(List<String> roleIdList) {
		if (roleIdList == null || roleIdList.size() == 0)
			return null;
		ArrayList<Map<String, String>> optRoleList = new ArrayList<Map<String, String>>();
		for (String roleId : roleIdList) {
			for (Map<String, String> temp : optRole) {
				if (temp.get("roleId").equals(roleId)) {
					optRoleList.add(temp);
					break;
				}
			}
		}
		return optRoleList;
	}

	/**
	 * 根据菜单id获取菜单对象，无此菜单则返回null
	 * 
	 * @param menuId
	 * @return
	 */
	public Menu getMenu(int menuId) {
		if (menu == null)
			return null;
		Menu result = null;
		for (Menu temp : menu) {
			if (temp.getMenuId() == menuId) {
				result = temp;
				break;
			}
		}
		return result;
	}

	/**
	 * 根据菜单id链表获取菜单对象链表，无此菜单则返回空对象链表
	 * 
	 * @param menuIdList
	 * @return
	 */
	public ArrayList<Menu> getMenuList(List<Integer> menuIdList) {
		if (menuIdList == null || menuIdList.size() == 0)
			return null;
		ArrayList<Menu> menuList = new ArrayList<Menu>();
		for (Menu temp : menu) {
			for (Integer menuId : menuIdList) {
				if (temp.getMenuId() == menuId) {
					menuList.add(temp);
					break;
				}
			}
		}
		return menuList;
	}

	/**
	 * 根据数据字典编号返回[{"名称","值"}…]的数据链表对象
	 * 
	 * @param dicId
	 * @return
	 */
	public ArrayList<Map<String, String>> getDictionaryDataList(String dicId) {
		ArrayList<Map<String, String>> result = dicMap.get(dicId);
		if (result != null)
			return result;

		result = new ArrayList<Map<String, String>>();
		for (Dictionary temp : dictionary) {
			if (temp.getDicPId().equals(dicId)) {
				Map<String, String> dic = new HashMap<String, String>();
				dic.put("dicName", temp.getDicName());
				dic.put("dicValue", temp.getDicValue());
				result.add(dic);
			}
		}
		dicMap.put(dicId, result);
		return result;
	}

	/**
	 * 获取系统参数
	 * 
	 * @param parameName
	 * @return
	 */
	public String getSystemParameter(String parameName) {
		String result = "";
		SystemParameter sp = systemParameter.get(parameName);
		if (sp != null)
			result = sp.getParameValue();
		return result;
	}
	
	/**
	 * 根据pageId获取页面配置
	 * 
	 * @return
	 */
	public WebPage getPage(String pageId) {
		return pages.get(pageId);
	}

	public ArrayList<Map<String, String>> getOptRole() {
		return optRole;
	}

	public ArrayList<Dictionary> getDictionary() {
		return dictionary;
	}

	public ArrayList<DataBaseInfo> getDataBaseInfo() {
		return dataBaseInfo;
	}

	public ArrayList<Menu> getMenu() {
		return menu;
	}
}
