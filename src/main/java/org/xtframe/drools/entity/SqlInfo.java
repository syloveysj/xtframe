package org.xtframe.drools.entity;

import org.xtframe.entity.Application;
import org.xtframe.entity.User;

/**
 * @ClassName: SqlInfo 
 * @Description: sql执行的相关信息
 * @author yong.sun
 * @date 2013-9-15
 */
public class SqlInfo {
	// 失败
	public static final int FAILURE = 0;
	// 成功
	public static final int SUCCESS = 1;
	// 重新登录
	public static final int LOGIN_AGAIN = 2;

	// 执行状态
	private int status;
	// 消息
	private String message;
	// sql编码
	private String sqlID;
	// 用户
	private User user;
	// 应用程序
	private Application application;

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getSqlID() {
		return sqlID;
	}

	public void setSqlID(String sqlID) {
		this.sqlID = sqlID;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}
}
