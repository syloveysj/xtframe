package org.xtframe.service;

import java.util.Map;

import org.xtframe.drools.business.BusinessExecutor;
import org.xtframe.drools.entity.BusinessResult;
import org.xtframe.entity.Application;
import org.xtframe.entity.SQL;
import org.xtframe.entity.User;
import org.xtframe.sql.SqlData;
import org.xtframe.util.StringUtil;

/**
 * @ClassName: AbstractBasicExecute 
 * @Description: SQL校验处理抽象类
 * @author yong.sun
 * @date 2013-9-21
 */
public abstract class AbstractBasicExecute {
	public SqlCheck check(String sqlID, Map<String, Object> parameters, User user, Application application) throws Exception{
		SqlCheck sqlCheck = new SqlCheck();
		if(StringUtil.isNullStr(sqlID)){
			sqlCheck.setResult(SqlCheck.SQLID_NULL);	// sqlID为空
			return sqlCheck;
		}
		
		BusinessResult bresult = BusinessExecutor.verifySQLExecutivePower(sqlID);
		if(bresult.getResult() != BusinessResult.SUCCESS){
			if(bresult.getResult() == BusinessResult.LOGIN_AGAIN) {
				sqlCheck.setResult(SqlCheck.LOGIN_AGAIN);	// 需要重新登录
			} else {
				sqlCheck.setResult(SqlCheck.SQLID_NO_RIGHT);	// 没有该sql的执行权限
			}
			return sqlCheck;
		}
		
		SQL sql = application.getSql(sqlID);
		if(sql == null){
			sqlCheck.setResult(SqlCheck.SQLID_INEXISTENCE);	// 该sql不存在
			return sqlCheck;
		}
		
		//判断数据格式是否符合要求
		SqlData sqlData = sql.getSqlBuildVerify().createSql(parameters);
		if(!sqlData.isResult()) {
			sqlCheck.setResult(SqlCheck.CHECK_FAILED);
			return sqlCheck;
		}
		sqlCheck.setSqlData(sqlData);
		sqlCheck.setResult(SqlCheck.SUCCESS);
		return sqlCheck;
	}
}
