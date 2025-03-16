import { useState } from 'react';
import axios from 'axios';
import '../Css/AddPets.css';

const API_URL = import.meta.env.VITE_API_URL;

function PetInfoForm() {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [breed, setBreed] = useState("");
  const [OrgName, setOrg] = useState("");
  const [age, setAge] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handlePetInfoSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/petadd`, {
        petName,
        petType,
        breed,
        age,
        OrgName,
        additionalInfo
      });
      alert(res.data.message);
    } catch (error) {
      console.error("Pet Info Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Pet Information</h2>
      <form onSubmit={handlePetInfoSubmit}>
        <div className="form-group">
          <label>Pet Name:</label>
          <input 
            type="text" 
            value={petName}
            onChange={(e) => setPetName(e.target.value)} 
            required 
            placeholder='Ex:brook'
          />
        </div>

        <div className="form-group">
          <label>Pet Type:</label>
          <input 
            type="text" 
            value={petType}
            onChange={(e) => setPetType(e.target.value)} 
            required 
            placeholder="Dog, Cat, Bird, etc."
          />
        </div>

        <div className="form-group">
          <label>Breed:</label>
          <input 
            type="text" 
            value={breed}
            onChange={(e) => setBreed(e.target.value)} 
            required 
            placeholder='EX:Labador,Persian cat,etc.'
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input 
            type="number" 
            value={age}
            onChange={(e) => setAge(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Organization Name:</label>
          <input 
            type="text" 
            value={OrgName}
            onChange={(e) => setOrg(e.target.value)} 
            required 
            placeholder='Ex:texasShelter,Peta,etc.'
          />
        </div>

        <div className="form-group">
          <label>Additional Info:</label>
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Medical conditions, special needs, etc."
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PetInfoForm;