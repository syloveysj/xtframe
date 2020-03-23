package org.xtframe.service.web.impl.custom;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Test;
import org.xtframe.http.HttpUtil;

public class GetCls {
	public String getCls(String isbn){
		try{
			String url = this.getPostUrl();
			String str =  HttpUtil.sendPost(url, "find_base=NLC01&find_base=NLC09&func=find-m&find_code=ISB&request="+isbn+"&local_base=&filter_code_1=WLN&filter_request_1=&filter_code_2=WYR&filter_request_2=&filter_code_3=WYR&filter_request_3=&filter_code_4=WFM&filter_request_4=&filter_code_5=WSL&filter_request_5=");
			Pattern p = Pattern.compile("<A[^>]*>([^\u4e00-\u9fa5:：。、\\s<]*)</A>");
	        Matcher m = p.matcher(str);
	        ArrayList<String> strs = new ArrayList<String>();
	        while (m.find()) {
	            strs.add(m.group(1));            
	        } 
	        if(strs != null && strs.size() >0){
	        	return strs.get(0);
	        }
		}catch (Exception e){
			System.out.println("获取失败!");
		}
        return "";
	}
	@Test
	public void test(){
		System.out.println(this.getCls("9789860080605"));
	}
	/**
	 * 获取post提交地址
	 * @return
	 */
	public String getPostUrl(){
		try{
			String url = "http://opac.nlc.cn/F/SU1HB8RX23B5RF2MDS412V4DQ1P4NAUXB174NU35ALK9ADTLQE-11125?func=find-b-0";
			String str = HttpUtil.sendGet(url, "");
			Pattern p = Pattern.compile("action=\"(.*?)\"");
	        Matcher m = p.matcher(str);
	        ArrayList<String> strs = new ArrayList<String>();
	        while (m.find()) {
	            strs.add(m.group(1));            
	        } 
	        if(strs != null && strs.size()>0){
	        	return strs.get(1);
	        }
		}catch (Exception e) {
			System.out.println("获取失败!");
		}
		return "";
	}
}
