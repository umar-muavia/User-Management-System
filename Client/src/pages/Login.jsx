import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      console.log(response.data);
      if (response.data.status === "OK") {
      // Save the token and user information in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user-Name", response.data.username);
        alert("Welcome to our website");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className="register-main-div login-main-div">
        <div className="card register-div">
          <h3 className="register-text">Login Your Account</h3>
          <form className="form" onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <p className="mt-3">
            Don't have an account? <NavLink to="/register">Register</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
