import React, { useState, useContext } from 'react';
import ApiAxios from '../Api/ApiAxios';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const AddPet = () => {
  const [petDetails, setPetDetails] = useState({
    name: '',
    breed: '',
    age: '',
    description: '',
    image: ''
  });
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPetDetails({ ...petDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiAxios.post('/pets/add', { ...petDetails, addedBy: user._id });
      navigate('/pet-details');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Pet Name" onChange={handleChange} required />
      <input type="text" name="breed" placeholder="Breed" onChange={handleChange} required />
      <input type="text" name="age" placeholder="Age" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required />
      <button type="submit">Add Pet</button>
    </form>
  );
};

export default AddPet;
