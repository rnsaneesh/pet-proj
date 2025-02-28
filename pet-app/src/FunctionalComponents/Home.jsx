import React, { useEffect, useState } from 'react';
import '../Css/Home.css';
import petImage1 from '../assets/pet1.jpeg';
import petImage2 from '../assets/cat1.jpeg';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');

  useEffect(() => {
    // Get userType from localStorage
    const type = localStorage.getItem('userType');
    setUserType(type);
  }, []);

  const handleClick = () => {
    navigate('/about');
  };

  const handleClick1 = () => {
    navigate('/quiz');
  };

  const handleClick2 = () => {
    navigate('/pet-details');
  };

  const handleAddPets = () => {
    navigate('/petadd'); // Navigate to Pet Info Form for Organizations
  };

  return (
    <div className="home-page">
      <div className="home-intro">
        <h1>Welcome to PetDestined</h1>
        <p>Our mission is to provide a safe haven for animals and help them find their forever homes.</p>
      </div>

      <h2>Meet Our Featured Pets</h2> 
      <div className="featured-pets">
        <div className="pet-card">
          <img src={petImage1} alt="Pet 1" />
          <p>Name: Max, Age: 2, Breed: Labrador</p>
        </div>
        <div className="pet-card">
          <img src={petImage2} alt="Pet 2" />
          <p>Name: Luna, Age: 1, Breed: Cat</p>
        </div>
      </div>

      <div className="call-to-action">
        <button onClick={handleClick}>Learn More About Adoption</button>
      </div>

      <div className="interactive-elements">
        <h2>Find Your Perfect Match</h2>
        {userType === 'customer' && (
          <button onClick={handleClick1}>Take Our Pet Matching Quiz</button>
        )}
        {userType === 'organization' && (
          <button onClick={handleAddPets}>Add Pets</button>
        )}
        <button onClick={handleClick2}>Head to our pet page</button>
      </div>
    </div>
  );
}

export default Home;
