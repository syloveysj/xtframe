package org.xtframe.drools.entity;

import java.util.Map;

/**
 * @ClassName: BusinessResult 
 * @Description: drools业务执行结果
 * @author yong.sun
 * @date 2013-9-15
 */
public class BusinessResult {
	// 失败
	public static final int FAILURE = 0;
	// 成功
	public static final int SUCCESS = 1;
	// 重新登录
	public static final int LOGIN_AGAIN = 2;

	// 结果
	private int result;
	// 描述消息
	private String message;
	// 相关数据
	private Map<?, ?> data;

	public int getResult() {
		return result;
	}

	public void setResult(int result) {
		this.result = result;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Map<?, ?> getData() {
		return data;
	}

	public void setData(Map<?, ?> data) {
		this.data = data;
	}
}
