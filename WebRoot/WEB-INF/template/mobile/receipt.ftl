<!DOCTYPE html>
<html lang="en">
<head>
<title>希可尔图书</title>
<#include "controls/header.ftl">
</head>

<body id="totop">
<!--头部-->
<div class="header"> <a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">个人中心</a> <a href="${model._contextPath}/p100071.html" class="tbr_rbtn" data-icon="&#xe621;" title="设置" style="right:120px;"></a> <a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:80px;" id="mySwitch"></a> <a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:40px;"></a> <a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a> </div>
<!--头部 end-->
<#include "controls/header_search.ftl">

<div style="height:46px">&nbsp;</div>
<div class="fav_list">
<ul>
  	<#if model.data?exists && model.data?has_content && (model.data?size>0) >
  		<input type="hidden" id="or_id" value="${model.data.rows.get(0).orders_id}">
	    <#list model.data.rows as item>
	    <li  style="height:auto"> <a href="${model._contextPath}/p100050.html?id=${item.goods_id}">
	      <div class="img_wrap"><img src="${model._contextPath}${item.small_relative_path}" width="80"  style="border-radius:0"></div>
	      <div class="text_wrap">
	        <p class="name">${item.goods_name}</p>
	        <p class="promo"><#if item.goods_factory?has_content> ${item.goods_factory} 出版.</#if></p>
	        <p class="price"><span class="feed"><#if item.goods_author?has_content>${item.goods_author} 著</#if></span><span class="y_pf">¥ ${item.goods_price} </span></p>
	      </div>
	      </a> </li>
	    </#list>
    </#if>
  </ul>
</div>
<div style="background-color:#FFFFFF;margin-top:5px;">
   <div class="sex_tx dcsarea">
   		<p  >是否与描述相符:</p>
        <p style="color:#888" class="huis thedate">
		<i id="i1" onclick="onclickPhoto(1)" data-icon="&#xe601;" style="font-family: 'bookstore';content: attr(data-icon);speak: none; font-style:normal; margin:0 2px; font-size:2.3em; vertical-align:top "></i>
        <i id="i2" onclick="onclickPhoto(2)" data-icon="&#xe601;" style="font-family: 'bookstore';content: attr(data-icon);speak: none; font-style:normal; margin:0 2px; font-size:2.3em; vertical-align:top "></i>
        <i id="i3" onclick="onclickPhoto(3)" data-icon="&#xe601;" style="font-family: 'bookstore';content: attr(data-icon);speak: none; font-style:normal; margin:0 2px; font-size:2.3em; vertical-align:top "></i>
        <i id="i4" onclick="onclickPhoto(4)" data-icon="&#xe601;" style="font-family: 'bookstore';content: attr(data-icon);speak: none; font-style:normal; margin:0 2px; font-size:2.3em; vertical-align:top "></i>
        <i id="i5" onclick="onclickPhoto(5)" data-icon="&#xe601;" style="font-family: 'bookstore';content: attr(data-icon);speak: none; font-style:normal; margin:0 2px; font-size:2.3em; vertical-align:top "></i>
        </p>
   </div>
</div>
<div style="background-color:#FFFFFF;margin-top:5px;">
   <div>
   		<p >添加评论语句:</p>
   		<br>
   		<textarea rows="6" id="comment_contant" style=" border:1px; border-style:solid; border-color:#FFCC00" ></textarea>
   </div>
</div>
<div style="position: absolute; bottom: 0px; background-color: #FFFFFF; width: 100%; height: 30px; border: 0px none; left: 0px; right: 0px;">
	<button style="background-color: #FF9900; width:50px; height:30px; float:right " onclick="subbutton()">评论</button>
</div>


<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/receipt.js"></script>
</body>
</html>
