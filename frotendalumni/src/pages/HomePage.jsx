import React from "react";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import { useNavigate } from "react-router-dom";
import SecondComponent from "../components/HomeComponent/SecondComponent";
import FirstComponent from "../components/HomeComponent/FirstComponent";
import ThirdComponent from "../components/HomeComponent/ThirdComponent";
import FourthComponent from "../components/HomeComponent/FourthComponent";
import FifthComponent from "../components/HomeComponent/FifthComponent";

const HomePage = () => {
  const navigate = useNavigate();


  const authorizationToken = localStorage.getItem("token");
  
  if (!authorizationToken) {
    navigate("/");
  }

  return (
    <>
      <Header/>
      <FirstComponent/>
     <SecondComponent/>
      <ThirdComponent/>
      <FourthComponent/>
     <FifthComponent/>
      <Footer/>
    </>
  );
};

export default HomePage;
