import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as submitLogin } from "../api/auth";
import { useAuth } from "../context/useAuth";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({
    username: "",
    password: "",
    server: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await submitLogin({ username, password });
      loginUser();
      navigate("/");
    } catch (err) {
      setError("Invalid username or password. Please try again.");
      console.error("Login failed.", err);
    }
  };

  return (
    <div className="page-login">
      <div className="loginWrapper">
        <div className="loginHeader">
          <h2>Welcome!</h2>
          <p>Please enter your credentials to access the portal.</p>
        </div>

        <form className="loginForm" onSubmit={handleSubmit}>
          {error && <div className="errorMessage">{error}</div>}

          <div className="inputGroup">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className={error ? "inputError" : ""}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={error ? "inputError" : ""}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>

          <button type="submit" className="submitButton">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
