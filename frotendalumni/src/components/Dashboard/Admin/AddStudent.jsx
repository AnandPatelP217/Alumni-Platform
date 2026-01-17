import React, { useState } from "react";
import DashboardLayout from "../DashboardLayout";
import "../../../stylesheets/Dashboard/ProfileSetting.css";
import { Select, DatePicker, Input, message, Button, Upload, Space } from "antd";
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons"; // <-- Import these icons
import moment from "moment"; // <-- Import moment for date handling
import { API_URL } from "../../../store/apiurl.js";
const URL = `${API_URL}/api/v1/student/addStudent`;
const { Option } = Select;

const AddStudent = () => {
  const token = localStorage.getItem("token");

  const [batchStart, setBatchStart] = useState(null);
  const [batchEnd, setBatchEnd] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [certificates, setCertificates] = useState([{ certificateName: "", issuedBy: "", issueDate: null }]);

  

  const [formData, setFormData] = useState({
    role: "Select Role",
    gender: "Select Gender",
    enrollmentStatus: "Select Status",
  });

  const onStartDateChange = (date, dateString) => setBatchStart(dateString);
  const onEndDateChange = (date, dateString) => setBatchEnd(dateString);

  const handleChange = (value, name) =>
    setFormData({ ...formData, [name]: value });

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      setFormData({ ...formData, profilePicture: info.file.response.url });
    }
  };

  const handleCertificateChange = (index, key, value) => {
    const newCertificates = [...certificates];
    newCertificates[index][key] = value;
    setCertificates(newCertificates);
  };

  const addCertificateField = () =>
    setCertificates([...certificates, { certificateName: "", issuedBy: "", issueDate: null }]);

  const removeCertificateField = (index) => {
    const newCertificates = certificates.filter((_, i) => i !== index);
    setCertificates(newCertificates);
  };


  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const formattedData = {
        name: event.target.elements.name?.value || "",
        roll: event.target.elements.rollNumber?.value || "",
        departmentId: formData.departmentId || "",
        batch_start: batchStart || null, // Using the state for batch start
        batch_end: batchEnd || null,     // Using the state for batch end
        email: event.target.elements.email?.value || "",
        role: formData.role || "student", // Ensure role is set correctly
        password: event.target.elements.password?.value || "",
        skills: event.target.elements.skills?.value.split(",") || [], // Convert skills to an array
        certificates: certificates.filter(
          cert => cert.certificateName && cert.issuedBy && cert.issueDate
        ), // Filter only valid certificates
        profilePicture: formData.profilePicture || null,
      };
  
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(formattedData),
      });
  
      if (response.ok) {
        event.target.reset(); // Clear the form
        message.success("Student added successfully!");
      } else {
        message.error("Can not add student!");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      message.error("An error occurred while adding the student. Please try again later.");
    }
  };
  return (
    <DashboardLayout>
      <div className="profile-setting" style={{ marginBottom: "10rem" }}>
        <div className="form-container w-100 mb-3 rounded mb-5 p-4">
          <h5 className="text-title mb-5 mt-3">Add Student</h5>
          <form className="row form-row" onSubmit={onSubmit}>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Name"
                  type="text"
                  name="name"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">Gender</label>
                <Select
                  className="dropdown"
                  onChange={(value) => handleChange(value, "gender")}
                  placeholder="Select Gender"
                  value={formData.gender}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">Roll Number<span className="text-danger">*</span></label>
                <input
                  className="text-input-field"
                  placeholder="Roll Number"
                  type="text"
                  name="rollNumber"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">Department Name<span className="text-danger">*</span></label>
                <Select
                  className="dropdown"
                  onChange={(value) =>
                    handleChange(value, "departmentId")
                  }
                  placeholder="Select Status"
                  value={formData.departmentId}
                >
                  <Option value="Computer Science">Computer Science</Option>
                  <Option value="Computer Science-AIML">Computer Science-AIML</Option>
                  <Option value="Computer Science-IOT">Computer Science-IOT</Option>
                  <Option value="Mechanical">Mechanical</Option>
                  <Option value="Civil">Civil</Option>
                  <Option value="Electrical">Electrical</Option> 
                  <Option value="Electronic Communication">Electronic Communication</Option>
                </Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">Batch Start Year<span className="text-danger">*</span></label>
                <DatePicker
                  onChange={onStartDateChange}
                  className="dob-input-field"
                  placeholder="Batch Start Year"
                  format="YYYY"
                  name="batchStart"
                  style={{ width: "100%", padding: "12px" }}
                  picker="year"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">Batch End Year<span className="text-danger">*</span></label>
                <DatePicker
                  onChange={onEndDateChange}
                  className="dob-input-field"
                  placeholder="Batch End Year"
                  format="YYYY"
                  name="batchEnd"
                  style={{ width: "100%", padding: "12px" }}
                  picker="year"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Email"
                  type="email"
                  name="email"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">Date of Birth</label>
                <input
                  className="text-input-field"
                  placeholder="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                 
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">Address</label>
                <input
                  className="text-input-field"
                  placeholder="Address"
                  type="text"
                  name="address"
            
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">Guardian Contact</label>
                <input
                  className="text-input-field"
                  placeholder="Guardian Contact"
                  type="text"
                  name="guardianContact"
       
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">Enrollment Status</label>
                <Select
                  className="dropdown"
                  onChange={(value) =>
                    handleChange(value, "enrollmentStatus")
                  }
                  placeholder="Select Status"
                  value={formData.enrollmentStatus}
                >
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">Courses Enrolled</label>
                <input
                  className="text-input-field"
                  placeholder="Courses (comma separated)"
                  type="text"
                  name="coursesEnrolled"
              
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">Skills</label>
                <input
                  className="text-input-field"
                  placeholder="Skills (comma separated)"
                  type="text"
                  name="skills"
              
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group mb-2 card-label">
                <label className="label-style">Certificates</label>
                {certificates.map((certificate, index) => (
                  <div key={index} className="certificate-field mb-2">
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                      <Input
                        className="text-input-field"
                        placeholder="Certificate Name"
                        value={certificate.certificateName}
                        onChange={(e) => handleCertificateChange(index, "certificateName", e.target.value)}
                      />
                      <Input
                        className="text-input-field"
                        placeholder="Issued By"
                        value={certificate.issuedBy}
                        onChange={(e) => handleCertificateChange(index, "issuedBy", e.target.value)}
                      />
                      <DatePicker
                        onChange={(date, dateString) =>
                          handleCertificateChange(index, "issueDate", dateString)
                        }
                        className="dob-input-field"
                        placeholder="Issue Date"
                        format="YYYY-MM-DD"
                        value={certificate.issueDate ? moment(certificate.issueDate) : null}
                        style={{ width: "100%" }}
                      />
                      {certificates.length > 1 && (
                        <MinusCircleOutlined
                          className="ml-2"
                          onClick={() => removeCertificateField(index)}
                          style={{ color: "red", marginLeft: "8px", fontSize: "16px" }}
                        />
                      )}
                    </Space>
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={addCertificateField}
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  <PlusOutlined /> Add Certificate
                </Button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">Profile Picture</label>
                <Upload
                  name="profilePicture"
                  listType="picture"
                  onChange={handleFileChange}
                  className="profile-upload"
                >
                  <Button icon={<UploadOutlined />}>Upload Picture</Button>
                </Upload>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group mb-2 card-label">
                <label className="label-style">About</label>
                <Input.TextArea
                  placeholder="About the student"
                  name="about"
                
                  rows={4}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label className="label-style">Role<span className="text-danger">*</span></label>
                  <Select
                    className="dropdown"
                    onChange={(value) => handleChange(value, "role")}
                    placeholder="Role"
                    value={formData.role}
                  >
                    <Option value="student">Student</Option>
                  </Select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label className="label-style">Password<span className="text-danger">*</span></label>
                  <Input.Password
                    placeholder="Password"
                    name="password"
                    visibilityToggle={{
                      visible: passwordVisible,
                      onVisibleChange: setPasswordVisible,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary my-3">
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddStudent;