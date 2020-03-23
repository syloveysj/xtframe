package org.xtframe.service;

import org.xtframe.sql.SqlData;

/**
 * @ClassName: SqlCheck 
 * @Description: SQL检测信息类 
 * @author yong.sun
 * @date 2013-9-21
 */
public class SqlCheck {
	//sqlid为空
	public static final int SUCCESS = 0;
	//sqlid为空
	public static final int SQLID_NULL = 1;
	//sqlid没有权限
	public static final int SQLID_NO_RIGHT = 2;
	//sqlid不存在
	public static final int SQLID_INEXISTENCE = 3;
	//数据格式校验失败
	public static final int CHECK_FAILED = 4;
	//需要重新登录
	public static final int LOGIN_AGAIN = 5;
	
	//检测结果
	private int result;
	//最终sql
	private SqlData sqlData;

	public void setResult(int result) {
		this.result = result;
	}

	public int getResult() {
		return result;
	}

	public SqlData getSqlData() {
		return sqlData;
	}

	public void setSqlData(SqlData sqlData) {
		this.sqlData = sqlData;
	}
}
