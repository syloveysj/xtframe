package org.xtframe.dao.entity;

/**
 * @ClassName: Field 
 * @Description: 字段实体类
 * @author yong.sun
 * @date 2013-9-15
 */
public class Field {
	// 字段名称
	private String name;
	// 是否是整型
	private boolean isInt;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isInt() {
		return isInt;
	}

	public void setInt(boolean isInt) {
		this.isInt = isInt;
	}
}
