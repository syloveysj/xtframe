package org.xtframe.service.ajax.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.xtframe.common.json.JSON2Java;
import org.xtframe.service.AbstractBasicExecute;
import org.xtframe.service.ajax.AjaxDataHandlerException;
import org.xtframe.service.ajax.AjaxDataHandlerException.AjaxExceptionType;
import org.xtframe.service.ajax.IAjaxDataHandler;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.SpringUtil;
import org.xtframe.util.StringUtil;

/**
 * @ClassName: CustomDataHandler 
 * @Description: 执行自定义处理
 * @author yong.sun
 * @date 2015-8-11
 */
@Service
@Scope("prototype")
public class CustomDataHandler extends AbstractBasicExecute implements IAjaxDataHandler {

	private final Log logger = LogFactory.getLog(getClass());

	public Map<String, Object> execute(String strData) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			Map<String, Object> objJson = JSON2Java.optMap(CommonUtil.getJavaObject(strData));
			if(!objJson.containsKey("execAction")) throw new AjaxDataHandlerException("自定义处理未发现执行类");
			
			String execAction = StringUtil.toString(objJson.get("execAction"), null);
			IAjaxDataHandler exec = (IAjaxDataHandler) SpringUtil.getBean(execAction);
			map = exec.execute(strData);
		} catch(AjaxDataHandlerException ex){
			logger.warn(ex.toString());
			if(ex.getFlag() == AjaxExceptionType.general){
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
