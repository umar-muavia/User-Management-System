import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; // get token using routes

function EditAddUser() {
  const { id } = useParams();
  const { state } = useLocation(); // get token
  const token = state?.token; // get token
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    city: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`http://localhost:3000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/users/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = async () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="register-form-div">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>User Edit Form</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={user.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={user.city}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Update
          </button>
          <button className="btn btn-primary cancel" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default EditAddUser;
