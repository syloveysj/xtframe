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
import org.xtframe.service.ajax.AjaxDataHandlerException;
import org.xtframe.service.ajax.AjaxDataHandlerException.AjaxExceptionType;
import org.xtframe.service.web.IWebDataHandler;
import org.xtframe.util.ContextUtil;
import org.xtframe.util.StringUtil;

public class EnsureOrderFindGoodsHandler extends AbstractBasicExecute implements IWebDataHandler {
private final Log logger = LogFactory.getLog(getClass());
	
	public Object execute(Map<String, Object> parame, Map<String, Object> data, WebPageDefined wpd) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			User user = ContextUtil.getCurrentUser();
			String type=parame.get("type").toString();
			String goods_ids=parame.get("goods_ids").toString();
			String goods_ids_arr [] =goods_ids.split(",");
			String num = StringUtil.toString(parame.get("num"), "");
			Application application = ContextUtil.getApplication();
			String gs="";
			for(int i=0;i<goods_ids_arr.length;i++){
				gs+="'"+goods_ids_arr[i]+"',";
			}
			IDataBase dataBase = DataBaseFactory.getDataBaseForJndiName("dataBase");
			String sql1="";
			if("gwc".equals(type)){
				sql1 =" SELECT g.goods_id,g.goods_name,g.goods_old_price,g.goods_price,g.goods_author,g.goods_factory,i.small_relative_path,t.num,cast(t.num*g.goods_price as decimal(10,2))  totalprice "+
							" FROM bk_cart t LEFT JOIN bk_goods g on t.goods_id=g.goods_id LEFT JOIN bk_image i ON i.img_id = g.goods_img_id"+
							" WHERE t.userid='"+user.getUserInfo().getUserId()+"' and t.state=1 and t.goods_id in ("+gs.substring(0, gs.length()-1)+") "+
							" ORDER BY t.add_time DESC,g.goods_id DESC";
			}else{
				sql1 ="SELECT g.goods_id,g.goods_name,g.goods_old_price,g.goods_price,g.goods_author,g.goods_factory,i.small_relative_path,'"+num+"' num,cast("+num+"*g.goods_price as decimal(10,2)) totalprice"+
					  "	FROM bk_goods g LEFT JOIN bk_image i ON i.img_id = g.goods_img_id where g.goods_id = '"+goods_ids+"'";
			}
			List<Map<String, Object>> ret = dataBase.executeQuery(sql1, null);
			map.put("rows", ret);
			map.put("type", type);
			//运费处理
			String sqlID = "wx_mksorder_4";
			SqlCheck sqlCheck = check(sqlID, parame, user, application);
			IDataBase dataBase1 = DataBaseFactory.getDataBaseForSqlId(sqlID);
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
			double yf = 0;
			List<Map<String, Object>> result = dataBase1.executeQuery(sqlCheck.getSqlData().getSql(),sqlCheck.getSqlData().getPreparedParameters());
			if(result != null && result.size() > 0){
				if(result.get(0).size()>0){
					Map<String,Object> row = result.get(0);
					String lx = row.get("lx")+"";
					double zj = 0;
					for(Map<String,Object> r : ret){
						if(r.get("totalprice") != null){
							
							zj = zj + Double.parseDouble(r.get("totalprice")+"");
						}
					}
					if(lx.equals("1")){
						double meby = (Double) row.get("max_money");
						if(zj<meby){
							yf = 10;
						}
					}else if(lx.equals("2")){
						double min_money = Double.parseDouble(row.get("min_money")+"");
						double max_money = Double.parseDouble(row.get("max_money")+"");
						if(min_money<= zj && zj<=max_money){
							yf = 10;
						}
					}else if(lx.equals("3")){
						
					}else if(lx.equals("4")){
						yf = Double.parseDouble(row.get("max_money")+"");
					}
				}
			}
			map.put("yf",yf);
		} catch (Exception e) {
			logger.error(e.toString());
		}
		return map;
	}
	
}
