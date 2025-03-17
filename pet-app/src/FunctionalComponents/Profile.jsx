import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import "../Css/Profile.css";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { userName, userType } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/getUserProfile`, {
          params: { userName },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userName) fetchUserProfile();
  }, [userName]);

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>

      {loading ? (
        <div className="loading-spinner">
          <p>Loading profile data...</p>
        </div>
      ) : userData ? (
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-header">
              <h3>{userData.userName}</h3>
              <span className="user-type-badge">{userData.userType}</span>
            </div>
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">Username:</span>
                <span className="detail-value">{userData.userName}</span>
              </div>
              {userData.email && (
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{userData.email}</span>
                </div>
              )}
              {userData.userType === "organization" && userData.OrgName && (
                <div className="detail-item">
                  <span className="detail-label">Organization:</span>
                  <span className="detail-value">{userData.OrgName}</span>
                </div>
              )}
            </div>
          </div>

          {userData.userType === "customer" && (
            <div className="quiz-section">
              <h3>Quiz Responses</h3>
              {userData.quizResponses.length > 0 ? (
                <div className="table-responsive">
                  <table className="quiz-table">
                    <thead>
                      <tr>
                        <th>Question</th>
                        <th>Response</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.quizResponses[0].responses.map((resp, index) => (
                        <tr key={index} className={index % 2 === 0 ? "row-even" : "row-odd"}>
                          <td>{resp.question}</td>
                          <td>{resp.answer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <p>No quiz responses available yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="error-state">
          <p>User profile not found.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;