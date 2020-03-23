package org.xtframe.entity;

/**
 * @ClassName: Organization 
 * @Description: 机构实体类
 * @author yong.sun
 * @date 2013-9-14
 */
public class Organization {
	// 机构ID
	private String orgId;
	// 机构父ID
	private String orgPId;
	// 机构名字
	private String orgName;
	// 机构ID路径
	private String orgIdPath;
	// 机构的级数
	private int orgLevel;
	// 序号
	private int sortNo;
	// 备注
	private String remark;

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getOrgPId() {
		return orgPId;
	}

	public void setOrgPId(String orgPId) {
		this.orgPId = orgPId;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getOrgIdPath() {
		return orgIdPath;
	}

	public void setOrgIdPath(String orgIdPath) {
		this.orgIdPath = orgIdPath;
	}

	public int getOrgLevel() {
		return orgLevel;
	}

	public void setOrgLevel(int orgLevel) {
		this.orgLevel = orgLevel;
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
