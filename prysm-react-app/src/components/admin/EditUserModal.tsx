import React, { useState, useEffect } from "react";
import "../../styles/admin-view.css";

export interface User {
  id: string;
  username: string;
  role: "Admin" | "User";
  password?: string;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (updatedUser: User) => void;
}

export default function EditUserModal({
  isOpen,
  onClose,
  user,
  onSave,
}: EditUserModalProps) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<"Admin" | "User">("User");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setRole(user.role);
      setPassword("");
    } else {
      setUsername("");
      setRole("User");
      setPassword("");
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...user, username, role, password });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit User</h2>

        <form onSubmit={handleSubmit} className="form-style modal-form">
          <div className="form-group form-field-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group form-field-group">
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "Admin" | "User")}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="form-group form-field-group">
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
            />
          </div>

          <div className="modal-actions form-submit-row">
            <button
              type="button"
              onClick={onClose}
              className="text-button text-dim cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="admin-submit-btn save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
