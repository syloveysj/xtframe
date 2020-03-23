package org.xtframe.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xtframe.dao.IDataBase;
import org.xtframe.util.ApplicationConfigUtil;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.SpringUtil;
import org.xtframe.util.StringUtil;

/**
 * @ClassName: User
 * @Description: 用户类
 * @author yong.sun
 * @date 2013-9-14
 */
public class User {
	private final Log logger = LogFactory.getLog(getClass());

	private IDataBase dataBase;
	private ApplicationConfig applicationConfig;

	// 应用
	private Application application;
	// 用户信息
	private UserInfo userInfo;
	// 对象创建时间
	private long createTime;
	// 菜单list
	private ArrayList<Integer> menuList;
	// 机构
	private Organization organ;
	// 岗位
	private Job job;
	// 用户所属角色
	private ArrayList<String> roleList;
	// 用户授权权
	private ArrayList<Map<String, String>> optRoleList;
	// 用户机构数据
	private Map<String, String> orgData;

	public User(Application application) {
		dataBase= (IDataBase) SpringUtil.getBean("dataBase");
		applicationConfig = ApplicationConfigUtil.getApplicationConfig();
		
		this.application = application;
		userInfo = new UserInfo();
		createTime = System.currentTimeMillis();
		organ = new Organization();
		job = new Job();
		menuList = new ArrayList<Integer>();
		roleList = new ArrayList<String>();
		optRoleList = null;
		orgData = new TreeMap<String, String>();
	}
	
	public boolean init(String un, String pd) {
		try {
			SQL sql = application.getSql(dataBase.getDBType(), applicationConfig.getConfig("userInfoInit"));
			Map<String, Object> parame = new HashMap<String, Object>();
			parame.put("username", un);
			parame.put("pwd", pd);
			String strSql = CommonUtil.createSql(sql.getSqlTemplet(), parame);
			List<Map<String, Object>> result = dataBase.executeQuery(strSql, null);
			if(result==null || result.size()<=0) return false;
			
			Map<String, Object> obj = result.get(0);
			userInfo.setUserId(StringUtil.toString(obj.get("userid"), "").trim());
			userInfo.setUserName(StringUtil.toString(obj.get("username"), ""));
			userInfo.setPwd(StringUtil.toString(obj.get("pwd"), ""));
			userInfo.setRealName(StringUtil.toString(obj.get("realname"), ""));
			userInfo.setNickName(StringUtil.toString(obj.get("nickname"), ""));
			userInfo.setSex(StringUtil.toString(obj.get("sex"), ""));
			userInfo.setBirthday(StringUtil.toString(obj.get("birthday"), ""));
			userInfo.setIdCard(StringUtil.toString(obj.get("idcard"), ""));
			userInfo.setPhoto(StringUtil.toString(obj.get("photo"), ""));
			userInfo.setAddress(StringUtil.toString(obj.get("address"), ""));
			userInfo.setTel(StringUtil.toString(obj.get("tel"), ""));
			userInfo.setMobile(StringUtil.toString(obj.get("mobile"), ""));
			userInfo.setQq(StringUtil.toString(obj.get("qq"), ""));
			userInfo.seteMail(StringUtil.toString(obj.get("email"), ""));
			userInfo.setRemark(StringUtil.toString(obj.get("remark"), ""));
			userInfo.setOrgId(StringUtil.toString(obj.get("orgid"), ""));
			userInfo.setJobId(StringUtil.toString(obj.get("jobid"), ""));
			userInfo.setSortNo(Integer.valueOf(StringUtil.toString(obj.get("sortno"), "")));
			userInfo.setState(Integer.valueOf(StringUtil.toString(obj.get("state"), "")));
			userInfo.setJoinDate(StringUtil.toString(obj.get("joindate"), ""));
			userInfo.setOpenid(StringUtil.toString(obj.get("wx_openid"), ""));
			
			return initAssociation();
		} catch (NumberFormatException e) {
			logger.error(e.toString());
		}
		return false;
	}
	
	public boolean init(String wx_openid) {
		try {
			SQL sql = application.getSql(dataBase.getDBType(), applicationConfig.getConfig("weixinUserInfoInit"));
			Map<String, Object> parame = new HashMap<String, Object>();
			parame.put("openid", wx_openid);
			String strSql = CommonUtil.createSql(sql.getSqlTemplet(), parame);
			List<Map<String, Object>> result = dataBase.executeQuery(strSql, null);
			if(result==null || result.size()<=0) return false;
			
			Map<String, Object> obj = result.get(0);
			userInfo.setUserId(StringUtil.toString(obj.get("userid"), "").trim());
			userInfo.setUserName(StringUtil.toString(obj.get("username"), ""));
			userInfo.setPwd(StringUtil.toString(obj.get("pwd"), ""));
			userInfo.setRealName(StringUtil.toString(obj.get("realname"), ""));
			userInfo.setNickName(StringUtil.toString(obj.get("nickname"), ""));
			userInfo.setSex(StringUtil.toString(obj.get("sex"), ""));
			userInfo.setBirthday(StringUtil.toString(obj.get("birthday"), ""));
			userInfo.setIdCard(StringUtil.toString(obj.get("idcard"), ""));
			userInfo.setPhoto(StringUtil.toString(obj.get("photo"), ""));
			userInfo.setAddress(StringUtil.toString(obj.get("address"), ""));
			userInfo.setTel(StringUtil.toString(obj.get("tel"), ""));
			userInfo.setMobile(StringUtil.toString(obj.get("mobile"), ""));
			userInfo.setQq(StringUtil.toString(obj.get("qq"), ""));
			userInfo.seteMail(StringUtil.toString(obj.get("email"), ""));
			userInfo.setRemark(StringUtil.toString(obj.get("remark"), ""));
			userInfo.setOrgId(StringUtil.toString(obj.get("orgid"), ""));
			userInfo.setJobId(StringUtil.toString(obj.get("jobid"), ""));
			userInfo.setSortNo(Integer.valueOf(StringUtil.toString(obj.get("sortno"), "")));
			userInfo.setState(Integer.valueOf(StringUtil.toString(obj.get("state"), "")));
			userInfo.setJoinDate(StringUtil.toString(obj.get("joindate"), ""));
			userInfo.setOpenid(StringUtil.toString(obj.get("wx_openid"), ""));
			
			return initAssociation();
		} catch (NumberFormatException e) {
			logger.error(e.toString());
		}
		return false;
	}
	
	private boolean initAssociation() {
		try {
			SQL sql = application.getSql(dataBase.getDBType(), applicationConfig.getConfig("userOrgInit"));
			Map<String, Object> parame = new HashMap<String, Object>();
			parame.put("userid", userInfo.getUserId());
			String strSql = CommonUtil.createSql(sql.getSqlTemplet(), parame);
			List<Map<String, Object>> result = dataBase.executeQuery(strSql, null);
			if(result==null || result.size()<=0) return false;
			
			Map<String, Object> obj = result.get(0);
			organ.setOrgId(StringUtil.toString(obj.get("orgid"), ""));
			organ.setOrgName(StringUtil.toString(obj.get("orgname"), ""));
			organ.setOrgIdPath(StringUtil.toString(obj.get("orgidpath"), ""));
			organ.setOrgLevel(Integer.valueOf(StringUtil.toString(obj.get("orglevel"), "")));
			organ.setSortNo(Integer.valueOf(StringUtil.toString(obj.get("sortno"), "")));
			organ.setRemark(StringUtil.toString(obj.get("remark"), ""));
			
			sql = application.getSql(dataBase.getDBType(), applicationConfig.getConfig("userJobInit"));
			strSql = CommonUtil.createSql(sql.getSqlTemplet(), parame);
			result = dataBase.executeQuery(strSql, null);
			if(result!=null && result.size()>0){
				obj = result.get(0);
				job.setJobId(StringUtil.toString(obj.get("jobid"), ""));
				job.setOrgId(StringUtil.toString(obj.get("orgid"), ""));
				job.setJobName(StringUtil.toString(obj.get("jobname"), ""));
				job.setJobIdPath(StringUtil.toString(obj.get("jobidpath"), ""));
				job.setJobLevel(Integer.valueOf(StringUtil.toString(obj.get("joblevel"), "")));
				job.setSortNo(Integer.valueOf(StringUtil.toString(obj.get("sortno"), "")));
				job.setRemark(StringUtil.toString(obj.get("remark"), ""));
			}
			
			roleList.clear();
			sql = application.getSql(dataBase.getDBType(), applicationConfig.getConfig("userRoleInit"));
			strSql = CommonUtil.createSql(sql.getSqlTemplet(), parame);
			List<String> list = dataBase.executeQuery(strSql, 1, null);
			if(list != null){
				for(String str : list){
					roleList.add(str.trim());
				}
			}
			
			menuList.clear();
			for(String roleId : roleList){
				Role role = application.getRole(roleId);
				menuList.addAll(role.getMenu());
			}
			menuList = new ArrayList<Integer>(new HashSet<Integer>(menuList));
			
			return true;
		} catch (NumberFormatException e) {
			logger.error(e.toString());
		}
		return false;
	}
	
	public boolean isInSQL(String sqlId){
		boolean result = false;
		for(String roleId : roleList){
			Role role = application.getRole(roleId);
			if(role.isInSQL(sqlId)){
				result = true;
				break;
			}
		}
		return result;
	}
	
	public boolean isInLogic(String logicId){
		boolean result = false;
		for(String roleId : roleList){
			Role role = application.getRole(roleId);
			if(role.isInLogic(logicId)){
				result = true;
				break;
			}
		}
		return result;
	}
	
	public boolean isInRes(String resId){
		boolean result = false;
		for(String roleId : roleList){
			Role role = application.getRole(roleId);
			if(role.isInRes(resId)){
				result = true;
				break;
			}
		}
		return result;
	}
	
	public ArrayList<Map<String, String>> getOptRoleList(){
		if(optRoleList != null) return optRoleList;
		SQL sql = application.getSql(dataBase.getDBType(), applicationConfig.getConfig("userOptroleInit"));
		Map<String, Object> parame = new HashMap<String, Object>();
		parame.put("userid", userInfo.getUserId());
		String strSql = CommonUtil.createSql(sql.getSqlTemplet(), parame);
		List<String> result = dataBase.executeQuery(strSql, 1, null);
		optRoleList = application.getOptRoleList((ArrayList<String>) result);
		return optRoleList;
	}
	
	public String getOrgParameValue(String parameName){
		String parameValue = orgData.get(parameName);
		if(parameValue != null) return parameValue;
		SQL sql = application.getSql(dataBase.getDBType(), applicationConfig.getConfig("userOrgParameterInit"));
		Map<String, Object> parame = new HashMap<String, Object>();
		parame.put("paramename", parameName);
		parame.put("orgid", userInfo.getOrgId());
		String strSql = CommonUtil.createSql(sql.getSqlTemplet(), parame);
		parameValue = dataBase.findFirst(strSql, 1, null);
		if(parameValue != null){
			orgData.put(parameName, parameValue);
		} else {
			parameValue = "";
		}
		return parameValue;
	}
	
	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}

	public UserInfo getUserInfo() {
		return userInfo;
	}

	public void setUserInfo(UserInfo userInfo) {
		this.userInfo = userInfo;
	}

	public long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(long createTime) {
		this.createTime = createTime;
	}

	public ArrayList<Integer> getMenuList() {
		return menuList;
	}

	public void setMenuList(ArrayList<Integer> menuList) {
		this.menuList = menuList;
	}

	public Organization getOrgan() {
		return organ;
	}

	public void setOrgan(Organization organ) {
		this.organ = organ;
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	public ArrayList<String> getRoleList() {
		return roleList;
	}

	public void setRoleList(ArrayList<String> roleList) {
		this.roleList = roleList;
	}
}
