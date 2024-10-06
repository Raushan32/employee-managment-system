import React, { useState } from "react";
import { login } from "../api"; 
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await login({ email, password });
      console.log("Login Response:", response.data);

      // Check if a redirect is needed (if your API returns it)
      if (response.data.redirect) {
        navigate(response.data.redirect); // Redirect to the dashboard
      } else {
        navigate("/dashboard"); // Fallback if no redirect is provided
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          
          {error && <p className="error-message">{error}</p>}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        
        <button className="register-button" onClick={handleRegister}>
          New User? Register Here
        </button>
      </div>
    </div>
  );
};

export default Login;
