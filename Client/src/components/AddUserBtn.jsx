import React from "react";
import { NavLink } from "react-router-dom";

function AddUserBtn() {
  return (
    <>
      <div className="add-btn-div">
        <NavLink to="/create-user">
          <button className="btn btn-primary">Add User</button>
        </NavLink>
      </div>
    </>
  );
}

export default AddUserBtn;
