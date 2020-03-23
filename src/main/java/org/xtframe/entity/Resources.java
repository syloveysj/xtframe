package org.xtframe.entity;

/**
 * @ClassName: Resources 
 * @Description: 资源实体类
 * @author yong.sun
 * @date 2013-9-14
 */
public class Resources {
	// 资源标识
	private String resId;
	// 资源名称
	private String resName;
	// 资源定位
	private String uri;
	// 序号
	private int sortNo;
	// 备注
	private String remark;

	public String getResId() {
		return resId;
	}

	public void setResId(String resId) {
		this.resId = resId;
	}

	public String getResName() {
		return resName;
	}

	public void setResName(String resName) {
		this.resName = resName;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
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
