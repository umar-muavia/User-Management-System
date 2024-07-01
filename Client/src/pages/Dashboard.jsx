import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
import AddUserBtn from "../components/AddUserBtn";
import Logout from "../components/Logout";
import { isTokenExpired } from "../utils/auth";

const Dashboard = () => {
  const [userName, setUserName] = useState("user");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Initial check if token is expired
    if (isTokenExpired()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user-Name");
      navigate("/login");
    } else {
      // Fetch token and userName from local storage to refresh table data
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
      const storedUserName = localStorage.getItem("user-Name");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }

    // Set interval to check for token expiration every minute
    const intervalId = setInterval(() => {
      if (isTokenExpired()) {
        localStorage.removeItem("token");
        localStorage.removeItem("user-Name");
        navigate("/login");
      }
    }, 60000); // 60000 ms = 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <>
      <h2 className="dashboard-title">Welcome to User Management System</h2>
      <h4 className="user-name">Hi {userName}</h4>
      <div className="btns-div">
        <AddUserBtn></AddUserBtn>
        <Logout></Logout>
      </div>
      <UserTable token={token} userName={userName}></UserTable>
    </>
  );
};

export default Dashboard;
