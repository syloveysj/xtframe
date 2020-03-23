package org.xtframe.service.ajax.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.xtframe.service.ajax.IAjaxDataHandler;

/**
 * @ClassName: PrepareCallDataHandler 
 * @Description: 执行数据库存储过程
 * @author yong.sun
 * @date 2013-9-23
 */
@Service
@Scope("prototype")
public class PrepareCallDataHandler implements IAjaxDataHandler {
	private final Log logger = LogFactory.getLog(getClass());

	public Map<String, Object> execute(String strData) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			map.put(STATUS, false);
		} catch (Exception e) {
			logger.error(e.toString());
			map.clear();
			map.put(STATUS, false);
		}
		
		return map;
	}
}
