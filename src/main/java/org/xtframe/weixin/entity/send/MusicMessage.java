package org.xtframe.weixin.entity.send;

/**  
*   
* 类名称：MusicMessage  
* 类描述：音乐消息 
* 创建人：yong.sun
* 创建时间：2013-10-3 下午4:11:19  
* @version       
*/
public class MusicMessage extends SendBaseMessage{
    // 音乐  
    private Music Music;  
  
    public Music getMusic() {  
        return Music;  
    }  
  
    public void setMusic(Music music) {  
        Music = music;  
    }  
}
