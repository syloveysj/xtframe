package org.xtframe.dao;

import java.util.List;
import java.util.Map;

import org.hibernate.SessionFactory;
import org.xtframe.sql.PreparedParameter;
import org.xtframe.dao.entity.TableColumns;
import org.xtframe.dao.entity.TableField;
import org.xtframe.dao.entity.TableStatus;

/**
 * @ClassName: IDataBase
 * @Description: 数据库操作接口
 * @author yong.sun
 * @date 2013-9-15
 */
public interface IDataBase {

	public static final String MYSQL = "mysql";

	/**
	 * 获取数据库类型
	 * 
	 * @return
	 */
	public String getDBType();

	/**
	 * 获取hibernate的SessionFactory
	 * 
	 * @return
	 */
	public SessionFactory getSessionFactory();

	/**
	 * 设置hibernate的SessionFactory
	 * 
	 * @param sessionFactory
	 */
	public void setSessionFactory(SessionFactory sessionFactory);

	/**
	 * 执行sql查询
	 * 
	 * @param sql
	 * @param preparedParameters
	 * @return
	 */
	public List<Map<String, Object>> executeQuery(String sql, List<PreparedParameter> preparedParameters);

	/**
	 * 执行sql查询
	 * 
	 * @param sql
	 * @param columnIndex
	 * @param preparedParameters
	 * @return
	 */
	public List<String> executeQuery(String sql, int columnIndex, List<PreparedParameter> preparedParameters);

	/**
	 * 执行sql更新
	 * 
	 * @param sql
	 * @param preparedParameters
	 * @return
	 */
	public int executeUpdate(String sql, List<PreparedParameter> preparedParameters);

	/**
	 * 执行事务
	 * 
	 * @param sqlList
	 * @param preparedParametersList
	 * @return
	 */
	public int[] excuteTransaction(List<String> sqlList, List<List<PreparedParameter>> preparedParametersList);

	/**
	 * 执行sql
	 * 
	 * @param sql
	 * @return
	 */
	public Map<String, Object> execute(String sql);

	/**
	 * 执行sql插入，返回主键id
	 * 
	 * @param sql
	 * @param preparedParameters
	 * @return
	 * @throws Exception
	 */
	public int insert(String sql, List<PreparedParameter> preparedParameters) throws Exception;

	/**
	 * 查询第一条记录的指定列
	 * 
	 * @param sql
	 * @param columnIndex
	 * @param preparedParameters
	 * @return
	 */
	public String findFirst(String sql, int columnIndex, List<PreparedParameter> preparedParameters);

	/**
	 * 查询记录条数
	 * 
	 * @param sql
	 * @param preparedParameters
	 * @return
	 */
	public long findRows(String sql, List<PreparedParameter> preparedParameters);

	/**
	 * 查询获取表大小
	 * 
	 * @param sql
	 * @return
	 */
	public long findTableSize(String sql);

	/**
	 * 根据表名获取字段描述
	 * 
	 * @param tableName
	 * @return
	 */
	public List<TableField> findTableFields(String tableName);

	/**
	 * 根据表名获取字段列描述
	 * 
	 * @param tableName
	 * @return
	 */
	public List<TableColumns> findTableColumns(String tableName);

	/**
	 * 查询表状态
	 * 
	 * @param sql
	 * @return
	 */
	public List<TableStatus> findTableStatus(String sql);

	/**
	 * 获取下一个序列值
	 * 
	 * @param name
	 * @return
	 */
	public long sequenceNextVal(String name);

	/**
	 * 获取分页sql
	 * 
	 * @param sql
	 * @param offset
	 * @param maxsize
	 * @return
	 */
	public String getDBPagineSql(String sql, long offset, int maxsize);
}
