package org.xtframe.entity;

/**
 * @ClassName: Job 
 * @Description: 岗位实体类
 * @author yong.sun
 * @date 2013-9-14
 */
public class Job {
	// 岗位ID
	private String jobId;
	// 岗位父ID
	private String jobPId;
	// 机构ID
	private String orgId;
	// 岗位名字
	private String jobName;
	// 岗位ID路径
	private String jobIdPath;
	// 岗位的级数
	private int jobLevel;
	// 顺序号
	private int sortNo;
	// 备注
	private String remark;

	public String getJobId() {
		return jobId;
	}

	public void setJobId(String jobId) {
		this.jobId = jobId;
	}

	public String getJobPId() {
		return jobPId;
	}

	public void setJobPId(String jobPId) {
		this.jobPId = jobPId;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	public String getJobIdPath() {
		return jobIdPath;
	}

	public void setJobIdPath(String jobIdPath) {
		this.jobIdPath = jobIdPath;
	}

	public int getJobLevel() {
		return jobLevel;
	}

	public void setJobLevel(int jobLevel) {
		this.jobLevel = jobLevel;
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
