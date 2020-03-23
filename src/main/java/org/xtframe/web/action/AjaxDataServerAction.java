package org.xtframe.web.action;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;

import net.minidev.json.JSONValue;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;
import org.xtframe.service.ajax.AjaxDataFactory;
import org.xtframe.service.ajax.IAjaxDataHandler;

/**
 * @ClassName: AjaxDataServerAction 
 * @Description: ajax数据接收处理Action
 * @author yong.sun
 * @date 2013-9-15
 */
@Repository("/ajaxDataServerAction")
@Scope("prototype")
public class AjaxDataServerAction {

	private final Log logger = LogFactory.getLog(getClass());
	
	private int iFunc;
	
	private String strData;

	// 写一个输出流
	private InputStream json;

	public String execute() {
		try {
			IAjaxDataHandler ajaxDataHandler = AjaxDataFactory.createAjaxDataHandler(iFunc);
			Map<String, Object> jsonMap = ajaxDataHandler.execute(strData);
			String jsonString = JSONValue.toJSONString(jsonMap);
			this.json = new ByteArrayInputStream(jsonString.getBytes("utf-8"));
		} catch (Exception e) {
			logger.error(e.toString());
		} finally {
			iFunc = 0;
			strData = null;
		}
		return "json";
	}

	public OutputStream output() throws IOException {
		return ServletActionContext.getResponse().getOutputStream();
	}

	public int getiFunc() {
		return iFunc;
	}

	public void setiFunc(int iFunc) {
		this.iFunc = iFunc;
	}

	public String getStrData() {
		return strData;
	}

	public void setStrData(String strData) {
		this.strData = strData;
	}

	public InputStream getJson() {
		return json;
	}

	public void setJson(InputStream json) {
		this.json = json;
	}
}
