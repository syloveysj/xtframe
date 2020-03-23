package org.xtframe.servlet;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.xtframe.entity.ApplicationConfig;
import org.xtframe.entity.User;

/**
 * @ClassName: ActiveUserListener
 * @Description: session监听类
 * @author yong.sun
 * @date 2013-9-21
 */
public class ActiveUserListener implements HttpSessionListener {

	private static int sessionCount = 0;
	private static Map<String, HttpSession> sessionMaps = new TreeMap<String, HttpSession>(); // 存放session的集合类

	public void sessionCreated(HttpSessionEvent event) {
		HttpSession session = event.getSession();
		String sessionId = session.getId();
		sessionMaps.put(sessionId, session);
		sessionCount++;
	}

	public void sessionDestroyed(HttpSessionEvent event) {
		sessionCount--;
		String sessionId = event.getSession().getId();
		sessionMaps.remove(sessionId);// 利用会话ID标示特定会话
	}

	/**
	 * 获取在线用户总数
	 * 
	 * @return
	 */
	public static int getUserOnlineCount() {
		Collection<HttpSession> sessionsCollection = sessionMaps.values();// 得到当前所有会话之集合
		Iterator<HttpSession> iterSessions = sessionsCollection.iterator();
		int useronlineCount = 0;
		while (iterSessions.hasNext()) {
			HttpSession mySession = iterSessions.next();
			User user = (User) mySession.getAttribute(ApplicationConfig.LOGIN_USER);
			if (user == null) {
				continue;
			}
			useronlineCount++;
		}
		return useronlineCount;
	}

	/**
	 * 获取在线用户的编码
	 * 
	 * @return
	 */
	public static ArrayList<String> getUserOnlineCode() {
		Collection<HttpSession> sessionsCollection = sessionMaps.values();// 得到当前所有会话之集合
		Iterator<HttpSession> iterSessions = sessionsCollection.iterator();
		ArrayList<String> useronlineCode = new ArrayList<String>();
		while (iterSessions.hasNext()) {
			HttpSession mySession = iterSessions.next();
			User user = (User) mySession.getAttribute(ApplicationConfig.LOGIN_USER);
			if (user == null) {
				continue;
			}
			useronlineCode.add(user.getUserInfo().getUserId());
		}
		return useronlineCode;
	}

	/**
	 * 踢出相同的登录用户
	 * 
	 * @param userId
	 */
	public static void SameUserOut(String userId) {
		Collection<HttpSession> sessionsCollection = sessionMaps.values();// 得到当前所有会话之集合
		Iterator<HttpSession> iterSessions = sessionsCollection.iterator();
		while (iterSessions.hasNext()) {
			HttpSession mySession = iterSessions.next();
			User user = (User) mySession.getAttribute(ApplicationConfig.LOGIN_USER);
			if (user == null) {
				continue;
			}
			if (user.getUserInfo().getUserId().equals(userId)) {
				mySession.removeAttribute(ApplicationConfig.LOGIN_USER);
				System.out.println("前用户\"" + user.getUserInfo().getUserName() + "\"被踢下线！");
			}
		}
	}

	public static int getSessionCount() {

		return sessionCount;
	}

	public static Map<String, HttpSession> getSessionMaps() {
		return sessionMaps;
	}
}