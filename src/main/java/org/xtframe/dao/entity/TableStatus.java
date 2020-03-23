package org.xtframe.dao.entity;

/**
 * @ClassName: TableStatus
 * @Description: 表状态实体类
 * @author yong.sun
 * @date 2013-9-15
 */
public class TableStatus {
	// 表名称
	private String name;
	// 表类型
	private String engine;
	// 表类型
	private String type;
	// 字符集
	private String collation;
	// 行数
	private Long rows;
	// 数据长度
	private Long data_length;
	// 索引长度
	private Long index_length;
	// 数据空间
	private Long data_free;
	// 字段增长
	private String auto_increment;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEngine() {
		return engine;
	}

	public void setEngine(String engine) {
		this.engine = engine;
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

	public Long getRows() {
		return rows;
	}

	public void setRows(Long rows) {
		this.rows = rows;
	}

	public Long getData_length() {
		return data_length;
	}

	public void setData_length(Long data_length) {
		this.data_length = data_length;
	}

	public Long getIndex_length() {
		return index_length;
	}

	public void setIndex_length(Long index_length) {
		this.index_length = index_length;
	}

	public Long getData_free() {
		return data_free;
	}

	public void setData_free(Long data_free) {
		this.data_free = data_free;
	}

	public String getAuto_increment() {
		return auto_increment;
	}

	public void setAuto_increment(String auto_increment) {
		this.auto_increment = auto_increment;
	}
}
