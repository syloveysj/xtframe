package org.xtframe.common;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

/**
 * @ClassName: CollectionsUtil
 * @Description: 实用工具
 * @author yong.sun
 * @date 2013-9-15
 */
public class CollectionsUtil {

	/**
	 * 序列化进行的通用深度拷贝
	 * 
	 * @param src
	 * @return
	 * @throws IOException
	 * @throws ClassNotFoundException
	 */
	public static Object clone(Object src) throws IOException, ClassNotFoundException {
		if (src == null)
			return src;
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ObjectOutputStream oos = new ObjectOutputStream(baos);
		oos.writeObject(src);
		ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
		ObjectInputStream ois = new ObjectInputStream(bais);
		return ois.readObject();
	}
}
