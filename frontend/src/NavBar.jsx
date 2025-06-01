import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Navbar() {
  const navigate = useNavigate();
  const [name, setname] = useState("");

  useEffect(() => {
    const profileData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
          {
            withCredentials: true,
          }
        );
        console.log("Profile fetch successful:", response.data.user.name);
        setname(response.data.user.name);
      } catch (error) {
        console.log(error);
      }
    };
    profileData();
  }, []);
  //fetching profile data

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/signout",
        { withCredentials: true }
      );
      console.log("Logout successfully", response);
      navigate("/login");
    } catch (error) {
      console.log("facing error while Logout", error);
      if (error.response.status === 401) {
        navigate("/login"); // Redirect to login page
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          NoteApp
        </Link>
        <div className="d-flex align-items-center gap-3 ms-auto">
          <div
            className="rounded-circle"
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#007bff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <span>{name[0]}</span> {/* Display first letter of the name */}
          </div>
          <span className="fw-bold">{name ? name : "Guest"}</span>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
