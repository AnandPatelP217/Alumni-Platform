import React, { useState } from "react";
import DashboardLayout from "../DashboardLayout";
import "../../../stylesheets/Dashboard/ProfileSetting.css";
import { message } from "antd";
import { API_URL } from "../../../store/apiurl";

const DeleteAlumni = () => {
  const token = localStorage.getItem("token");
  
  const [alumniId, setAlumniId] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/v1/alumni/deleteAlumniById/${alumniId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        message.success("Alumni deleted successfully!");
        setAlumniId(""); // Clear the form
      } else {
        const errorData = await response.json();
        message.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting alumni:", error);
      message.error(
        "An error occurred while deleting the alumni. Please try again later."
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="profile-setting" style={{ marginBottom: "10rem" }}>
        <div className="w-100 mb-3 rounded mb-5 p-2">
          <h5 className="text-title mb-5 mt-3">Delete Alumni</h5>
          <form className="row form-row" onSubmit={onSubmit}>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Alumni ID <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Alumni ID"
                  type="text"
                  name="alumniId"
                  value={alumniId}
                  onChange={(e) => setAlumniId(e.target.value)}
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

export default DeleteAlumni;
