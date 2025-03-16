import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import "../Css/RequestsPage.css"; // Import styles

const API_URL = import.meta.env.VITE_API_URL;

const Requests = () => {
  const { userType, userName } = useContext(AuthContext); // Get userType & userName from Context
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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
                <td>{req.userName}</td>

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
