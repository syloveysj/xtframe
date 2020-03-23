package org.xtframe.web.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;
import org.xtframe.common.Snippet;
import org.xtframe.util.CommonUtil;

@Repository("/imageUploadAction")
@Scope("prototype")
public class ImageUploadAction extends BaseAction {

	private File file = null;				//和在JS中指定的fileObjName的值相同
    private String fileFileName = null;		//[fileName]FileName    获得上传文件的名称
    private String fileContentType = null;	//[fileName]ContentType  获得上传文件的类型
    
	// 图片文件上传
	public String upload() {
		Map<String, Object> jsonMap = new HashMap<String, Object>();
        try {
//        	if (ContextUtil.getCurrentUser() == null) {
//				return ajaxJsonErrorMessage("请先登录!");
//			}
			if (file == null) {
				return ajaxJsonErrorMessage("请选择上传文件!");
			}
			
			String imageExtension =  StringUtils.substringAfterLast(fileFileName, ".").toLowerCase();
			String[] imageExtensionArray = getApplicationConfig().getConfig("allowedUploadImageExtension").split(getApplicationConfig().getConfig("extensionSeparator"));
			if (!ArrayUtils.contains(imageExtensionArray, imageExtension)) {
				return ajaxJsonErrorMessage("只允许上传图片文件类型: " + getApplicationConfig().getConfig("allowedUploadImageExtension") + " !");
			}
			
			int uploadLimit = Integer.parseInt(getApplicationConfig().getConfig("uploadImageLimit")) * 1024;
			if (uploadLimit != 0) {
				if (file.length() > uploadLimit) {
					return ajaxJsonErrorMessage("图片文件大小超出限制!");
				}
			}
			
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
			String dateString = simpleDateFormat.format(new Date());
			String imgPath = getApplicationConfig().getConfig("uploadImageDir") + dateString;
			String sourceImageDir = getApplication().getRealPath(imgPath);
			String smallImageDir = getApplication().getRealPath(imgPath + "/small");
			
			File uploadImageDir = new File(smallImageDir);
			if (!uploadImageDir.exists()) {
				uploadImageDir.mkdirs();
			}
			
			String saveName = CommonUtil.getUUID();
			String uploadImagePath = sourceImageDir + "\\" + saveName + "." + imageExtension;
			String uploadSmallImagePath = smallImageDir + "\\" + saveName + "." + imageExtension;
			
			FileOutputStream fos = new FileOutputStream(uploadImagePath); //输出流
			FileInputStream fis = new FileInputStream(file); //输入流

			byte[] buffer = new byte[1024];
			while((fis.read(buffer))!=-1){
			    fos.write(buffer);;
			}
			fos.close();
			fis.close();
			
			Snippet.createThumbnail(uploadImagePath, uploadSmallImagePath, 200, 200); //进行图片压缩及创建小图片
			
			jsonMap.put(STATUS, SUCCESS);
			jsonMap.put("id", saveName);
			jsonMap.put("name", fileFileName);
			jsonMap.put("saveName", saveName + "." + imageExtension);
			jsonMap.put("type", imageExtension);
			jsonMap.put("absolutePath", uploadImagePath);
			jsonMap.put("smallAbsolutePath", uploadSmallImagePath);
			jsonMap.put("relativePath", imgPath + "/" + saveName + "." + imageExtension);
			jsonMap.put("smallRelativePath", imgPath + "/small/" + saveName + "." + imageExtension);
			jsonMap.put("url", getApplication().getContextPath() + imgPath + "/" + saveName + "." + imageExtension);
			jsonMap.put("smallUrl", getApplication().getContextPath() + imgPath + "/small/" + saveName + "." + imageExtension);
			return ajaxJson(jsonMap);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return ajaxJsonErrorMessage("上传图片失败!");
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}

	public String getFileContentType() {
		return fileContentType;
	}

	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}
}
