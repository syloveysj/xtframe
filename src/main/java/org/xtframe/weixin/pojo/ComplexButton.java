package org.xtframe.weixin.pojo;

/**
 * @ClassName: ComplexButton
 * @Description: 复杂按钮（父按钮）
 * @author yong.sun
 * @date 2015-10-28
 */
public class ComplexButton extends Button {
	private Button[] sub_button;

	public Button[] getSub_button() {
		return sub_button;
	}

	public void setSub_button(Button[] sub_button) {
		this.sub_button = sub_button;
	}
}
