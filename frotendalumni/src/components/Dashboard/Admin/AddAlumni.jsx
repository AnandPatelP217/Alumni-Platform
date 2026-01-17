import React, { useState } from "react";
import DashboardLayout from "../DashboardLayout";
import "../../../stylesheets/Dashboard/ProfileSetting.css";
import { Select, DatePicker, Input, message } from "antd";
import { API_URL } from "../../../store/apiurl";
import moment from "moment";
const { Option } = Select;

const AddAlumni = () => {
  const token = localStorage.getItem("token");

  const [date, settDate] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const onDateChange = (date, dateString) => {
    settDate(dateString);
  };

  const [formData, setFormData] = useState({
    role: "Select Role",
    gender: "Select Gender",
  });

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formattedData = {
      name: event.target.elements.name.value,
      phone: event.target.elements.phone.value,
      gender: formData.gender,
      graduationYear: date,
      departmentId: event.target.elements.departmentId.value,
      email: event.target.elements.email.value,
      roll_no: event.target.elements.rollNumber.value,
      role: formData.role,
      password: event.target.elements.password.value,
    };

    try {
      const response = await fetch(`${API_URL}/api/v1/alumni/addAlumni`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        message.success("Alumni added successfully!");
        event.target.reset(); // Clear the form
        setFormData({ role: "Select Role", gender: "Select Gender" });
        settDate(null);
      } else {
        message.error("Email is alredy exist OR Form Data is missing  ");
      }
    } catch (error) {
      console.error("Error adding alumni:", error);
      message.error(
        "An error occurred while adding the alumni. Please try again later."
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="profile-setting" style={{ marginBottom: "10rem" }}>
        <div className="w-100 mb-3 rounded mb-5 p-2">
          <h5 className="text-title mb-5 mt-3">Profile Setting</h5>
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
                <label className="label-style">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Phone"
                  type="tel"
                  name="phone"
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
                  required
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">Graduation Year</label>
                <DatePicker
                  onChange={onDateChange}
                  className="dob-input-field"
                  placeholder="Graduation Year"
                  format="YYYY"
                  name="graduationYear"
                  style={{ width: "100%", padding: "12px" }}
                  picker="year"
                  value={date ? moment(date, "YYYY") : null}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Department ID <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Department ID"
                  type="text"
                  name="departmentId"
                  required
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
                <label className="label-style">Roll Number</label>
                <input
                  className="text-input-field"
                  placeholder="Roll Number"
                  type="text"
                  name="rollNumber"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label className="label-style">Role</label>
                  <Select
                    className="dropdown"
                    onChange={(value) => handleChange(value, "role")}
                    placeholder="Role"
                    value={formData.role}
                    required
                  >
                    <Option value="alumni">Alumni</Option>
                  </Select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-2 card-label">
                  <label className="label-style">Password</label>
                  <Input.Password
                    placeholder="Password"
                    name="password"
                    visibilityToggle={{
                      visible: passwordVisible,
                      onVisibleChange: setPasswordVisible,
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn my-3">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddAlumni;
