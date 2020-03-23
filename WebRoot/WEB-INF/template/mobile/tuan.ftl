<!DOCTYPE html>
<html>
	<head>
		<title>特卖 - 希可尔图书</title>
		<#include "controls/header.ftl">
		
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/lib/utils/ajaxutil.js"></script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/goods_list.js"></script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
	</head>
	<body id="totop">
		<!--头部--> 
		<div class="header">
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">图书列表</a>
			<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:120px;" id="mySwitch"></a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:80px;"></a>
			<a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:40px; font-size:0.85em"></a>
			<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div><!--头部 end-->
		
		<#include "controls/header_search.ftl">
		
		<#if model._param.sortname?exists && model._param.sortname?has_content>
	<#assign sortname=model._param.sortname>
<#else>
	<#assign sortname="recommend">
</#if>
<#if model._param.sortorder?exists && model._param.sortorder?has_content>
	<#assign sortorder=model._param.sortorder>
<#else>
	<#assign sortorder="desc">
</#if>
<#if model._param.cls?exists && model._param.cls?has_content>
	<#assign cls="&cls="+model._param.cls>
<#else>
	<#assign cls="">
</#if>
		<div class="toolbar bgrt" style="margin:45px 0 0;">
		      <ul>
		        <li><a href="${model._contextPath}/p100048.html?sortname=recommend&sortorder=<#if sortname=="recommend" && sortorder=="desc">asc<#else>desc</#if>${cls}"
		        <#if sortname=="recommend"> class="now" </#if>>
		        <p data-icon="&#xe625;">推荐</p>
		        </a>
		        </li>
		        
		         <li><a href="${model._contextPath}/p100048.html?sortname=goods_price&sortorder=<#if sortname=="goods_price" && sortorder=="desc">asc<#else>desc</#if>${cls}"
		         <#if sortname=="goods_price"> class="now" </#if>>
		        <p data-icon="&#xe622;">价格</p>
		        </a>
		        </li>
		        
		          <li><a href="${model._contextPath}/p100048.html?sortname=sales&sortorder=<#if sortname=="sales" && sortorder=="desc">asc<#else>desc</#if>${cls}"
		         <#if sortname=="sales"> class="now" </#if>>
		        <p data-icon="&#xe607;">销量</p>
		        </a>
		        </li>
		        
		         <li><a href="${model._contextPath}/p100048.html?sortname=add_time&sortorder=<#if sortname=="add_time" && sortorder=="desc">asc<#else>desc</#if>${cls}"
		         <#if sortname=="add_time"> class="now" </#if>>
		        <p data-icon="&#xe630;">最新</p>
		        </a>
		        </li>
		    </ul>
		    
		    
		    
		</div>
		<!--内容-->
		<div class="page_list" >
			<div class="list" id= "ndiv">
				<ul>
				
				<li>
		        	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk1.jpg" width="80"></div>
		            <div class="text_wrap"> 
		            	<p class="name">小学生必背常用成语(彩绘注音版)</p>
		                <p class="promo">小学生背诵常用成语，正确理解成语的含义，熟悉成语的用法，有助于丰富和积累语言素材。</p>
		        	    <p class="price"><span class="feed">田冰冰 著</span><span class="y_pf">¥ 9.90 </span></p> 
		            </div>
		            </a>
		          </li>
		             
				  <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk2.jpg" width="80"></div>
		            <div class="text_wrap"> 
		            	<p class="name">徽之味/徽州梦系列</p>
		                <p class="promo">徽州从未消逝，它只是和流逝的时光在一起。</p>
		             	<p class="price"><span class="feed">赵焰 著</span><span class="y_pf">¥ 22.30 </span></p> 
		            </div>
		            </a>
		          </li>
		         
		             
		         <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk3.jpg" width="80"></div>  
		           	<div class="text_wrap"> 
		            	<p class="name">陶行知名篇精选(教师版)</p>
		                <p class="promo">《陶行知名篇精选》(教师版)是为了提供一个陶行知著作的普及性读本，从而让陶行知的学说广为人知，深入人心；为了把陶行知所做的探索在全国更深入下去，推广开来，让他的理论和经验为现在的教育改革服务。</p>
		             	<p class="price"><span class="feed">张圣华，方明 著</span><span class="y_pf">¥ 12.60 </span></p> 
		            </div>
		           </a>
		         </li>
		             
		        <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk4.jpg" width="80"></div>  
		            <div class="text_wrap"> 
		            	<p class="name">小学生必背常用成语(彩绘注音版)</p>
		                <p class="promo">小学生背诵常用成语，正确理解成语的含义，熟悉成语的用法，有助于丰富和积累语言素材。</p>
		             	<p class="price"><span class="feed">田冰冰 著</span><span class="y_pf">¥ 9.90 </span></p> 
		            </div>
		            </a>
		        </li>
		             
		        <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk5.jpg" width="80"></div>  
		            <div class="text_wrap"> 
		            	<p class="name">徽之味/徽州梦系列</p>
		                <p class="promo">徽州从未消逝，它只是和流逝的时光在一起。</p>
		             	<p class="price"><span class="feed">赵焰 著</span><span class="y_pf">¥ 22.30 </span></p> 
		            </div>
		            </a>
		       </li>
		             
		        <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk3.jpg" width="80"></div>  
		            <div class="text_wrap"> 
		            	<p class="name">陶行知名篇精选(教师版)</p>
		                <p class="promo">《陶行知名篇精选》(教师版)是为了提供一个陶行知著作的普及性读本，从而让陶行知的学说广为人知，深入人心；为了把陶行知所做的探索在全国更深入下去，推广开来，让他的理论和经验为现在的教育改革服务。</p>
		             	<p class="price"><span class="feed">张圣华，方明 著</span><span class="y_pf">¥ 12.60 </span></p> 
		            </div>
		            </a>
		       </li>
		             
		             
		       <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk1.jpg" width="80"></div>  
		            <div class="text_wrap"> 
		            	<p class="name">小学生必背常用成语(彩绘注音版)</p>
		                <p class="promo">小学生背诵常用成语，正确理解成语的含义，熟悉成语的用法，有助于丰富和积累语言素材。</p>
		             	<p class="price"><span class="feed">田冰冰 著</span><span class="y_pf">¥ 9.90 </span></p> 
		            </div>
		            </a>
		       </li>
		             
		             
		       <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk2.jpg" width="80"></div>  
		            <div class="text_wrap"> 
		            	<p class="name">徽之味/徽州梦系列</p>
		                <p class="promo">徽州从未消逝，它只是和流逝的时光在一起。</p>
		             	<p class="price"><span class="feed">赵焰 著</span><span class="y_pf">¥ 22.30 </span></p> 
		            </div>
		            </a>
		       </li>
		             
		             
		       <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk3.jpg" width="80"></div>  
		            <div class="text_wrap"> 
		            	<p class="name">陶行知名篇精选(教师版)</p>
		                <p class="promo">《陶行知名篇精选》(教师版)是为了提供一个陶行知著作的普及性读本，从而让陶行知的学说广为人知，深入人心；为了把陶行知所做的探索在全国更深入下去，推广开来，让他的理论和经验为现在的教育改革服务。</p>
		             	<p class="price"><span class="feed">张圣华，方明 著</span><span class="y_pf">¥ 12.60 </span></p> 
		            </div>
		            </a>
		       </li>
		       <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk3.jpg" width="80"></div>  
		           	<div class="text_wrap"> 
		            	<p class="name">陶行知名篇精选(教师版)</p>
		                <p class="promo">《陶行知名篇精选》(教师版)是为了提供一个陶行知著作的普及性读本，从而让陶行知的学说广为人知，深入人心；为了把陶行知所做的探索在全国更深入下去，推广开来，让他的理论和经验为现在的教育改革服务。</p>
		             	<p class="price"><span class="feed">张圣华，方明 著</span><span class="y_pf">¥ 12.60 </span></p> 
		            </div>
		           </a>
		         </li>
		         <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk3.jpg" width="80"></div>  
		           	<div class="text_wrap"> 
		            	<p class="name">陶行知名篇精选(教师版)</p>
		                <p class="promo">《陶行知名篇精选》(教师版)是为了提供一个陶行知著作的普及性读本，从而让陶行知的学说广为人知，深入人心；为了把陶行知所做的探索在全国更深入下去，推广开来，让他的理论和经验为现在的教育改革服务。</p>
		             	<p class="price"><span class="feed">张圣华，方明 著</span><span class="y_pf">¥ 12.60 </span></p> 
		            </div>
		           </a>
		         </li>
		         <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk3.jpg" width="80"></div>  
		           	<div class="text_wrap"> 
		            	<p class="name">陶行知名篇精选(教师版)</p>
		                <p class="promo">《陶行知名篇精选》(教师版)是为了提供一个陶行知著作的普及性读本，从而让陶行知的学说广为人知，深入人心；为了把陶行知所做的探索在全国更深入下去，推广开来，让他的理论和经验为现在的教育改革服务。</p>
		             	<p class="price"><span class="feed">张圣华，方明 著</span><span class="y_pf">¥ 12.60 </span></p> 
		            </div>
		           </a>
		         </li>
		         <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk3.jpg" width="80"></div>  
		           	<div class="text_wrap"> 
		            	<p class="name">陶行知名篇精选(教师版)</p>
		                <p class="promo">《陶行知名篇精选》(教师版)是为了提供一个陶行知著作的普及性读本，从而让陶行知的学说广为人知，深入人心；为了把陶行知所做的探索在全国更深入下去，推广开来，让他的理论和经验为现在的教育改革服务。</p>
		             	<p class="price"><span class="feed">张圣华，方明 著</span><span class="y_pf">¥ 12.60 </span></p> 
		            </div>
		           </a>
		         </li>
		         <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk3.jpg" width="80"></div>  
		           	<div class="text_wrap"> 
		            	<p class="name">陶行知名篇精选(教师版)</p>
		                <p class="promo">《陶行知名篇精选》(教师版)是为了提供一个陶行知著作的普及性读本，从而让陶行知的学说广为人知，深入人心；为了把陶行知所做的探索在全国更深入下去，推广开来，让他的理论和经验为现在的教育改革服务。</p>
		             	<p class="price"><span class="feed">张圣华，方明 著</span><span class="y_pf">¥ 12.60 </span></p> 
		            </div>
		           </a>
		         </li>
		         <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk3.jpg" width="80"></div>  
		           	<div class="text_wrap"> 
		            	<p class="name">陶行知名篇精选(教师版)</p>
		                <p class="promo">《陶行知名篇精选》(教师版)是为了提供一个陶行知著作的普及性读本，从而让陶行知的学说广为人知，深入人心；为了把陶行知所做的探索在全国更深入下去，推广开来，让他的理论和经验为现在的教育改革服务。</p>
		             	<p class="price"><span class="feed">张圣华，方明 著</span><span class="y_pf">¥ 12.60 </span></p> 
		            </div>
		           </a>
		         </li>
		         <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk3.jpg" width="80"></div>  
		           	<div class="text_wrap"> 
		            	<p class="name">陶行知名篇精选(教师版)</p>
		                <p class="promo">《陶行知名篇精选》(教师版)是为了提供一个陶行知著作的普及性读本，从而让陶行知的学说广为人知，深入人心；为了把陶行知所做的探索在全国更深入下去，推广开来，让他的理论和经验为现在的教育改革服务。</p>
		             	<p class="price"><span class="feed">张圣华，方明 著</span><span class="y_pf">¥ 12.60 </span></p> 
		            </div>
		           </a>
		         </li>
		         <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk3.jpg" width="80"></div>  
		           	<div class="text_wrap"> 
		            	<p class="name">陶行知名篇精选(教师版)</p>
		                <p class="promo">《陶行知名篇精选》(教师版)是为了提供一个陶行知著作的普及性读本，从而让陶行知的学说广为人知，深入人心；为了把陶行知所做的探索在全国更深入下去，推广开来，让他的理论和经验为现在的教育改革服务。</p>
		             	<p class="price"><span class="feed">张圣华，方明 著</span><span class="y_pf">¥ 12.60 </span></p> 
		            </div>
		           </a>
		         </li>
		         <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk3.jpg" width="80"></div>  
		           	<div class="text_wrap"> 
		            	<p class="name">陶行知名篇精选(教师版)</p>
		                <p class="promo">《陶行知名篇精选》(教师版)是为了提供一个陶行知著作的普及性读本，从而让陶行知的学说广为人知，深入人心；为了把陶行知所做的探索在全国更深入下去，推广开来，让他的理论和经验为现在的教育改革服务。</p>
		             	<p class="price"><span class="feed">张圣华，方明 著</span><span class="y_pf">¥ 12.60 </span></p> 
		            </div>
		           </a>
		         </li>
		         <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk3.jpg" width="80"></div>  
		           	<div class="text_wrap"> 
		            	<p class="name">陶行知名篇精选(教师版)</p>
		                <p class="promo">《陶行知名篇精选》(教师版)是为了提供一个陶行知著作的普及性读本，从而让陶行知的学说广为人知，深入人心；为了把陶行知所做的探索在全国更深入下去，推广开来，让他的理论和经验为现在的教育改革服务。</p>
		             	<p class="price"><span class="feed">张圣华，方明 著</span><span class="y_pf">¥ 12.60 </span></p> 
		            </div>
		           </a>
		         </li>
		         <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk3.jpg" width="80"></div>  
		           	<div class="text_wrap"> 
		            	<p class="name">陶行知名篇精选(教师版)</p>
		                <p class="promo">《陶行知名篇精选》(教师版)是为了提供一个陶行知著作的普及性读本，从而让陶行知的学说广为人知，深入人心；为了把陶行知所做的探索在全国更深入下去，推广开来，让他的理论和经验为现在的教育改革服务。</p>
		             	<p class="price"><span class="feed">张圣华，方明 著</span><span class="y_pf">¥ 12.60 </span></p> 
		            </div>
		           </a>
		         </li>
		         <li>
		         	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk3.jpg" width="80"></div>  
		           	<div class="text_wrap"> 
		            	<p class="name">陶行知名篇精选(教师版)</p>
		                <p class="promo">《陶行知名篇精选》(教师版)是为了提供一个陶行知著作的普及性读本，从而让陶行知的学说广为人知，深入人心；为了把陶行知所做的探索在全国更深入下去，推广开来，让他的理论和经验为现在的教育改革服务。</p>
		             	<p class="price"><span class="feed">张圣华，方明 著</span><span class="y_pf">¥ 12.60 </span></p> 
		            </div>
		           </a>
		         </li>
		         
		         
		         <li>
		        	<a href="${model._contextPath}/p100050.html">  
		          	<div class="img_wrap"><img src="${model._contextPath}/mobile/resources/img/bk1.jpg" width="80"></div>
		            <div class="text_wrap"> 
		            	<p class="name">小学生必背常用成语(彩绘注音版)</p>
		                <p class="promo">小学生背诵常用成语，正确理解成语的含义，熟悉成语的用法，有助于丰富和积累语言素材。</p>
		        	    <p class="price"><span class="feed">田冰冰 著</span><span class="y_pf">¥ 9.90 </span></p> 
		            </div>
		            </a>
		          </li>
		          

		             
				 	
		<!--内容 end-->
	
		<div class="editfor">
			<p id="back-to-top">
				<a href="#totop"><i data-icon="&#xe629;"></i>顶部</a>
			</p>
		</div>
	
	</body>   
</html>