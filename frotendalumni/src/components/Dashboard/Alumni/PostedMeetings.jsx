import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { API_URL } from "../../../store/apiurl.js";
import { message } from "antd";
import '../../../stylesheets/Dashboard/CommonViewStyles.css';

const PostedMeetings = () => {
  const [meeting, setmeeting] = useState([]);
  const [tableHeight] = useState(500);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const [updatedMeetingData, setUpdatedMeetingData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    url: "",
    platform: "",
    location: "",
    feedback: "",
    attendedstudent:"",
  });

  const authorizationToken = localStorage.getItem("token");
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
      // Error parsing user data
    }
  }
  
  if (!userId) {
    message.error("User ID is missing. Please log in again.");
  }

  const meetingsURL = `${API_URL}/api/v1/meeting/getMeetingsByAlumni/${userId}`;

  const getAllMeetingData = async () => {
    try {
      const response = await fetch(meetingsURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setmeeting(data);
      } else {
        message.error("Failed to fetch meeting");
      }
    } catch (error) {
      message.error("Error fetching meeting");
    }
  };

  // Function to delete a Meeting
  const deleteMeeting = async (meetingId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/meeting/deleteMeetingById/${meetingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authorizationToken}`,
          },
        }
      );

      if (response.ok) {
        getAllMeetingData();
        message.success("Meeting deleted successfully!");
      } else {
        message.error("Failed to delete Meeting");
      }
    } catch (error) {
      message.error("Error deleting Meeting");
    }
  };

  // Function to handle input changes in the update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMeetingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to update a Meeting using PATCH
  const updateMeeting = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/meeting/updateMeetingById/${selectedMeeting._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authorizationToken}`,
          },
          body: JSON.stringify(updatedMeetingData),
        }
      );

      if (response.ok) {
        getAllMeetingData();
        message.success("Meeting updated successfully!");
        setSelectedMeeting(null); // Close the update form
      } else {
        message.error("Failed to update Meeting");
      }
    } catch (error) {
      message.error("Error updating Meeting");
    }
  };

  // Function to count attending and not attending students
  const countAttendees = (attendees) => {
    const attending = attendees.filter((attendee) => attendee.isAttending).length;
    const notAttending = attendees.filter((attendee) => !attendee.isAttending).length;
    return { attending, notAttending };
  };

  useEffect(() => {
    if (userId) {
      ;
    }
  }, [userId]);

  return (
    <DashboardLayout>
      <div className="view-container">
        <div className="view-header">
          <h2>Posted Meetings</h2>
          <p>Manage your scheduled meetings and track attendance</p>
        </div>

        {meeting.length === 0 ? (
          <div className="view-empty-state">
            <div className="view-empty-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h3>No Meetings Posted</h3>
            <p>You haven't scheduled any meetings yet.</p>
          </div>
        ) : (
          <div className="view-table-container">
            <div className="view-table-wrapper">
              <table className="view-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>URL</th>
                    <th>Platform</th>
                    <th>Location</th>
                    <th>Feedback</th>
                    <th>Total Attended Students</th>
                    <th>Attending</th>
                    <th>Not Attending</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {meeting.map((Meeting) => {
                    const { attending, notAttending } = countAttendees(Meeting.attendees);
                    return (
                      <tr key={Meeting._id}>
                        <td>{Meeting.title}</td>
                        <td>{Meeting.description}</td>
                        <td>{new Date(Meeting.date).toLocaleDateString()}</td>
                        <td>{Meeting.time}</td>
                        <td>
                          <a href={Meeting.url} target="_blank" rel="noopener noreferrer">
                            Link
                          </a>
                        </td>
                        <td>{Meeting.platform}</td>
                        <td>{Meeting.location}</td>
                        <td>{Meeting.feedback}</td>
                        <td>{Meeting.attendedstudent}</td>
                        <td>{attending}</td>
                        <td>{notAttending}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button
                              className="view-button view-button-edit"
                              onClick={() => {
                                setSelectedMeeting(Meeting);
                                setUpdatedMeetingData(Meeting);
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="view-button view-button-delete"
                              onClick={() => deleteMeeting(Meeting._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

       {/* Update Form */}
{selectedMeeting && (
  <div style={updateFormStyle}>
    <h3 style={formHeadingStyle}>Update Meeting</h3>
    <form style={formStyle}>
      <label style={labelStyle}>Title</label>
      <input
        type="text"
        name="title"
        value={updatedMeetingData.title}
        onChange={handleInputChange}
        placeholder="Enter meeting title"
        style={inputStyle}
      />

      <label style={labelStyle}>Description</label>
      <textarea
        name="description"
        value={updatedMeetingData.description}
        onChange={handleInputChange}
        placeholder="Enter meeting description"
        style={textareaStyle}
      />

      <label style={labelStyle}>Date</label>
      <input
        type="date"
        name="date"
        value={updatedMeetingData.date.split("T")[0]} // Format date to YYYY-MM-DD
        onChange={handleInputChange}
        style={inputStyle}
      />

      <label style={labelStyle}>Time</label>
      <input
        type="time"
        name="time"
        value={updatedMeetingData.time}
        onChange={handleInputChange}
        style={inputStyle}
      />

      <label style={labelStyle}>Meeting URL</label>
      <input
        type="text"
        name="url"
        value={updatedMeetingData.url}
        onChange={handleInputChange}
        placeholder="Enter meeting URL"
        style={inputStyle}
      />

      <label style={labelStyle}>Platform</label>
      <input
        type="text"
        name="platform"
        value={updatedMeetingData.platform}
        onChange={handleInputChange}
        placeholder="Enter meeting platform"
        style={inputStyle}
      />

      <label style={labelStyle}>Location</label>
      <input
        type="text"
        name="location"
        value={updatedMeetingData.location}
        onChange={handleInputChange}
        placeholder="Enter meeting location"
        style={inputStyle}
      />

      <h5 style={sectionHeadingStyle}>Give Meeting Feedback</h5>
      <input
        type="text"
        name="feedback"
        value={updatedMeetingData.feedback}
        onChange={handleInputChange}
        placeholder="Enter feedback"
        style={inputStyle}
      />

      <h5 style={sectionHeadingStyle}>Number of Total Students Attended</h5>
      <input
        type="number"
        name="attendedstudent"
        value={updatedMeetingData.attendedstudent}
        onChange={handleInputChange}
        placeholder="Enter number of students attended"
        style={inputStyle}
      />

      <div style={buttonContainerStyle}>
        <button
          type="button"
          style={saveButtonStyle}
          onClick={updateMeeting}
        >
          Save Changes
        </button>
        <button
          type="button"
          style={cancelButtonStyle}
          onClick={() => setSelectedMeeting(null)}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}
      </div>
    </DashboardLayout>
  );
};

export default PostedMeetings;
  