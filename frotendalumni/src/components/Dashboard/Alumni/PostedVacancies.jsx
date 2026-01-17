import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { API_URL } from "../../../store/apiurl.js";
import { message, Modal, Table } from "antd";
import '../../../stylesheets/Dashboard/CommonViewStyles.css';

const PostedVacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [recommendedStudents, setRecommendedStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // For controlling the popup visibility

  const [updatedVacancyData, setUpdatedVacancyData] = useState({
    position: "",
    company: "",
    location: "",
    salary: "",
    requirements: "",
    description: "",
    status: "",
  });

  const authorizationToken = localStorage.getItem("token");
  let userDataString = localStorage.getItem("userData");

  let userData;
  let userId;

  try {
    userData = JSON.parse(userDataString);
    userId = userData?._id;
  } catch (error) {
    userData = null;
    userId = null;
  }

  const vacanciesURL = `${API_URL}/api/v1/vacancy/getVacanciesByAlumni/${userId}`;

  const getAllVacancyData = async () => {
    try {
      const response = await fetch(vacanciesURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
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

  // Function to delete a vacancy
  const deleteVacancy = async (vacancyId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/vacancy/deleteVacancy/${vacancyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authorizationToken}`,
          },
        }
      );

      if (response.ok) {
        getAllVacancyData();
        message.success("Job deleted successfully!");
      } else {
        message.error("Failed to delete vacancy");
      }
    } catch (error) {
      message.error("Error deleting vacancy");
    }
  };

  // Function to handle input changes in the update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVacancyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to update a vacancy using PATCH
  const updateVacancy = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/vacancy/updateVacancy/${selectedVacancy._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authorizationToken}`,
          },
          body: JSON.stringify(updatedVacancyData),
        }
      );

      if (response.ok) {
        getAllVacancyData();
        message.success("Vacancy updated successfully!");
        setSelectedVacancy(null); // Close the update form
      } else {
        message.error("Failed to update vacancy");
      }
    } catch (error) {
      message.error("Error updating vacancy");
    }
  };

  // Function to fetch recommended students for a vacancy
  const fetchRecommendedStudents = async (vacancyId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/vacancy/${vacancyId}/recommended-students`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authorizationToken}`,
          },
        }
      );

      if (response.ok) {
        const studentsData = await response.json();
        setRecommendedStudents(studentsData.recommended_students);
      
        setIsModalVisible(true); // Show the modal with student data
      } else {
        message.error("Failed to fetch students");
      }
    } catch (error) {
      message.error("Error fetching students");
    }
  };

  // Columns for the recommended students table
  const studentColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
     
    },
    {
      title: "Roll",
      dataIndex: "roll",
      key: "roll",
    },
    {
      title: "Batch",
      dataIndex: "batch_start",
      key: "batch",
      render: (text, record) => `${record.batch_start} - ${record.batch_end}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      render: (skills) => skills.join(", "),
    },
    {
      title: "Certificates",
      dataIndex: "certificates",
      key: "certificates",
      render: (certificates) =>
        certificates.map((cert) => `${cert.certificateName} (${cert.issuedBy})`).join(", "),
    },
  ];

  useEffect(() => {
    if (userId) {
      getAllVacancyData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <DashboardLayout>
      <div className="view-container">
        <div className="view-header">
          <h2>Posted Job Vacancies</h2>
          <p>Manage your job postings and view recommended students</p>
        </div>

        {vacancies.length === 0 ? (
          <div className="view-empty-state">
            <div className="view-empty-icon">
              <i className="fas fa-briefcase"></i>
            </div>
            <h3>No Vacancies Posted</h3>
            <p>You haven't posted any job vacancies yet.</p>
          </div>
        ) : (
          <div className="view-table-container">
            <div className="view-table-wrapper">
              <table className="view-table">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Salary</th>
                    <th>Requirements</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vacancies.map((vacancy) => (
                    <tr key={vacancy._id}>
                      <td>{vacancy.position}</td>
                      <td>{vacancy.company}</td>
                      <td>{vacancy.location}</td>
                      <td>{vacancy.salary}</td>
                      <td>{vacancy.requirements.join(", ")}</td>
                      <td>{vacancy.description}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button
                            className="view-button view-button-edit"
                            onClick={() => {
                              setSelectedVacancy(vacancy);
                              setUpdatedVacancyData(vacancy);
                            }}
                          >
                            Update
                          </button>
                          <button
                            className="view-button view-button-delete"
                            onClick={() => deleteVacancy(vacancy._id)}
                          >
                            Delete
                          </button>
                          <button
                            className="view-button view-button-primary"
                            onClick={() => fetchRecommendedStudents(vacancy._id)}
                          >
                            Show Students
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Update Form */}
        {selectedVacancy && (
          <div className="view-form-container">
            <h3>Update Vacancy</h3>
            <form className="row form-row">
              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label className="label-style">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={updatedVacancyData.position}
                    onChange={handleInputChange}
                    placeholder="Position"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label className="label-style">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={updatedVacancyData.company}
                    onChange={handleInputChange}
                    placeholder="Company"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label className="label-style">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={updatedVacancyData.location}
                    onChange={handleInputChange}
                    placeholder="Location"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label className="label-style">Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={updatedVacancyData.salary}
                    onChange={handleInputChange}
                    placeholder="Salary"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label className="label-style">Requirements</label>
                  <input
                    name="requirements"
                    value={updatedVacancyData.requirements}
                    onChange={handleInputChange}
                    placeholder="Requirements"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label className="label-style">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={updatedVacancyData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                  />
                </div>
              </div>
              <div className="col-12" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button 
                  type="button" 
                  className="view-button view-button-primary"
                  onClick={updateVacancy}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="view-button view-button-delete"
                  onClick={() => setSelectedVacancy(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      
       {/* Modal to show recommended students */}
       <Modal
        title="Recommended Students"
        visible={isModalVisible}
        

        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Table
        
          columns={studentColumns}
          dataSource={recommendedStudents}
          rowKey="_id"
          pagination={false}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default PostedVacancies;
