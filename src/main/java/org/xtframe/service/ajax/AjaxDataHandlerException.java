package org.xtframe.service.ajax;

/**
 * @ClassName: AjaxDataHandlerException
 * @Description: ajax数据处理异常类
 * @author yong.sun
 * @date 2013-9-15
 */
public class AjaxDataHandlerException extends Exception {
	private static final long serialVersionUID = 2465935184608103871L;

	public static enum AjaxExceptionType {
		general, login_again, parame_error
	}
	
	// 异常标志
	private AjaxExceptionType flag = AjaxExceptionType.general;

	public AjaxDataHandlerException() {
		super();
	}

	public AjaxDataHandlerException(AjaxExceptionType flag) {
		super();
		this.flag = flag;
	}

	public AjaxDataHandlerException(String message) {
		super(message);
	}

	public AjaxDataHandlerException(String message, AjaxExceptionType flag) {
		super(message);
		this.flag = flag;
	}

	public void setFlag(AjaxExceptionType flag) {
		this.flag = flag;
	}

	public AjaxExceptionType getFlag() {
		return flag;
	}

}
