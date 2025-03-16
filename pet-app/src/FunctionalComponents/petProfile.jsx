import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext"; // Import context
import petImage1 from "../assets/pet1.jpeg";
import "../Css/petProfile.css";

const API_URL = import.meta.env.VITE_API_URL;

const PetProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userName } = useContext(AuthContext); // Get userName from context
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`${API_URL}/pet/${id}`);
        setPet(response.data);
      } catch (err) {
        setError("Pet not found!");
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  const handleRequest = async () => {
    if (!userName) {
      alert("You need to be logged in to send a request!");
      return;
    }

    try {
      await axios.post(`${API_URL}/request`, { petId: id, userName, petName: pet.petName });
      alert("Request sent successfully!");
    } catch (err) {
      alert(err.response?.data || "Error sending request!");
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="pet-profile-container">
      <div className="content-section">
        <h2>{pet.petName}</h2>
        <p><strong>Age:</strong> {pet.age}</p>
        <p><strong>Breed:</strong> {pet.breed}</p>
        <p><strong>Description:</strong> {pet.additionalInfo}</p>
        <p><strong>Handled By:</strong> {pet.OrgName}</p>

        <button onClick={handleRequest}>Request</button>
      </div>

      <div className="image-section">
        <img src={petImage1} alt={pet.petName} className="profile-image" />
      </div>

      <div className="button-section">
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
};

export default PetProfile;
