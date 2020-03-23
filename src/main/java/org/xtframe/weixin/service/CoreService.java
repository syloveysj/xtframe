package org.xtframe.weixin.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.xtframe.weixin.entity.send.Article;
import org.xtframe.weixin.entity.send.NewsMessage;
import org.xtframe.weixin.entity.send.TextMessage;
import org.xtframe.weixin.utils.MessageUtil;

/**
 * 核心服务类
 * 
 * @author yong.sun
 * @date 2014-07-02
 */
public class CoreService {
	/**
	 * 处理微信发来的请求
	 * 
	 * @param request
	 * @return
	 */
	public static String processRequest(HttpServletRequest request) {
		String respMessage = null;
		try {
			// 默认返回的文本消息内容
			String respContent = "请求处理异常，请稍候尝试！";

			// xml请求解析
			Map<String, String> requestMap = MessageUtil.parseXml(request);

			// 发送方帐号（open_id）
			String fromUserName = requestMap.get("FromUserName");
			// 公众帐号
			String toUserName = requestMap.get("ToUserName");
			// 消息类型
			String msgType = requestMap.get("MsgType");

			// 回复文本消息
			String basePath = request.getScheme()+"://"+request.getServerName()+request.getContextPath();
			
			List<Article> articles = new ArrayList<Article>();
			Article article = new Article();
			article.setPicUrl(basePath + "/mobile/images/banner.jpg");
			article.setTitle("希可尔购书特色");
			article.setUrl(basePath + "/p100038.html");
			article.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxeaaf3ca34f2984f7&redirect_uri=" + basePath + "/p100038.html&response_type=code&scope=snsapi_base&state=1#wechat_redirect");
			article.setDescription("购书介绍");
			articles.add(article);
			
			NewsMessage newsMessage = new NewsMessage();
			newsMessage.setToUserName(fromUserName);
			newsMessage.setFromUserName(toUserName);
			newsMessage.setCreateTime(new Date().getTime());
			newsMessage.setArticleCount(1);
			newsMessage.setArticles(articles);
			newsMessage.setMsgType(MessageUtil.SEND_NEWS);
			
			TextMessage textMessage = new TextMessage();
			textMessage.setToUserName(fromUserName);
			textMessage.setFromUserName(toUserName);
			textMessage.setCreateTime(new Date().getTime());
			textMessage.setMsgType(MessageUtil.SEND_TEXT);
			
			System.out.println("fromUserName=" + fromUserName + "; toUserName=" + toUserName);

			// 文本消息
			if (msgType.equals(MessageUtil.RECRIVE_TEXT)) {
				respContent = "您发送的是文本消息！";
			}
			// 图片消息
			else if (msgType.equals(MessageUtil.RECRIVE_IMAGE)) {
				respContent = "您发送的是图片消息！";
			}
			// 地理位置消息
			else if (msgType.equals(MessageUtil.RECRIVE_LOCATION)) {
				respContent = "您发送的是地理位置消息！";
			}
			// 链接消息
			else if (msgType.equals(MessageUtil.RECRIVE_LINK)) {
				respContent = "您发送的是链接消息！";
			}
			// 音频消息
			else if (msgType.equals(MessageUtil.RECRIVE_VOICE)) {
				respContent = "您发送的是音频消息！";
			}
			// 事件推送
			else if (msgType.equals(MessageUtil.RECRIVE_EVENT)) {
				// 事件类型
				String eventType = requestMap.get("Event");
				// 订阅
				if (eventType.equals(MessageUtil.RECRIVE_SUBSCRIBE)) {
					respContent = "谢谢您的关注！";
				}
				// 取消订阅
				else if (eventType.equals(MessageUtil.RECRIVE_UNSUBSCRIBE)) {
					// TODO 取消订阅后用户再收不到公众号发送的消息，因此不需要回复消息
				}
				// 自定义菜单点击事件
				else if (eventType.equals(MessageUtil.RECRIVE_CLICK)) {
					// 事件KEY值，与创建自定义菜单时指定的KEY值对应
					String eventKey = requestMap.get("EventKey");

					if (eventKey.equals("1")) {
						respContent = "社区购物菜单项被点击！";
					} else if (eventKey.equals("21")) {
						respContent = "天气预报菜单项被点击！";
					} else if (eventKey.equals("22")) {
						respContent = "公交查询菜单项被点击！";
					} else if (eventKey.equals("23")) {
						respContent = "家政服务菜单项被点击！";
					} else if (eventKey.equals("24")) {
						respContent = "快餐订购菜单项被点击！";
					} else if (eventKey.equals("31")) {
						respContent = "幽默笑话菜单项被点击！";
					} else if (eventKey.equals("32")) {
						respContent = "社区活动菜单项被点击！";
					}
				}
			}

			textMessage.setContent(respContent);
//			respMessage = MessageUtil.textMessageToXml(textMessage);
			respMessage = MessageUtil.newsMessageToXml(newsMessage);
			
			System.out.println(respMessage);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return respMessage;
	}
}

