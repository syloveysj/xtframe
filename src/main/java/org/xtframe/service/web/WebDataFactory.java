package org.xtframe.service.web;

import org.xtframe.service.web.impl.CustomDataHandler;
import org.xtframe.service.web.impl.FinalDataHandler;
import org.xtframe.service.web.impl.SingleSqlDataHandler;
import org.xtframe.service.web.impl.TransactionDataHandler;

/**
 * @ClassName: WebDataFactory 
 * @Description: web数据处理工厂类
 * @author yong.sun
 * @date 2013-10-31
 */
public class WebDataFactory {
	//单条SQL查询
	public static final String EXEC_SINGLE_SQL = "single_sql";
	//事务处理
	public static final String EXEC_TRANSACTION = "transaction";
	//常量
	public static final String EXEC_FINAL = "final";
	//自定义处理
	public static final String EXEC_CUSTOM = "custom";
	
	/**
	 * 创建处理对象
	 * 
	 * @param execType
	 * @return
	 */
	public static IWebDataHandler createWebDataHandler(String execType){
		IWebDataHandler webDataHandler = null;
		
		if(EXEC_SINGLE_SQL.equals(execType)) {
			webDataHandler = new SingleSqlDataHandler();
		} else if(EXEC_TRANSACTION.equals(execType)) {
			webDataHandler = new TransactionDataHandler();
		} else if(EXEC_FINAL.equals(execType)) {
			webDataHandler = new FinalDataHandler();
		} else if(EXEC_CUSTOM.equals(execType)) {
			webDataHandler = new CustomDataHandler();
		}
		
		return webDataHandler;
	}
}

