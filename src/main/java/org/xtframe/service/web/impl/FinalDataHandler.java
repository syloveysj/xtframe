package org.xtframe.service.web.impl;

import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xtframe.entity.WebPageDefined;
import org.xtframe.entity.WebPageDefinedDetails;
import org.xtframe.service.web.IWebDataHandler;

/**
 * @ClassName: FinalDataHandler 
 * @Description: 页面常量数据
 * @author yong.sun
 * @date 2013-11-1
 */
public class FinalDataHandler implements IWebDataHandler {
	private final Log logger = LogFactory.getLog(getClass());
	
	public Object execute(Map<String, Object> parame, Map<String, Object> data, WebPageDefined wpd) {
		try {
			Map<String, WebPageDefinedDetails> wpdds = wpd.getWpdd();
			if(wpdds.size() > 0) {
				String result = wpdds.values().iterator().next().getExecContent();
				return result;
			}
		} catch (Exception e) {
			logger.error(e.toString());
		}
		
		return null;
	}

}
