import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import "../Css/RequestsPage.css"; // Import styles
import { useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;

const Requests = () => {
  const { userType, userName } = useContext(AuthContext); // Get userType & userName from Context
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_URL}/getrequest`);
        setRequests(response.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleProfileClick = async (event, userName) => {
    event.preventDefault(); // Prevent default anchor navigation
  
    try {
      const response = await axios.get(`${API_URL}/getUserProfile`, {
        params: { userName },
      });
  
      if (response.data) {
        navigate("/profile", { state: { userData: response.data } });
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleStatusChange = async (requestId, status) => {
    try {
      await axios.put(`${API_URL}/updateRequest/${requestId}`, { status });
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === requestId ? { ...req, status } : req
        )
      );
    } catch (err) {
      console.error("Error updating request status:", err);
    }
  };

  // 🔹 Filter Requests: Show only relevant requests
  const filteredRequests = userType === "organization"
    ? requests // Show all for organizations
    : requests.filter((req) => req.userName === userName); // Show only user-specific for customers

  return (
    <div className="requests-container">
      <h2>Adoption Requests</h2>

      {loading ? (
        <p>Loading requests...</p>
      ) : filteredRequests.length === 0 ? (
        <p>No adoption requests found.</p>
      ) : (
        <table className="request-table">
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Customer Name</th>
              {userType === "customer" && <th>Status</th>}
              {userType === "organization" && (
                <>
                  <th>Accept</th>
                  <th>Deny</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req._id}>
                <td>{req.petName}</td>
                <td><Link to={`/profile/${req.userName}`} onClick={(e) => handleProfileClick(e, req.userName)} className="profile-link">
                    {req.userName}
                  </Link></td>

                {/* Customer View: Show Status */}
                {userType === "customer" && <td>{req.status || "Pending"}</td>}

                {/* Organization View: Show Accept/Deny Checkboxes */}
                {userType === "organization" && (
                  <>
                    <td>
                      <input
                        type="checkbox"
                        checked={req.status === "Accepted"}
                        onChange={() => handleStatusChange(req._id, "Accepted")}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={req.status === "Denied"}
                        onChange={() => handleStatusChange(req._id, "Denied")}
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Requests;
