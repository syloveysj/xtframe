package org.xtframe.weixin.entity.receive;

/**  
*   
* 类名称：TextMessage  
* 类描述：文本消息 
* 创建人：yong.sun
* 创建时间：2013-10-3 下午4:13:06  
* @version       
*/
public class TextMessage extends ReceiveBaseMessage{
    // 消息内容  
    private String Content;  
  
    public String getContent() {  
        return Content;  
    }  
  
    public void setContent(String content) {  
        Content = content;  
    }  
}
