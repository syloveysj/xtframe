package org.xtframe.dao.entity;

/**
 * @ClassName: TableColumns 
 * @Description: 表字段描述实体类
 * @author yong.sun
 * @date 2013-9-15
 */
public class TableColumns {
	// 字段名称
	private String field;
	// 字段类型
	private String type;
	// 字符集
	private String collation;
	// 容许空
	private String allowNull;
	// 主键
	private String key;
	// 缺省值
	private String defaultValue;
	// 外键
	private String extra;
	// 权限
	private String privileges;
	// 字段描述
	private String comment;

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCollation() {
		return collation;
	}

	public void setCollation(String collation) {
		this.collation = collation;
	}

	public String getAllowNull() {
		return allowNull;
	}

	public void setAllowNull(String allowNull) {
		this.allowNull = allowNull;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public String getExtra() {
		return extra;
	}

	public void setExtra(String extra) {
		this.extra = extra;
	}

	public String getPrivileges() {
		return privileges;
	}

	public void setPrivileges(String privileges) {
		this.privileges = privileges;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
}
