import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { API_URL } from "../../../store/apiurl.js";
import { Spinner } from "react-bootstrap";
import "../../../stylesheets/Dashboard/CommonViewStyles.css";

const ViewMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authorizationToken = localStorage.getItem('token');
  const URL = `${API_URL}/api/v1/meeting/getAllMeeting`;

  const getAllMeetingData = async () => {
    if (!authorizationToken) {
      setError("Authentication required");
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMeetings(data);
      } else {
        setError("Failed to fetch meetings. Please try again.");
        console.error("Failed to fetch meetings:", response);
      }
    } catch (error) {
      setError("An error occurred while fetching meetings.");
      console.error("Error fetching meetings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMeetingData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizationToken]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <DashboardLayout>
      <div className="view-container">
        <div className="view-header">
          <h2 className="view-title">Scheduled Meetings</h2>
          <p className="view-subtitle">View all upcoming and past meetings</p>
        </div>
        
        {loading ? (
          <div className="view-loading">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <div className="view-empty-state" style={{ color: '#ff4444' }}>
            <div className="view-empty-icon">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        ) : meetings.length === 0 ? (
          <div className="view-empty-state">
            <div className="view-empty-icon">
              <i className="fas fa-calendar"></i>
            </div>
            <h3>No Meetings Found</h3>
            <p>No meetings have been scheduled yet.</p>
          </div>
        ) : (
          <div className="view-table-container">
            <div className="view-table-wrapper">
              <table className="view-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((meeting, index) => (
                  <tr key={meeting._id || index}>
                    <td>{meeting.title || 'N/A'}</td>
                    <td>{meeting.date ? formatDate(meeting.date) : 'N/A'}</td>
                    <td>{meeting.time || 'N/A'}</td>
                    <td>{meeting.location || 'N/A'}</td>
                    <td>{meeting.description || 'No description provided'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>          </div>        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewMeetings;