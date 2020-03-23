<!DOCTYPE html>
<html>
	<head>
		<title>首页 - 希可尔图书</title>
		<#include "controls/header.ftl">
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
	</head>
<body id="totop">
	<!--头部-->
	<div class="header"  >
		<div class="newlogo" style="position:relative"><img src="${model._contextPath}/mobile/resources/img/logo2.png">希可尔图书</div>
		<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:80px;" id="mySwitch"></a>
		<a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:40px; font-size:0.85em"></a>
		<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>		
	</div>
	<!--头部 end-->
	<#include "controls/header_search.ftl">
	<div class="mycontainer">
	<#if model.activity?exists && model.activity?has_content && (model.activity?size>0)> 
		<div class="focus" id="focus">
			<div class="swipe">
				<ul id="slider">
					<#list model.activity as ac>
						<#if ac.rownum = 1>
							<li style="display:block"><img src="${model._contextPath}${ac.img_path}" alt="${ac.activity_name}" onClick="<#if ac.activity_url?exists &&  ac.activity_url?has_content  && (ac.activity_url?size>0)>location.href='${ac.activity_url}'</#if>"/></li>
						<#else>
							<li><img src="${model._contextPath}${ac.img_path}" alt="${ac.activity_name}" onClick="<#if ac.activity_url?exists &&  ac.activity_url?has_content  && (ac.activity_url?size>0)>location.href='${ac.activity_url}'</#if>"/></li>
						</#if>
					</#list>
				</ul>
				<div id="pagenavi">
					<#list model.activity as ac>
						<#if ac.rownum = 1>
							<a href="javascript:void(0);" class="active">${ac.rownum}</a>		
						<#else>
							<a href="javascript:void(0);">${ac.rownum}</a>
						</#if>
					</#list>
				</div>
			</div> 
		</div>	
	</#if>
		<div class="toolbar">
			<ul>
				<li>
					<a href="javascript:void(0);" class="now">
					<i data-icon="&#xe612;"></i>
					<p>首页</p>
					</a>
				</li>
				<li>
					<a href="${model._contextPath}/p100043.html">
					<i data-icon="&#xe610;"></i>
					<p>分类</p>
					</a>
		        </li>
				<li>
					<a href="${model._contextPath}/p100044.html?start=0&size=7">
					<i data-icon="&#xe627;"></i>
					<p>作者</p>
					</a>
				</li>
				<li>
					<!--	<a href="${model._contextPath}/p100045.html">-->
				<a href="${model._contextPath}/p100108.html?start=0&size=6"> 
					<i data-icon="&#xe62e;"></i>
					<p>特卖</p>
					</a>
				</li>
			</ul>
		</div>
		
<#if model.cx?exists && model.cx?has_content && (model.cx?size>2) >
		<!--hot-->
		<div class="booksmain" style="height: 180px;">
			<div class="leftcon">
				<div class="titlebg bgblue">
					<a href="${model._contextPath}/p100083.html?start=0&size=6">
					<h4>畅销推荐 Hot<span>更多&gt;</span></h4>
					<p class="txtdan">全网销量爆表 人气好书榜单</p>
					</a>
				</div>
				<div class="booklag">
					<a href="${model._contextPath}/p100050.html?id=${model.cx.get(0).goods_id}&start=0&size=3">
		    			<img src="${model._contextPath}${model.cx.get(0).small_relative_path?default('')}">
						<div class="txtall">
							<h4 class="titleblue" title="${model.cx.get(0).goods_name}">
							<#if model.cx.get(0).goods_name?has_content && (model.cx.get(0).goods_name?length>4)>
		                    	${model.cx.get(0).goods_name[0..4]}...
		                    <#else>
		                    	${model.cx.get(0).goods_name}
		                    </#if>
							</h4>
							<p class="price">￥${model.cx.get(0).goods_price?default('0')}</p>
							<p class="poortxt">
								<#if model.cx.get(0).goods_author?has_content>${model.cx.get(0).goods_author} 著.</#if>
								<#if model.cx.get(0).goods_factory?has_content> ${model.cx.get(0).goods_factory} 出版.</#if>
							</p>
						</div>
		    		</a>
	 			</div>
			</div>
			<div class="rightcon">
				<div class="booktwo btmline" style="height: 88px; padding-top: 5px; padding-bottom: 0px;">
					<a href="${model._contextPath}/p100050.html?id=${model.cx.get(1).goods_id}&start=0&size=3">
	            		<img src="${model._contextPath}${model.cx.get(1).small_relative_path?default('')}">
						<div class="txtall">
							<h4 class="titleblue" title="${model.cx.get(1).goods_name}">
							<#if model.cx.get(1).goods_name?has_content && (model.cx.get(1).goods_name?length>4)>
		                    	${model.cx.get(1).goods_name[0..4]}...
		                    <#else>
		                    	${model.cx.get(1).goods_name}
		                    </#if>
							</h4>
							<p class="price">￥${model.cx.get(1).goods_price?default('0')}</p>
							<p class="poortxt">
								<#if model.cx.get(1).goods_author?has_content>${model.cx.get(1).goods_author} 著.</#if>
								<#if model.cx.get(1).goods_factory?has_content> ${model.cx.get(1).goods_factory} 出版.</#if>
							</p>
						</div>
	           	 	</a>
	        	</div>
	
				<div class="booktwo" style="height: 88px; padding-top: 5px; padding-bottom: 0px;">
					<a href="${model._contextPath}/p100050.html?id=${model.cx.get(2).goods_id}&start=0&size=3">
	            		<img src="${model._contextPath}${model.cx.get(2).small_relative_path?default('')}">
						<div class="txtall">
							<h4 class="titleblue" title="${model.cx.get(2).goods_name}">
							<#if model.cx.get(2).goods_name?has_content && (model.cx.get(2).goods_name?length>4)>
		                    	${model.cx.get(2).goods_name[0..4]}...
		                    <#else>
		                    	${model.cx.get(2).goods_name}
		                    </#if>
							</h4>
							<p class="price">￥${model.cx.get(2).goods_price?default('0')}</p>
							<p class="poortxt">
								<#if model.cx.get(2).goods_author?has_content>${model.cx.get(2).goods_author} 著.</#if>
								<#if model.cx.get(2).goods_factory?has_content> ${model.cx.get(2).goods_factory} 出版.</#if>
							</p>
						</div>
	            	</a>
	        	</div>
			</div>
		</div>                   
		<!--hot end--> 
</#if>
<#if model.xs?exists && model.xs?has_content && (model.xs?size>2) >
		<!--new-->
		<div class="booksmain mt10">
			<div class="leftcon">
				<div class="titlebg bggreen">
					<a href="${model._contextPath}/p100084.htmlstart=0&size=6">
	                	<h4>最近新书 Hot<span>更多&gt;</span></h4>
						<p class="txtdan">最近畅销新书 人气好书榜单</p>
	                </a>
				</div>
				<div class="booklag">
					<a href="${model._contextPath}/p100050.html?id=${model.xs.get(0).goods_id}&start=0&size=3">
	                	<img src="${model._contextPath}${model.xs.get(0).small_relative_path?default('')}">
						<div class="txtall">
							<h4 class="titlegreen" title="${model.xs.get(0).goods_name}">
							<#if model.xs.get(0).goods_name?has_content && (model.xs.get(0).goods_name?length>4)>
		                    	${model.xs.get(0).goods_name[0..4]}...
		                    <#else>
		                    	${model.xs.get(0).goods_name}
		                    </#if>
							</h4>
							<p class="price">￥${model.xs.get(0).goods_price?default('0')}</p>
							<p class="poortxt">
								<#if model.xs.get(0).goods_author?has_content>${model.xs.get(0).goods_author} 著.</#if>
								<#if model.xs.get(0).goods_factory?has_content> ${model.xs.get(0).goods_factory} 出版.</#if>
							</p>
						</div>
	                </a>
	        	</div>
			</div>
			<div class="rightcon">
				<div class="booktwo btmline">
					<a href="${model._contextPath}/p100050.html?id=${model.xs.get(1).goods_id}&start=0&size=3">
	                	<img src="${model._contextPath}${model.xs.get(1).small_relative_path?default('')}">
						<div class="txtall">
							<h4 class="titlegreen" title="${model.xs.get(1).goods_name}">
							<#if model.xs.get(1).goods_name?has_content && (model.xs.get(1).goods_name?length>4)>
		                    	${model.xs.get(1).goods_name[0..4]}...
		                    <#else>
		                    	${model.xs.get(1).goods_name}
		                    </#if>
							</h4>
							<p class="price">￥${model.xs.get(1).goods_price?default('0')}</p>
							<p class="poortxt">
								<#if model.xs.get(1).goods_author?has_content>${model.xs.get(1).goods_author} 著.</#if>
								<#if model.xs.get(1).goods_factory?has_content> ${model.xs.get(1).goods_factory} 出版.</#if>
							</p>
						</div>
	                </a>
	            </div>
	
				<div class="booktwo">
					<a href="${model._contextPath}/p100050.html?id=${model.xs.get(2).goods_id}&start=0&size=3"><img src="${model._contextPath}${model.xs.get(2).small_relative_path?default('')}">
						<div class="txtall">
							<h4 class="titlegreen" title="${model.xs.get(2).goods_name}">
							<#if model.xs.get(2).goods_name?has_content && (model.xs.get(2).goods_name?length>4)>
		                    	${model.xs.get(2).goods_name[0..4]}...
		                    <#else>
		                    	${model.xs.get(2).goods_name}
		                    </#if>
							</h4>
							<p class="price">￥${model.xs.get(2).goods_price?default('0')}</p>
							<p class="poortxt">
								<#if model.xs.get(2).goods_author?has_content>${model.xs.get(2).goods_author} 著.</#if>
								<#if model.xs.get(2).goods_factory?has_content> ${model.xs.get(2).goods_factory} 出版.</#if>
							</p>
						</div>
					</a>
	            </div>
			</div>
		</div>                   
		<!--new end-->
</#if>
		              
		<!--kinds-->                    
		<div class="bookkinds mt10">
			<div class="titlebg bgpurs"><a href="${model._contextPath}/p100043.html"><h4>热门分类 Categories<span>更多&gt;</span></h4></a></div>
			<div class="etkinds">
				<a href="${model._contextPath}/p100043.html?id=105"><i class="ico_categs ico_newsb"></i>小说</a>
				<a href="${model._contextPath}/p100043.html?id=105"><i class="ico_categs ico_artb"></i>文学</a>
				<a href="${model._contextPath}/p100043.html?id=103"><i class="ico_categs ico_babyb"></i>少儿</a>
				<a href="${model._contextPath}/p100043.html?id=106" style="background:none"><i class="ico_categs ico_happyb"></i>励志</a>
			</div>
	
			<div class="etkinds">
				<a href="${model._contextPath}/p100043.html?id=117"><i class="ico_categs ico_techb"></i>科技</a>
				<a href="${model._contextPath}/p100043.html?id=107"><i class="ico_categs ico_manb"></i>经管</a>
				<a href="${model._contextPath}/p100043.html?id=105"><i class="ico_categs ico_youngb"></i>青春</a>
				<a href="${model._contextPath}/p100043.html?id=117" style="background:none"><i class="ico_categs ico_lifeb"></i>生活</a>
			</div>
		</div>
		<!--kinds end--> 

<#if model.zz?exists && model.zz?has_content && (model.zz?size>0) >
		<!--author-->                    
		<div class="bookkinds mt10">
			<div class="titlebg bgpink"><a href="${model._contextPath}/p100082.html?start=0&size=7"><h4>人气作者 Authors<span>更多&gt;</span></h4></a></div>
			<div class="fav_list">
				<ul>
				<#list model.zz as ls>
					<li>
		            	<a href="${model._contextPath}/p100066.html?id=${ls.author_id}">
		                	<img src="${model._contextPath}${ls.small_relative_path}">
		                    <p class="atrname">${ls.author_name}&nbsp;
		                    <span>
		                    <#if ls.author_detail?has_content && (ls.author_detail?length>16)>
		                    	${ls.author_detail[0..16]}...
		                    <#else>
		                    	${ls.author_detail}
		                    </#if>
		                    </span></p>
		                    <p class="atrtxt"><span>代表作品&nbsp;</span>
		                    <#if ls.magnum?has_content && (ls.magnum?length>16)>
		                    	${ls.magnum[0..16]}...
		                    <#else>
		                    	${ls.magnum}
		                    </#if>
		                    </p>
		                </a>
		            </li>
				</#list>
				</ul>
			</div>
		</div>
		<!--author end-->
</#if>

<#if model.tm?exists && model.tm?has_content && (model.tm?size>2) >
		<!--sale-->                    
		<div class="bookkinds mt10">
			<div class="titlebg bgzi"><a href="${model._contextPath}/p100108.html?start=0&size=6"><h4>特卖区 On Sale<span>更多&gt;</span></h4></a></div>
			<div class="booksmain">
				<ul>
					<#list model.tm[0..1] as ls>
					<li>
	                	<a href="${model._contextPath}/p100050.html?id=${ls.goods_id}">
	   						 <img src="${model._contextPath}${ls.small_relative_path?default('')}"><h4>${ls.goods_name}</h4><p><#if ls.goods_author?has_content>${ls.goods_author} 著</#if></p>
	    					 <p><span class="red">¥${ls.goods_price?default('0')}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="huis">¥${ls.goods_old_price?default('0')}</span></p>
	                    </a>
	                </li>
	                </#list>
				</ul>
			</div>
	
			<#list model.tm[2..(model.tm?size-1)] as ls>
				<div class="mctext salebg"><a href="${model._contextPath}/p100050.html?id=${ls.goods_id}">${ls.goods_name}&nbsp;&nbsp;<span class="huis"><#if ls.goods_author?has_content>${ls.goods_author} 著</#if></span><span class="red">￥${ls.goods_price?default('0')}</span></a></div>
			</#list>
		</div>
		<!--sale end-->
</#if>
		
		<!--
			<span>
				<div></div> <div></div>
			</span>
			
		-->
		<#if model.bottom?exists && model.bottom?has_content && (model.bottom?size>0) >
			<#if model.bottom.get(0).img_path?exists && model.bottom.get(0).img_path?has_content &&  (model.bottom.get(0).img_path?size>0)>
				<img style="display:block" class="ads" src="${model._contextPath}${model.bottom.get(0).img_path}" onClick="location.href='${model.bottom.get(0).activity_url}'">
			</#if>
		</#if>
		<!--ad-->
		<div class="banner_ft">
			<ul>
				<li><a href="${model._contextPath}/p100043.html?id=5">军事</a></li>
				<li><a href="${model._contextPath}/p100043.html?id=6">经济</a></li>
				<li><a href="${model._contextPath}/p100043.html?id=9">文学</a></li>
				<li><a href="${model._contextPath}/p100043.html?id=81">汉语</a></li>
				<li><a href="${model._contextPath}/p100043.html?id=40">宗教</a></li>
				<li><a href="${model._contextPath}/p100043.html?id=57">法律</a></li>
				<li><a href="${model._contextPath}/p100043.html?id=95">绘画</a></li>
				<li><a href="${model._contextPath}/p100043.html?id=99">音乐</a></li>							
			</ul>
		</div>
		<div class="footer">
			<a href="#">极速版</a>|
			<a href="#">触屏版</a>|
			<a href="#">电脑版</a>|
			<a href="${model._contextPath}/p100046.html">帮助中心</a>
			<p class="copyRight">&copy; 2014 希可尔图书 版权所有</p>
		</div>
	</div>
	<!--containter end-->
	
	<div class="editfor"><p id="back-to-top"><a href="#totop"><i data-icon="&#xe629;"></i>顶部</a></p></div>
        
<!--幻灯片-->
<script type="text/javascript" src="${model._contextPath}/mobile/resources/lib/plugin/touchScroll.js"></script>
<script type="text/javascript" src="${model._contextPath}/mobile/resources/lib/plugin/touchslider.dev.js"></script>
<script type="text/javascript">
var active=0,
	as=document.getElementById('pagenavi').getElementsByTagName('a');
	
for(var i=0;i<as.length;i++){
	(function(){
		var j=i;
		as[i].onclick=function(){
			t2.slide(j);
			return false;
		}
	})();
}

var t1=new TouchScroll({id:'wrapper','width':5,'opacity':0.7,color:'#555',minLength:20});

var t2=new TouchSlider({id:'slider', speed:600, timeout:6000, before:function(index){
		as[active].className='';
		active=index;
		as[active].className='active';
	}});
</script>
</body>   
</html>