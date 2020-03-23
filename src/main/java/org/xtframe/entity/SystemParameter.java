package org.xtframe.entity;

/**
 * @ClassName: SystemParameter
 * @Description: 系统级参数实体类
 * @author yong.sun
 * @date 2013-9-14
 */
public class SystemParameter {
	// 名称
	private String parameName;
	// 值
	private String parameValue;
	// 描述
	private String remark;

	public String getParameName() {
		return parameName;
	}

	public void setParameName(String parameName) {
		this.parameName = parameName;
	}

	public String getParameValue() {
		return parameValue;
	}

	public void setParameValue(String parameValue) {
		this.parameValue = parameValue;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}
