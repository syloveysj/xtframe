package org.xtframe.common.json;

import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.xtframe.common.FileUtil;

/**
 * @ClassName: JSON2Java
 * @Description: json字符串转java对象
 * @author yong.sun
 * @date 2013-9-14
 */
public class JSON2Java {
	private static final ScriptEngine jsonParser;

	static {
		try {
			String init = FileUtil.fileReader(Thread.currentThread().getContextClassLoader().getResource("").toURI().getPath()
					+ "org/xtframe/common/json/json2java.js");
			ScriptEngine engine = new ScriptEngineManager().getEngineByName("JavaScript");
			engine.eval(init);
			jsonParser = engine;
		} catch (Exception e) {
			throw new AssertionError(e);
		}
	}

	/**
	 * 将json字符串转换成java对象
	 * 
	 * @param json
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Object parseJSON(String json) {
		try {
			String eval = "new java.util.concurrent.atomic.AtomicReference(toJava((" + json + ")))";
			AtomicReference ret = (AtomicReference) jsonParser.eval(eval);
			return ret.get();
		} catch (ScriptException e) {
			throw new RuntimeException("Invalid json", e);
		}
	}

	/**
	 * 将json的java对象转换成字符串
	 * 
	 * @param json
	 * @return
	 */
	public static String optString(Object json) {
		return optString(json, null);
	}

	/**
	 * 将json的java对象转换成字符串
	 * 
	 * @param json
	 * @param def
	 * @return
	 */
	public static String optString(Object json, String def) {
		if (json == null)
			return def;
		if (json instanceof String)
			return json.toString();
		return def;
	}

	/**
	 * 将json的java对象转换成整型
	 * 
	 * @param json
	 * @return
	 */
	public static Integer optInteger(Object json) {
		return optInteger(json, null);
	}

	/**
	 * 将json的java对象转换成整型
	 * 
	 * @param json
	 * @param def
	 * @return
	 */
	public static Integer optInteger(Object json, Integer def) {
		if (json == null)
			return def;
		if (json instanceof Number)
			return Integer.valueOf(json.toString());
		return def;
	}

	/**
	 * 将json的java对象转换成布尔型
	 * 
	 * @param json
	 * @return
	 */
	public static Boolean optBoolean(Object json) {
		return optBoolean(json, null);
	}

	/**
	 * 将json的java对象转换成布尔型
	 * 
	 * @param json
	 * @param def
	 * @return
	 */
	public static Boolean optBoolean(Object json, Boolean def) {
		if (json == null)
			return def;
		if (json instanceof Boolean)
			return (Boolean) json;
		return def;
	}

	/**
	 * 将json的java对象转换成Map
	 * 
	 * @param json
	 * @return
	 */
	public static Map<String, Object> optMap(Object json) {
		return optMap(json, null);
	}

	/**
	 * 将json的java对象转换成Map
	 * 
	 * @param json
	 * @param def
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, Object> optMap(Object json, Map<String, Object> def) {
		if (json == null)
			return def;
		if (json instanceof Map)
			return (Map<String, Object>) json;
		return def;
	}

	/**
	 * 判断json的java对象是否是数组
	 * 
	 * @param json
	 * @return
	 */
	public static boolean isArray(Object json) {
		if (json == null || json instanceof Map || json instanceof String || json instanceof Number || json instanceof Boolean)
			return false;

		return true;
	}
}
