package org.xtframe.service.ajax.impl;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.xtframe.common.EncryptCount;
import org.xtframe.common.json.JSON2Java;
import org.xtframe.entity.Application;
import org.xtframe.entity.ApplicationConfig;
import org.xtframe.entity.User;
import org.xtframe.service.ajax.IAjaxDataHandler;
import org.xtframe.servlet.ActiveUserListener;
import org.xtframe.util.ApplicationConfigUtil;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.ContextUtil;

/**
 * @ClassName: LoginDataHandler 
 * @Description: 登录数据处理
 * @author yong.sun
 * @date 2013-9-21
 */
@Service
@Scope("prototype")
public class LoginDataHandler implements IAjaxDataHandler {
	private final Log logger = LogFactory.getLog(getClass());

	public Map<String, Object> execute(String strData) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			HttpSession session = ServletActionContext.getRequest().getSession();
			Application application = ContextUtil.getApplication();

			Map<String, Object> objJson = JSON2Java.optMap(CommonUtil.getJavaObject(strData));
			Map<String, Object> userInfoLoin = JSON2Java.optMap(objJson.get("userInfoLoin"));
			if (userInfoLoin != null) {
				String rand = userInfoLoin.containsKey("rand") ? userInfoLoin.get("rand").toString().toLowerCase() : null;
				String randcode = session.getAttribute("loginRand").toString().toLowerCase();
				session.removeAttribute("loginRand");
				if (!rand.equals(randcode)) {
					map.put(STATUS, false);
					map.put(RAND, false);
				} else {
					User user = new User(application);
					if (user.init(userInfoLoin.get("userName").toString(),
							EncryptCount.encryptMD5(userInfoLoin.get("pwd").toString()))) {
						session.removeAttribute(ApplicationConfig.LOGIN_USER);
						if ("no".equals(ApplicationConfigUtil.getApplicationConfig().getConfig("ableSameUser")))
							ActiveUserListener.SameUserOut(user.getUserInfo().getUserId());

						session.setAttribute(ApplicationConfig.LOGIN_USER, user);
						map.put(STATUS, true);
					} else {
						map.put(STATUS, false);
					}
				}
			} else {
				map.put(STATUS, false);
			}
		} catch (Exception e) {
			logger.error(e.toString());
			map.clear();
			map.put(STATUS, false);
		}

		return map;
	}
}
