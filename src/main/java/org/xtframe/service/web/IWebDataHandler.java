package org.xtframe.service.web;

import java.util.Map;

import org.xtframe.entity.WebPageDefined;

/**
 * @ClassName: IWebDataHandler 
 * @Description: Web数据处理接口
 * @author yong.sun
 * @date 2013-10-31
 */
public interface IWebDataHandler {
	public Object execute(Map<String, Object> parame, Map<String, Object> data, WebPageDefined wpd);
}
