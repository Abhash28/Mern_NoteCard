import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formData, setfromData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData
      );
      console.log("Signup data posted successfully to DB", response);
      setfromData({ name: "", email: "", password: "" });
      alert("Signup successful");
      navigate("/login");
    } catch (error) {
      console.log("Error while posting signup data", error.message);
      setfromData({ name: "", email: "", password: "" });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form
            onSubmit={handleSubmit}
            className="border p-4 shadow rounded bg-light"
          >
            <h2 className="text-center mb-4">Signup</h2>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={formData.name}
                onChange={(e) =>
                  setfromData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) =>
                  setfromData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) =>
                  setfromData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Signup
            </button>

            <p className="mt-3 text-center">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
