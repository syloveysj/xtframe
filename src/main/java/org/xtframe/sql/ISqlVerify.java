package org.xtframe.sql;

import java.util.List;
import java.util.Map;

import org.xtframe.sql.SqlBuildVerify.VerifyType;

/**
 * @ClassName: ISqlVerify
 * @Description: sql验证接口
 * @author yong.sun
 * @date 2013-9-14
 */
public interface ISqlVerify {
	/**
	 * 初始化校验器
	 * 
	 * @param data
	 */
	public void init(Map<String, Object> data);

	/**
	 * 获取参数位置
	 * 
	 * @return
	 */
	public String getPosition();

	/**
	 * 获取校验器类型
	 * 
	 * @return
	 */
	public VerifyType getXtype();

	/**
	 * 参数检测
	 * 
	 * @param parameters
	 * @return
	 */
	public boolean check(Map<String, Object> parameters);

	/**
	 * 参数替换
	 * 
	 * @param parameters
	 * @param preparedParameters
	 * @return
	 */
	public String replace(Map<String, Object> parameters, List<PreparedParameter> preparedParameters);
}
