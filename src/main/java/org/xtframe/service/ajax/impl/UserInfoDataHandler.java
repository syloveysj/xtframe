package org.xtframe.service.ajax.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.xtframe.entity.User;
import org.xtframe.service.ajax.IAjaxDataHandler;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.ContextUtil;

/**
 * @ClassName: UserInfoDataHandler 
 * @Description: 获取当前用户信息
 * @author yong.sun
 * @date 2013-9-23
 */
@Service
@Scope("prototype")
public class UserInfoDataHandler implements IAjaxDataHandler {
	private final Log logger = LogFactory.getLog(getClass());

	public Map<String, Object> execute(String strData) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			User user = ContextUtil.getCurrentUser();
			if (user == null) {
				map.put(STATUS, false);
				map.put(LOGIN, true);
			} else {
				map.put(STATUS, true);
				map.put("userid", user.getUserInfo().getUserId());
				map.put("username", user.getUserInfo().getUserName());
				map.put("orgid", user.getUserInfo().getOrgId());
				map.put("orgname", user.getOrgan().getOrgName());
				map.put("jobid", user.getUserInfo().getJobId());
				map.put("sortno", user.getUserInfo().getSortNo());
				map.put("role", user.getRoleList());
				map.put("create_time", user.getCreateTime());
				map.put("current_time", System.currentTimeMillis());
				map.put("current_date", CommonUtil.getCurrentTime());
			}
		} catch (Exception e) {
			logger.error(e.toString());
			map.clear();
			map.put(STATUS, false);
		}

		return map;
	}
}
