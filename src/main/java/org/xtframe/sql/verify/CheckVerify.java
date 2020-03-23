package org.xtframe.sql.verify;

import java.util.List;
import java.util.Map;

import org.xtframe.sql.ISqlVerify;
import org.xtframe.sql.PreparedParameter;
import org.xtframe.sql.SqlBuildVerify.VerifyType;

/**
 * @ClassName: CheckVerify
 * @Description: 参数合法性效验
 * @author yong.sun
 * @date 2013-9-20
 */
public class CheckVerify implements ISqlVerify {

	// Sql检查参数（替换、检查）
	public enum CheckParameter {
		CHINESE, TWOBYTE, BLANK, HTML, TRIM, EMAIL, URL, NAME, CHINATEL, QQ, POSTAL, IDENTITY, IP, LETTER, BLETTER, SLETTER, NUMLETTER, NUM_LETTER, ZINT, FINT, INT, ZINT0, FINT0, ZDOUBLE, FDOUBLE, DOUBLE, ZDOUBLE0, FDOUBLE0
	}

	private String position = "";

	private CheckParameter value = null;

	public void init(Map<String, Object> data) {
		if (data.containsKey("position"))
			this.position = data.get("position").toString();
		if (data.containsKey("value"))
			this.value = CheckParameter.valueOf(data.get("value").toString().toUpperCase());
	}

	public String getPosition() {
		return this.position;
	}

	public VerifyType getXtype() {
		return VerifyType.check;
	}

	public boolean check(Map<String, Object> parameters) {
		return Verify(value, parameters.get(position).toString());
	}

	public String replace(Map<String, Object> parameters, List<PreparedParameter> preparedParameters) {
		return null;
	}

	/**
	 * 数据校验
	 * 
	 * @param parameter
	 * @param value
	 * @return
	 */
	public static boolean Verify(CheckParameter parameter, String value) {
		return true;
	}

}
