package org.xtframe.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.regex.Pattern;

/**
 * @ClassName: StringUtil
 * @Description: 字符串工具
 * @author yong.sun
 * @date 2013-9-15
 */
public class StringUtil {
	/**
	 * 将字符串 source 中的 oldStr 替换为 newStr, 并以大小写敏感方式进行查找
	 * 
	 * @param oldStr
	 * @param newStr
	 * @param source
	 * @return
	 */
	public static String replace(String oldStr, String newStr, String source) {
		return replace(oldStr, newStr, source, true);
	}

	/**
	 * 将字符串 source 中的 oldStr 替换为 newStr, matchCase 为是否设置大小写敏感查找
	 * 
	 * @param oldStr
	 * @param newStr
	 * @param source
	 * @param matchCase
	 * @return
	 */
	public static String replace(String oldStr, String newStr, String source, boolean matchCase) {
		if (source == null)
			return null;
		// 首先检查旧字符串是否存在, 不存在就不进行替换
		if (source.toLowerCase().indexOf(oldStr.toLowerCase()) == -1) {
			return source;
		}

		int findStartPos = 0;
		int a = 0;
		while (a > -1) {
			int b = 0;
			String str1, str2, str3, str4, strA, strB;
			str1 = source;
			str2 = str1.toLowerCase();
			str3 = oldStr;
			str4 = str3.toLowerCase();
			if (matchCase) {
				strA = str1;
				strB = str3;
			} else {
				strA = str2;
				strB = str4;
			}
			a = strA.indexOf(strB, findStartPos);
			if (a > -1) {
				b = oldStr.length();
				findStartPos = a + b;
				StringBuffer bbuf = new StringBuffer(source);
				source = bbuf.replace(a, a + b, newStr) + "";
				// 新的查找开始点位于替换后的字符串的结尾
				findStartPos = findStartPos + newStr.length() - b;
			}
		}
		return source;
	}

	/**
	 * 判断此Object对象是否为空、空字符串，或"null"
	 * 
	 * @param o
	 * @return
	 */
	public static boolean isNullStr(Object o) {
		return (o == null || o.toString().equals("null") || o.toString().equals("")) ? true : false;
	}

	/**
	 * 判断此字符串是否为空、空字符串，或"null"
	 * 
	 * @param s
	 * @return
	 */
	public static boolean isNullStr(String s) {
		return (s == null || s.equals("null") || s.equals("")) ? true : false;
	}

	public static String toString(Object o, String defaultValue) {
		if (o == null)
			return defaultValue;
		else
			return o.toString();
	}

	/**
	 * 获取字符串名值对
	 * 
	 * @param str
	 *            字符串
	 * @param opt
	 *            名值分隔符
	 * @param space
	 *            分隔符
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map strToNameValue(String str, String opt, String space) {
		Map ret = new TreeMap<String, String>();
		String arr[] = str.split(space);
		for (int i = 0; i < arr.length; i++) {
			String nv[] = arr[i].split(opt);
			if (nv.length == 1)
				ret.put(nv[0], "");
			else if (nv.length == 2)
				ret.put(nv[0], nv[1]);
		}
		return ret;
	}

	/**
	 * 判断是否为整数
	 * 
	 * @param str
	 *            传入的字符串
	 * @return 是整数返回true,否则返回false
	 */
	public static boolean isInteger(String str) {
		Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");
		return pattern.matcher(str).matches();
	}

	/**
	 * 判断是否为浮点数，包括double和float
	 * 
	 * @param str
	 *            传入的字符串
	 * @return 是浮点数返回true,否则返回false
	 */
	public static boolean isDouble(String str) {
		Pattern pattern = Pattern.compile("^[-\\+]?[.\\d]*$");
		return pattern.matcher(str).matches();
	}

	/**
	 * 判断输入的字符串是否符合Email样式.
	 * 
	 * @param str
	 *            传入的字符串
	 * @return 是Email样式返回true,否则返回false
	 */
	public static boolean isEmail(String str) {
		Pattern pattern = Pattern.compile("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
		return pattern.matcher(str).matches();
	}

	/**
	 * 判断输入的字符串是否为纯汉字
	 * 
	 * @param str
	 *            传入的字符窜
	 * @return 如果是纯汉字返回true,否则返回false
	 */
	public static boolean isChinese(String str) {
		Pattern pattern = Pattern.compile("[\u0391-\uFFE5]+$");
		return pattern.matcher(str).matches();
	}

	/**
	 * 是否为空白,包括null和""
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isBlank(String str) {
		return str == null || str.trim().length() == 0;
	}

	/**
	 * 判断是否为质数
	 * 
	 * @param x
	 * @return
	 */
	public static boolean isPrime(int x) {
		if (x <= 7) {
			if (x == 2 || x == 3 || x == 5 || x == 7)
				return true;
		}
		int c = 7;
		if (x % 2 == 0)
			return false;
		if (x % 3 == 0)
			return false;
		if (x % 5 == 0)
			return false;
		int end = (int) Math.sqrt(x);
		while (c <= end) {
			if (x % c == 0) {
				return false;
			}
			c += 4;
			if (x % c == 0) {
				return false;
			}
			c += 2;
			if (x % c == 0) {
				return false;
			}
			c += 4;
			if (x % c == 0) {
				return false;
			}
			c += 2;
			if (x % c == 0) {
				return false;
			}
			c += 4;
			if (x % c == 0) {
				return false;
			}
			c += 6;
			if (x % c == 0) {
				return false;
			}
			c += 2;
			if (x % c == 0) {
				return false;
			}
			c += 6;
		}
		return true;
	}

	/**
	 * 人民币转成大写
	 * 
	 * @param value
	 * @return String
	 */
	public static String hangeToBig(double value) {
		char[] hunit = { '拾', '佰', '仟' }; // 段内位置表示
		char[] vunit = { '万', '亿' }; // 段名表示
		char[] digit = { '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖' }; // 数字表示
		long midVal = (long) (value * 100); // 转化成整形
		String valStr = String.valueOf(midVal); // 转化成字符串

		String head = valStr.substring(0, valStr.length() - 2); // 取整数部分
		String rail = valStr.substring(valStr.length() - 2); // 取小数部分

		String prefix = ""; // 整数部分转化的结果
		String suffix = ""; // 小数部分转化的结果
		// 处理小数点后面的数
		if (rail.equals("00")) { // 如果小数部分为0
			suffix = "整";
		} else {
			suffix = digit[rail.charAt(0) - '0'] + "角" + digit[rail.charAt(1) - '0'] + "分"; // 否则把角分转化出来
		}
		// 处理小数点前面的数
		char[] chDig = head.toCharArray(); // 把整数部分转化成字符数组
		char zero = '0'; // 标志'0'表示出现过0
		byte zeroSerNum = 0; // 连续出现0的次数
		for (int i = 0; i < chDig.length; i++) { // 循环处理每个数字
			int idx = (chDig.length - i - 1) % 4; // 取段内位置
			int vidx = (chDig.length - i - 1) / 4; // 取段位置
			if (chDig[i] == '0') { // 如果当前字符是0
				zeroSerNum++; // 连续0次数递增
				if (zero == '0') { // 标志
					zero = digit[0];
				} else if (idx == 0 && vidx > 0 && zeroSerNum < 4) {
					prefix += vunit[vidx - 1];
					zero = '0';
				}
				continue;
			}
			zeroSerNum = 0; // 连续0次数清零
			if (zero != '0') { // 如果标志不为0,则加上,例如万,亿什么的
				prefix += zero;
				zero = '0';
			}
			prefix += digit[chDig[i] - '0']; // 转化该数字表示
			if (idx > 0)
				prefix += hunit[idx - 1];
			if (idx == 0 && vidx > 0) {
				prefix += vunit[vidx - 1]; // 段结束位置应该加上段名如万,亿
			}
		}

		if (prefix.length() > 0)
			prefix += '圆'; // 如果整数部分存在,则有圆的字样
		return prefix + suffix; // 返回正确表示
	}

	/**
	 * 全角字符转半角字符
	 * 
	 * @param QJStr
	 * @return String
	 */
	public static final String QJToBJChange(String QJStr) {
		char[] chr = QJStr.toCharArray();
		String str = "";
		for (int i = 0; i < chr.length; i++) {
			chr[i] = (char) ((int) chr[i] - 65248);
			str += chr[i];
		}
		return str;
	}

	/**
	 * 将文件名中的汉字转为UTF8编码的串,以便下载时能正确显示另存的文件名.
	 * 
	 * @param s
	 *            原文件名
	 * @return 重新编码后的文件名
	 */
	public static String toUtf8String(String s) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < s.length(); i++) {
			char c = s.charAt(i);
			if (c >= 0 && c <= 255) {
				sb.append(c);
			} else {
				byte[] b;
				try {
					b = Character.toString(c).getBytes("utf-8");
				} catch (Exception ex) {
					System.out.println(ex);
					b = new byte[0];
				}
				for (int j = 0; j < b.length; j++) {
					int k = b[j];
					if (k < 0)
						k += 256;
					sb.append("%" + Integer.toHexString(k).toUpperCase());
				}
			}
		}
		return sb.toString();
	}

	/**
	 * 返回一个十进制的整数
	 * 
	 * @param s
	 * @param defaultValue
	 * @return
	 */
	public static int parseInt(String s, int defaultValue) {

		int rt = defaultValue;
		try {

			rt = Integer.parseInt(s);
		} catch (NumberFormatException e) {

			rt = defaultValue;
		}
		return rt;
	}

	/**
	 * 转换输入的字符串为一十进制整数 如果转换不成功则返回0
	 * 
	 * @param s
	 * @return
	 */
	public static int parseInt(String s) {
		return parseInt(s, 0);
	}

	/**
	 * 返回一个十进制长整数
	 * 
	 * @param s
	 * @param defaultValue
	 * @return
	 */
	public static long parseLong(String s, long defaultValue) {
		long rt = defaultValue;
		try {
			rt = Long.parseLong(s);
		} catch (NumberFormatException e) {
			rt = defaultValue;
		}
		return rt;
	}

	/**
	 * 返回一个十进制长整数 当s不为整数时返回0
	 * 
	 * @param s
	 * @return
	 */
	public static long parseLong(String s) {
		return parseLong(s, 0);
	}

	/**
	 * 滤除帖子中的危险 HTML 代码, 主要是脚本代码, 滚动字幕代码以及脚本事件处理代码
	 * 
	 * @param content
	 * @return
	 */
	public static String replaceHtmlCode(String content) {
		if (isEmpty(content))
			return "";
		// 需要滤除的脚本事件关键字
		String[] eventKeywords = { "onmouseover", "onmouseout", "onmousedown", "onmouseup", "onmousemove", "onclick",
				"ondblclick", "onkeypress", "onkeydown", "onkeyup", "ondragstart", "onerrorupdate", "onhelp",
				"onreadystatechange", "onrowenter", "onrowexit", "onselectstart", "onload", "onunload", "onbeforeunload",
				"onblur", "onerror", "onfocus", "onresize", "onscroll", "oncontextmenu" };

		content = replace("<script", "&ltscript", content, false);
		content = replace("</script", "&lt/script", content, false);
		content = replace("<marquee", "&ltmarquee", content, false);
		content = replace("</marquee", "&lt/marquee", content, false);
		content = replace("\r\n", "<BR>", content);
		// 滤除脚本事件代码
		for (int i = 0; i < eventKeywords.length; i++) {
			content = replace(eventKeywords[i], "_" + eventKeywords[i], content, false); // 添加一个"_", 使事件代码无效
		}

		return content;
	}

	/**
	 * 滤除 HTML 代码 为文本代码
	 * 
	 * @param input
	 * @return
	 */
	public static String replaceHtmlToText(String input) {
		if (isEmpty(input)) {
			return "";
		}
		return setBr(setTag(input));
	}

	/**
	 * 滤除 HTML 标记
	 * 
	 * @param s
	 * @return
	 */
	public static String setTag(String s) {
		int j = s.length();

		StringBuffer stringbuffer = new StringBuffer(j + 500);

		for (int i = 0; i < j; i++)
			if (s.charAt(i) == '<')
				stringbuffer.append("&lt");
			else if (s.charAt(i) == '>')
				stringbuffer.append("&gt");
			else if (s.charAt(i) == '&')
				stringbuffer.append("&amp");
			else
				stringbuffer.append(s.charAt(i));

		return stringbuffer.toString();
	}

	/**
	 * 滤除 BR 代码
	 * 
	 * @param s
	 * @return
	 */
	public static String setBr(String s) {
		int j = s.length();

		StringBuffer stringbuffer = new StringBuffer(j + 500);

		for (int i = 0; i < j; i++)
			if (s.charAt(i) == '\n')
				stringbuffer.append("");
			else if (s.charAt(i) == '\r')
				stringbuffer.append("");
			else
				stringbuffer.append(s.charAt(i));

		return stringbuffer.toString();
	}

	/**
	 * 滤除空格
	 * 
	 * @param s
	 * @return
	 */
	public static String setNbsp(String s) {
		int j = s.length();

		StringBuffer stringbuffer = new StringBuffer(j + 500);

		for (int i = 0; i < j; i++)
			if (s.charAt(i) == ' ')
				stringbuffer.append("&nbsp;");
			else
				stringbuffer.append(s.charAt(i));

		return stringbuffer.toString();
	}

	/**
	 * 转换由表单读取的数据的内码
	 * 
	 * @param input
	 * @return
	 */
	public static String toChi(String input) {
		try {
			byte[] bytes = input.getBytes("UTF-8");
			return new String(bytes);
		} catch (Exception ex) {
		}
		return null;
	}

	/**
	 * 将单个的 ' 换成 ''; SQL 规则:如果单引号中的字符串包含一个嵌入的引号，可以使用两个单引号表示嵌入的单引号。
	 * 
	 * @param input
	 * @return
	 */
	public static String replaceSql(String input) {
		String sql = replace("'", "''", input);
		sql = replace("\\", "\\\\", sql);
		return sql;
	}

	/**
	 * 对给定字符进行 URL 编码
	 * 
	 * @param value
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public static String encode(String value) {
		if (isEmpty(value))
			return "";
		return java.net.URLEncoder.encode(value);
	}

	/**
	 * 对给定字符进行 URL 解码
	 * 
	 * @param value
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public static String decode(String value) {
		if (isEmpty(value))
			return "";
		return java.net.URLDecoder.decode(value);
	}

	/**
	 * 判断字符串是否为空
	 * 
	 * @param input
	 * @return
	 */
	public static boolean isEmpty(String input) {
		if (input == null || input.length() <= 0)
			return true;
		return false;
	}

	/**
	 * 按字节分割字符串
	 * 
	 * @param string
	 * @param size
	 * @return
	 */
	public static String[] split(String string, int size) {
		if (size < 2)
			throw new IllegalArgumentException("最小长度为两个字节");
		byte[] bytes = string.getBytes();
		if (bytes.length <= size)
			return new String[] { string };
		// 分成的条数不确定(整除的情况下也许会多出一条),所以先用list再转化为array
		List<String> list = new ArrayList<String>();
		int offset = 0;// 偏移量,也就是截取的字符串的首字节的位置
		int length = 0;// 截取的字符串的长度,可能是size,可能是size-1
		int position = 0;// 可能的截取点,根据具体情况判断是不是在此截取
		while (position < bytes.length) {
			position = offset + size;
			if (position > bytes.length) {
				// 最后一条
				String s = new String(bytes, offset, bytes.length - offset);
				list.add(s);
				break;
			}
			if (bytes[position - 1] > 0 || (bytes[position - 1] < 0 && bytes[position - 2] < 0))
				// 截断点是字母,或者是汉字
				length = size;
			else
				// 截断点在汉字中间
				length = size - 1;
			String s = new String(bytes, offset, length);
			list.add(s);
			offset += length;
		}
		String[] array = new String[list.size()];
		for (int i = 0; i < array.length; i++)
			array[i] = (String) list.get(i);
		return array;
	}

	/**
	 * 将心情符号修改为对应的图片 ------------- 请修改页面中相关代码!
	 * 
	 * @param temp
	 * @return
	 */
	public static String smilies(String temp) {
		if (isEmpty(temp))
			return "";
		// 判断是否有禁止表情字符的表单值
		// if( isEmpty(request("smilies")) ) {
		temp = replace("/:)", "<IMG border=0 SRC=images/brow/regular_smile.gif>", temp);
		temp = replace("/:d", "<IMG border=0 SRC=images/brow/teeth_smile.gif>", temp);
		temp = replace("/:o", "<IMG border=0 SRC=images/brow/omg_smile.gif>", temp);
		temp = replace("/:p", "<IMG border=0 SRC=images/brow/tounge_smile.gif>", temp);
		temp = replace("/;)", "<IMG border=0 SRC=images/brow/wink_smile.gif>", temp);
		temp = replace("/:(", "<IMG border=0 SRC=images/brow/sad_smile.gif>", temp);
		temp = replace("/:s", "<IMG border=0 SRC=images/brow/confused_smile.gif>", temp);
		temp = replace("/:|", "<IMG border=0 SRC=images/brow/whatchutalkingabout_smile.gif>", temp);
		temp = replace("/:$", "<IMG border=0 SRC=images/brow/embaressed_smile.gif>", temp);
		// }
		return temp;
	}

	/**
	 * 过滤特殊字符
	 * 
	 * @param src
	 * @return
	 */
	public static String encoding(String src) {
		if (src == null)
			return "";
		StringBuilder result = new StringBuilder();
		if (src != null) {
			src = src.trim();
			for (int pos = 0; pos < src.length(); pos++) {
				switch (src.charAt(pos)) {
				case '\"':
					result.append("&quot;");
					break;
				case '<':
					result.append("&lt;");
					break;
				case '>':
					result.append("&gt;");
					break;
				case '\'':
					result.append("&apos;");
					break;
				case '&':
					result.append("&amp;");
					break;
				case '%':
					result.append("&pc;");
					break;
				case '_':
					result.append("&ul;");
					break;
				case '#':
					result.append("&shap;");
					break;
				case '?':
					result.append("&ques;");
					break;
				default:
					result.append(src.charAt(pos));
					break;
				}
			}
		}
		return result.toString();
	}

	/**
	 * 反过滤特殊字符
	 * 
	 * @param src
	 * @return
	 */
	public static String decoding(String src) {
		if (src == null)
			return "";
		String result = src;
		result = result.replace("&quot;", "\"").replace("&apos;", "\'");
		result = result.replace("&lt;", "<").replace("&gt;", ">");
		result = result.replace("&amp;", "&");
		result = result.replace("&pc;", "%").replace("&ul", "_");
		result = result.replace("&shap;", "#").replace("&ques", "?");
		return result;
	}

	/**
	 * 得到文件的扩展名.
	 * 
	 * @param fileName
	 *            需要处理的文件的名字.
	 * @return
	 */
	public static String getExtension(String fileName) {
		if (fileName != null) {
			int i = fileName.lastIndexOf('.');
			if (i > 0 && i < fileName.length() - 1) {
				return fileName.substring(i + 1).toLowerCase();
			}
		}
		return "";
	}

	/**
	 * 得到文件的前缀名.
	 * 
	 * @param fileName
	 *            需要处理的文件的名字.
	 * @return
	 */
	public static String getPrefix(String fileName) {
		if (fileName != null) {
			int i = fileName.lastIndexOf('.');
			if (i > 0 && i < fileName.length() - 1) {
				return fileName.substring(0, i);
			}
			return fileName;
		}
		return "";
	}
}
