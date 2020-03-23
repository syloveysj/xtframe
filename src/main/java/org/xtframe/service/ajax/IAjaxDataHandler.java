package org.xtframe.service.ajax;

import java.util.Map;

/**
 * @ClassName: IAjaxDataHandler 
 * @Description: ajax请求处理接口
 * @author yong.sun
 * @date 2013-9-15
 */
public interface IAjaxDataHandler {
	public static final String STATUS = "bSucceed";
	public static final String LOGIN = "bLogin";
	public static final String RIGHT = "bRight";
	public static final String RAND = "bRand";
	public static final String DATA = "data";
	public static final String ROWS = "rows";
	public static final String TOTAL = "total";
	public static final String QUERY = "query";
	public static final String ID = "id";
	public static final String MSG = "msg";
	
	/**
	 * 执行ajax请求
	 * @param strData
	 * @return
	 */
	public Map<String, Object> execute(String strData);
}
