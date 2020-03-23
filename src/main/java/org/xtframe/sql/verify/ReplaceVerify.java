package org.xtframe.sql.verify;

import java.util.List;
import java.util.Map;

import org.xtframe.common.EncryptCount;
import org.xtframe.entity.User;
import org.xtframe.sql.ISqlVerify;
import org.xtframe.sql.PreparedParameter;
import org.xtframe.sql.SqlBuildVerify.VerifyType;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.ContextUtil;
import org.xtframe.util.StringUtil;

/**
 * @ClassName: ReplaceVerify
 * @Description: 替换SQL参数效验
 * @author yong.sun
 * @date 2013-9-20
 */
public class ReplaceVerify implements ISqlVerify {

	// Sql替换参数（替换、检查）
	public enum ReplaceParameter {
		USERNAME, USERID, ORGID, ORGIDPATH, UUID, CURRENTTIME, MD5
	}

	private String position = "";

	private ReplaceParameter value = null;

	public void init(Map<String, Object> data) {
		if (data.containsKey("position"))
			this.position = data.get("position").toString();
		if (data.containsKey("value"))
			this.value = ReplaceParameter.valueOf(data.get("value").toString().toUpperCase());
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
		return getReplace(value, StringUtil.toString(parameters.get(position), ""));
	}

	/**
	 * 获取替换数据
	 * 
	 * @param parameter
	 * @param value
	 * @param userData
	 * @return
	 */
	public static String getReplace(ReplaceParameter parameter, String value) {
		User user = ContextUtil.getCurrentUser();
		if (parameter == ReplaceParameter.USERNAME) {
			return user.getUserInfo().getUserName();
		} else if (parameter == ReplaceParameter.USERID) {
			return user.getUserInfo().getUserId();
		} else if (parameter == ReplaceParameter.ORGID) {
			return user.getUserInfo().getOrgId();
		} else if (parameter == ReplaceParameter.ORGIDPATH) {
			return user.getOrgan().getOrgIdPath();
		} else if (parameter == ReplaceParameter.UUID) {
			return CommonUtil.getUUID();
		} else if (parameter == ReplaceParameter.CURRENTTIME) {
			return CommonUtil.getCurrentTime();
		} else if (parameter == ReplaceParameter.MD5) {
			return EncryptCount.encryptMD5(value);
		} else {
			return value;
		}
	}

}
