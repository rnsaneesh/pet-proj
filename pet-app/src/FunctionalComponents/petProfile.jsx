import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import petImage1 from '../assets/pet1.jpeg';
import '../Css/PetProfile.css';
const pets = [
  { id: 1, name: 'Buddy', age:2, breed: 'Dog', image: petImage1 },
  { id: 2, name: 'Mittens',age:2, breed: 'Cat', image: petImage1 },
  { id: 3, name: 'Charlie',age:2, breed: 'Dog', image: petImage1 },
  { id: 4, name: 'Whiskers',age:2, breed: 'Cat', image: petImage1 },
  { id: 5, name: 'Max',age:2, breed: 'Dog', image: petImage1 },
  { id: 6, name: 'Shadow',age:2, breed: 'Cat', image: petImage1 },
  { id: 7, name: 'Bella',age:2, breed: 'Dog', image: petImage1 },
  { id: 8, name: 'Luna',age:2, breed: 'Cat', image: petImage1 },
  { id: 9, name: 'Rocky',age:2, breed: 'Dog', image: petImage1 },
  { id: 10, name: 'Smokey',age:2, breed: 'Cat', image: petImage1},
  { id: 11, name: 'Daisy',age:2, breed: 'Dog', image: petImage1 },
  { id: 12, name: 'Tiger',age:2, breed: 'Cat', image: petImage1 },
  { id: 13, name: 'Milo',age:2, breed: 'Dog', image: petImage1 },
  { id: 14, name: 'Coco',age:2, breed: 'Cat', image: petImage1 },
  { id: 15, name: 'Lucy',age:2, breed: 'Dog', image: petImage1 }
];



const PetProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pet = pets.find(p => p.id === parseInt(id));

  if (!pet) {
    return <h2>Pet not found!</h2>;
  }

  const handleRequest = () => {
    const userName = prompt("Enter your name:");
    if (!userName) {
      alert("Name is required to send a request!");
      return;
    }



    let existingRequests = JSON.parse(localStorage.getItem('petRequests')) || [];
    // Check if request already exists
    if (!existingRequests.some(request => request.id === pet.id && request.userName === userName)) {
        existingRequests.push({
          id: pet.id,
          name: pet.name,
          userName: userName
        });
        localStorage.setItem('petRequests', JSON.stringify(existingRequests));
        alert('Request sent!');
      } else {
        alert('You have already sent a request for this pet!');
      }
  };

  return (
    <div className="pet-profile-container">
      <div className="content-section">
        <h2>{pet.name}</h2>
        
        <p><strong>Age:</strong> {pet.age}</p>
        <p><strong>Breed:</strong> {pet.breed}</p>
        <p><strong>Description:</strong> {pet.description}</p>

        <button onClick={handleRequest}>Request</button>
      </div>
      
      <div className="image-section">
        <img src={pet.image} alt={pet.name} className="profile-image" />
      </div>

      <div className="button-section">
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
};

export default PetProfile;
