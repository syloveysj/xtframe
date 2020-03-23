package org.xtframe.util;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.xtframe.common.FileUtil;


public class TemplatesUtil {
	
	private static final String root;
	
	static {
		try {
			String classpath = Thread.currentThread().getContextClassLoader().getResource("").toURI().getPath();
			root = classpath.replace("/classes/", "/");
		} catch (Exception e) {
			throw new AssertionError(e);
		}
	}

	public static List<Map<String, Object>> getTemplatesTree() {
		List<Map<String, Object>> filelist = new ArrayList<Map<String, Object>>();
		
		File template = new File(root + "template");
		traversal(template, filelist, 1, "0");
		
		File page = new File(root + "page");
		traversal(page, filelist, 1, "0");
		
		return filelist;
	}
	
	public static void traversal(File f, List<Map<String, Object>> filelist, int level, String pid) {
		if(!f.exists() && !f.isDirectory()) return;
		
		String fid = CommonUtil.getUUID();
		List<Map<String, Object>> cldlist = new ArrayList<Map<String, Object>>();
		Map<String, Object> fm = new HashMap<String, Object>();
		fm.put("id", fid);
		fm.put("text", f.getName());
		fm.put("level", level);
		fm.put("pid", pid);
		fm.put("path", f.getAbsolutePath());
		fm.put("charset", "");
		fm.put("size", f.length());
		fm.put("children", cldlist);
		filelist.add(fm);
		
        File[] list = f.listFiles();// 先列出当前文件夹下的文件及目录
        for (File ff : list) {
            if (ff.isDirectory()) {// 列出的东西是目录吗
                traversal(ff, cldlist, level+1, fid);// 是就继续获得子文件夹，执行操作
            } else {
				// 不是就把文件名输出
				fm = new HashMap<String, Object>();
				fm.put("id", CommonUtil.getUUID());
				fm.put("text", ff.getName());
				fm.put("level", level+1);
				fm.put("pid", fid);
				fm.put("path", ff.getAbsolutePath());
				fm.put("charset", FileUtil.getFileCharset(ff));
				fm.put("size", ff.length());
				fm.put("leaf", true);
				cldlist.add(fm);
            }
        }
    }
}
