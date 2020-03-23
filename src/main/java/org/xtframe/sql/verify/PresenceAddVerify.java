package org.xtframe.sql.verify;

import java.util.List;
import java.util.Map;

import org.xtframe.common.NumberMessageFormat;
import org.xtframe.sql.ISqlVerify;
import org.xtframe.sql.PreparedParameter;
import org.xtframe.sql.SqlBuildVerify.VerifyType;
import org.xtframe.util.StringUtil;

/**
 * @ClassName: PresenceAddVerify
 * @Description: 效验参数为空替换
 * @author yong.sun
 * @date 2013-9-20
 */
public class PresenceAddVerify implements ISqlVerify {

	private String position = "";

	private String format = null;

	private String defaultValue = "";

	public void init(Map<String, Object> data) {
		if (data.containsKey("position"))
			this.position = data.get("position").toString();
		if (data.containsKey("format"))
			this.format = data.get("format").toString();
		if (data.containsKey("def"))
			this.defaultValue = data.get("def").toString();
	}

	public String getPosition() {
		return this.position;
	}

	public VerifyType getXtype() {
		return VerifyType.replace;
	}

	public boolean check(Map<String, Object> parameters) {
		return false;
	}

	public String replace(Map<String, Object> parameters, List<PreparedParameter> preparedParameters) {
		Object o = parameters.get(position);
		if (o == null || o.equals("")) {
			return this.defaultValue;
		} else {
			return NumberMessageFormat.format(this.format, StringUtil.replaceSql(o.toString()));
		}
	}

}
