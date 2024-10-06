import React, { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS for consistent styling

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ email, password });
      console.log("Registration Response:", response.data);
      alert(response.data.message);
      navigate("/"); // Redirect to the login page or home
    } catch (error) {
      console.error(
        "Registration Error:",
        error.response ? error.response.data : error.message
      );
      alert(
        error.response ? error.response.data.message : "Registration failed"
      );
    }
  };

  return (
    <div className="login-page"> {/* Unique class for styling consistency */}
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Register</h2>
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
