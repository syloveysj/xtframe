package org.xtframe.entity;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @ClassName: WebPageDefined 
 * @Description: 页面数据定义
 * @author yong.sun
 * @date 2013-10-31
 */
public class WebPageDefined {
	private String defId;
	private String pageId;
	private String dataName;
	private String execType;
	private int execSortNo;

	private Map<String, WebPageDefinedDetails> wpdd = new LinkedHashMap<String, WebPageDefinedDetails>();

	public String getDefId() {
		return defId;
	}

	public void setDefId(String defId) {
		this.defId = defId;
	}

	public String getPageId() {
		return pageId;
	}

	public void setPageId(String pageId) {
		this.pageId = pageId;
	}

	public String getDataName() {
		return dataName;
	}

	public void setDataName(String dataName) {
		this.dataName = dataName;
	}

	public String getExecType() {
		return execType;
	}

	public void setExecType(String execType) {
		this.execType = execType;
	}

	public int getExecSortNo() {
		return execSortNo;
	}

	public void setExecSortNo(int execSortNo) {
		this.execSortNo = execSortNo;
	}

	public Map<String, WebPageDefinedDetails> getWpdd() {
		return wpdd;
	}

	public void setWpdd(Map<String, WebPageDefinedDetails> wpdd) {
		this.wpdd = wpdd;
	}

}
