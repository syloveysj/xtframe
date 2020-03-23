package org.xtframe.common;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @ClassName: NumberMessageFormat 
 * @Description: 数字关键词占位符替换
 * @author yong.sun
 * @date 2013-9-14
 */
public class NumberMessageFormat {
	// 消息模版
	private String pattern;
	// 模版切分链表
	private List<String> prototypes = new ArrayList<String>();
	// 数字关键词链表
	private List<Integer> positions = new ArrayList<Integer>();
	// 用关键词分隔后字符串数组
	private String[] inactives;
	// 是否关键词开头
	private boolean startBrackets = false;
	// 是否关键词结尾
	private boolean endBrackets = false;
	
	public NumberMessageFormat(String pattern) {
		this.pattern = pattern;
		applyPattern(pattern);
	}

	/**
	 * 追加消息模版
	 * 
	 * @param arg
	 */
	public void applyPattern(String arg) {
		Pattern p_startBrackets = Pattern.compile("^(\\{[\\d]+})");
		startBrackets = p_startBrackets.matcher(arg).find();

		Pattern p_endBrackets = Pattern.compile("(\\{[\\d]+})$");
		endBrackets = p_endBrackets.matcher(arg).find();

		Pattern p_inactives = Pattern.compile("(\\{[\\d]+})");
		inactives = p_inactives.split(arg);

		Pattern p_positions = Pattern.compile("([\\d]+)");
		Matcher m_prototypes = p_inactives.matcher(arg);
		Matcher m_positions;
		if (m_prototypes.find()) {
			m_prototypes.reset();
			while (m_prototypes.find()) {
				prototypes.add(m_prototypes.group(1));
				m_positions = p_positions.matcher(m_prototypes.group(1));
				m_positions.find();
				positions.add(Integer.valueOf(m_positions.group(1)));
			}
		}
	}

	/**
	 * 参数格式化替换
	 * 
	 * @param arguments
	 * @return
	 */
	public String format(Object... arguments) {
		if (prototypes.size() == 0 || arguments == null || arguments.length == 0)
			return this.pattern;

		for (int i = 0; i < arguments.length; i++) {
			for (int j = 0; j < positions.size(); j++) {
				if (positions.get(j) == i) {
					prototypes.set(j, arguments[i].toString());
				}
			}
		}

		StringBuffer result = new StringBuffer();
		int index = 0;
		for (; index < prototypes.size(); index++) {
			if (startBrackets) {
				result.append(prototypes.get(index));
				if (inactives.length > index + 1)
					result.append(inactives[index + 1]);
			} else {
				if (inactives.length > index)
					result.append(inactives[index]);
				result.append(prototypes.get(index));
			}
		}
		if (!endBrackets && inactives.length > index) {
			result.append(inactives[index]);
		}

		return result.toString();
	}

	/**
	 * 静态格式化方法
	 * 
	 * @param pattern
	 * @param arguments
	 * @return
	 */
	public static String format(String pattern, Object... arguments) {
		NumberMessageFormat temp = new NumberMessageFormat(pattern);
		return temp.format(arguments);
	}
}
