package org.xtframe.weixin.entity.send;

import java.util.List;

/**  
*   
* 类名称：NewsMessage  
* 类描述：图文消息  
* 创建人：yong.sun
* 创建时间：2013-10-3 下午4:11:32  
* @version       
*/
public class NewsMessage extends SendBaseMessage{
    // 图文消息个数，限制为10条以内  
    private int ArticleCount;  
    // 多条图文消息信息，默认第一个item为大图  
    private List<Article> Articles;  
  
    public int getArticleCount() {  
        return ArticleCount;  
    }  
  
    public void setArticleCount(int articleCount) {  
        ArticleCount = articleCount;  
    }  
  
    public List<Article> getArticles() {  
        return Articles;  
    }  
  
    public void setArticles(List<Article> articles) {  
        Articles = articles;  
    }  
}
