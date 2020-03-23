package org.xtframe.sql;

import java.util.Map;

import org.xtframe.util.SpringUtil;

/**
 * @ClassName: SqlVerifyFactory 
 * @Description: Sql验证器工厂
 * @author yong.sun
 * @date 2013-9-15
 */
public class SqlVerifyFactory {
	//验证器集合
	private Map<String, String> verifyMap = null;

	public Map<String, String> getVerifyMap() {
		return verifyMap;
	}

	public void setVerifyMap(Map<String, String> verifyMap) {
		this.verifyMap = verifyMap;
	}
	
	/**
	 * 获取验证器
	 * @param name
	 * @return
	 */
	public ISqlVerify getVerifyBase(String name){
		Object bean = SpringUtil.getBean(this.verifyMap.get(name));
		if(bean != null) return (ISqlVerify) bean;
		return null;
	}
}
