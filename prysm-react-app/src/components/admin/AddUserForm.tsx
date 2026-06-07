import React, { useState } from "react";
import { userApi, type UserCreate } from "../../api/users";

function AddUserForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const isAdmin = formData.get("isAdmin") === "true";

    // Validation
    if (!username || !password) {
      setError("Username and Password are required.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const payload: UserCreate = {
      username,
      password,
      is_admin: isAdmin,
    };

    try {
      const response = await userApi.createUser(payload);
      setSuccess(`User ${response.user.username} created successfully.`);
      form.reset();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while creating the user.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-header">
            <h1>Create Account</h1>
          </div>

          {error && (
            <div
              className="error-message"
              style={{ color: "red", marginBottom: "1rem" }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              className="success-message"
              style={{ color: "green", marginBottom: "1rem" }}
            >
              {success}
            </div>
          )}

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="admin-input"
              placeholder="Enter username"
              required
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
              required
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
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="isAdmin">Admin Access</label>
            <select name="isAdmin" id="isAdmin" className="admin-input">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <button type="submit" className="admin-submit-btn" disabled={loading}>
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUserForm;
