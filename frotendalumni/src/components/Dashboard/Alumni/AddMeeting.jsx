import React, { useState, useEffect } from "react";
import DashboardLayout from "../DashboardLayout.jsx";
import "../../../stylesheets/Dashboard/ProfileSetting.css";
import { DatePicker, Input, Select, message } from "antd";
import { API_URL } from "../../../store/apiurl.js";

const URL = `${API_URL}/api/v1/meeting/addMeeting`;
const { TextArea } = Input;

const AddMeeting = () => {
  const token = localStorage.getItem("token");
  const [alumniId, setAlumniId] = useState(null);
  let userDataString = localStorage.getItem('userData');

  // Step 2: Parse the JSON string to a JavaScript object
  let userData = null;
  
  // Step 3: Access the _id field
  let userId = "";
  if (userDataString) {
    try {
      userData = JSON.parse(userDataString);
      userId = userData._id || "";
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
  
  if (!userId) {
    console.error("User ID is missing or invalid.");
  }
  useEffect(() => {
   
    
    const storedAlumniId = userId;
    if (storedAlumniId) {
      setAlumniId(storedAlumniId);
    }
  }, []);

  const [formData, setFormData] = useState({
    platform: "Zoom",
  });

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const formattedData = {
        title: event.target.elements.title.value,
        description: event.target.elements.description.value,
        date: event.target.elements.date.value,
        time: event.target.elements.time.value,
        url: event.target.elements.url.value,
        platform: formData.platform,
        location: event.target.elements.location.value,
        alumni_id: alumniId,
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
        message.success("Meeting created successfully!");
      } else {
        const errorData = await response.json();
        message.error("Could not create meeting: " + errorData.message);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      message.error("An error occurred while creating the event. Please try again later.");
    }
  };

  return (
    <DashboardLayout>
      <div className="profile-setting" style={{ marginBottom: "10rem" }}>
        <div className="w-100 mb-3 rounded mb-5 p-2">
          <h5 className="text-title mb-5 mt-3">Create a Meeting</h5>
          <form className="row form-row" onSubmit={onSubmit}>
            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Event Title <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Event Title"
                  type="text"
                  name="title"
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Date <span className="text-danger">*</span>
                </label>
                <DatePicker
                  className="text-input-field"
                  placeholder="Select Date"
                  format="YYYY-MM-DD"
                  name="date"
                  style={{ width: "100%", padding: "12px" }}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Time <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Time (HH:MM)"
                  type="time"
                  name="time"
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Platform <span className="text-danger">*</span>
                </label>
                <Select
                  className="dropdown"
                  onChange={(value) => handleChange(value, "platform")}
                  placeholder="Select Platform"
                  value={formData.platform}
                  style={{ width: "100%" }}
                  required
                >
                  <Select.Option value="Zoom">Zoom</Select.Option>
                  <Select.Option value="Google Meet">Google Meet</Select.Option>
                  <Select.Option value="Microsoft Teams">Microsoft Teams</Select.Option>
                </Select>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Event URL <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Event URL"
                  type="url"
                  name="url"
                  required
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Location <span className="text-danger">*</span>
                </label>
                <input
                  className="text-input-field"
                  placeholder="Location"
                  type="text"
                  name="location"
                  required
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group mb-2 card-label">
                <label className="label-style">
                  Description <span className="text-danger">*</span>
                </label>
                <TextArea
                  className="text-input-field"
                  rows={5}
                  placeholder="Description"
                  name="description"
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn my-3">
                Create Meeting
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </DashboardLayout>
  );
};

export default AddMeeting;
