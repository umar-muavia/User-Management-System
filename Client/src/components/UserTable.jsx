import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserTable({ token, userName }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [token, userName]); // Fetch users whenever token or userName changes

  const fetchUsers = async () => {
    if (!token) return;
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.get("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    if (!token) return;
    try {
      const response = await axios.delete(`http://localhost:3000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error.response || error);
    }
  };

  let handleEdit = (id) =>{
   navigate(`/edit-user/${id}` , { state: { token } })
  }

  if (loading) {
    return <div className="looding">Loading...</div>;
  }
  return (
    <div className="table-div">
      {users.length === 0 ? (
        <h4 className="no-user-text">No user found, please add a new user</h4>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
              <th scope="col">City</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.city}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      handleEdit(user._id);
                    }}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      handleDelete(user._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserTable;
