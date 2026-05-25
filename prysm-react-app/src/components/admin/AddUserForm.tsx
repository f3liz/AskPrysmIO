import React from "react";
import { useState } from "react";

interface UserProfile {
  username: string;
  role: string;
}

function AddUserForm() {
  const [userData, setUserData] = useState<UserProfile | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const formValues = Object.fromEntries(
      formData.entries(),
    ) as unknown as UserProfile;

    setUserData(formValues);
    console.log(userData);
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-header">
            <h1>Create Account</h1>
          </div>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="admin-input"
              placeholder="Enter username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="admin-input"
              placeholder="••••••••"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="admin-input"
              placeholder="••••••••"
            />
          </div>

          <div className="input-group">
            <label htmlFor="isAdmin">Admin Access</label>
            <select name="isAdmin" id="isAdmin" className="admin-input">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <button type="submit" className="admin-submit-btn">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUserForm;
