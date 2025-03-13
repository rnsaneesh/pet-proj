import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Css/Signup.css";
import backgroundImage from '../assets/signup.avif';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function SignupCust() {
  let nav = useNavigate();
  /*}  const backgroundStyle = {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: "100vh",
          width:"100%",
          overflow: 'visible',
          position :'absolute',
          top:0,
          left:0,
          zIndex:-1
        };*/
        var [firstname,setFN]=useState("");
      var [lastname,setLN]=useState("");
      var[name,setName]=useState("");
      var [email,setEmail]=useState("");
      var[password,setPassword]=useState("");
      var[phn,setPh]=useState(0);
      var [UserType, setUserType] = useState("customer");

   
        console.log(UserType);
        const handleSignup = async(event) => {
          event.preventDefault();
          const req=await axios.post(`${API_URL}/signup`, {
            firstName: firstname,
            lastName: lastname,
            email: email,
            userName:name,
            password: password,
            phoneNumber: phn,
            userType:UserType
          });
          const message=req.data.message;
          const isSignup=req.data.isSignup;
          console.log(isSignup);
          if(isSignup){
            nav("/login", {replace: true});
            alert(message);
            // window.location.href = "/login";;
          }
          else{
            alert(message)
          }
        };
    
    return (
      <div  className="signup-container">

        <div className="signup-form">
        <form onSubmit={handleSignup} action="/home">
      
        <div className="form-group">
        <h2>SignUp</h2>
          <label htmlFor="name">firstName:</label>
          <input type="text" id="name" placeholder="enter a name" onChange={(e)=>setFN(e.target.value)} /><br />

          <label htmlFor="name">lastName:</label>
          <input type="text" id="name" placeholder="enter a name" onChange={(e)=>setLN(e.target.value)} /><br />
          <label htmlFor="name">UserNam/OrgName</label>
          <input type="text" id="name" placeholder="enter a" onChange={(e)=>setName(e.target.value)} /><br />
  
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="enter a email" onChange={(e)=>setEmail(e.target.value)} /><br />
  
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="enter a password" onChange={(e)=>setPassword(e.target.value)} /><br />
          <label htmlFor="password">mobile:</label>
          <input type="number" id="mobile" placeholder="enter a number" onChange={(e)=>setPh(e.target.value)} /><br />

          <div className="user-type">
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="customer"
                  checked={UserType === 'customer'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Customer
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="organization"
                  checked={UserType === 'organization'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Organization
              </label>
            </div>
  </div>
  
          
  
          <button type="submit" className="signup-button">Submit</button><br />
  
          <label>Are you already a customer? </label>
          <Link to="/login">Login </Link>
        </form>
      </div>

    <div className="signup-image" style={{ backgroundImage: `url(${backgroundImage})` }}>
    


    </div>
     </div>
    );
  }
  
  export default SignupCust;
  