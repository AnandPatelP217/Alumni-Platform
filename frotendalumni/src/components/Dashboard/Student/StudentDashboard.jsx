import React from "react";
import DashboardLayout from "../DashboardLayout";

const StudentDashboard = () => {
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
              Welcome Student!
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
      <div>No Vacancies Available</div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
