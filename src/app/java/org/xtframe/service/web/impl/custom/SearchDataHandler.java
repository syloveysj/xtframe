package org.xtframe.service.web.impl.custom;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.solr.SolrUtil;
import org.xtframe.entity.WebPageDefined;
import org.xtframe.service.AbstractBasicExecute;
import org.xtframe.service.web.IWebDataHandler;

/**
 * @ClassName: SearchDataHandler 
 * @Description: 搜索开始处理
 * @author wen.xu
 * @date 2015-11-06
 */
public class SearchDataHandler extends AbstractBasicExecute implements IWebDataHandler {
	private final Log logger = LogFactory.getLog(getClass());
	
	public Object execute(Map<String, Object> parame, Map<String, Object> data, WebPageDefined wpd) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String key= parame.get("goods_name").toString();
			Integer start = new Integer(String.valueOf(parame.get("start")));  
			Integer size = new Integer(String.valueOf(parame.get("size")));
			List<Map<String,Object>> ret = new ArrayList<Map<String,Object>>();
			List<String> timeStringList = new ArrayList<String>();
			timeStringList.add("dj_time");
			String conidtion = "bk_code:"+key;
			ret = SolrUtil.solrQuery(start, size, "collection1", conidtion, "dj_time", timeStringList);
			long total = SolrUtil.getTotal();
			if(total<=1){
				conidtion = "bk_name:*"+key+"*";
				ret = SolrUtil.solrQuery(start,size, "collection1", conidtion, "dj_time", timeStringList);
				total = SolrUtil.getTotal();
				if(total<=1){
					conidtion = "zz:*"+key+"*";
					ret = SolrUtil.solrQuery(start,size, "collection1", conidtion, "dj_time", timeStringList);
				}
			}
			List<Map<String,Object>> rows = new ArrayList<Map<String,Object>>();
			for(Map<String,Object> row : ret){
				Map<String,Object> rowmap = new HashMap<String, Object>();
				rowmap.put("goods_name",row.get("bk_name"));
				rowmap.put("goods_id", row.get("bk_code"));
				rowmap.put("goods_author",row.get("zz"));
				rowmap.put("goods_factory",row.get("cbs"));
				rowmap.put("small_relative_path",row.get("img_path"));
				rows.add(rowmap);
			}
			map.put("rows", rows);
			map.put("total", total);
			return map;
		} catch (Exception e) {
			logger.error(e.toString());
		}
		
		return null;
	}
	
    
}
