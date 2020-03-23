package org.xtframe.service.ajax;

import org.xtframe.entity.ApplicationConfig;
import org.xtframe.util.SpringUtil;

/**
 * @ClassName: AjaxDataFactory 
 * @Description: ajax数据处理工厂类
 * @author yong.sun
 * @date 2013-9-15
 */
public class AjaxDataFactory {
	/**
	 * 创建ajax处理类
	 * @param iFunc
	 * @return
	 */
	public static IAjaxDataHandler createAjaxDataHandler(int iFunc) {
		IAjaxDataHandler ajaxDataHandler = null;
		switch (iFunc) {
			// 注册
			case ApplicationConfig.FUNC_REGISTER:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("registerDataHandler");
				break;
			// 用户登录
			case ApplicationConfig.FUNC_LOGIN:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("loginDataHandler");
				break;
			// 退出登录
			case ApplicationConfig.FUNC_LOGOUT:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("logoutDataHandler");
				break;
			// 执行sql查询方法
			case ApplicationConfig.FUNC_EXECUTEQUERY:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("executeQueryDataHandler");
				break;
			// 执行sql更新方法
			case ApplicationConfig.FUNC_EXECUTEUPDATE:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("executeUpdateDataHandler");
				break;
			// 执行sql自增主键的插入方法
			case ApplicationConfig.FUNC_INSERT:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("insertDataHandler");
				break;
			// 执行sql事务提交
			case ApplicationConfig.FUNC_EXECUTETRANSACTION:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("executeTransactionDataHandler");
				break;
			// 执行存储过程
			case ApplicationConfig.FUNC_PREPARECALL:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("prepareCallDataHandler");
				break;
			// 执行批量查询
			case ApplicationConfig.FUNC_EXECUTEQUERYTRANSACTION:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("executeQueryTransactionDataHandler");
				break;
			// 获取菜单
			case ApplicationConfig.FUNC_MENU:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("menuDataHandler");
				break;
			// 刷新服务器加载数据
			case ApplicationConfig.FUNC_SERVER_BREAK:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("serverBreakDataHandler");
				break;
			// 获取当前用户信息
			case ApplicationConfig.FUNC_USERINFO:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("userInfoDataHandler");
				break;
			// 获取服务器数据
			case ApplicationConfig.FUNC_SERVER_DATA:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("serverDataDataHandler");
				break;
			// 批量获取服务器数据
			case ApplicationConfig.FUNC_SERVER_DATA_LIST:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("serverDataListDataHandler");
				break;
			// 分页查询数据
			case ApplicationConfig.FUNC_PAGING:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("pagingDataHandler");
				break;
	
			// 获取流程定义列表
			case ApplicationConfig.FUNC_PROCESSDEFINITION_LIST:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("processDefinitionListDataHandler");
				break;
			// 获取流程实例列表
			case ApplicationConfig.FUNC_PROCESSINSTANCE_LIST:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("processInstanceListDataHandler");
				break;
			// 获取任务列表
			case ApplicationConfig.FUNC_TASK_LIST:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("taskListDataHandler");
				break;
			// 开启流程
			case ApplicationConfig.FUNC_STARTPROCESS:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("startProcessDataHandler");
				break;
			// 流程图信息
			case ApplicationConfig.FUNC_PROCESSVIEW:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("processViewDataHandler");
				break;
			// 完成任务
			case ApplicationConfig.FUNC_COMPLETETASK:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("completeTaskDataHandler");
				break;
			// 任务页面
			case ApplicationConfig.FUNC_TASKPAGE:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("taskPageDataHandler");
				break;
			// 删除部署
			case ApplicationConfig.FUNC_DELETEDEPLOYMENT:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("deleteDeploymentDataHandler");
				break;
				
			// 执行自定义处理
			case ApplicationConfig.FUNC_CUSTOM:
				ajaxDataHandler = (IAjaxDataHandler) SpringUtil.getBean("customDataHandler");
				break;
		}
		return ajaxDataHandler;
	}
}
