import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { API_URL } from "../../../store/apiurl.js";
import { Spinner } from "react-bootstrap";
import { message } from "antd";

const authorizationToken = localStorage.getItem('token');
const URL = `${API_URL}/api/v1/meeting/getAllMeeting`;

const StudentViewMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableHeight] = useState(500);
    const [votedMeetings, setVotedMeetings] = useState(new Set());

    const getAllMeetingData = async () => {
      if(!authorizationToken) return;
      try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authorizationToken}`, // Added "Bearer" prefix if needed
          },
        });
    
        if (response.ok) {
          const data = await response.json();
    
          // Check if the student has already voted for each meeting
          const studentId = localStorage.getItem('studentId');
          const votedSet = new Set(
            data.filter(meeting => 
              meeting.attendees.some(attendee => attendee.studentId === studentId)
            ).map(meeting => meeting._id)
          );
    
          setMeetings(data);
          setVotedMeetings(votedSet);
        } else {
          console.error("Failed to fetch meetings:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching meetings:", error);
      } finally {
        setLoading(false);
      }
    };
    
  const handleVote = async (meetingId, isAttending) => {
    if (votedMeetings.has(meetingId)) {
      message.error("You have already voted for this meeting.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/v1/meeting/voteMeeting/${meetingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorizationToken}`,
        },
        body: JSON.stringify({
          studentId: localStorage.getItem('studentId'),
          isAttending: isAttending,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Vote recorded:', data);
        message.success("Meeting voted successfully!");
        // Update local state to reflect that the student has voted
        setVotedMeetings(prev => new Set(prev).add(meetingId));
        getAllMeetingData(); // Refresh meetings after voting
      } else {
        console.error('Failed to vote:', response.statusText);
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  useEffect(() => {
    if(authorizationToken){
    getAllMeetingData()};
  }, []);

  return (
    <DashboardLayout>
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: `${tableHeight}px` }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : meetings.length === 0 ? (
        <div className="text-center text-muted mt-4">No Meetings Available</div>
      ) : (
        <div style={{ overflowY: 'auto', height: `${tableHeight}px`, border: '2px solid #007BFF', borderRadius: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Time</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting, index) => (
                <tr key={meeting._id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff', cursor: 'pointer' }}>
                  <td style={tdStyle}>{meeting.title}</td>
                  <td style={tdStyle}>{new Date(meeting.date).toLocaleDateString()}</td>
                  <td style={tdStyle}>{meeting.time}</td>
                  <td style={tdStyle}>{meeting.location}</td>
                  <td style={tdStyle}>{meeting.description}</td>
                  <td style={tdStyle}>
  <button 
    className="btn btn-success" 
    onClick={() => handleVote(meeting._id, true)} 
    disabled={votedMeetings.has(meeting._id)}
  >
    Attend
  </button>
  <button 
    className="btn btn-danger" 
    onClick={() => handleVote(meeting._id, false)} 
    disabled={votedMeetings.has(meeting._id)}
  >
    Not Attend
  </button>
</td>
</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </DashboardLayout>
);
};

const thStyle = {
padding: '12px 15px',
borderBottom: '2px solid #007BFF',
borderRight: '2px solid #007BFF',
backgroundColor: '#3a4fab',
color: '#ffffff',
textAlign: 'left',
fontWeight: 'bold',
};

const tdStyle = {
padding: '12px 15px',
borderBottom: '1px solid #000000',
borderRight: '1px solid #000000',
textAlign: 'left',
color: '#000000',
};

export default StudentViewMeetings;