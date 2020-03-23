package org.xtframe.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.xtframe.dao.IDataBase;
import org.xtframe.dao.entity.Field;
import org.xtframe.dao.entity.TableColumns;
import org.xtframe.dao.entity.TableField;
import org.xtframe.dao.entity.TableStatus;
import org.xtframe.entity.SQL;
import org.xtframe.sql.PreparedParameter;
import org.xtframe.util.ApplicationConfigUtil;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.ContextUtil;

/**
 * @ClassName: MysqlDataBaseImpl
 * @Description: Mysql数据库操作类
 * @author yong.sun
 * @date 2013-9-21
 */
@Transactional
public class MysqlDataBaseImpl implements IDataBase {
	private SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	public String getDBType() {
		return MYSQL;
	}

	@SuppressWarnings("deprecation")
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public List<Map<String, Object>> executeQuery(String sql, List<PreparedParameter> preparedParameters) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Transaction tran = null;
		List<Map<String, Object>> rows = new ArrayList<Map<String, Object>>();
		try {
			Session session = sessionFactory.getCurrentSession();
			tran = session.beginTransaction();
			conn = session.connection();
			pstmt = conn.prepareStatement(sql);
			setPreparedParameters(pstmt, preparedParameters);
			rs = pstmt.executeQuery();
			ResultSetMetaData rsmd = rs.getMetaData();
			int columnCount = rsmd.getColumnCount();
			List<Field> fields = new ArrayList<Field>(columnCount);
			Field field = null;
			for (int i = 1; i <= columnCount; i++) {
				field = new Field();
				field.setName(rsmd.getColumnLabel(i).toLowerCase());
				field.setInt(rsmd.getColumnTypeName(i).contains("INT"));
				fields.add(field);
			}
			rsmd = null;
			Map<String, Object> row = null;
			while (rs.next()) {
				row = new HashMap<String, Object>(columnCount);
				for (Field obj : fields) {
					if (obj.isInt()) {
						row.put(obj.getName(), rs.getInt(obj.getName()));
					} else {
						row.put(obj.getName(), rs.getString(obj.getName()));
					}
				}
				rows.add(row);
			}
			tran.commit();
		} catch (SQLException e) {
			tran.rollback();
			rows = null;
			e.printStackTrace();
		} finally {
			try {
				if (tran != null) {
					tran = null;
				}
				if (rs != null) {
					rs.close();
					rs = null;
				}
				if (pstmt != null) {
					pstmt.close();
					pstmt = null;
				}
				if (conn != null) {
					conn.close();
					conn = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return rows;
	}

	@SuppressWarnings("deprecation")
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public List<String> executeQuery(String sql, int columnIndex, List<PreparedParameter> preparedParameters) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Transaction tran = null;
		List<String> rows = new ArrayList<String>();
		try {
			Session session = sessionFactory.getCurrentSession();
			tran = session.beginTransaction();
			conn = session.connection();
			pstmt = conn.prepareStatement(sql);
			setPreparedParameters(pstmt, preparedParameters);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				rows.add(rs.getString(columnIndex));
			}
			tran.commit();
		} catch (SQLException e) {
			tran.rollback();
			rows = null;
			e.printStackTrace();
		} finally {
			try {
				if (tran != null) {
					tran = null;
				}
				if (rs != null) {
					rs.close();
					rs = null;
				}
				if (pstmt != null) {
					pstmt.close();
					pstmt = null;
				}
				if (conn != null) {
					conn.close();
					conn = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return rows;
	}

	@SuppressWarnings("deprecation")
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public int executeUpdate(String sql, List<PreparedParameter> preparedParameters) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		int rows = 0;
		Transaction tran = null;
		try {
			Session session = sessionFactory.getCurrentSession();
			tran = session.beginTransaction();
			conn = session.connection();
			pstmt = conn.prepareStatement(sql);
			setPreparedParameters(pstmt, preparedParameters);
			rows = pstmt.executeUpdate();
			tran.commit();
		} catch (SQLException e) {
			tran.rollback();
			rows = -1;
			e.printStackTrace();
		} finally {
			try {
				if (tran != null) {
					tran = null;
				}
				if (pstmt != null) {
					pstmt.close();
					pstmt = null;
				}
				if (conn != null) {
					conn.close();
					conn = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return rows;
	}

	@SuppressWarnings("deprecation")
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public int[] excuteTransaction(List<String> sqlList, List<List<PreparedParameter>> preparedParametersList) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		int[] rows = null;
		Transaction tran = null;
		try {
			Session session = sessionFactory.getCurrentSession();
			tran = session.beginTransaction();
			conn = session.connection();
			pstmt = conn.prepareStatement("");
			for (int i = 0; i < sqlList.size(); i++) {
				pstmt.addBatch(sqlList.get(i));
				if (preparedParametersList != null && preparedParametersList.size() > i)
					setPreparedParameters(pstmt, preparedParametersList.get(i));
			}
			rows = pstmt.executeBatch();
			tran.commit();
		} catch (Exception e) {
			tran.rollback();
			e.printStackTrace();
		} finally {
			try {
				if (tran != null) {
					tran = null;
				}
				if (pstmt != null) {
					pstmt.close();
					pstmt = null;
				}
				if (conn != null) {
					conn.close();
					conn = null;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return rows;
	}

	@SuppressWarnings("deprecation")
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public Map<String, Object> execute(String sql) {
		Session session = null;
		Connection conn = null;
		Transaction tran = null;
		Map<String, Object> infos = new HashMap<String, Object>();
		Statement pstmt = null;
		try {
			session = sessionFactory.getCurrentSession();
			tran = session.beginTransaction();
			conn = session.connection();
			pstmt = conn.createStatement();
			pstmt.setEscapeProcessing(false);
			boolean result = pstmt.execute(sql);
			int num = 0;
			if (result) {
				ResultSet rs = pstmt.executeQuery(sql);
				if (rs.last()) {
					num = rs.getRow();
				}
			} else {
				num = pstmt.getUpdateCount();
			}
			infos.put("sucess", num);
			tran.commit();
		} catch (SQLException e) {
			tran.rollback();
			infos.put("error", e.getMessage());
			infos.put("errorCode", e.getErrorCode());
		} finally {
			try {
				if (tran != null) {
					tran = null;
				}
				if (pstmt != null) {
					pstmt.close();
					pstmt = null;
				}
				if (conn != null) {
					conn.close();
					conn = null;
				}
			} catch (SQLException e) {
				infos.put("error", e.getMessage());
				infos.put("errorCode", e.getErrorCode());
			}
		}
		return infos;
	}

	@SuppressWarnings("deprecation")
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public int insert(String sql, List<PreparedParameter> preparedParameters) throws Exception {
		int id = 0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		Transaction tran = null;
		try {
			Session session = sessionFactory.getCurrentSession();
			tran = session.beginTransaction();
			conn = session.connection();
			pstmt = conn.prepareStatement(sql);
			setPreparedParameters(pstmt, preparedParameters);
			int rows = pstmt.executeUpdate();
			if (rows > 0) {
				ResultSet rs = pstmt.executeQuery("SELECT last_insert_id()");
				if (rs.next()) {
					id = rs.getInt(1);
				}
				rs.close();
				rs = null;
			}
			tran.commit();
		} catch (SQLException e) {
			tran.rollback();
			e.printStackTrace();
		} finally {
			try {
				if (tran != null) {
					tran = null;
				}
				if (pstmt != null) {
					pstmt.close();
					pstmt = null;
				}
				if (conn != null) {
					conn.close();
					conn = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return id;
	}

	@SuppressWarnings("deprecation")
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public String findFirst(String sql, int columnIndex, List<PreparedParameter> preparedParameters) {
		String result = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Transaction tran = null;
		try {
			Session session = sessionFactory.getCurrentSession();
			tran = session.beginTransaction();
			conn = session.connection();
			pstmt = conn.prepareStatement(sql);
			setPreparedParameters(pstmt, preparedParameters);
			rs = pstmt.executeQuery();
			if (rs.next()) {
				result = rs.getString(columnIndex);
			}
			tran.commit();
		} catch (SQLException e) {
			tran.rollback();
			e.printStackTrace();
		} finally {
			try {
				if (tran != null) {
					tran = null;
				}
				if (rs != null) {
					rs.close();
					rs = null;
				}
				if (pstmt != null) {
					pstmt.close();
					pstmt = null;
				}
				if (conn != null) {
					conn.close();
					conn = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	@SuppressWarnings("deprecation")
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public long findRows(String sql, List<PreparedParameter> preparedParameters) {
		long line = -1;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Transaction tran = null;
		try {
			Session session = sessionFactory.getCurrentSession();
			tran = session.beginTransaction();
			conn = session.connection();
			pstmt = conn.prepareStatement(sql);
			setPreparedParameters(pstmt, preparedParameters);
			rs = pstmt.executeQuery();
			if (rs.next()) {
				line = rs.getLong(1);
			}
			tran.commit();
		} catch (SQLException e) {
			tran.rollback();
			e.printStackTrace();
		} finally {
			try {
				if (tran != null) {
					tran = null;
				}
				if (rs != null) {
					rs.close();
					rs = null;
				}
				if (pstmt != null) {
					pstmt.close();
					pstmt = null;
				}
				if (conn != null) {
					conn.close();
					conn = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return line;
	}

	@SuppressWarnings("deprecation")
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public long findTableSize(String sql) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Transaction tran = null;
		long dataSize = 0;
		try {
			Session session = sessionFactory.getCurrentSession();
			tran = session.beginTransaction();
			conn = session.connection();
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				dataSize += rs.getLong("Data_length");
				dataSize += rs.getLong("Index_length");
			}
			tran.commit();
		} catch (SQLException e) {
			e.printStackTrace();
			if (tran != null) {
				tran.rollback();
			}
		} finally {
			try {
				if (tran != null) {
					tran = null;
				}
				if (rs != null) {
					rs.close();
					rs = null;
				}
				if (pstmt != null) {
					pstmt.close();
					pstmt = null;
				}
				if (conn != null) {
					conn.close();
					conn = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return dataSize;
	}

	@SuppressWarnings("deprecation")
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public List<TableField> findTableFields(String tableName) {
		List<TableField> fields = new ArrayList<TableField>();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Transaction tran = null;
		try {
			Session session = sessionFactory.getCurrentSession();
			tran = session.beginTransaction();
			conn = session.connection();
			pstmt = conn.prepareStatement("SHOW FIELDS FROM " + tableName);
			rs = pstmt.executeQuery();
			TableField field = null;
			while (rs.next()) {
				field = new TableField();
				field.setField(rs.getString("Field"));
				field.setType(rs.getString("Type"));
				field.setAllowNull(rs.getString("Null"));
				field.setKey(rs.getString("Key"));
				field.setDefaultValue(rs.getString("Default"));
				field.setExtra(rs.getString("Extra"));
				fields.add(field);
			}
			tran.commit();
		} catch (SQLException e) {
			e.printStackTrace();
			tran.rollback();
		} finally {
			try {
				if (tran != null) {
					tran = null;
				}
				if (rs != null) {
					rs.close();
					rs = null;
				}
				if (pstmt != null) {
					pstmt.close();
					pstmt = null;
				}
				if (conn != null) {
					conn.close();
					conn = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return fields;
	}

	@SuppressWarnings("deprecation")
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public List<TableColumns> findTableColumns(String tableName) {
		List<TableColumns> fullColumnsList = new ArrayList<TableColumns>();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Transaction tran = null;
		try {
			Session session = sessionFactory.getCurrentSession();
			tran = session.beginTransaction();
			conn = session.connection();
			pstmt = conn.prepareStatement("SHOW FULL COLUMNS FROM " + tableName);
			rs = pstmt.executeQuery();
			TableColumns fullColumns = null;
			while (rs.next()) {
				fullColumns = new TableColumns();
				fullColumns.setField(rs.getString("Field"));
				fullColumns.setType(rs.getString("Type"));
				fullColumns.setCollation(rs.getString("Collation"));
				fullColumns.setAllowNull(rs.getString("Null"));
				fullColumns.setKey(rs.getString("Key"));
				fullColumns.setDefaultValue(rs.getString("Default"));
				fullColumns.setExtra(rs.getString("Extra"));
				fullColumns.setPrivileges(rs.getString("Privileges"));
				fullColumns.setComment(rs.getString("Comment"));
				fullColumnsList.add(fullColumns);
			}
			tran.commit();
		} catch (SQLException e) {
			e.printStackTrace();
			tran.rollback();
		} finally {
			try {
				if (tran != null) {
					tran = null;
				}
				if (rs != null) {
					rs.close();
					rs = null;
				}
				if (pstmt != null) {
					pstmt.close();
					pstmt = null;
				}
				if (conn != null) {
					conn.close();
					conn = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return fullColumnsList;
	}

	@SuppressWarnings("deprecation")
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public List<TableStatus> findTableStatus(String sql) {
		List<TableStatus> tableStatusList = new ArrayList<TableStatus>();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Transaction tran = null;
		try {
			Session session = sessionFactory.getCurrentSession();
			tran = session.beginTransaction();
			conn = session.connection();
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			TableStatus tableStatus = null;
			while (rs.next()) {
				tableStatus = new TableStatus();
				tableStatus.setName(rs.getString("Name"));
				tableStatus.setEngine(rs.getString("Engine"));
				tableStatus.setRows(rs.getLong("Rows"));
				tableStatus.setData_length(rs.getLong("Data_length"));
				tableStatus.setIndex_length(rs.getLong("Index_length"));
				tableStatus.setData_free(rs.getLong("Data_free"));
				tableStatus.setAuto_increment(rs.getString("Auto_increment"));
				tableStatus.setCollation(rs.getString("Collation"));
				tableStatusList.add(tableStatus);
			}
			tran.commit();
		} catch (SQLException e) {
			e.printStackTrace();
			tran.rollback();
		} finally {
			try {
				if (tran != null) {
					tran = null;
				}
				if (rs != null) {
					rs.close();
					rs = null;
				}
				if (pstmt != null) {
					pstmt.close();
					pstmt = null;
				}
				if (conn != null) {
					conn.close();
					conn = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return tableStatusList;
	}

	@SuppressWarnings("deprecation")
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public long sequenceNextVal(String name) {
		long id = 0;
		Connection conn = null;
		Statement stmt = null;
		Transaction tran = null;
		try {
			Session session = sessionFactory.getCurrentSession();
			tran = session.beginTransaction();
			conn = session.connection();
			stmt = conn.createStatement();
			stmt.setEscapeProcessing(false);

			SQL sql = ContextUtil.getApplication().getSql(getDBType(),
					ApplicationConfigUtil.getApplicationConfig().getConfig("sequenceNextVal"));
			Map<String, Object> parame = new HashMap<String, Object>();
			parame.put("name", name);
			String strSql = CommonUtil.createSql(sql.getSqlTemplet(), parame);

			int rows = stmt.executeUpdate(strSql);
			if (rows > 0) {
				ResultSet rs = stmt.executeQuery("SELECT last_insert_id()");
				if (rs.next()) {
					id = rs.getLong(1);
				}
				rs.close();
				rs = null;
			}
			tran.commit();
		} catch (SQLException e) {
			tran.rollback();
			e.printStackTrace();
			id = -1L;
		} finally {
			try {
				if (tran != null) {
					tran = null;
				}
				if (stmt != null) {
					stmt.close();
					stmt = null;
				}
				if (conn != null) {
					conn.close();
					conn = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return id;
	}

	public static void setPreparedParameters(PreparedStatement pstmt, List<PreparedParameter> preparedParameters)
			throws SQLException {
		if (preparedParameters != null) {
			for (int i = 0; i < preparedParameters.size(); i++) {
				PreparedParameter pp = preparedParameters.get(i);
				int sequen = pp.getSequen() == -1 ? i + 1 : pp.getSequen();
				pstmt.setString(sequen, pp.getData().toString());
			}
		}
	}

	public String getDBPagineSql(String sql, long offset, int maxsize) {
		StringBuffer ret = new StringBuffer("select * from (").append(sql).append(") t limit ").append(offset).append(", ")
				.append(maxsize);
		return ret.toString();
	}
}
