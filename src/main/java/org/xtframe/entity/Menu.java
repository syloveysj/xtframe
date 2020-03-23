package org.xtframe.entity;

/**
 * @ClassName: Menu 
 * @Description: 菜单实体类
 * @author yong.sun
 * @date 2013-9-14
 */
public class Menu {
	// 菜单ID
	private int menuId;
	// 菜单父ID
	private int menuPId;
	// 菜单名字
	private String menuName;
	// 菜单图标
	private String menuIcon;
	// 菜单类型
	private String menuType;
	// 菜单ID路径
	private String menuIdPath;
	// 菜单的级数
	private int menuLevel;
	// 链接字符串
	private String url;
	// swf路径
	private String swfUrl;
	// 顺序号
	private int sortNo;
	// 备注
	private String remark;

	public int getMenuId() {
		return menuId;
	}

	public void setMenuId(int menuId) {
		this.menuId = menuId;
	}

	public int getMenuPId() {
		return menuPId;
	}

	public void setMenuPId(int menuPId) {
		this.menuPId = menuPId;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public String getMenuIcon() {
		return menuIcon;
	}

	public void setMenuIcon(String menuIcon) {
		this.menuIcon = menuIcon;
	}

	public String getMenuType() {
		return menuType;
	}

	public void setMenuType(String menuType) {
		this.menuType = menuType;
	}

	public String getMenuIdPath() {
		return menuIdPath;
	}

	public void setMenuIdPath(String menuIdPath) {
		this.menuIdPath = menuIdPath;
	}

	public int getMenuLevel() {
		return menuLevel;
	}

	public void setMenuLevel(int menuLevel) {
		this.menuLevel = menuLevel;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getSwfUrl() {
		return swfUrl;
	}

	public void setSwfUrl(String swfUrl) {
		this.swfUrl = swfUrl;
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
