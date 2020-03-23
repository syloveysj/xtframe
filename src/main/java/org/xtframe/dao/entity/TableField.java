package org.xtframe.dao.entity;

/**
 * @ClassName: TableField
 * @Description: 表字段实体类
 * @author yong.sun
 * @date 2013-9-15
 */
public class TableField {
	// 字段名
	private String field;
	// 字段类型
	private String type;
	// 是否容许为空
	private String allowNull;
	// 主键
	private String key;
	// 缺省值
	private String defaultValue;
	// 外键
	private String extra;

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
}
