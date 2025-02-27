import React, { useState, useEffect } from 'react';
import ApiAxios from '../Api/ApiAxios';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await ApiAxios.get('/requests');
        setRequests(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRequests();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Pet Name</th>
          <th>Customer Name</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(req => (
          <tr key={req._id}>
            <td>{req.petName}</td>
            <td>{req.customerName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Requests;
