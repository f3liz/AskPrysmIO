import React, { useState } from "react";
import "../../styles/admin-view.css";
import EditUserModal, { type User } from "./EditUserModal";

const INITIAL_MOCK_USERS: User[] = [
  {
    id: "1",
    username: "jdoe99",
    role: "Admin",
  },
  {
    id: "2",
    username: "sarah_smith",
    role: "User",
  },
  {
    id: "3",
    username: "mike_jones",
    role: "User",
  },
  {
    id: "4",
    username: "alex_dev",
    role: "Admin",
  },
];

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>(INITIAL_MOCK_USERS);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
    );
    handleCloseModal();
  };

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
