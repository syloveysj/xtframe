package org.xtframe.drools.business;

import org.drools.runtime.StatefulKnowledgeSession;
import org.xtframe.drools.entity.BusinessResult;
import org.xtframe.drools.entity.SqlInfo;
import org.xtframe.util.ContextUtil;
import org.xtframe.util.SpringUtil;

/**
 * @ClassName: BusinessExecutor
 * @Description: 执行业务规则
 * @author yong.sun
 * @date 2013-9-15
 */
public class BusinessExecutor {
	/**
	 * 判定SQL执行权限
	 * 
	 * @param sqlID
	 * @return
	 */
	public static BusinessResult verifySQLExecutivePower(String sqlID) {
		BusinessResult result = new BusinessResult();

		SqlInfo sqlInfo = new SqlInfo();
		sqlInfo.setSqlID(sqlID);
		sqlInfo.setUser(ContextUtil.getCurrentUser());
		sqlInfo.setApplication(ContextUtil.getApplication());

		StatefulKnowledgeSession kstateless = (StatefulKnowledgeSession) SpringUtil.getBean("sqlKsession");
		kstateless.insert(sqlInfo);
		kstateless.fireAllRules();
		kstateless.dispose();

		if (sqlInfo.getStatus() == SqlInfo.SUCCESS)
			result.setResult(BusinessResult.SUCCESS);
		else if (sqlInfo.getStatus() == SqlInfo.LOGIN_AGAIN)
			result.setResult(BusinessResult.LOGIN_AGAIN);
		else
			result.setResult(BusinessResult.FAILURE);
		result.setMessage(sqlInfo.getMessage());

		return result;
	}
}
