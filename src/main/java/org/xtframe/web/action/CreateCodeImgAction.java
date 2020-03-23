package org.xtframe.web.action;

import java.io.ByteArrayInputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Repository;
import org.xtframe.common.AuthImage;

/**
 * @ClassName: CreateCodeImgAction 
 * @Description: 验证码生成Action 
 * @author yong.sun
 * @date 2013-9-15
 */
@Repository("/createCodeImgAction")
public class CreateCodeImgAction {

	private ByteArrayInputStream inputStream;
	
	public String execute() throws Exception {
		HttpServletResponse response = ServletActionContext.getResponse();
		// 阻止生成页面被缓存，保证每次重新生成随机验证码
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Cache-Control", "no-store");
		response.setDateHeader("Expires", 0);
		response.setContentType("image/jpeg");

		AuthImage authImage = AuthImage.Instance();
		// 取得带有随机字符串的图片
		setInputStream(authImage.getImage());
		
		// 取得随机字符串放入HttpSession
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		session.setAttribute("loginRand", authImage.getString());

		return "image";
	}
	
	public void setInputStream(ByteArrayInputStream inputStream) {
		this.inputStream = inputStream;
	}

	public ByteArrayInputStream getInputStream() {
		return inputStream;
	}
}
