import React from "react";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import Login from "../components/LoginAndRegister/LogIn";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/");
  }

  return (
    <>
      <Header />
      <Login />
      <Footer />
    </>
  );
};

export default LogInPage;
