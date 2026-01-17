import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth.js";
import { isNotEmpty, validateEmail } from "../../utils/constant.js";
import { message, Spin } from "antd";
import { API_URL } from "../../store/apiurl.js";
import "./login.css";
import Lottie from "lottie-react";
import loginAnimation from "../../animations/striper1.json";

const URL = `${API_URL}/api/v1/auth/login`;

const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { storeTokenInLS, setRole, setUserId, setUserData } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });

    if (name === "email") {
      setErrors({
        ...errors,
        [name]: validateEmail(value) ? "" : "Please enter a valid email address",
      });
    } else if (name === "password") {
      setErrors({
        ...errors,
        [name]: isNotEmpty(value) ? "" : "Password is required",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role);
        storeTokenInLS(data.token);
        setUserData(data.user);
        localStorage.setItem("userData", JSON.stringify(data.user));
        setRole(JSON.stringify(data.role));
        setUserId(JSON.stringify(data.user._id));

        setUser({ email: "", password: "" });
        message.success("Login successful! Redirecting...");

        switch (data.role) {
          case "admin":
            navigate("/admin");
            break;
          case "alumni":
            navigate("/dashboard");
            break;
          case "student":
            navigate("/student");
            break;
          default:
            break;
        }
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Invalid credentials");
      }
    } catch (error) {
      message.error("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-illustration">
          <div className="animation-container">
            <Lottie
              animationData={loginAnimation}
              loop={true}
              className="login-animation"
            />
          </div>
          <div className="illustration-content">
            <h2>Welcome Back!</h2>
            <p>
              Sign in to access your personalized dashboard and connect with the community
            </p>
          </div>
        </div>

        <div className="login-form-wrapper">
          <div className="login-form-container">
            <div className="form-header">
              <h1>Login to Your Account</h1>
              <div className="header-divider"></div>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className={`form-group ${errors.email ? "error" : ""}`}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  disabled={isLoading}
                  placeholder="Enter your email"
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className={`form-group ${errors.password ? "error" : ""}`}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  disabled={isLoading}
                  placeholder="Enter your password"
                  className={errors.password ? "input-error" : ""}
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <button
                type="submit"
                className={`login-btn ${isHovered ? "hovered" : ""}`}
                disabled={isLoading}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isLoading ? (
                  <Spin indicator={<span className="spinner" />} />
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="form-footer">
                <a href="/forgot-password" className="forgot-password">
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
