import React, { useState } from "react";
import Background3D from "../components/Background3D";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    // Username validation (3-20 characters, letters, numbers, and underscores only)
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(formData.username)) {
      setError(
        "Username must be 3-20 characters long and can only contain letters, numbers, and underscores"
      );
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

    // Password strength validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password must contain at least one letter and one number");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container">
      <Navbar />
      <Background3D />
      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          className="glass-card"
          style={{
            maxWidth: "500px",
            width: "100%",
            padding: "40px",
            marginTop: "-50px",
          }}
        >
          <h1
            className="text-gradient"
            style={{ textAlign: "center", marginBottom: "30px" }}
          >
            Create Account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                pattern="[a-zA-Z0-9_]{3,20}"
                placeholder="Choose a username"
                title="3-20 characters, letters, numbers, and underscores only"
              />
            </div>
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
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                placeholder="Create a password"
                title="Minimum 6 characters, at least one letter and one number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
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
              style={{ width: "100%", marginBottom: "20px" }}
            >
              Sign Up
            </button>
          </form>
          <div style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")}
              style={{
                cursor: "pointer",
                color: "var(--primary-color)",
                textDecoration: "underline",
              }}
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
