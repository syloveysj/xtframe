package org.xtframe.sql;

/**
 * @ClassName: PreparedParameter
 * @Description: 预处理参数实体类
 * @author yong.sun
 * @date 2013-9-14
 */
public class PreparedParameter {
	// 预处理参数序号
	private int sequen;
	// 预处理参数类型
	private String type;
	// 预处理参数数据
	private Object data;

	public PreparedParameter() {
	}

	public PreparedParameter(int sequen, String type, Object data) {
		this.sequen = sequen;
		this.type = type;
		this.data = data;
	}

	public int getSequen() {
		return sequen;
	}

	public void setSequen(int sequen) {
		this.sequen = sequen;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}
}
