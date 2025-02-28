import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import Navbar from './FunctionalComponents/Navbar'
import Login from './FunctionalComponents/Login'
import Signup from './FunctionalComponents/Signup'
import Home from './FunctionalComponents/Home'
import About from './FunctionalComponents/About'
import PetProfile from './FunctionalComponents/petProfile'
import PetDetails from './FunctionalComponents/petDetails'
import RequestsPage from './FunctionalComponents/RequestsPage'
import Quiz from './FunctionalComponents/Quiz'
import PetInfoForm from './FunctionalComponents/AddPets'
import ProtectedRoute from './FunctionalComponents/ProtectedRoute'
import AddPet from './FunctionalComponents/AddPets'

import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/about" element={<About />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />} />
      <Route path='/pet-details' element={<PetDetails />} />
      <Route path="/pet/:id" element={<PetProfile />} />
      <Route path="/requests" element={<RequestsPage />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/petadd" element={<PetInfoForm />} />


  
  <Route
    path="/add-pet"
    element={
      <ProtectedRoute allowedRoles={['Organization']}>
        <AddPet />
      </ProtectedRoute>
    }
  />
  <Route
    path="/requests"
    element={
      <ProtectedRoute allowedRoles={['Organization']}>
        <RequestsPage />
      </ProtectedRoute>
    }
  />



      </Routes>
      </BrowserRouter>
        
      </div>
      
    </>
  )
}

export default App
