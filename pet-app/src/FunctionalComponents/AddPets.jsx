// Frontend: PetInfoForm.js
import { useState } from 'react';
import axios from 'axios';

function PetInfoForm() {
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");

  const handlePetInfoSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/petadd", {
        petName,
        breed,
        age
      });
      alert(res.data.message);
    } catch (error) {
      console.error("Pet Info Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handlePetInfoSubmit}>
      <label>Pet Name:</label>
      <input type="text" onChange={(e) => setPetName(e.target.value)} required />

      <label>Breed:</label>
      <input type="text" onChange={(e) => setBreed(e.target.value)} required />

      <label>Age:</label>
      <input type="number" onChange={(e) => setAge(e.target.value)} required />

      <button type="submit">Submit</button>
    </form>
  );
}

export default PetInfoForm;
