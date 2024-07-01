import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user-Name");
    navigate("/login");
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default Logout;
