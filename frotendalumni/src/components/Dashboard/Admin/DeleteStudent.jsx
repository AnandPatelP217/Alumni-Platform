import React, { useState } from "react";
import DashboardLayout from "../DashboardLayout";
import "../../../stylesheets/Dashboard/ProfileSetting.css";
import { Input, message } from "antd";
import { API_URL } from "../../../store/apiurl";

const DeleteStudent = () => {
  const token = localStorage.getItem("token");
  
  const [StudentId, setStudentId] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/v1/Student/deleteStudentById/${StudentId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        message.success("Student deleted successfully!");
        setStudentId(""); // Clear the form
      } else {
        const errorData = await response.json();
        message.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting Student:", error);
      message.error(
        "An error occurred while deleting the Student. Please try again later."
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="profile-setting" style={{ marginBottom: "10rem" }}>
        <div className="w-100 mb-3 rounded mb-5 p-2">
          <h5 className="text-title mb-5 mt-3">Delete Student</h5>
          <form className="row form-row" onSubmit={onSubmit}>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Student ID <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Student ID"
                  type="text"
                  name="StudentId"
                  value={StudentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn my-3">
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeleteStudent;
