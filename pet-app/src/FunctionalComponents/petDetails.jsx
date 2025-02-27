import React from 'react';
import { useState,useEffect } from 'react';
import '../Css/PetDetails.css'; 
import petImage1 from '../assets/pet1.jpeg';
import FilterDropdown from './FilterDrop';
import { useNavigate } from 'react-router-dom';
import ApiAxios from '../Api/ApiAxios'
{/*const pets = [
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
];*/}

const PetDetails = () => {

    const [filteredPets, setFilteredPets] = useState(pets);
const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await ApiAxios.get('/pets');
        setPets(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPets();
  }, []);
  const handleFilterChange = (filters) => {
    const { breed, org, age } = filters;

    const filtered = pets.filter(pet => 
      (breed ? pet.breed === breed : true) &&
      (org ? pet.org === org : true) &&
      (age ? pet.age === age : true)
    );

    setFilteredPets(filtered);
  };
    const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/pet/${id}`);
  };
  return (
   <div>
    <div className="filter-section">
        <FilterDropdown onFilterChange={handleFilterChange} />
      </div>
    <div className="pet-grid">
      {pets.map((pet) => (
        <div className="pet-card" key={pet.id} onClick={() => handleCardClick(pet.id)}>
          <img src={pet.image} alt={pet.name} className="pet-image" />
          
          <p>Name:{pet.name} Age:{pet.age} Breed:{pet.breed}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default PetDetails;
