import React, { useState } from "react";
import "../../styles/admin-view.css";

export interface User {
  id: string;
  username: string;
  role: "Admin" | "User";
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

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...user, username, role });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit User</h2>

        <form onSubmit={handleSubmit} className="form-style">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "Admin" | "User")}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="action-btn">
              Cancel
            </button>
            <button type="submit" className="action-btn edit-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
