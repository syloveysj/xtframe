package org.xtframe.workflow;

import java.util.Arrays;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.jbpm.api.JbpmException;
import org.jbpm.api.identity.Group;
import org.jbpm.api.identity.User;
import org.jbpm.pvm.internal.env.BasicEnvironment;
import org.jbpm.pvm.internal.identity.spi.IdentitySession;

@SuppressWarnings("unchecked")
public class FlowIdentitySessionImpl implements IdentitySession {

	protected Session session;

	public FlowIdentitySessionImpl() {
		this.session = BasicEnvironment.getFromCurrent(Session.class);
	}

	public String createUser(String id, String userName,
			String businessEmail, String familName) {
		return "";
	}

	public FlowUser findUserById(String userId) {
		return (FlowUser) session.createCriteria(FlowUser.class).add(
				Restrictions.eq("id", userId)).uniqueResult();
	}

	public List<User> findUsersById(String... userIds) {
		List<User> users = session.createCriteria(FlowUser.class).add(
				Restrictions.in("id", userIds)).list();

		if (userIds.length != users.size()) {
			throw new JbpmException("not all users were found: "
					+ Arrays.toString(userIds));
		}
		return users;
	}

	public List<User> findUsers() {
		return session.createCriteria(FlowUser.class).list();
	}

	public void deleteUser(String userId) {
	}

	public String createGroup(String groupName, String groupType,
			String parentGroupId) {
		return "";
	}

	public List<User> findUsersByGroup(String groupId) {
		return session.createCriteria(FlowGroupMember.class).createAlias(
				"group", "g").add(Restrictions.eq("g.id", groupId))
				.setProjection(Projections.property("user")).list();
	}

	public FlowGroup findGroupById(String groupId) {
		return (FlowGroup) session.createCriteria(FlowGroup.class).add(
				Restrictions.eq("id", groupId)).uniqueResult();
	}

	public List<Group> findGroupsByUserAndGroupType(String userId,
			String groupType) {
		return session.createQuery(
				"select distinct m.group" + " from "
				+ FlowGroupMember.class.getName()
				+ " as m where m.user.id = :userId"
				+ " and m.group.type = :groupType").setString("userId",
						userId).setString("groupType", groupType).list();
	}

	public List<Group> findGroupsByUser(String userId) {
		List<Group> gList = session.createQuery(
				"select distinct m.group" + " from "
				+ FlowGroupMember.class.getName()
				+ " as m where m.user.id = :userId").setString(
						"userId", userId).list();

		return gList;
	}

	public List<Group> findGroups() {
		return session.createCriteria(FlowGroup.class).list();
	}

	public void deleteGroup(String groupId) {
	}

	public void createMembership(String userId, String groupId, String role) {
	}

	public void deleteMembership(String userId, String groupId, String role) {
	}

}
