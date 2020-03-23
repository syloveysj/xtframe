package org.xtframe.dao;

import java.util.ArrayList;

import org.xtframe.entity.DataBaseInfo;
import org.xtframe.entity.Application;
import org.xtframe.util.ContextUtil;
import org.xtframe.util.SpringUtil;

/**
 * @ClassName: DataBaseFactory 
 * @Description: 数据库操作工厂类
 * @author yong.sun
 * @date 2013-9-15
 */
public class DataBaseFactory {
	/**
	 * 更加jndi获取数据库操作类
	 * @param jndiName
	 * @return
	 */
	public static IDataBase getDataBaseForJndiName(String jndiName){
		return (IDataBase) SpringUtil.getBean(jndiName);
	}
	
	/**
	 * 根据sqlId获取数据库操作类
	 * @param sqlId
	 * @return
	 */
	public static IDataBase getDataBaseForSqlId(String sqlId){
		Application application = ContextUtil.getApplication();
		ArrayList<DataBaseInfo> dataBaseInfo = application.getDataBaseInfo();
		for(DataBaseInfo dbi : dataBaseInfo){
			if(dbi.isInSQL(sqlId)) return getDataBaseForJndiName(dbi.getJndiName());
		}
		return getDataBaseForJndiName("dataBase");
	}
}
