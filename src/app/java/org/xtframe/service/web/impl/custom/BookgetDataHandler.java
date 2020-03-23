package org.xtframe.service.web.impl.custom;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.solr.SolrUtil;
import org.xtframe.entity.WebPageDefined;
import org.xtframe.service.AbstractBasicExecute;
import org.xtframe.service.web.IWebDataHandler;

/**
 * @ClassName: BookgetDataHandler
 * @Description: 查询书籍
 * @author wen.xu
 * @date 2015-11-21
 */
public class BookgetDataHandler extends AbstractBasicExecute implements
IWebDataHandler {

public Object execute(Map<String, Object> parame, Map<String, Object> data,
	WebPageDefined wpd) {
		List<Map<String,Object>> rows;
		long offset = Long.parseLong(parame.get("offset").toString());
		int maxsize = Integer.parseInt(parame.get("maxsize").toString());
		String key = (String) parame.get("key");
		String coreName  = "*:*";
		if(key.trim().length() > 0){
			coreName = "bk_code:"+key;
		}
		List<String> timeStringList = new ArrayList<String>();
		timeStringList.add("dj_time");
		rows = SolrUtil.solrQuery((int) offset, maxsize,"collection1", coreName, "dj_time",timeStringList);
		if(SolrUtil.getTotal() == 0){
			coreName = "bk_name:"+"\"*"+key+"*\"";
			rows = SolrUtil.solrQuery((int) offset, maxsize,"collection1", coreName, "dj_time",timeStringList);
		}
		List<Map<String,Object>> ret = new ArrayList<Map<String,Object>>();
		for(Map<String,Object> row : rows){
			Map<String,Object> rowmap = new HashMap<String, Object>();
			rowmap.put("goods_name",row.get("bk_name"));
			rowmap.put("goods_id", row.get("bk_code"));
			rowmap.put("goods_author",row.get("zz"));
			rowmap.put("goods_factory",row.get("cbs"));
			rowmap.put("small_relative_path",row.get("img_path"));
			ret.add(rowmap); 
		}
		data.put("total", SolrUtil.getTotal());
		return ret;
	}
}
