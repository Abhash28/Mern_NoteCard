import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [fromData, setfromData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        fromData,
        { withCredentials: true }
      );
      console.log("Login successfully", response);
      setfromData({ email: "", password: "" });
      alert("Login successfully");
      navigate("/");
    } catch (error) {
      console.log("Error while login", error);
      setfromData({ email: "", password: "" });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form
            onSubmit={handleLogin}
            className="border p-4 shadow rounded bg-light"
          >
            <h2 className="text-center mb-4">Login</h2>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={fromData.email}
                onChange={(e) => {
                  setfromData({ ...fromData, email: e.target.value });
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={fromData.password}
                onChange={(e) => {
                  setfromData({ ...fromData, password: e.target.value });
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>

            <p className="mt-3 text-center">
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
