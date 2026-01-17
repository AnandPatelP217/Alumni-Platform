import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout.jsx";
import { API_URL } from "../../../store/apiurl.js";
import "../../../stylesheets/Dashboard/CommonViewStyles.css";

const ViewAlumnis = () => {
  const [alumnis, setAlumnis] = useState([]);
  const [filteredAlumnis, setFilteredAlumnis] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

  const authorizationToken = localStorage.getItem("token");

  const getAllAlumniData = async () => {
    if (!authorizationToken) return;
    try {
      const response = await fetch(`${API_URL}/api/v1/admin/getAllAlumni`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
        setAlumnis(data);
        setFilteredAlumnis(data);
      } else {
        console.error("Failed to fetch Alumnis:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching Alumnis:", error);
    }
  };

  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = alumnis.filter((alumni) =>
      alumni.name.toLowerCase().includes(lowerCaseQuery) ||
      alumni._id.toLowerCase() === lowerCaseQuery ||
      alumni.email.toLowerCase() === lowerCaseQuery
    );
    setFilteredAlumnis(filtered);
  };

  const handleSort = (criteria) => {
    let sortedAlumnis = [...filteredAlumnis];
    if (criteria === "branch") {
      sortedAlumnis.sort((a, b) => a.departmentId.localeCompare(b.departmentId));
    } else if (criteria === "batch") {
      sortedAlumnis.sort((a, b) => a.graduationYear - b.graduationYear);
    }
    setFilteredAlumnis(sortedAlumnis);
    setSortCriteria(criteria);
  };

  useEffect(() => {
    if (authorizationToken) {
      getAllAlumniData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizationToken]);

  return (
    <DashboardLayout>
      <div className="view-container">
        <div className="view-header">
          <h2 className="view-title">Alumni Management</h2>
          <p className="view-subtitle">View and manage all registered alumni</p>
        </div>

        <div className="view-controls">
          <input
            type="text"
            placeholder="Search by name, email or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="view-search-input"
          />
          <button onClick={handleSearch} className="view-btn view-btn-primary">
            Search
          </button>
          <select
            value={sortCriteria}
            onChange={(e) => handleSort(e.target.value)}
            className="view-select"
          >
            <option value="">Sort by</option>
            <option value="branch">Branch (Department)</option>
            <option value="batch">Batch (Graduation Year)</option>
          </select>
        </div>

        {filteredAlumnis.length === 0 ? (
          <div className="view-empty-state">
            <div className="view-empty-icon">
              <i className="fas fa-user-tie"></i>
            </div>
            <h3>No Alumni Found</h3>
            <p>No alumni match your search criteria.</p>
          </div>
        ) : (
          <div className="view-table-container">
            <div className="view-table-wrapper">
              <table className="view-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Department ID</th>
                  <th>Email</th>
                  <th>Graduation Year</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Current Organisation</th>
                  <th>Expertise</th>
                  <th>Designation and Job Info</th>
                  <th>About</th>
                  <th>Role</th>
                  <th>LinkedIn</th>
                  <th>UserId</th>
                </tr>
              </thead>
                <tbody>
                  {filteredAlumnis.map((alumni, index) => (
                    <tr key={alumni._id}>
                      <td>{index + 1}</td>
                      <td>{alumni.name}</td>
                      <td>{alumni.roll_no}</td>
                      <td>{alumni.departmentId}</td>
                      <td>{alumni.email}</td>
                      <td>{alumni.graduationYear}</td>
                      <td>{alumni.gender}</td>
                      <td>{alumni.address}</td>
                      <td>{alumni.phone}</td>
                      <td>{alumni.current_company}</td>
                      <td>{alumni.expertise.join(", ")}</td>
                      <td>{alumni.job_info}</td>
                      <td>{alumni.about}</td>
                      <td>{alumni.role}</td>
                      <td>
                        <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>
                      </td>
                      <td>{alumni._id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewAlumnis;
