package org.xtframe.entity;

/**
 * @ClassName: Logic 
 * @Description: 逻辑实体类
 * @author yong.sun
 * @date 2013-9-14
 */
public class Logic {
	// 逻辑标识
	private String logicId;
	// 逻辑名称
	private String logicName;
	// 顺序号
	private int sortNo;
	// 备注
	private String remark;

	public String getLogicId() {
		return logicId;
	}

	public void setLogicId(String logicId) {
		this.logicId = logicId;
	}

	public String getLogicName() {
		return logicName;
	}

	public void setLogicName(String logicName) {
		this.logicName = logicName;
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
}
