package org.xtframe.util;

import java.util.ResourceBundle;

import org.xtframe.entity.ApplicationConfig;

/**
 * @ClassName: SystemConfigUtil
 * @Description: 系统参数工具类
 * @author yong.sun
 * @date 2013-9-15
 */
public class ApplicationConfigUtil {
	// 系统配置文件名称，省略了后缀".properties"
	public static final String CONFIG_FILE_NAME = "xtframe";
	// 系统配置信息
	private static ApplicationConfig applicationConfig = null;
	
	/**
	 * 获取系统参数
	 * 
	 * @return
	 */
	public static ApplicationConfig getApplicationConfig() {
		if (applicationConfig != null) {
			return applicationConfig;
		}
		
		ResourceBundle cache = null;
		try {
			cache = ResourceBundle.getBundle(CONFIG_FILE_NAME);
		} catch (RuntimeException e) {
			e.printStackTrace();
		}

		applicationConfig = new ApplicationConfig();
		applicationConfig.setInitSqlData(cache.getString("initSqlData"));
		applicationConfig.setInitConfig(cache.getString("initConfig"));
		
		applicationConfig.initConfig();
		
		return applicationConfig;
	}
}
