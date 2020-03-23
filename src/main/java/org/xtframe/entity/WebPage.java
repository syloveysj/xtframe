package org.xtframe.entity;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @ClassName: WebPage 
 * @Description: 页面数据登记
 * @author yong.sun
 * @date 2013-10-31
 */
public class WebPage {
	public static final String FTL = "ftl";
	public static final String JSP = "jsp";
	public static final String JSON = "json";
	private String pageId;
	private String pageName;
	private int ableCache;
	private String pageTempletType;
	private String pageTempletPath;
	private String ErrorPageTempletType;
	private String errorPageTempletPath;
	private int sortNo;

	private Map<String, WebPageDefined> wpd = new LinkedHashMap<String, WebPageDefined>();

	public String getPageId() {
		return pageId;
	}

	public void setPageId(String pageId) {
		this.pageId = pageId;
	}

	public String getPageName() {
		return pageName;
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public int getAbleCache() {
		return ableCache;
	}

	public void setAbleCache(int ableCache) {
		this.ableCache = ableCache;
	}

	public String getPageTempletType() {
		return pageTempletType;
	}

	public void setPageTempletType(String pageTempletType) {
		this.pageTempletType = pageTempletType;
	}

	public String getErrorPageTempletType() {
		return ErrorPageTempletType;
	}

	public void setErrorPageTempletType(String errorPageTempletType) {
		ErrorPageTempletType = errorPageTempletType;
	}

	public String getPageTempletPath() {
		return pageTempletPath;
	}

	public void setPageTempletPath(String pageTempletPath) {
		this.pageTempletPath = pageTempletPath;
	}

	public String getErrorPageTempletPath() {
		return errorPageTempletPath;
	}

	public void setErrorPageTempletPath(String errorPageTempletPath) {
		this.errorPageTempletPath = errorPageTempletPath;
	}

	public int getSortNo() {
		return sortNo;
	}

	public void setSortNo(int sortNo) {
		this.sortNo = sortNo;
	}

	public Map<String, WebPageDefined> getWpd() {
		return wpd;
	}

	public void setWpd(Map<String, WebPageDefined> wpd) {
		this.wpd = wpd;
	}
}
