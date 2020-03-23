package org.xtframe.entity;

/**
 * @ClassName: Dictionary 
 * @Description: 数据字典实体类
 * @author yong.sun
 * @date 2013-9-14
 */
public class Dictionary {
	// 字典ID
	private String dicId;
	// 字典父ID
	private String dicPId;
	// 字典名字
	private String dicName;
	// 字典值
	private String dicValue;

	public String getDicId() {
		return dicId;
	}

	public void setDicId(String dicId) {
		this.dicId = dicId;
	}

	public String getDicPId() {
		return dicPId;
	}

	public void setDicPId(String dicPId) {
		this.dicPId = dicPId;
	}

	public String getDicName() {
		return dicName;
	}

	public void setDicName(String dicName) {
		this.dicName = dicName;
	}

	public String getDicValue() {
		return dicValue;
	}

	public void setDicValue(String dicValue) {
		this.dicValue = dicValue;
	}
}
