package org.xtframe.entity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xtframe.dao.IDataBase;
import org.xtframe.util.SpringUtil;
import org.xtframe.util.StringUtil;

/**
 * @ClassName: SystemConfig
 * @Description: 系统配置信息
 * @author yong.sun
 * @date 2013-9-15
 */
public class ApplicationConfig {
	// /数据库操作方法常量///
	// 注册
	public static final int FUNC_REGISTER = 1;

	// 用户登录
	public static final int FUNC_LOGIN = 2;

	// 退出登录
	public static final int FUNC_LOGOUT = 3;

	// 查询方法
	public static final int FUNC_EXECUTEQUERY = 4;

	// 更新方法
	public static final int FUNC_EXECUTEUPDATE = 5;

	// 自增主键的插入方法
	public static final int FUNC_INSERT = 6;

	// 事务提交
	public static final int FUNC_EXECUTETRANSACTION = 7;

	// 批量查询
	public static final int FUNC_EXECUTEQUERYTRANSACTION = 8;

	// 获取菜单
	public static final int FUNC_MENU = 9;

	// 刷新服务器加载数据
	public static final int FUNC_SERVER_BREAK = 10;

	// 获取当前用户信息
	public static final int FUNC_USERINFO = 11;

	// 获取服务器数据
	public static final int FUNC_SERVER_DATA = 12;

	// 批量获取服务器数据
	public static final int FUNC_SERVER_DATA_LIST = 13;

	// 执行存储过程
	public static final int FUNC_PREPARECALL = 14;

	// 分页查询数据
	public static final int FUNC_PAGING = 15;

	// 获取流程定义列表
	public static final int FUNC_PROCESSDEFINITION_LIST = 51;

	// 获取流程实例列表
	public static final int FUNC_PROCESSINSTANCE_LIST = 52;

	// 获取任务列表
	public static final int FUNC_TASK_LIST = 53;

	// 开启流程
	public static final int FUNC_STARTPROCESS = 54;

	// 流程图信息
	public static final int FUNC_PROCESSVIEW = 55;

	// 完成任务
	public static final int FUNC_COMPLETETASK = 56;

	// 任务页面
	public static final int FUNC_TASKPAGE = 57;

	// 删除部署
	public static final int FUNC_DELETEDEPLOYMENT = 58;
	
	// 执行自定义处理
	public static final int FUNC_CUSTOM = 999;

	// 服务器数据存放在applecation中的key
	public static final String SERVER_DATA = "serverData";
	// 登陆用户存放在session中的key
	public static final String LOGIN_USER = "userData";

	private final Log logger = LogFactory.getLog(getClass());

	// SQL对象初始化sql
	private String initSqlData;
	// 系统参数初始化sql
	private String initConfig;

	// 系统参数
	private Map<String, String> config = new HashMap<String, String>();

	/**
	 * 系统参数初始化
	 */
	public void initConfig() {
		try {
			IDataBase dataBase = (IDataBase) SpringUtil.getBean("dataBase");
			List<Map<String, Object>> result = dataBase.executeQuery(getInitConfig(), null);
			if (result != null) {
				config.clear();
				for (Map<String, Object> obj : result) {
					config.put(StringUtil.toString(obj.get("name"), ""), StringUtil.toString(obj.get("content"), ""));
				}
				logger.info("系统参数初始化成功！");
			} else {
				logger.info("系统参数初始化失败！");
			}
		} catch (Exception e) {
			logger.error(e);
			logger.error("系统参数初始化失败！");
		}
	}

	public String getConfig(String key) {
		return config.get(key);
	}

	public String getInitSqlData() {
		return initSqlData;
	}

	public void setInitSqlData(String initSqlData) {
		this.initSqlData = initSqlData;
	}

	public String getInitConfig() {
		return initConfig;
	}

	public void setInitConfig(String initConfig) {
		this.initConfig = initConfig;
	}
}
