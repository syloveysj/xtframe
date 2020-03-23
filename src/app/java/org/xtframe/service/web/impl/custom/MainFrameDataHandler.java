package org.xtframe.service.web.impl.custom;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.minidev.json.JSONArray;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xtframe.entity.Application;
import org.xtframe.entity.Menu;
import org.xtframe.entity.User;
import org.xtframe.entity.WebPageDefined;
import org.xtframe.service.AbstractBasicExecute;
import org.xtframe.service.web.IWebDataHandler;
import org.xtframe.util.ApplicationConfigUtil;
import org.xtframe.util.ContextUtil;

/**
 * @ClassName: MainFrameDataHandler 
 * @Description: 框架首页处理
 * @author yong.sun
 * @date 2013-11-1
 */
public class MainFrameDataHandler extends AbstractBasicExecute implements IWebDataHandler {
	private final Log logger = LogFactory.getLog(getClass());
	
	public Object execute(Map<String, Object> parame, Map<String, Object> data, WebPageDefined wpd) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			User user = ContextUtil.getCurrentUser();
			Application application = ContextUtil.getApplication();
			
			ArrayList<Menu> menuList = null;
			if(user.getUserInfo().getUserName().equals(ApplicationConfigUtil.getApplicationConfig().getConfig("superAdmin"))){
				menuList = application.getMenu();
			} else {
				menuList = application.getMenuList(user.getMenuList());
			}
			
			List<Map<String, String>> modules = getModules(menuList);
			String config = getMenuConfigJson(data.get("_contextPath").toString(), menuList);
			
			map.put("modules", modules);
			map.put("config", config);
			
			return map;
		} catch (Exception e) {
			logger.error(e.toString());
		}
		
		return null;
	}
	
	/**
	 * 获取所有模块（即：第一级菜单）
	 * @param menuList
	 * @return
	 */
	private List<Map<String, String>> getModules(ArrayList<Menu> menuList) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		Map<String, String> map = null;
		for(int i=0; i<menuList.size(); i++) {
			Menu menu = menuList.get(i);
			if(menu.getMenuLevel()==2 && menu.getMenuIdPath().indexOf("88888.")==0) {
				map = new LinkedHashMap<String, String>();
				map.put("moduleName", menu.getMenuName());
				map.put("moduleId", String.valueOf(menu.getMenuId()));
				map.put("moduleCode", "m" + menu.getMenuId());
				map.put("icon", menu.getMenuIcon());
				list.add(map);
			}
		}
		return list;
	}
	
	/**
	 * 获取当前用户的菜单Json格式
	 * @return
	 */
	private String getMenuConfigJson(String contextPath, ArrayList<Menu> menuList) {
		List<Object> config = new ArrayList<Object>();
		
		Map<String, Object> menu1 = null;
		Map<String, Object> menu2 = null;
		List<Object> list2 = null;
		Map<String, Object> menu3 = null;
		List<Object> list3 = null;
		for(int i=0; i<menuList.size(); i++){
			Menu m1 = menuList.get(i);
			
			if(!(m1.getMenuLevel()==2 && m1.getMenuIdPath().indexOf("88888.")==0)) continue;
			String moduleCode = "m" + m1.getMenuId();
			
			menu1 = new LinkedHashMap<String, Object>();
			menu1.put("id", moduleCode);
			
			list2 = new ArrayList<Object>();
			for(int j=0; j<menuList.size(); j++){
				Menu m2 = menuList.get(j);
				
				if(!(m2.getMenuLevel()==3 && m2.getMenuIdPath().indexOf(m1.getMenuIdPath())==0)) continue;
				menu2 = new LinkedHashMap<String, Object>();
				menu2.put("text", m2.getMenuName());
				
				list3 = new ArrayList<Object>();
				for(int k=0; k<menuList.size(); k++){
					Menu m3 = menuList.get(k);
					
					if(!(m3.getMenuLevel()==4 && m3.getMenuIdPath().indexOf(m2.getMenuIdPath())==0)) continue;
					menu3 = new LinkedHashMap<String, Object>();
					menu3.put("id", "m" + m3.getMenuId());
					menu3.put("text", m3.getMenuName());
					menu3.put("href", contextPath + m3.getUrl());
					
					if(m3.getRemark().indexOf("index") > 0) {
						menu1.put("homePage", "m" + m3.getMenuId());
						menu3.put("closeable", false);
					}
					
					list3.add(menu3);
				}
				
				menu2.put("items", list3);
				list2.add(menu2);
			}
			
			menu1.put("menu", list2);
			config.add(menu1);
		}
		
		return JSONArray.toJSONString(config);
	}
}
