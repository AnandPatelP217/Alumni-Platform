import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { API_URL } from "../../../store/apiurl.js";
import { message } from "antd";
import "../../../stylesheets/Dashboard/CommonViewStyles.css";
import "../../../stylesheets/Dashboard/ViewVacancies.css";

const vacanciesURL = `${API_URL}/api/v1/vacancy/getAllVacancies`;
const studentsURL = `${API_URL}/api/v1/admin/getAllStudent`;

const ViewVacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [matchingStudents, setMatchingStudents] = useState([]);
  const [isAdminApproved, setIsAdminApproved] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const authorizationToken = localStorage.getItem('token');

  const getAllVacancyData = async () => {
    if(!authorizationToken) return;
    try {
      const response = await fetch(vacanciesURL, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVacancies(data);
      } else {
        message.error("Failed to fetch vacancies");
      }
    } catch (error) {
      message.error("Error fetching vacancies");
    }
  };

  const getAllStudentData = async () => {
    try {
      const response = await fetch(studentsURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        message.error("Failed to fetch students");
      }
    } catch (error) {
      message.error("Error fetching students");
    }
  };

  const findMatchingStudents = (vacancyId, vacancySkills) => {
    const rankedStudents = students
      .map((student) => {
        const matchingSkillsCount = student.skills.filter((skill) =>
          vacancySkills.includes(skill)
        ).length;
        return { ...student, matchingSkillsCount };
      })
      .filter((student) => student.matchingSkillsCount > 0)
      .sort((a, b) => b.matchingSkillsCount - a.matchingSkillsCount)
      .slice(0, 10);

    setSelectedVacancy(vacancyId);
    setMatchingStudents(rankedStudents);
  };

  const printMatchingStudents = () => {
    window.print();
  };

  const handleApprovalRequest = (vacancyId, matchingStudents) => {
    setShowApprovalModal(true);
  };

  const approveRequest = async () => {
    setIsAdminApproved(true);
    setShowApprovalModal(false);

    try {
      const response = await fetch(`${API_URL}/api/v1/vacancy/${selectedVacancy}/recommended-students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorizationToken}`,
        },
        body: JSON.stringify({
          studentIds: matchingStudents.map(student => student._id),
        }),
      });

      if (response.ok) {
        message.success("Top 10 students sent to alumni successfully!");
      } else {
        console.error("Failed to send data to alumni:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data to alumni:", error);
    }
  };

  useEffect(() => {
    if(authorizationToken){
      getAllVacancyData();
      getAllStudentData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizationToken]);

  return (
    <DashboardLayout>
      <div className="vacancies-container">
        {/* Header Section */}
        <div className="vacancies-header">
          <h2 className="vacancies-title">Job Vacancies Management</h2>
          <p className="vacancies-subtitle">View and manage all available job vacancies and matching students</p>
        </div>

        {/* Main Content */}
        {vacancies.length === 0 ? (
          <div className="no-vacancies">
            <div className="no-vacancies-icon">
              <i className="fas fa-briefcase"></i>
            </div>
            <h3>No Vacancies Available</h3>
            <p>Currently there are no job vacancies posted by alumni.</p>
          </div>
        ) : (
          <div className="vacancies-table-container">
            <div className="table-responsive">
              <table className="vacancies-table">
                <thead>
                  <tr>
                    <th>Alumni</th>
                    <th>Position</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Salary</th>
                    <th>Requirements</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vacancies.map((vacancy) => (
                    <React.Fragment key={vacancy._id}>
                      <tr className="vacancy-row">
                        <td data-label="Alumni" className="alumni-cell">
                          <div className="alumni-info">
                            <span className="alumni-id">ID: {vacancy.alumni_id}</span>
                          </div>
                        </td>
                        <td data-label="Position">
                          <span className="position-tag">{vacancy.position}</span>
                        </td>
                        <td data-label="Company">{vacancy.company}</td>
                        <td data-label="Location">
                          <span className="location-badge">
                            <i className="fas fa-map-marker-alt"></i> {vacancy.location}
                          </span>
                        </td>
                        <td data-label="Salary" className="salary-cell">
                          {vacancy.salary}
                        </td>
                        <td data-label="Requirements">
                          <div className="skills-container">
                            {vacancy.requirements.map((skill, index) => (
                              <span key={index} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </td>
                        <td data-label="Actions" className="actions-cell">
                          <button
                            onClick={() => findMatchingStudents(vacancy._id, vacancy.requirements)}
                            className="match-button"
                          >
                            <i className="fas fa-users"></i> Find Matches
                          </button>
                        </td>
                      </tr>
                      {selectedVacancy === vacancy._id && matchingStudents.length > 0 && (
                        <tr className="matching-students-row">
                          <td colSpan="7">
                            <div className="matching-students-container">
                              <div className="matching-students-header">
                                <h4>
                                  <i className="fas fa-user-graduate"></i> Top 10 Matching Students
                                  <span className="match-count">{matchingStudents.length} matches found</span>
                                </h4>
                                <div className="action-buttons">
                                  <button
                                    onClick={printMatchingStudents}
                                    className="print-button"
                                  >
                                    <i className="fas fa-print"></i> Print
                                  </button>
                                  <button
                                    onClick={() => handleApprovalRequest(vacancy._id, matchingStudents)}
                                    className="send-button"
                                  >
                                    <i className="fas fa-paper-plane"></i> Send to Alumni
                                  </button>
                                </div>
                              </div>
                              <div className="students-table-container">
                                <table className="students-table">
                                  <thead>
                                    <tr>
                                      <th>Student</th>
                                      <th>Skills</th>
                                      <th>Match Score</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {matchingStudents.map((student) => (
                                      <tr key={student._id}>
                                        <td>
                                          <div className="student-info">
                                            <div className="student-avatar">
                                              {student.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="student-details">
                                              <span className="student-name">{student.name}</span>
                                              <span className="student-id">ID: {student._id}</span>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="student-skills">
                                            {student.skills.map((skill, index) => (
                                              <span 
                                                key={index} 
                                                className={`skill-tag ${vacancy.requirements.includes(skill) ? 'matched-skill' : ''}`}
                                              >
                                                {skill}
                                              </span>
                                            ))}
                                          </div>
                                        </td>
                                        <td>
                                          <div className="match-score">
                                            <div className="score-bar">
                                              <div 
                                                className="score-fill"
                                                style={{ width: `${(student.matchingSkillsCount / vacancy.requirements.length) * 100}%` }}
                                              ></div>
                                            </div>
                                            <span className="score-value">
                                              {student.matchingSkillsCount}/{vacancy.requirements.length}
                                            </span>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Approval Modal */}
        {showApprovalModal && (
          <div className="approval-modal-overlay">
            <div className="approval-modal">
              <div className="modal-header">
                <h3><i className="fas fa-check-circle"></i> Confirm Approval</h3>
                <button 
                  onClick={() => setShowApprovalModal(false)} 
                  className="modal-close"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-icon">
                  <i className="fas fa-question-circle"></i>
                </div>
                <p>Are you sure you want to send the top {matchingStudents.length} matching students to the alumni?</p>
                <p className="modal-note">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button 
                  onClick={() => setShowApprovalModal(false)} 
                  className="modal-button cancel-button"
                >
                  Cancel
                </button>
                <button 
                  onClick={approveRequest} 
                  className="modal-button approve-button"
                >
                  <i className="fas fa-check"></i> Confirm & Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewVacancies;