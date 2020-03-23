package org.xtframe.common;

import info.monitorenter.cpdetector.io.ASCIIDetector;
import info.monitorenter.cpdetector.io.CodepageDetectorProxy;
import info.monitorenter.cpdetector.io.JChardetFacade;
import info.monitorenter.cpdetector.io.ParsingDetector;
import info.monitorenter.cpdetector.io.UnicodeDetector;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;

/**
 * @ClassName: FileUtil
 * @Description: 文件操作类
 * @author yong.sun
 * @date 2013-9-14
 */
public class FileUtil {

	/**
	 * 读取文件内容
	 * 
	 * @param path
	 * @return
	 */
	public static String fileReader(String path) {
		return fileReader(path, "utf-8");
	}

	/**
	 * 读取文件内容
	 * 
	 * @param path
	 * @param code
	 * @return
	 */
	public static String fileReader(String path, String code) {

		try {
			InputStream is = new FileInputStream(path);
			BufferedReader in = new BufferedReader(new InputStreamReader(is, code));
			StringBuffer buffer = new StringBuffer();
			String line = in.readLine(); // 读取第一行
			while (line != null) { // 如果 line 为空说明读完了
				buffer.append(line + "\n"); // 将读到的内容添加到 buffer 中
				line = in.readLine(); // 读取下一行
			}
			return buffer.toString();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 写入文件内容
	 * 
	 * @param path
	 * @param content
	 * @return
	 */
	public static boolean fileWriter(String path, String content) {
		return fileWriter(path, content, "utf-8");
	}

	/**
	 * 写入文件内容
	 * 
	 * @param path
	 * @param content
	 * @param code
	 * @return
	 */
	public static boolean fileWriter(String path, String content, String code) {
		try {
			FileOutputStream fos = new FileOutputStream(path);
			Writer out = new OutputStreamWriter(fos, code);
			out.write(content);
			out.close();
			fos.close();
			return true;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 创建目录
	 * 
	 * @param path
	 * @return
	 */
	public static String mkdir(String path) {
		String msg = null;

		// 新建文件对象
		File dir = new File(path);
		if (dir.isFile()) {
			msg = "错误原因:已有同名文件" + dir.getAbsolutePath() + "存在。";
			return msg;
		}

		if (!dir.exists()) {
			boolean result = dir.mkdirs();
			if (result == false) {
				msg = "错误原因:目录" + dir.getAbsolutePath() + "创建失败，原因不明！";
				return msg;
			}
			// 如果成功创建目录，则无输出。
			msg = "成功创建目录: " + dir.getAbsolutePath();
			return msg;
		} else {
			msg = "错误原因:目录" + dir.getAbsolutePath() + "已存在。";
		}
		return msg;
	}

	/**
	 * 创建目录
	 * 
	 * @param path
	 * @return
	 */
	public static boolean makeDir(String path) {

		File dir = new File(path);

		if (dir.isFile()) {
			return false;
		}

		if (!dir.exists()) {
			boolean result = dir.mkdirs();
			if (result == false) {
				return false;
			}
			return true;
		} else {
			return true;
		}
	}

	/**
	 * 删除文件
	 * 
	 * @param path
	 * @return
	 */
	public static boolean deleteFile(String path) {
		File myFile;
		try {
			myFile = new File(path);
			if (myFile.isFile()) {
				myFile.delete();
				return true;
			}
		} catch (Exception error) {
			return false;
		}
		return true;
	}

	/**
	 * 获取路径下所有文件路径
	 * 
	 * @param path
	 * @return
	 */
	public static List<String> getAllFiles(String path) {
		List<String> af = new ArrayList<String>();
		File file = new File(path);
		if (file.isFile()) {
			af.add(file.getAbsolutePath());
			return af;
		} else if (file.isDirectory()) {
			File[] files = file.listFiles();
			for (File f : files) {
				af.addAll(getAllFiles(f.getAbsolutePath()));
			}
		}
		return af;
	}

	/**
	 * 获取路径下所以指定扩展名文件
	 * 
	 * @param path
	 * @param extendName
	 * @return
	 */
	public static List<String> getAllFiles(String path, String extendName) {
		List<String> af = new ArrayList<String>();
		File file = new File(path);
		if (file.isFile()) {
			if (file.getAbsolutePath().toLowerCase().endsWith(extendName.toLowerCase())) {
				af.add(file.getAbsolutePath());
			}
			return af;
		} else if (file.isDirectory()) {
			File[] files = file.listFiles();
			for (File f : files) {
				af.addAll(getAllFiles(f.getAbsolutePath(), extendName));
			}
		}
		return af;
	}

	/**
	 * 拷贝文件
	 * 
	 * @param from
	 * @param to
	 */
	public static void fileCopy(String from, String to) {
		File fromFile = new File(from);
		File toFile = new File(to);
		try {
			FileUtils.copyFile(fromFile, toFile);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 获取文件的编码
	 * 
	 * @param f
	 * @return
	 */
	public static String getFileCharset(File f) {
		CodepageDetectorProxy detector =   CodepageDetectorProxy.getInstance();   
		detector.add(new ParsingDetector(false));    
		detector.add(JChardetFacade.getInstance());   
		//ASCIIDetector用于ASCII编码测定   
		detector.add(ASCIIDetector.getInstance());   
		//UnicodeDetector用于Unicode家族编码的测定   
		detector.add(UnicodeDetector.getInstance());   
		java.nio.charset.Charset charset = null;   
		try {   
			charset = detector.detectCodepage(new BufferedInputStream(new FileInputStream(f)),100);   
		} catch (Exception ex) {ex.printStackTrace();}   
		if(charset!=null){   
			return charset.name();   
		}else{  
			return null;
		}
	}
}