import React from "react";
import DashboardLayout from "../DashboardLayout";
import "../../../stylesheets/Dashboard/Dashboard.css";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3
              style={{
                color: "var(--headingColor)",
                fontWeight: "500",
                fontSize: "1.5rem",
              }}
            >
              Welcome Alumini!
            </h3>
            <ul className="breadcrumb">
              <li
                style={{
                  color: "var(--textLight)",
                  fontSize: "1rem",
                }}
              >
                Welcome back in your dashboard
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
          <div className="info-card">
            <span className="info-icon first-icon">
              <i className="fa-solid fa-graduation-cap"></i>
            </span>

            <h3 className="info-count">00</h3>

            <p className="info-label">Total Students</p>
          </div>
        </div>

        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
          <div className="info-card">
            <span className="info-icon second-icon">
              <i className="fa-solid fa-display"></i>
            </span>

            <h3 className="info-count">00</h3>

            <p className="info-label">Total Vacancies You Have Post</p>
          </div>
        </div>

        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
          <div className="info-card">
            <span className="info-icon third-icon">
              <i className="fa-solid fa-hand-holding-dollar"></i>
            </span>

            <h3 className="info-count">00</h3>

            <p className="info-label">Total Revenue</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
