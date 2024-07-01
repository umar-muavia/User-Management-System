import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/register", {
        name,
        username,
        email,
        password,
      });
      console.log(response.data);
      if (response.data.status === "OK") {
        alert("Your Registration Complete Successfully");
        navigate("/login");
      }
    } 
    catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="register-main-div">
        <div className="card register-div">
          <h3 className="register-text">Register Your Self</h3>
          <form className="form" onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
              Register
            </button>
          </form>
          <p className="mt-3">
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
