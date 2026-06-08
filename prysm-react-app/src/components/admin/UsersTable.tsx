import React, { useState, useEffect } from "react";
import "../../styles/admin-view.css";
import EditUserModal, { type User } from "./EditUserModal";
import { userApi, type UserResponse } from "../../api/users";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await userApi.getAllUsers();

      const mappedUsers: User[] = response.users.map((u: UserResponse) => ({
        id: u.id.toString(),
        username: u.username,
        role: u.is_admin ? "Admin" : "User",
      }));

      setUsers(mappedUsers);
    } catch (err) {
      setError("Failed to load users. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (updatedUser: User) => {
    try {
      const updateData: Record<string, any> = {
        username: updatedUser.username,
        is_admin: updatedUser.role === "Admin",
      };

      if (updatedUser.password && updatedUser.password.trim() !== "") {
        updateData.password = updatedUser.password;
      }

      await userApi.updateUser(parseInt(updatedUser.id, 10), updateData);

      setUsers((prevUsers) =>
        prevUsers.map((u) => {
          if (u.id === updatedUser.id) {
            const { password, ...safeUser } = updatedUser;
            return safeUser;
          }
          return u;
        }),
      );

      handleCloseModal();
    } catch (err) {
      console.error("Failed to save user updates: ", err);
      alert("Failed to update user. Please check the console and try again.");
    }
  };

  const handleDeleteClick = async (userId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      await userApi.deleteUser(parseInt(userId, 10));

      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    } catch (err) {
      console.error("Failed to delete user: ", err);
      alert("Failed to delete user. Please check the console and try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="table-container">
        <div className="table-header-row">
          <h2 className="table-title">Manage Users</h2>
        </div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-container">
        <div className="table-header-row">
          <h2 className="table-title">Manage Users</h2>
        </div>
        <p className="error-text" style={{ color: "red" }}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-header-row">
        <h2 className="table-title">Manage Users</h2>
        <span className="user-count">Total: {users.length}</span>
      </div>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="font-medium">{user.username}</td>
                <td>
                  <span
                    className={`role-badge ${
                      user.role === "Admin" ? "role-admin" : "role-user"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="text-right">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteClick(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="empty-state">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <EditUserModal
        key={selectedUser ? selectedUser.id : "modal-closed"}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </div>
  );
}
