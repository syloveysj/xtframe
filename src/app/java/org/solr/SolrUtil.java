package org.solr;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;
import org.xtframe.service.AbstractBasicExecute;

public class SolrUtil extends AbstractBasicExecute{
	
	private static long total;

	public static long getTotal() {
		return total;
	}
	public static void setTotal(long total) {
		SolrUtil.total = total;
	}
	
	
	/**
	 * 多core返回页面数据
	 * @param offset 偏移位置
	 * @param maxsize 最大行数
	 * @param coreName core名
	 * @param conidtion 查询条件
	 * @param sort 排序字段
	 * @param timeStringList 日期字段
	 * @param keyMap 其他的core key--core名                    value--主键
	 * @return
	 */
	public static List<Map<String, Object>> solrQuery(int offset, int maxsize,
			String coreName, String conidtion,String sort,List<String> timeStringList,Map<String,List<String>> keyMap) {
		try {
			List<Map<String, Object>> ret = new ArrayList<Map<String,Object>>();
			String baseURL = SolrUtil.getUrl()+coreName;
			HttpSolrServer solrServer = new HttpSolrServer(baseURL);
			SolrQuery params = new SolrQuery();
			String isMao = conidtion.substring(conidtion.length()-1,conidtion.length());
			if(":".equals(isMao)){
				conidtion = conidtion.substring(0,conidtion.length()-1)+"\\:";
			}
			params.set("q", conidtion);
			params.setStart(offset);
			params.setRows(maxsize);
			if(sort.length()>1){
				params.setSort(sort,ORDER.desc);//设置排序
			}
			QueryResponse query = solrServer.query(params);
			SolrDocumentList results = query.getResults();
			SolrUtil.setTotal(results.getNumFound());
			for(SolrDocument solrDocument : results){
				Collection<String> fieldNames = solrDocument.getFieldNames();
				Map<String,Object> r = new HashMap<String, Object>();
				for(String field : fieldNames){  
					if(timeStringList != null){
						for(int i =0;i<timeStringList.size();i++){
							if(field.equals(timeStringList.get(i))){
								String dtime = SolrUtil.getDate(solrDocument.get(field)+"");
								r.put(field, dtime);
							}else{
								r.put(field, solrDocument.get(field));
							}
						}
					}else{
						r.put(field, solrDocument.get(field));
					}
				}
				for(String key : keyMap.keySet()){
					List<String> keyList  = keyMap.get(key);
					Map<String,Object> corereturn = new HashMap<String, Object>();
					String quer = "";
					if(keyList.size() == 1){
						quer = keyList.get(0)+":"+solrDocument.get(keyList.get(0));
						corereturn = SolrUtil.coreQuery(key, quer);
					}else{
						for(int i = 0;i<keyList.size();i++){
							if(i == 0){
								quer += keyList.get(i)+":"+solrDocument.get(keyList.get(i));
							}else{
								quer +="  AND" + keyList.get(i)+":"+solrDocument.get(keyList.get(i));
							}
						}
						corereturn = SolrUtil.coreQuery(key, quer);
					}
					if(corereturn.size()>0){
						r.putAll(corereturn);
					}
				}
				ret.add(r);
			}
			return ret;
		} catch (SolrServerException e) {
			e.printStackTrace();
		}
		return null;
	}
	public static String getAppPath(){
		String classpath;
		try {
			classpath = Thread.currentThread().getContextClassLoader().getResource("").toURI().getPath();
			String root = classpath.replace("/WEB-INF/classes/", "");
			return root;
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	
	/**
	 * 单core返回页面数据
	 * @param offset 偏移位置
	 * @param maxsize 最大行数
	 * @param coreName core名
	 * @param conidtion 查询条件
	 * @param sort 排序字段
	 * @param timeStringList 日期字段
	 * @return
	 */
	public static List<Map<String, Object>> solrQuery(int offset, int maxsize,
			String coreName, String conidtion,String sort,List<String> timeStringList) {
		try {
			List<Map<String, Object>> ret = new ArrayList<Map<String,Object>>();
			String baseURL = SolrUtil.getUrl()+coreName;
			HttpSolrServer solrServer = new HttpSolrServer(baseURL);
			SolrQuery params = new SolrQuery();
			String isMao = conidtion.substring(conidtion.length()-1,conidtion.length());
			if(":".equals(isMao)){
				conidtion = conidtion.substring(0,conidtion.length()-1)+"\\:";
			}
			params.set("q", conidtion);
			params.setStart(offset);
			params.setRows(maxsize);
			if(sort.length()>1){
				params.setSort(sort,ORDER.desc);//设置排序
			}
			QueryResponse query = solrServer.query(params);
			SolrDocumentList results = query.getResults();
			SolrUtil.setTotal(results.getNumFound());
			for(SolrDocument solrDocument : results){
				Collection<String> fieldNames = solrDocument.getFieldNames();
				Map<String,Object> r = new HashMap<String, Object>();
				for(String field : fieldNames){  
					if(timeStringList != null){
						for(int i =0;i<timeStringList.size();i++){
							if(field.equals(timeStringList.get(i))){
								String dtime = SolrUtil.getDate(solrDocument.get(field)+"");
								r.put(field, dtime);
							}else{
								r.put(field, solrDocument.get(field));
							}
						}
					}else{
						System.out.println("为什么不进来");
						r.put(field, solrDocument.get(field));
					}
				}
				ret.add(r);
			}
			return ret;
		} catch (SolrServerException e) {
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 单个ccore并加条件
	 * @param coreName
	 * @param key
	 * @return
	 */
	public static Map<String,Object> coreQuery(String coreName,String key){
		Map<String,Object> ret  = new HashMap<String, Object>();
		try {
			String baseURL = SolrUtil.getUrl()+coreName;
			HttpSolrServer solrServer = new HttpSolrServer(baseURL);
			SolrQuery params = new SolrQuery();
			String isMao = key.substring(key.length()-1,key.length());
			if(":".equals(isMao)){
				key = key.substring(0,key.length()-1)+"\\:";
			}
			params.set("q", key);
			QueryResponse query = solrServer.query(params);
			SolrDocumentList results = query.getResults();
			for(SolrDocument solrDocument : results){
				Collection<String> fieldNames = solrDocument.getFieldNames();
				for(String field : fieldNames){  
					ret.put(field, solrDocument.get(field));
				}
			}
		} catch (SolrServerException e) {
			e.printStackTrace();
		}
		
		return ret;
	}
	/**
	 * 判断是否存在
	 * @param coreName
	 * @param key
	 * @return
	 */
	public static boolean isAs(String coreName,String key){
		long total = 0;
		try {
			String baseURL = SolrUtil.getUrl()+coreName;
			HttpSolrServer solrServer = new HttpSolrServer(baseURL);
			SolrQuery params = new SolrQuery();
			String isMao = key.substring(key.length()-1,key.length());
			if(":".equals(isMao)){
				key = key.substring(0,key.length()-1)+"\\:";
			}
			params.set("q", key);
			QueryResponse query = solrServer.query(params);
			SolrDocumentList results = query.getResults();
			total = results.getNumFound();
			
		} catch (SolrServerException e) {
			e.printStackTrace();
		}
		if(total > 0){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 删除索引数据
	 * @param coreName core名
	 * @param key 主键值
	 */
	public static void deleteFiled(String coreName,String key) {
		String baseURL = SolrUtil.getUrl()+coreName;
		HttpSolrServer solrServer = new HttpSolrServer(baseURL);
		try {
			String isMao = key.substring(key.length()-1,key.length());
			if(":".equals(isMao)){
				key = key.substring(0,key.length()-1)+"\\:";
			}
			solrServer.deleteByQuery(key);
			solrServer.commit();
		} catch (Exception e) {
			System.out.println("报错了");
		}
	}
	/**
	 * 添加索引数据
	 * @param coreName core名
	 * @param filedMap 数据集合
	 * @param strDateList 是否有时间字段
	 */
	public static void addFiled(String coreName,Map<String,Object> filedMap,List<String> strDateList){
		String baseURL = SolrUtil.getUrl()+coreName;
		HttpSolrServer solrServer = new HttpSolrServer(baseURL);
		SolrInputDocument doc = new SolrInputDocument();
		if(filedMap == null){
			return;
		}
		if(strDateList ==null){
			for(String filed : filedMap.keySet()){
				doc.setField(filed,filedMap.get(filed));
			}
		}else{
			for(String filed : filedMap.keySet()){
				boolean isHave = false;
				for(String strDate : strDateList){
					if(filed.equals(strDate)){
						doc.setField(filed,SolrUtil.getStringDate(filedMap.get(filed)+""));
						isHave = true;
					}
				}
				if(isHave){
					continue;
				}
				doc.setField(filed,filedMap.get(filed));
			}
		}
		try {
			solrServer.add(doc);
			solrServer.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 日期字符串转为date
	 * @param strDate 要转换的字符串
	 * @return
	 */
	public static Date getStringDate(String strDate){
		Date dj_time = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			dj_time  = sdf.parse(strDate);
		} catch (Exception e) {
		}
		return dj_time;
	}
	/**
	 * 获取solr的路径
	 * @return
	 */
	public static String getUrl() {
		String url = SolrUtil.getAppPath() + "/WEB-INF/classes/solr.properties";
		url = url.substring(1);
		InputStream in;
		String revs = null;
		try {
			in = new BufferedInputStream(new FileInputStream(url));
			Properties p = new Properties();  
			p.load(in);
			revs = (String) p.get("solrUrl");
		} catch (Exception e1) {
			e1.printStackTrace();
		}   
		return revs;
	}
	/**
	 * 默认时间格式转字符串
	 * @param timeString 需要转换的时间
	 * @return
	 */
	public static String getDate(String timeString){
		SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM dd HH:mm:ss z yyyy", java.util.Locale.US);
		String sDate = "";
		try{
		    Date date = sdf.parse(timeString);
		    SimpleDateFormat sdf1 =new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			sDate=sdf1.format(date);
		}catch(Exception e){
		     
		}
		return sDate;
	}
	
}
