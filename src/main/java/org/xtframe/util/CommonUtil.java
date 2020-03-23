package org.xtframe.util;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.xtframe.common.KeyMessageFormat;
import org.xtframe.common.NumberMessageFormat;
import org.xtframe.common.json.JSON2Java;
import org.xtframe.dao.IDataBase;

/**
 * @ClassName: CommonUtil 
 * @Description: 通用工具类
 * @author yong.sun
 * @date 2013-9-15
 */
public class CommonUtil {

	/**
	 * 随机获取UUID字符串(无中划线)
	 * 
	 * @return
	 */
	public static String getUUID() {
		String uuid = UUID.randomUUID().toString();
		return uuid.substring(0, 8) + uuid.substring(9, 13) + uuid.substring(14, 18) + uuid.substring(19, 23)
				+ uuid.substring(24);
	}

	public static String getIpAddr(HttpServletRequest request) { 
		String ip = request.getHeader("x-forwarded-for"); 
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
			ip = request.getHeader("Proxy-Client-IP"); 
		} 
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
			ip = request.getHeader("WL-Proxy-Client-IP"); 
		} 
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
			ip = request.getRemoteAddr(); 
		} 
		return ip; 
	} 
	
	/**
	 * 获取当前时间
	 * 
	 * @return
	 */
	public static String getCurrentTime() {
		return getCurrentTime("yyyy-MM-dd HH:mm:ss");
	}
	
	/**
	 * 获取当前时间
	 * 
	 * @return
	 */
	public static String getCurrentTime(String format) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(new Date());
	}

	/**
	 * 获取序列号
	 * 
	 * @param name
	 * @return
	 */
	public static synchronized long getRegID(String name) {
		IDataBase dataBase = (IDataBase) SpringUtil.getBean("dataBase");
		return dataBase.sequenceNextVal(name);
	}

	/**
	 * 由String到Object
	 * 
	 * @param str
	 * @return
	 */
	public static Object getJavaObject(String jsonStr) {
		if (StringUtil.isNullStr(jsonStr))
			return null;
		Object javaObject = null;
		try {
			javaObject = JSON2Java.parseJSON(jsonStr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return javaObject;
	}

	/**
	 * 创建SQL语句
	 * 
	 * @param sqlTemplet
	 * @param arguments
	 * @return
	 */
	public static String createSql(String sqlTemplet, Map<String, Object> arguments) {
		for (String key : arguments.keySet()) {
			arguments.put(key, StringUtil.replaceSql(arguments.get(key).toString()));
		}
		return KeyMessageFormat.format(sqlTemplet, arguments);
	}
	
	/**
	 * 创建SQL语句
	 * 
	 * @param sqlMode
	 * @param arguments
	 * @return
	 */
	public static String createSql(String sqlMode, Object... arguments) {
		for (int i = 0; i < arguments.length; i++) {
			arguments[i] = StringUtil.replaceSql(arguments[i].toString());
		}
		return NumberMessageFormat.format(sqlMode, arguments);
	}

	/**
	 * InputStream转byte[]
	 * 
	 * @param is
	 * @return
	 */
	public static byte[] InputStreamToByte(InputStream is) {
		byte imgdata[] = null;
		try {
			ByteArrayOutputStream bytestream = new ByteArrayOutputStream();
			int ch;
			while ((ch = is.read()) != -1) {
				bytestream.write(ch);
			}
			imgdata = bytestream.toByteArray();
			bytestream.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return imgdata;
	}
}
