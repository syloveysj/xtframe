package org.xtframe.weixin.entity.receive;

/**  
*   
* 类名称：VoiceMessage  
* 类描述：音频消息   
* 创建人：yong.sun
* 创建时间：2013-10-3 下午4:13:18  
* @version       
*/
public class VoiceMessage {
    // 媒体ID  
    private String MediaId;  
    // 语音格式  
    private String Format;  
  
    public String getMediaId() {  
        return MediaId;  
    }  
  
    public void setMediaId(String mediaId) {  
        MediaId = mediaId;  
    }  
  
    public String getFormat() {  
        return Format;  
    }  
  
    public void setFormat(String format) {  
        Format = format;  
    }  
}
