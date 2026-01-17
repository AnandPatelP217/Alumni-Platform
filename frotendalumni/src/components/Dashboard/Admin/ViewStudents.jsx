import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { API_URL } from "../../../store/apiurl.js";
import "../../../stylesheets/Dashboard/CommonViewStyles.css";
const URL = `${API_URL}/api/v1/admin/getAllStudent`;

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState(""); // Sorting state
  const [tableHeight] = useState(500); // Fixed table height for vertical scrolling
  
  const authorizationToken = localStorage.getItem("token");
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [studentsPerPage] = useState(10); // Number of students per page

  const getAllStudentData = async () => {
    if (!authorizationToken) return;
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
        setStudents(data);
        setFilteredStudents(data); // Initialize filteredStudents with all students
      } else {
        console.error("Failed to fetch students:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset to page 1 after search
  };

  // Sort students based on selected criteria
  const handleSort = (criteria) => {
    let sortedStudents = [...filteredStudents]; // Create a copy of the current list

    if (criteria === 'department') {
      sortedStudents.sort((a, b) => a.departmentId.localeCompare(b.departmentId));
    } else if (criteria === 'batchStart') {
      sortedStudents.sort((a, b) => a.batch_start - b.batch_start);
    } else if (criteria === 'batchEnd') {
      sortedStudents.sort((a, b) => a.batch_end - b.batch_end);
    }

    setFilteredStudents(sortedStudents); // Update with the sorted list
    setSortCriteria(criteria); // Set the sorting criteria
    setCurrentPage(1); // Reset to page 1 after sorting
  };

  useEffect(() => {
    if(authorizationToken){
    getAllStudentData();}
  }, [authorizationToken]);

  // Get the current students based on pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Calculate total pages
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <DashboardLayout>
      <div className="view-container">
        <div className="view-header">
          <h2 className="view-title">Students Management</h2>
          <p className="view-subtitle">View and manage all registered students</p>
        </div>

        <div className="view-controls">
          <input
            type="text"
            placeholder="Search by name"
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
            <option value="department">Department</option>
            <option value="batchStart">Batch Start</option>
            <option value="batchEnd">Batch End</option>
          </select>
        </div>
        {currentStudents.length === 0 ? (
          <div className="view-empty-state">
            <div className="view-empty-icon">
              <i className="fas fa-user-graduate"></i>
            </div>
            <h3>No Students Found</h3>
            <p>No students match your search criteria.</p>
          </div>
        ) : (
          <div className="view-table-container">
            <div className="view-table-wrapper">
              <table className="view-table">
              <thead>
                <tr>
                  <th className="th-style">S.No</th>
                  <th className="th-style">Name</th>
                  <th>Roll</th>
                  <th>Department ID</th>
                  <th>Batch Start</th>
                  <th>Batch End</th>
                  <th>Email</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Guardian Contact</th>
                  <th>Enrollment Status</th>
                  <th>Courses Enrolled</th>
                  <th>Profile Picture</th>
                  <th>About</th>
                  <th>Certificates</th>
                  <th>Skills</th>
                  <th>Id</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student, index) => (
                  <tr key={student._id}>
                    <td>{indexOfFirstStudent + index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.roll}</td>
                    <td>{student.departmentId}</td>
                    <td>{student.batch_start}</td>
                    <td>{student.batch_end}</td>
                    <td>{student.email}</td>
                    <td>
                      {new Date(student.dateOfBirth).toLocaleDateString()}
                    </td>
                    <td>{student.gender}</td>
                    <td>{student.address}</td>
                    <td>{student.guardianContact}</td>
                    <td>{student.enrollmentStatus}</td>
                    <td>
                      {student.coursesEnrolled.join(", ")}
                    </td>
                    <td>
                      {student.profilePicture ? (
                        <img
                          src={student.profilePicture}
                          alt={student.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/path/to/default-avatar.png";
                          }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>{student.about}</td>
                    <td>
                      {student.certificates
                        .map((cert) => cert.certificateName)
                        .join(", ")}
                    </td>
                    <td>{student.skills.join(", ")}</td>
                    <td>{student._id}</td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
            <div className="view-pagination">
              <button
                onClick={handlePreviousPage}
                className="view-btn view-btn-secondary view-btn-sm"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="view-pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                className="view-btn view-btn-secondary view-btn-sm"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewStudents;
