import React, { useState } from "react";
import Background3D from "../components/Background3D";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      setError("Please fill in all fields correctly");
      return;
    }

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError("");
    console.log("Login form submitted:", formData);
  };

  return (
    <div className="container">
      <Navbar />
      <Background3D />
      <div
        className="glass-card"
        style={{
          maxWidth: "400px",
          margin: "200px auto",
          padding: "20px",
        }}
      >
        <h1
          className="text-gradient"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              placeholder="Enter your email"
              title="Please enter a valid email address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              placeholder="Enter your password"
              title="Password must be at least 6 characters long"
            />
          </div>
          {error && (
            <div
              style={{
                color: "red",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Login
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          Don't have an account?{" "}
          <a
            onClick={() => navigate("/signup")}
            style={{
              cursor: "pointer",
              color: "var(--primary-color)",
              textDecoration: "underline",
            }}
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
