package org.xtframe.util;

import com.opensymphony.oscache.base.NeedsRefreshException;
import com.opensymphony.oscache.general.GeneralCacheAdministrator;

/**
 * @ClassName: OsCacheUtil
 * @Description: 缓存工具
 * @author yong.sun
 * @date 2013-9-15
 */
public class OsCacheUtil {
	// GeneralCacheAdministrator注入Bean名称
	public static final String GENERAL_CACHE_ADMINISTRATOR_BEAN_NAME = "cacheManager";

	/**
	 * 根据Key读取缓存
	 * 
	 * @param key
	 * @return
	 */
	public static Object getFromCache(String key) {
		GeneralCacheAdministrator generalCacheAdministrator = (GeneralCacheAdministrator) SpringUtil
				.getBean(GENERAL_CACHE_ADMINISTRATOR_BEAN_NAME);
		Object object = null;
		try {
			object = generalCacheAdministrator.getFromCache(key);
		} catch (NeedsRefreshException e) {
			generalCacheAdministrator.cancelUpdate(key);
		}
		return object;
	}

	/**
	 * 加入对象到缓存
	 * 
	 * @param key
	 * @param object
	 */
	public static void putInCache(String key, Object object) {
		GeneralCacheAdministrator generalCacheAdministrator = (GeneralCacheAdministrator) SpringUtil
				.getBean(GENERAL_CACHE_ADMINISTRATOR_BEAN_NAME);
		generalCacheAdministrator.putInCache(key, object);
	}

	/**
	 * 根据Key刷新缓存对象
	 * 
	 * @param key
	 */
	public static void flushEntry(String key) {
		GeneralCacheAdministrator generalCacheAdministrator = (GeneralCacheAdministrator) SpringUtil
				.getBean(GENERAL_CACHE_ADMINISTRATOR_BEAN_NAME);
		generalCacheAdministrator.flushEntry(key);
	}

	/**
	 * 刷新所有缓存对象
	 */
	public static void flushAll() {
		GeneralCacheAdministrator generalCacheAdministrator = (GeneralCacheAdministrator) SpringUtil
				.getBean(GENERAL_CACHE_ADMINISTRATOR_BEAN_NAME);
		generalCacheAdministrator.flushAll();
	}

}
