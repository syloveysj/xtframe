package org.xtframe.web.action;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import net.minidev.json.JSONValue;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;
import org.xtframe.common.CollectionsUtil;
import org.xtframe.entity.Application;
import org.xtframe.entity.WebPage;
import org.xtframe.entity.WebPageDefined;
import org.xtframe.service.web.IWebDataHandler;
import org.xtframe.service.web.WebDataFactory;

import com.opensymphony.xwork2.ActionContext;

/**
 * @ClassName: WebCoreAction
 * @Description: web数据处理中心
 * @author yong.sun
 * @date 2013-10-23
 */
@Repository("/webCoreAction")
@Scope("prototype")
public class WebCoreAction {

	private final Log logger = LogFactory.getLog(getClass());

	private Map<String, Object> model;

	private String templetPath;
	
	// 写一个JSON输出流
	private InputStream json;

	@SuppressWarnings("unchecked")
	public String execute() {
		try {
			// 获取请求的所有参数
			ActionContext context = ActionContext.getContext();
			Map<Object, Object> parameterMap = context.getParameters();

			// 整理请求的所有参数
			Map<String, Object> param = new HashMap<String, Object>();
			Iterator<Entry<Object, Object>> iter = parameterMap.entrySet().iterator();
			while (iter.hasNext()) {
				Map.Entry<Object, Object> entry = iter.next();
				Object key = entry.getKey();
				Object val = entry.getValue();

				if (val instanceof String[] && ((String[]) val).length == 1) {
					param.put(key.toString(), ((String[]) val)[0]);
				} else {
					param.put(key.toString(), val);
				}
			}

			if (param.containsKey("pageId")) {	// 存在要处理的页面对象
				String pageId = param.get("pageId").toString();
				model = new HashMap<String, Object>();
				//存放项目根路径
				model.put("_contextPath", ServletActionContext.getRequest().getContextPath());
				//存放页面参数
				model.put("_param", param);

				WebPage wp = Application.getInstance().getPage(pageId);
				if (wp == null)
					return "error";

				String pageTempletType = wp.getPageTempletType();
				String pageTempletPath = wp.getPageTempletPath();
				String errorPageTempletType = wp.getErrorPageTempletType();
				String errorPageTempletPath = wp.getErrorPageTempletPath();

				try {
					// 组装页面数据
					Map<String, WebPageDefined> wpds = wp.getWpd();
					for (Iterator<WebPageDefined> wpdIterator = wpds.values().iterator(); wpdIterator.hasNext();) {
						WebPageDefined wpd = wpdIterator.next();

						IWebDataHandler wdh = WebDataFactory.createWebDataHandler(wpd.getExecType());
						Object value = wdh.execute((Map<String, Object>)CollectionsUtil.clone(param), model, wpd);
						model.put(wpd.getDataName(), value);
					}
					templetPath = pageTempletPath;
					
					if(WebPage.JSON.equals(pageTempletType)) {
						model.put("_result", true);
						String jsonString = JSONValue.toJSONString(model);
						this.json = new ByteArrayInputStream(jsonString.getBytes("utf-8"));
						if("".equals(templetPath)) {
							templetPath = WebPage.JSON;
						}
					}
					if("".equals(templetPath)) {
						return "success";
					} else {
						return "success_" + pageTempletType;
					}
				} catch (Exception e) {
					logger.error(e.toString());
					templetPath = errorPageTempletPath;
					
					if(WebPage.JSON.equals(errorPageTempletType)) {
						model.put("_result", false);
						String jsonString = JSONValue.toJSONString(model);
						this.json = new ByteArrayInputStream(jsonString.getBytes("utf-8"));
						if("".equals(templetPath)) {
							templetPath = WebPage.JSON;
						}
					}
					if("".equals(templetPath)) {
						return "error";
					} else {
						return "error_" + errorPageTempletType;
					}
				}
			}
		} catch (Exception e) {
			logger.error(e.toString());
		}
		return "error";
	}

	public Map<String, Object> getModel() {
		return model;
	}

	public void setModel(Map<String, Object> model) {
		this.model = model;
	}

	public String getTempletPath() {
		return templetPath;
	}

	public void setTempletPath(String templetPath) {
		this.templetPath = templetPath;
	}

	public InputStream getJson() {
		return json;
	}

	public void setJson(InputStream json) {
		this.json = json;
	}
}
