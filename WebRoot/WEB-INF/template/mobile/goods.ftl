<#if model.goods?exists && model.goods?has_content && (model.goods?size>0) >
<!DOCTYPE html>
<html>
	<head>
		<title>${model.goods.get(0).goods_name} - 希可尔图书</title>
		<#include "controls/header.ftl">
		<script type="text/javascript">
			var basePath = "${model._contextPath}";
		</script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/goods.js"></script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
		<style>
		.ctrlcart{ display:inline-block; width:30%; float:left; line-height:40px;text-align:center;  color:#fff; border-radius:5px; overflow:hidden; position:relative; right:0; margin-top:5px}
		
		
		</style>

		
	</head>
	<body id="totop">
		<!--头部--> 
		<div class="header">
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">图书详情</a>
		    <a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe61c;" title="收藏" style="right:160px; color:#fff" id="myfavour"></a>
			<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:120px;" id="mySwitch"></a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:80px;"></a>
			<a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:40px; font-size:0.85em"></a>
			<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div>
		<!--头部 end-->    
		
		<#include "controls/header_search.ftl">
	
		<div class=" mycontainer" style="margin-bottom:50px">
			<div class="ctbg">
		         <img src="${model._contextPath}${model.goods.get(0).small_relative_path?default('')}">
		         <div class="txt" style="position:relative">
		               <h3 style="height:auto">${model.goods.get(0).goods_name}</h3>
		               <p><#if model.goods.get(0).goods_author?has_content>${model.goods.get(0).goods_author} 著</#if></p>
		               <p><#if model.goods.get(0).goods_factory?has_content> ${model.goods.get(0).goods_factory} 出版.</#if></p>
		               <div class="huis">
		               <i data-icon="&#xe601;" ></i>
		               <i data-icon="&#xe601;" ></i>
		               <i data-icon="&#xe601;" ></i>
		               <i data-icon="&#xe601;" ></i>
		               <i data-icon="&#xe601;"></i><span style="font-size:16px;color:#F08515">&nbsp;&nbsp;${model.comment_2.get(0).hpd?default('0')}分</span>
		               </div>
		               <div class="huis" id="wjx" style="width:63px;overflow:hidden;white-space:nowrap;position:absolute;top:108px">
		               <i data-icon="&#xe601;" class="isok"></i>
		               <i data-icon="&#xe601;" class="isok"></i>
		               <i data-icon="&#xe601;" class="isok"></i>
		               <i data-icon="&#xe601;" class="isok"></i>
		               <i data-icon="&#xe601;" class="isok"></i>
		               </div>
		          </div>
		     </div>
		                 
		     <div class="ctbg" style="margin-top:1px">
		     		<h4><span class="red">￥${model.goods.get(0).goods_price?default('0')}</span>
		            &nbsp;<span class="huis">￥${model.goods.get(0).goods_old_price?default('0')}</span>
		            <a href="${model._contextPath}/p100052.html?id=${model._param.id}">查看目录&nbsp;&gt;</a>
		            </h4>
		     </div>
		     
		     
		          
		     <div class="sex_mng"><h4>简介</h4>
		     	<p><#if model.goods.get(0).goods_detail?has_content> ${model.goods.get(0).goods_detail}<#else>暂未介绍</#if>
		        </p>
		     </div>     
		                  
		     <div class="sex_mng" ><h4>用户评论</h4></div>
		     	  <input type="hidden" id="goods_id" value="<#if model.comment_2?exists&&model.comment_2?has_content && (model.comment_2?size>0)>${model.comment_2.get(0).goods_id.toString()}</#if>"/>
		     	  <input type="hidden" id="totalcount" value="${model.comment_2.get(0).totalcount}"/>
		     	  <input type="hidden" id="start" value="${model.comment_2.get(0).start}"/>
		     	  <input type="hidden" id="pageSize" value="3"/>
		     	  <input type="hidden" id="contextPath" value="${model._contextPath}"/>
		     	  <input type="hidden" id="hpd" value="${model.comment_2.get(0).hpd?default('0')}"/>
				<div id="plDiv">
		     	  <#if model.comment_1?exists && model.comment_1?has_content && (model.comment_1?size>0) >
		   	   		<#list model.comment_1 as ls>
		   	   		
			          <div class="sex_div"><!--一个评论-->
			               <div class="sex_tx dcsarea">
			                    <img class="fl" src="${model._contextPath}${(ls.small_relative_path)?default('')}" style="margin-right:10px">	
			                    <h4>${ls.nickname}</h4>
			                    <p style="color:#888" class="huis thedate">${ls.comment_date}
								<i data-icon="&#xe601;" <#if ls.comment_hpd?exists><#if ((ls.comment_hpd)?eval)?int gte  1>class="isok"</#if></#if>></i>
			                    <i data-icon="&#xe601;" <#if ls.comment_hpd?exists><#if ((ls.comment_hpd)?eval)?int gte  2>class="isok"</#if></#if>></i>
			                    <i data-icon="&#xe601;" <#if ls.comment_hpd?exists><#if ((ls.comment_hpd)?eval)?int gte  3>class="isok"</#if></#if>></i>
			                    <i data-icon="&#xe601;" <#if ls.comment_hpd?exists><#if ((ls.comment_hpd)?eval)?int gte  4>class="isok"</#if></#if>></i>
			                    <i data-icon="&#xe601;" <#if ls.comment_hpd?exists><#if ((ls.comment_hpd)?eval)?int gte  5>class="isok"</#if></#if>></i>
			                    </p>
								<div class="dcstxt">
			                    	 <p>${ls.comment_contant?default('')}</p>
			                    </div>
			               </div>
			          </div><!--一个评论end-->
		         
		          </#list>
		       </#if>
		        </div>
			   <div class="sex_div" id="cxpl"></div>    
		      
			   <div class="sex_mng"><h4>为您推荐</h4></div>
		   	   <div class="sex_div recomd">
		   	   <#if model.tjgoods?exists && model.tjgoods?has_content && (model.tjgoods?size>0) >
		   	   		<#list model.tjgoods as ls>
		       			<a href="${model._contextPath}/p100050.html?id=${ls.goods_id}"><img src="${model._contextPath}${ls.small_relative_path?default('')}"><p>￥${ls.goods_price?default('0')}</p></a>
		       		</#list>
		       </#if>
		       </div>
		</div>
	
		
		<form id="js-payfor-form" method="post" action="${model._contextPath}/p100065.html">
			<input type="hidden" name="id" id="id" value="${model._param.id}">
			<input type="hidden" name="bk_num" id="bk_num" value="${model._param.id}">
		</form>
	
		<div class="toolbar ct_btns">
			<!--<a href="#" data-icon="&#xe61c;" class="favor">收藏</a>
		已收藏时：
			<a href="#" data-icon="&#xe603;" class="favor">取消收藏</a>
		-->
			<div class="ctrlcart">
		          				<a id="lessNum" href="javascript:void(0)" data-icon="&#xe636;" class="a_ctrlnum" style="width:26%"></a>
		                		<input id="num" name="num" type="number" min="1" max="99" value="1" readonly="readonly">
		                		<a id="addNum" href="javascript:void(0)" data-icon="&#xe637;" class="a_ctrlnum" style="width:26%"></a>
		             		</div> 
			<a id="rigtOrder" href="javascript:void(0);" class="midone">立即购买</a>
			<a href="javascript:addCart3();" class="buyit">加入购物车</a>
		</div>
		
		<div class="editfor">
			<p id="back-to-top"><a href="#totop"><i data-icon="&#xe629;"></i>顶部</a></p>
		</div>
	</body>
</html>
</#if>