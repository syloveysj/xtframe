package org.xtframe.service.web.impl.custom;

import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.solr.SolrLoad;
import org.solr.SolrUtil;
import org.xtframe.service.AbstractBasicExecute;
import org.xtframe.service.ajax.IAjaxDataHandler;

/**
 * @ClassName: ReceiptDataHandler 
 * @Description: 确定收货处理
 * @author wen.xu
 * @date 2015-11-06
 */
public class SolrRefreshDataHandler extends AbstractBasicExecute implements IAjaxDataHandler{
	private final Log logger = LogFactory.getLog(getClass());
	
	public Map<String, Object> execute(String strData) {
		try {
			SolrLoad.sendPost(SolrUtil.getUrl()+"dataimport", "command=full-import" );
			SolrLoad.sendPost(SolrUtil.getUrl()+"core0/dataimport", "command=full-import" );
			SolrLoad.sendPost(SolrUtil.getUrl()+"core1/dataimport", "command=full-import" );
		} catch (Exception e) {
			logger.error(e.toString());
		}
		return null;
	}
	
    
}
