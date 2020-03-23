package org.xtframe.entity;

/**
 * @ClassName: WebPageDefinedDetails 
 * @Description: 页面数据定义明细
 * @author yong.sun
 * @date 2013-10-31
 */
public class WebPageDefinedDetails {
	private String detId;
	private String defId;
	private String execContent;
	private int execSortNo;

	public String getDetId() {
		return detId;
	}

	public void setDetId(String detId) {
		this.detId = detId;
	}

	public String getDefId() {
		return defId;
	}

	public void setDefId(String defId) {
		this.defId = defId;
	}

	public String getExecContent() {
		return execContent;
	}

	public void setExecContent(String execContent) {
		this.execContent = execContent;
	}

	public int getExecSortNo() {
		return execSortNo;
	}

	public void setExecSortNo(int execSortNo) {
		this.execSortNo = execSortNo;
	}
}
