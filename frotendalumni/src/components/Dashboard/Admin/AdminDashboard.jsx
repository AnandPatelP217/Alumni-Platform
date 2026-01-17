import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { API_URL } from "../../../store/apiurl.js";
import "../../../stylesheets/Dashboard/Dashboard.css";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalAlumnis, setTotalAlumnis] = useState(0);
  const [totalVacancies, setTotalVacancies] = useState(0);
  const [loading, setLoading] = useState({
    students: true,
    alumnis: true,
    vacancies: true
  });

  const fetchCounts = async (endpoint, setter, key) => {
    const authorizationToken = localStorage.getItem("token");
    const URL = `${API_URL}${endpoint}`;

    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setter(data.length);
      } else {
        console.error(`Failed to fetch ${key}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  useEffect(() => {
    fetchCounts("/api/v1/vacancy/getAllVacancies", setTotalVacancies, "vacancies");
    fetchCounts("/api/v1/admin/getAllAlumni", setTotalAlumnis, "alumnis");
    fetchCounts("/api/v1/admin/getAllStudent", setTotalStudents, "students");
  }, []);

  return (
    <DashboardLayout>
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h3>Welcome Admin!</h3>
          <p>Welcome back to your dashboard</p>
        </div>

        <div className="cards-container">
          {/* Students Card */}
          <div className="info-card">
            <span className="info-icon first-icon">
              <i className="fa-solid fa-graduation-cap"></i>
            </span>
            <h3 className="info-count">
              {loading.students ? <i className="fas fa-spinner fa-spin"></i> : totalStudents}
            </h3>
            <p className="info-label">Total Students</p>
            <NavLink to="/admin/ViewStudents" className="info-link">
              View All Students
            </NavLink>
          </div>

          {/* Alumni Card */}
          <div className="info-card">
            <span className="info-icon third-icon">
              <i className="fa-solid fa-user-tie"></i>
            </span>
            <h3 className="info-count">
              {loading.alumnis ? <i className="fas fa-spinner fa-spin"></i> : totalAlumnis}
            </h3>
            <p className="info-label">Total Alumni</p>
            <NavLink to="/admin/ViewAlumnis" className="info-link">
              View All Alumni
            </NavLink>
          </div>

          {/* Vacancies Card */}
          <div className="info-card">
            <span className="info-icon second-icon">
              <i className="fa-solid fa-briefcase"></i>
            </span>
            <h3 className="info-count">
              {loading.vacancies ? <i className="fas fa-spinner fa-spin"></i> : totalVacancies}
            </h3>
            <p className="info-label">Total Vacancies</p>
            <NavLink to="/admin/vacancies" className="info-link">
              View All Vacancies
            </NavLink>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;