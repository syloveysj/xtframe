package org.xtframe.entity;

import org.xtframe.sql.SqlBuildVerify;

/**
 * @ClassName: SQL 
 * @Description: SQL类
 * @author yong.sun
 * @date 2013-9-14
 */
public class SQL {
	public static final String SELECT = "select";
	public static final String INSERT = "insert";
	public static final String UPDATE = "update";
	public static final String DELETE = "delete";
	
	// sql标识
	private String sqlId;
	// sql名称
	private String sqlName;
	// 所属应用系统编码
	private String sysCode;
	// sql模板
	private String sqlTemplet;
	// 执行类型
	private String execType;
	// 数据库类型
	private String dbType;
	// 顺序号
	private int sortNo;
	// 备注
	private String remark;
	// 模块ID
	private int modId;
	// 创建时间
	private String createTime;
	// 参数验证规则
	private SqlBuildVerify sqlBuildVerify;

	public String getSqlId() {
		return sqlId;
	}

	public void setSqlId(String sqlId) {
		this.sqlId = sqlId;
	}

	public String getSqlName() {
		return sqlName;
	}

	public void setSqlName(String sqlName) {
		this.sqlName = sqlName;
	}

	public String getSysCode() {
		return sysCode;
	}

	public void setSysCode(String sysCode) {
		this.sysCode = sysCode;
	}

	public String getSqlTemplet() {
		return sqlTemplet;
	}

	public void setSqlTemplet(String sqlTemplet) {
		this.sqlTemplet = sqlTemplet;
	}

	public String getExecType() {
		return execType;
	}

	public void setExecType(String execType) {
		this.execType = execType;
	}

	public String getDbType() {
		return dbType;
	}

	public void setDbType(String dbType) {
		this.dbType = dbType;
	}

	public int getSortNo() {
		return sortNo;
	}

	public void setSortNo(int sortNo) {
		this.sortNo = sortNo;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public int getModId() {
		return modId;
	}

	public void setModId(int modId) {
		this.modId = modId;
	}
	
	public String getCreateTime() {
		return createTime;
	}
	
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public SqlBuildVerify getSqlBuildVerify() {
		return sqlBuildVerify;
	}

	public void setSqlBuildVerify(SqlBuildVerify sqlBuildVerify) {
		this.sqlBuildVerify = sqlBuildVerify;
	}
}
