package org.xtframe.service.ajax.impl;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.xtframe.common.FileUtil;
import org.xtframe.common.json.JSON2Java;
import org.xtframe.entity.Application;
import org.xtframe.entity.User;
import org.xtframe.service.ajax.AjaxDataHandlerException;
import org.xtframe.service.ajax.IAjaxDataHandler;
import org.xtframe.service.ajax.AjaxDataHandlerException.AjaxExceptionType;
import org.xtframe.servlet.ActiveUserListener;
import org.xtframe.util.ApplicationConfigUtil;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.ContextUtil;
import org.xtframe.util.StringUtil;
import org.xtframe.util.TemplatesUtil;

/**
 * @ClassName: ServerDataDataHandler 
 * @Description: 获取服务器数据
 * @author yong.sun
 * @date 2013-9-23
 */
@Service
@Scope("prototype")
public class ServerDataDataHandler implements IAjaxDataHandler {
	private final Log logger = LogFactory.getLog(getClass());

	public Map<String, Object> execute(String strData) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			User user = ContextUtil.getCurrentUser();
			Application application = ContextUtil.getApplication();
			
			Map<String, Object> objJson = JSON2Java.optMap(CommonUtil.getJavaObject(strData));
			String name = StringUtil.toString(objJson.get("name"), "");
			if(StringUtil.isNullStr(name)) throw new AjaxDataHandlerException("获取服务器数据的名称为空");
			
			name = name.toLowerCase();
			if(name.equals("uuid")){
				map.put(STATUS, true);
				map.put(DATA, CommonUtil.getUUID());
			} else if(name.equals("optrole")){
				if(user.getUserInfo().getUserName().equals(ApplicationConfigUtil.getApplicationConfig().getConfig("superAdmin"))){
					ArrayList<Map<String, String>> optRoleList = application.getOptRole();
					if(optRoleList != null){
						map.put(STATUS, true);
						map.put(DATA, optRoleList);
					} else {
						map.put(STATUS, false);
					}
				} else{
					ArrayList<Map<String, String>> optRoleList = user.getOptRoleList();
					if(optRoleList != null){
						map.put(STATUS, true);
						map.put(DATA, optRoleList);
					} else {
						map.put(STATUS, false);
					}
				}
			} else if(name.equals("regid")){
				String regName = StringUtil.toString(objJson.get("parameters"), "");
				if(StringUtil.isNullStr(regName)) throw new AjaxDataHandlerException("获取服务器数据序列号的名称为空");
				
				map.put(STATUS, true);
				map.put(DATA, CommonUtil.getRegID(regName));
			} else if(name.equals("logic")){
				String logicId = StringUtil.toString(objJson.get("parameters"), "");
				if(StringUtil.isNullStr(logicId)) throw new AjaxDataHandlerException("获取服务器数据判断逻辑的名称为空");
				
				map.put(STATUS, true);
				map.put(DATA, user.isInLogic(logicId));
			} else if(name.equals("curr_date")){
				map.put(STATUS, true);
				map.put(DATA, (new Date()).toString());
			} else if(name.equals("curr_user_orgidpath")){
				map.put(STATUS, true);
				map.put(DATA, user.getOrgan().getOrgIdPath());
			} else if(name.equals("curr_user_orgid")){
				map.put(STATUS, true);
				map.put(DATA, user.getOrgan().getOrgId());
			} else if(name.equals("dictionary")){
				String dicId = StringUtil.toString(objJson.get("parameters"), "");
				if(StringUtil.isNullStr(dicId)) throw new AjaxDataHandlerException("获取服务器数据字典的名称为空");
				
				map.put(STATUS, true);
				map.put(DATA, application.getDictionaryDataList(dicId));
			} else if(name.equals("orgparame")){
				String parameName = StringUtil.toString(objJson.get("parameters"), "");
				if(StringUtil.isNullStr(parameName)) throw new AjaxDataHandlerException("获取服务器数据机构数据的名称为空");
				
				map.put(STATUS, true);
				map.put(DATA, user.getOrgParameValue(parameName));
			} else if(name.equals("systemparame")){
				String parameName = StringUtil.toString(objJson.get("parameters"), "");
				if(StringUtil.isNullStr(parameName)) throw new AjaxDataHandlerException("获取服务器数据系统数据的名称为空");
				
				map.put(STATUS, true);
				map.put(DATA, application.getSystemParameter(parameName));
			} else if(name.equals("useronlinecount")){
				map.put(STATUS, true);
				map.put(DATA, ActiveUserListener.getUserOnlineCount());
			} else if(name.equals("useronlinecode")){
				map.put(STATUS, true);
				map.put(DATA, ActiveUserListener.getUserOnlineCode());
			} else if(name.equals("templatestree")){
				map.put(STATUS, true);
				map.put(DATA, TemplatesUtil.getTemplatesTree());
			} else if(name.equals("gettemplate")){
				Object parameters = objJson.get("parameters");
				if(!JSON2Java.isArray(parameters) || Array.getLength(parameters)<2) throw new AjaxDataHandlerException(AjaxExceptionType.parame_error);
				
				String path = StringUtil.toString(Array.get(parameters, 0), "");
				String charset = StringUtil.toString(Array.get(parameters, 1), "");
				
				map.put(STATUS, true);
				map.put(DATA, FileUtil.fileReader(path, charset));
			} else {
				map.put(STATUS, false);
			}
		} catch(AjaxDataHandlerException ex){
			logger.warn(ex.toString());
			map.clear();
			map.put(STATUS, false);
		} catch (Exception e) {
			logger.error(e.toString());
			map.clear();
			map.put(STATUS, false);
		}
		
		return map;
	}
}
