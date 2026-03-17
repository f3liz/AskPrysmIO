import { useState } from "react";
import "../styles/login.css";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log({ user, password });
  };

  return (
    <div className="page">
      <div className="loginWrapper">
        <div className="loginHeader">
          <h2>Welcome Back</h2>
          <p>Please enter your credentials to access the portal.</p>
        </div>

        <form className="loginForm">
          <div className="inputGroup">
            <label htmlFor="user">Username</label>
            <input
              type="text"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" onClick={handleSubmit} className="submitButton">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
