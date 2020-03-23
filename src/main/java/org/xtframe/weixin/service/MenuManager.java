package org.xtframe.weixin.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xtframe.weixin.pojo.AccessToken;
import org.xtframe.weixin.pojo.Button;
import org.xtframe.weixin.pojo.CommonButton;
import org.xtframe.weixin.pojo.ComplexButton;
import org.xtframe.weixin.pojo.Menu;
import org.xtframe.weixin.pojo.ViewButton;
import org.xtframe.weixin.utils.WeixinUtil;

/**
 * @ClassName: MenuManager
 * @Description: 菜单管理器类
 * @author yong.sun
 * @date 2015-10-28
 */
public class MenuManager {
	private static Logger log = LoggerFactory.getLogger(MenuManager.class);

	public static void main(String[] args) {
		// 第三方用户唯一凭证
		String appId = "wx3158dccaf25e02a4";
		// 第三方用户唯一凭证密钥
		String appSecret = "f0cf29d642852577c573ebd80eee4230";

		// 调用接口获取access_token
		AccessToken at = WeixinUtil.getAccessToken(appId, appSecret);

		System.out.println("access_token" + at.getToken());
		
		if (null != at) {
			// 调用接口创建菜单
			int result = WeixinUtil.createMenu(getMenu(), at.getToken());

			// 判断菜单创建结果
			if (0 == result)
				log.info("菜单创建成功！");
			else
				log.info("菜单创建失败，错误码：" + result);
		}
	}

	/**
	 * 组装菜单数据
	 * 
	 * @return
	 */
	private static Menu getMenu() {

		CommonButton btn21 = new CommonButton();
		btn21.setName("天气预报");
		btn21.setType("click");
		btn21.setKey("21");

		CommonButton btn22 = new CommonButton();
		btn22.setName("公交查询");
		btn22.setType("click");
		btn22.setKey("22");

		CommonButton btn23 = new CommonButton();
		btn23.setName("家政服务");
		btn23.setType("click");
		btn23.setKey("23");

		CommonButton btn24 = new CommonButton();
		btn24.setName("快餐订购");
		btn24.setType("click");
		btn24.setKey("24");

		CommonButton btn31 = new CommonButton();
		btn31.setName("幽默笑话");
		btn31.setType("click");
		btn31.setKey("31");

		CommonButton btn32 = new CommonButton();
		btn32.setName("社区活动");
		btn32.setType("click");
		btn32.setKey("32");

		ViewButton mainBtn1 = new ViewButton();
		mainBtn1.setName("首页");
		mainBtn1.setType("view");
//		mainBtn1.setUrl("http://test.twopai.com/");
//		mainBtn1.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx260dabf41e959ffe&redirect_uri=http://weixin.twopai.com/p100038.html&response_type=code&scope=snsapi_base&state=1#wechat_redirect");
//		mainBtn1.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxeaaf3ca34f2984f7&redirect_uri=http://aoyin.oicp.net/p100038.html&response_type=code&scope=snsapi_base&state=1#wechat_redirect");
		mainBtn1.setUrl("http://book.wangbig.com/oauth2.jsp");

		ComplexButton mainBtn2 = new ComplexButton();
		mainBtn2.setName("生活助手");
		mainBtn2.setSub_button(new CommonButton[] { btn21, btn22, btn23, btn24 });

		ComplexButton mainBtn3 = new ComplexButton();
		mainBtn3.setName("休闲驿站");
		mainBtn3.setSub_button(new CommonButton[] { btn31, btn32 });

		/**
		 * 这是公众号xiaoqrobot目前的菜单结构，每个一级菜单都有二级菜单项<br>
		 * 
		 * 在某个一级菜单下没有二级菜单的情况，menu该如何定义呢？<br>
		 * 比如，第三个一级菜单项不是“更多体验”，而直接是“幽默笑话”，那么menu应该这样定义：<br>
		 * menu.setButton(new Button[] { mainBtn1, mainBtn2, btn33 });
		 */
		Menu menu = new Menu();
//		menu.setButton(new Button[] { mainBtn1, mainBtn2, mainBtn3 });
		menu.setButton(new Button[] { mainBtn1 });

		return menu;
	}
}
