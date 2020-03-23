package org.xtframe.sql;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.xtframe.common.KeyMessageFormat;
import org.xtframe.common.json.JSON2Java;
import org.xtframe.entity.SQL;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.SpringUtil;
import org.xtframe.util.StringUtil;

/**
 * @ClassName: SqlBuildVerify
 * @Description: SQL组装校验类
 * @author yong.sun
 * @date 2013-9-14
 */
public class SqlBuildVerify {
	/**
	 * @ClassName: VerifyType 
	 * @Description: Sql校验类型（替换、检查）
	 * @author yong.sun
	 * @date 2013-9-14
	 */
	public enum VerifyType {
		replace, check
	}

	// 基本效验常量
	private static final String BASE = "base";
	// 当前sql对象
	private SQL sql = null;
	// 验证参数个数，-1：表示不验证
	private int count = -1;
	// 不进行特殊字符处理的参数位置
	private String[] safePositions = null;
	// 验证器列表
	private List<ISqlVerify> sqlVerifyList = new ArrayList<ISqlVerify>();

	public SqlBuildVerify(SQL sql, String pattern) {
		this.sql = sql;
		Object list = CommonUtil.getJavaObject(pattern);
		if (JSON2Java.isArray(list)) {
			for (int i = 0; i < Array.getLength(list); i++) {
				Map<String, Object> map = JSON2Java.optMap(Array.get(list, i));
				if (map != null) {
					if (map.containsKey("vtype")) {
						if (BASE.equals(map.get("vtype"))) {
							if (map.containsKey("count")) {
								this.count = Integer.valueOf(map.get("count").toString());
							}
							if (map.containsKey("safes")) {
								Object safes = map.get("safes");
								int len = Array.getLength(safes);
								this.safePositions = new String[len];
								for (int k = 0; k < len; k++)
									this.safePositions[k] = Array.get(safes, k).toString();
							}
						} else {
							SqlVerifyFactory sqlVerifyFactory = (SqlVerifyFactory) SpringUtil.getBean("sqlDataVerifyFactory");
							ISqlVerify sqlVerify = sqlVerifyFactory.getVerifyBase(map.get("vtype").toString());
							if (sqlVerify != null) {
								sqlVerify.init(map);
								sqlVerifyList.add(sqlVerify);
							}
						}
					}
				}
			}
		}
	}

	/**
	 * 参数验证
	 * 
	 * @param parameters
	 * @param preparedParameters
	 * @return
	 */
	private boolean verify(Map<String, Object> parameters, List<PreparedParameter> preparedParameters) {
		if (count != -1 && count != parameters.size())
			return false;
		for (ISqlVerify sqlVerify : sqlVerifyList) {
			if (sqlVerify.getXtype() == VerifyType.replace) {
				parameters.put(sqlVerify.getPosition(), sqlVerify.replace(parameters, preparedParameters));
			} else if (sqlVerify.getXtype() == VerifyType.check) {
				if (!sqlVerify.check(parameters))
					return false;
			} else {
				return false;
			}
		}
		return true;
	}

	/**
	 * 创建Sql语句
	 * 
	 * @param parameters
	 * @return
	 */
	public SqlData createSql(Map<String, Object> parameters) {
		SqlData sqlData = new SqlData();
		List<PreparedParameter> preparedParameters = new ArrayList<PreparedParameter>();
		if (verify(parameters, preparedParameters)) {
			boolean flag = true;
			for (String key : parameters.keySet()) {
				if (safePositions != null) {
					flag = true;
					for (String pos : safePositions) {
						if (key.equals(pos)) {
							flag = false;
							break;
						}
					}
					if (!flag)
						continue;
				}
				parameters.put(key, StringUtil.replaceSql(StringUtil.toString(parameters.get(key), "")));
			}

			sqlData.setPreparedParameters(preparedParameters);
			sqlData.setSql(KeyMessageFormat.format(sql.getSqlTemplet(), parameters));
			sqlData.setResult(true);
		} else {
			sqlData.setResult(false);
		}
		return sqlData;
	}
}
