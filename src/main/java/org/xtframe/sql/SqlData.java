package org.xtframe.sql;

import java.util.List;

/**
 * @ClassName: SqlData 
 * @Description: sql数据
 * @author yong.sun
 * @date 2013-9-16
 */
public class SqlData {
	//验证结果
	private boolean result;
	//sql字符串
	private String sql;
	//占位符参数
	private List<PreparedParameter> preparedParameters;

	public boolean isResult() {
		return result;
	}

	public void setResult(boolean result) {
		this.result = result;
	}

	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	public List<PreparedParameter> getPreparedParameters() {
		return preparedParameters;
	}

	public void setPreparedParameters(List<PreparedParameter> preparedParameters) {
		this.preparedParameters = preparedParameters;
	}
}
