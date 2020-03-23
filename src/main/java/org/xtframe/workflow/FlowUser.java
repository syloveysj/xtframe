package org.xtframe.workflow;

import java.io.Serializable;

import java.sql.Blob;

import org.jbpm.api.identity.User;

/**
 * 用户表 MesUser
 * 
 */

public class FlowUser implements Serializable, User {

	private static final long serialVersionUID = 1L;

	private String id;
	private String userNo;// 员工工号
	private String userName;// 员工姓名
	private String userSex;// 性别
	private String userPassword;// 密码
	private String userType;// 类型
	private String userMail;// 电子邮件
	private String isValid;// 是否有效Y/N
	private Blob signaturePic;// 电子签名
	private String remarks;// 备注
	protected long dbid; // 数据库内部自生成的ID
	protected int dbversion;

	public int getDbversion() {
		return dbversion;
	}

	public FlowUser() {
	}

	public FlowUser(String id, String userName, String userMail) {
		this.id = id;
		this.userName = userName;
		this.userMail = userMail;
	}

	public void setDbversion(int dbversion) {
		this.dbversion = dbversion;
	}

	public long getDbid() {
		return dbid;
	}

	public void setDbid(long dbid) {
		this.dbid = dbid;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserNo() {
		return userNo;
	}

	public void setUserNo(String userNo) {
		this.userNo = userNo;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserSex() {
		return userSex;
	}

	public void setUserSex(String userSex) {
		this.userSex = userSex;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getUserMail() {
		return userMail;
	}

	public void setUserMail(String userMail) {
		this.userMail = userMail;
	}

	public String getIsValid() {
		return isValid;
	}

	public void setIsValid(String isValid) {
		this.isValid = isValid;
	}

	public Blob getSignaturePic() {
		return signaturePic;
	}

	public void setSignaturePic(Blob signaturePic) {
		this.signaturePic = signaturePic;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	/**
	 * 显示用户姓名+工号
	 * @return
	 * 
	 */

	public String getDisplayName() {
		return userName + "(" + id + ")";
	}

	// 实现User接口所必须实现的几个方法
	
	public String getId() {
		return this.id;
	}

	public String getGivenName() {
		return null;
	}

	public String getFamilyName() {
		return null;
	}

	public String getBusinessEmail() {
		return this.userMail;
	}

}
