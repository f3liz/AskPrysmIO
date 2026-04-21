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

  const validate = () => {
    const newError = {
      username: "",
      password: "",
      server: ""
    };
    
    let valid = true;

    if (!username.trim()) {
      newError.username = "Username is required!";
      valid = false;
    }

    if (!password.trim()) {
      newError.password = "Password is required!";
      valid = false;
    }

    setError(newError);
    return valid;
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError((prev) => ({...prev, server: ""}));

    if (!validate()) return;

    try {
      setIsSubmitting(true);

      await submitLogin({ username, password });
      loginUser();
      navigate("/");
    } catch (err) {
      setError((prev) => ({
        ...prev,
        server: "Invalid username or password"
      }));
      console.error("Login failed.", err);
    } finally {
      setIsSubmitting(false);
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
          {error && <div className="errorMessage">{error.server}</div>}

          <div className="inputGroup">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className={error ? "inputError" : ""}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError((prev) => ({...prev, username: "", server: ""}));
              }}
            />
            {error.username && (
              <span className="fieldError">{error.username}</span>
            )}
          </div>

          <div className="inputGroup">
            <label htmlFor="password">Password</label>

            <div className="passwordWrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={error.password ? "inputError" : ""}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError((prev) => ({...prev, password: "", server: ""}));
                }}
              />

              <button type = "button" className="togglePassword" onClick={() => setShowPassword((prev) => !prev)}
              >{showPassword ? "Hide" : "Show"}</button>
            </div>
            {error.password && (
              <span className="fieldError">{error.password}</span>
            )}
          </div>

          <button type="submit" className="submitButton" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
