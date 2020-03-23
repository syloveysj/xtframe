package org.xtframe.sql.verify;

import java.util.List;
import java.util.Map;

import org.xtframe.sql.ISqlVerify;
import org.xtframe.sql.PreparedParameter;
import org.xtframe.sql.SqlBuildVerify.VerifyType;

/**
 * @ClassName: PreparedVerify
 * @Description: 效验处理参数预处理
 * @author yong.sun
 * @date 2013-9-20
 */
public class PreparedVerify implements ISqlVerify {
	private String position = "";

	private int sequen = -1;

	public void init(Map<String, Object> data) {
		if (data.containsKey("position"))
			this.position = data.get("position").toString();
		if (data.containsKey("sequen"))
			this.sequen = Integer.valueOf(data.get("sequen").toString());
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
		String o = parameters.get(position).toString();
		preparedParameters.add(new PreparedParameter(sequen, "string", o));
		return "?";
	}
}
