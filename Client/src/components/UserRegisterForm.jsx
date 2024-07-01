import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserRegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Form data submitted:", response.data);
      setFormData({
        name: "",
        email: "",
        age: "",
        city: "",
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.message === "Email already exists") {
        alert("Email already exists");
      } else if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Error submitting form");
        console.error("Error submitting form:", error);
      }
    }
  };

  const handleCancel = async () => {
    navigate("/dashboard");
  };

  return (
    <div className="register-form-div">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>User Registration Form</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
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
            value={formData.email}
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
            value={formData.age}
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
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
        <button className="btn btn-primary cancel" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UserRegisterForm;
