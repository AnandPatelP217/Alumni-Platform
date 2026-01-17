import React from "react";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import PageNotFound from "../../animations/page_not_found.json";
import "../../stylesheets/Other/NotFound.css";
import Header from "../Shared/Header/Header";

const NotFound = () => {
  return (
    <>
      <Header />

      <section id="not-found" className="not-found-section">
        <div className="container">
          <div className="page-not-found-content">
            <div className="animation-container">
              <Lottie
                loop={true}
                animationData={PageNotFound}
                className="lottie-animation"
              />
            </div>
            <div className="text-content">
              <h2 className="title">Page Not Found</h2>
              <p className="description">
                The page you're looking for might have been removed, had its name changed, 
                or is temporarily unavailable.
              </p>
              <NavLink to="/" className="home-button">
                Return to Homepage
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;