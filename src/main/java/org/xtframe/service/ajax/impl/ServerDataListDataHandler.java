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

/**
 * @ClassName: ServerDataListDataHandler 
 * @Description: 批量获取服务器数据
 * @author yong.sun
 * @date 2013-9-23
 */
@Service
@Scope("prototype")
public class ServerDataListDataHandler implements IAjaxDataHandler {
	private final Log logger = LogFactory.getLog(getClass());

	public Map<String, Object> execute(String strData) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			User user = ContextUtil.getCurrentUser();
			Application application = ContextUtil.getApplication();
			
			Map<String, Object> objJson = JSON2Java.optMap(CommonUtil.getJavaObject(strData));
			Object list = objJson.get("list");
			if(!JSON2Java.isArray(list)) throw new AjaxDataHandlerException("批量获取服务器数据的名称为空");
			
			ArrayList<Object> dataList = new ArrayList<Object>();
			for(int i=0; i<Array.getLength(list); i++) {
				Map<String, Object> info = JSON2Java.optMap(Array.get(list, i));
				if(info != null){
					String name = StringUtil.toString(objJson.get("name"), "");
					if(name.equals("uuid")){
						dataList.add(CommonUtil.getUUID());
						continue;
					}
					else if(name.equals("optrole")){
						if(user.getUserInfo().getUserName().equals(ApplicationConfigUtil.getApplicationConfig().getConfig("superAdmin"))){
							ArrayList<Map<String, String>> optRoleList = application.getOptRole();
							if(optRoleList == null) throw new AjaxDataHandlerException(AjaxExceptionType.parame_error);
							dataList.add(optRoleList);
						}
						else{
							ArrayList<Map<String, String>> optRoleList = user.getOptRoleList();
							if(optRoleList == null) throw new AjaxDataHandlerException(AjaxExceptionType.parame_error);
							dataList.add(optRoleList);
						}
						continue;
					}
					else if(name.equals("regid")){
						Object parameters = objJson.get("parameters");
						if(!JSON2Java.isArray(parameters)) throw new AjaxDataHandlerException(AjaxExceptionType.parame_error);
						
						ArrayList<Long> regList = new ArrayList<Long>();
						for(int j=1; j<Array.getLength(parameters); j ++){
							String regName = StringUtil.toString(Array.get(parameters, j), "");
							regList.add(CommonUtil.getRegID(regName));
						}
						dataList.add(regList);
						continue;
					}
					else if(name.equals("logic")){
						Object parameters = objJson.get("parameters");
						if(!JSON2Java.isArray(parameters)) throw new AjaxDataHandlerException(AjaxExceptionType.parame_error);
						
						ArrayList<Boolean> bLogicList = new ArrayList<Boolean>();
						for(int j=1; j<Array.getLength(parameters); j ++){
							String logicId = StringUtil.toString(Array.get(parameters, j), "");
							bLogicList.add(user.isInLogic(logicId));
						}
						dataList.add(bLogicList);
						continue;
					}
					else if(name.equals("curr_date")){
						dataList.add((new Date()).toString());
						continue;
					}
					else if(name.equals("curr_user_orgidpath")){
						dataList.add(user.getOrgan().getOrgIdPath());
						continue;
					}
					else if(name.equals("curr_user_orgid")){
						dataList.add(user.getOrgan().getOrgId());
						continue;
					}
					else if(name.equals("dictionary")){
						Object parameters = objJson.get("parameters");
						if(!JSON2Java.isArray(parameters)) throw new AjaxDataHandlerException(AjaxExceptionType.parame_error);
						
						ArrayList<ArrayList<Map<String, String>>> dicList = new ArrayList<ArrayList<Map<String, String>>>();
						for(int j=1; j<Array.getLength(parameters); j ++){
							String dictionaryId = StringUtil.toString(Array.get(parameters, j), "");
							dicList.add(application.getDictionaryDataList(dictionaryId));
						}
						dataList.add(dicList);
						continue;
					}
					else if(name.equals("orgparame")){
						Object parameters = objJson.get("parameters");
						if(!JSON2Java.isArray(parameters)) throw new AjaxDataHandlerException(AjaxExceptionType.parame_error);
						
						ArrayList<String> odList = new ArrayList<String>();
						for(int j=1; j<Array.getLength(parameters); j ++){
							String parameName = StringUtil.toString(Array.get(parameters, j), "");
							odList.add(user.getOrgParameValue(parameName));
						}
						dataList.add(odList);
						continue;
					}
					else if(name.equals("systemparame")){
						Object parameters = objJson.get("parameters");
						if(!JSON2Java.isArray(parameters)) throw new AjaxDataHandlerException(AjaxExceptionType.parame_error);
						
						ArrayList<String> sdList = new ArrayList<String>();
						for(int j=1; j<Array.getLength(parameters); j ++){
							String parameName = StringUtil.toString(Array.get(parameters, j), "");
							sdList.add(application.getSystemParameter(parameName));
						}
						dataList.add(sdList);
						continue;
					}
					else if(name.equals("useronlinecount")){
						dataList.add(ActiveUserListener.getUserOnlineCount());
						continue;
					}
					else if(name.equals("useronlinecode")){
						dataList.add(ActiveUserListener.getUserOnlineCode());
						continue;
					}else{
						throw new AjaxDataHandlerException(AjaxExceptionType.parame_error);
					}
				} else {
					throw new AjaxDataHandlerException(AjaxExceptionType.parame_error);
				}
			}
			map.put(STATUS, true);
			map.put(ROWS, dataList);
		} catch(AjaxDataHandlerException ex){
			if(ex.getFlag() != AjaxExceptionType.parame_error) logger.warn(ex.toString());
			if(ex.getFlag() != AjaxExceptionType.login_again){
				map.clear();
				map.put(STATUS, false);
			}
		} catch (Exception e) {
			logger.error(e.toString());
			map.clear();
			map.put(STATUS, false);
		}
		
		return map;
	}
}
