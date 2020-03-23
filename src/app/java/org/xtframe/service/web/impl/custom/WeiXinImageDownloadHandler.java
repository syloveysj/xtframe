package org.xtframe.service.web.impl.custom;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.xtframe.common.json.JSON2Java;
import org.xtframe.dao.DataBaseFactory;
import org.xtframe.dao.IDataBase;
import org.xtframe.entity.Application;
import org.xtframe.entity.ApplicationConfig;
import org.xtframe.entity.User;
import org.xtframe.service.AbstractBasicExecute;
import org.xtframe.service.ajax.IAjaxDataHandler;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.ContextUtil;
import org.xtframe.util.StringUtil;
import org.xtframe.util.http.HttpUtils;
@Service
@Scope("prototype")
public class WeiXinImageDownloadHandler extends AbstractBasicExecute implements IAjaxDataHandler{
	private final Log logger = LogFactory.getLog(getClass());
	public String weixinImageUrl="http://file.api.weixin.qq.com/cgi-bin/media/get";  //--微信sj sdk 图片下载http 接口 url
	public Map<String, Object> execute(String strData) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			HttpSession session = ServletActionContext.getRequest().getSession();
			User user = (User) session.getAttribute(ApplicationConfig.LOGIN_USER);
			String userid=user.getUserInfo().getUserId();
			
			IDataBase dataBase = DataBaseFactory.getDataBaseForJndiName("dataBase");
			Map<String, Object> objJson = JSON2Java.optMap(CommonUtil.getJavaObject(strData));
			Map<String, Object> parameters = JSON2Java.optMap(objJson.get("parameters"));
			String access_token = StringUtil.toString(parameters.get("accesstoken"), "");
			String imaSerId = StringUtil.toString(parameters.get("imaSerId"), "");
			String email = StringUtil.toString(parameters.get("email"), "");
			String username = StringUtil.toString(parameters.get("username"), "");
			String qq = StringUtil.toString(parameters.get("qq"), "");
			String sex = StringUtil.toString(parameters.get("sex"), "");
			String textarea = StringUtil.toString(parameters.get("textarea"), "");
			String sql0 = " update t_user set nickname='"+username+"',email='"+email+"',sex='"+sex+"',qq='"+qq+"',remark='"+textarea+"'";
			if(!"".equals(imaSerId)){
				String path=bookDownLoadPic(access_token,imaSerId);
				sql0=sql0+" ,photo= '"+ path+"'";
			}
			sql0=sql0+" where userid = '"+userid+"'";
			dataBase.executeUpdate(sql0.toString(), null); 
			resultMap.put(STATUS, true);
			
		}catch (Exception e) {
			logger.error(e.toString());
			resultMap.clear();
			resultMap.put(STATUS, false);
		}
		return resultMap;
	}
	
	public  String bookDownLoadPic(String access_token,String serverId){
				try {
					String url=weixinImageUrl+"?access_token="+access_token+"&media_id="+serverId;
					String path=download_urls(url,serverId);
					return path;
				} catch (Exception e) {
					e.printStackTrace();
				}
				return "";
	}
	
	@SuppressWarnings("static-access")
	public  String download_urls(String url,String media_id) throws Exception{
		Application application = ContextUtil.getApplication();
		String dd_pic_dir=application.getSystemParameter("dd_pic_dir");
		String dd_pic_local_dir=application.getSystemParameter("dd_pic_local_dir");
		if(StringUtil.isEmpty(dd_pic_dir)||StringUtil.isEmpty(dd_pic_local_dir)){
			return "";
		}
		HttpUtils httpUtil = new HttpUtils();//请求http地址
		HttpURLConnection conn = 
				(HttpURLConnection) httpUtil.sendGetRequest(url, null, null);
		InputStream in = conn.getInputStream();
		byte[] bs = new byte[1024];
		int len;
		String fileExt =new String((conn.getHeaderField("content-disposition")).getBytes("ISO-8859-1"),"utf8");
		String fileName= getfiname(fileExt);
		String filepath =dd_pic_local_dir+"/" ;
		File f = new File(filepath+fileName);
		if ( f.exists() ) { f.delete(); } //如果文件存在 删除源文件
		(new File(filepath)).mkdirs();
		f.createNewFile(); //创建文件
		
		OutputStream out =  
                new FileOutputStream(filepath+fileName, true); 
		while((len=in.read(bs))!=-1){
			out.write(bs,0,len);
		}
		out.close();
		in.close();
		
		return dd_pic_dir+"/"+fileName;
	}
	
	
	public  String getfiname(String fileExt){
		String nameStr=fileExt.replace("attachment;", "");
		nameStr.trim();
		String name=nameStr.split("=")[1];
		String newStr=name.replace("\"","");
		return newStr;
	}
}
