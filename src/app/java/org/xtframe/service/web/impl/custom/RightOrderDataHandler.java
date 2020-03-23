package org.xtframe.service.web.impl.custom;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xtframe.dao.DataBaseFactory;
import org.xtframe.dao.IDataBase;
import org.xtframe.entity.Application;
import org.xtframe.entity.User;
import org.xtframe.entity.WebPageDefined;
import org.xtframe.service.AbstractBasicExecute;
import org.xtframe.service.SqlCheck;
import org.xtframe.service.web.IWebDataHandler;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.ContextUtil;

/**
 * @ClassName: RightOrderDataHandler 
 * @Description: 立即购买订单处理
 * @author yong.sun
 * @date 2013-11-1
 */
public class RightOrderDataHandler extends AbstractBasicExecute implements IWebDataHandler {
	private final Log logger = LogFactory.getLog(getClass());
	
	public Object execute(Map<String, Object> parame, Map<String, Object> data, WebPageDefined wpd) {
		Map<String,Object> result = new HashMap<String,Object>();
		try {
			User user = ContextUtil.getCurrentUser();
			Application application = ContextUtil.getApplication();
			String type=parame.get("type").toString();
			String goods=parame.get("goods").toString();
			String addr_id=parame.get("addr_id").toString();
			
			Map<String,Object> pm = new HashMap<String,Object>();
			String sqlID = "wx_right_pay_5";
			pm.put("addr_id", addr_id);
			IDataBase dataBase = DataBaseFactory.getDataBaseForSqlId(sqlID);
			SqlCheck sqlCheck = check(sqlID,pm,user,application);
			List<Map<String, Object>> ret = dataBase.executeQuery(sqlCheck.getSqlData().getSql(), sqlCheck.getSqlData().getPreparedParameters());
			Map<String, Object> addrMap=ret.get(0);
			String goods_arr []=goods.split(",");
			
			double total_price = 0;
			String orders_id = CommonUtil.getCurrentTime("yyyyMMdd") + CommonUtil.getRegID("seq_order");
			for(int i=0;i<goods_arr.length;i++){
				String goodArr[]=goods_arr[i].split("\\|\\|");
				String good_id=goodArr[0];
				String good_num=goodArr[1];
				
				Map<String,Object> goodpm = new HashMap<String,Object>();
				goodpm.put("id", good_id);
				sqlID = "wx_right_pay_3";
				sqlCheck = check(sqlID,goodpm,user,application);
				List<Map<String, Object>> goodsList = dataBase.executeQuery(sqlCheck.getSqlData().getSql(), sqlCheck.getSqlData().getPreparedParameters());
				Map<String, Object> goodMap=goodsList.get(0);
				
				double detailstotal_price=0;
				Map<String,Object> detailsData = new HashMap<String,Object>();
				String goodsMap_goods_price = "";
				if(goodMap.get("goods_price") == null ){
					goodsMap_goods_price = "0";
				}else{
					goodsMap_goods_price = goodMap.get("goods_price").toString();
				}
				detailstotal_price = Integer.parseInt(good_num) * Float.parseFloat(goodsMap_goods_price);
				detailsData.put("orders_id", orders_id);
				detailsData.put("goods_id", goodMap.get("goods_id"));
				detailsData.put("goods_name", goodMap.get("goods_name"));
				detailsData.put("goods_price", goodsMap_goods_price);
				detailsData.put("num", good_num);
				detailsData.put("total_price", detailstotal_price);
				detailsData.put("remark", "");
				total_price +=detailstotal_price;
				String detailsSql="wx_right_pay_2";
				SqlCheck detailsCheck = check(detailsSql, detailsData, user, application);
				dataBase.executeUpdate(detailsCheck.getSqlData().getSql(), detailsCheck.getSqlData().getPreparedParameters());
				
				
				if("gwc".equals(type)){
					Map<String,Object> cartData = new HashMap<String,Object>();
					cartData.put("state", "2");
					cartData.put("goods_id", good_id);
					String cartSql="wx_right_pay_6";
					SqlCheck cartCheck = check(cartSql, cartData, user, application);
					dataBase.executeUpdate(cartCheck.getSqlData().getSql(), cartCheck.getSqlData().getPreparedParameters());
				}
			}
			Map<String,Object> orderData = new HashMap<String,Object>();
			orderData.put("orders_id", orders_id);
			orderData.put("address", addrMap.get("address"));
			orderData.put("consignee", addrMap.get("consignee"));
			orderData.put("tel", addrMap.get("tel"));
			orderData.put("postalcode", addrMap.get("postalcode"));
			orderData.put("total_price", total_price);
			String ordersSql="wx_right_pay_1";
			SqlCheck orderCheck = check(ordersSql, orderData, user, application);
			dataBase.executeUpdate(orderCheck.getSqlData().getSql(), orderCheck.getSqlData().getPreparedParameters());
			result.put("order", orderData);
			result.put("addr", addrMap);
			return result;
			
			
			
			
			/*String orders_id = CommonUtil.getCurrentTime("yyyyMMdd") + CommonUtil.getRegID("seq_order");
			orderData.put("orders_id", orders_id);
			orderData.put("address", "");
			orderData.put("consignee", "");
			orderData.put("tel", "");
			orderData.put("postalcode", "");
			orderData.put("total_price", Integer.parseInt(parame.get("bk_num").toString()) * Float.parseFloat(goods.get("goods_price").toString()));
			
			detailsData.put("orders_id", orders_id);
			detailsData.put("goods_id", goods.get("goods_id"));
			detailsData.put("goods_name", goods.get("goods_name"));
			detailsData.put("goods_price", goods.get("goods_price"));
			detailsData.put("num", parame.get("bk_num"));
			detailsData.put("total_price", Integer.parseInt(parame.get("bk_num").toString()) * Float.parseFloat(goods.get("goods_price").toString()));
			detailsData.put("remark", "");
			
			queryData.put("orders_id", orders_id);
			
			String add_order = data.get("add_order").toString();
			String add_details = data.get("add_details").toString();
			SqlCheck orderCheck = check(add_order, orderData, user, application);
			switch(orderCheck.getResult()){
				case SqlCheck.SQLID_NULL:
					throw new AjaxDataHandlerException("sqlID为空");
				case SqlCheck.SQLID_NO_RIGHT:
					throw new AjaxDataHandlerException("不具有该sql("+add_order+")的执行权限", AjaxExceptionType.login_again);
				case SqlCheck.SQLID_INEXISTENCE:
					throw new AjaxDataHandlerException("该sql("+add_order+")不存在");
				case SqlCheck.CHECK_FAILED:
					throw new AjaxDataHandlerException("sql("+add_order+")数据格式校验失败");
				case SqlCheck.LOGIN_AGAIN:
					throw new AjaxDataHandlerException("需要进行登录", AjaxExceptionType.login_again);
			}
			
			SqlCheck detailsCheck = check(add_details, detailsData, user, application);
			switch(detailsCheck.getResult()){
				case SqlCheck.SQLID_NULL:
					throw new AjaxDataHandlerException("sqlID为空");
				case SqlCheck.SQLID_NO_RIGHT:
					throw new AjaxDataHandlerException("不具有该sql("+add_details+")的执行权限", AjaxExceptionType.login_again);
				case SqlCheck.SQLID_INEXISTENCE:
					throw new AjaxDataHandlerException("该sql("+add_details+")不存在");
				case SqlCheck.CHECK_FAILED:
					throw new AjaxDataHandlerException("sql("+add_details+")数据格式校验失败");
				case SqlCheck.LOGIN_AGAIN:
					throw new AjaxDataHandlerException("需要进行登录", AjaxExceptionType.login_again);
			}
			
			IDataBase dataBase = DataBaseFactory.getDataBaseForSqlId(add_order);
			dataBase.executeUpdate(orderCheck.getSqlData().getSql(), orderCheck.getSqlData().getPreparedParameters());
			dataBase.executeUpdate(detailsCheck.getSqlData().getSql(), detailsCheck.getSqlData().getPreparedParameters());
			
			String sqlID = data.get("query_order").toString();
			SqlCheck sqlCheck = check(sqlID, queryData, user, application);
			switch(sqlCheck.getResult()){
				case SqlCheck.SQLID_NULL:
					throw new AjaxDataHandlerException("sqlID为空");
				case SqlCheck.SQLID_NO_RIGHT:
					throw new AjaxDataHandlerException("不具有该sql("+sqlID+")的执行权限", AjaxExceptionType.login_again);
				case SqlCheck.SQLID_INEXISTENCE:
					throw new AjaxDataHandlerException("该sql("+sqlID+")不存在");
				case SqlCheck.CHECK_FAILED:
					throw new AjaxDataHandlerException("sql("+sqlID+")数据格式校验失败");
				case SqlCheck.LOGIN_AGAIN:
					throw new AjaxDataHandlerException("需要进行登录", AjaxExceptionType.login_again);
			}
			
			List<Map<String, Object>> result = dataBase.executeQuery(sqlCheck.getSqlData().getSql(), sqlCheck.getSqlData().getPreparedParameters());
			if(result.size() > 0) {
				return result.get(0);
			}*/
			
			
			
			
			
		} catch (Exception e) {
			logger.error(e.toString());
		}
		
		return result;
	}
}
