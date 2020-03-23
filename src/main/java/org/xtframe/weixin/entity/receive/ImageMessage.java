package org.xtframe.weixin.entity.receive;

/**  
*   
* 类名称：ImageMessage  
* 类描述：图片消息  
* 创建人：yong.sun
* 创建时间：2013-10-3 下午4:12:19  
* @version       
*/
public class ImageMessage extends ReceiveBaseMessage{
    // 图片链接  
    private String PicUrl;  
  
    public String getPicUrl() {  
        return PicUrl;  
    }  
  
    public void setPicUrl(String picUrl) {  
        PicUrl = picUrl;  
    }  
}