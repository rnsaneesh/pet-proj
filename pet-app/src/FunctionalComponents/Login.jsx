import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '../assets/login.avif';
import "../Css/Login.css";
import axios from 'axios';
function Login(){
    const nav=useNavigate();
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: "100vh",
        width:"100%",
        overflow: 'visible',
        /*position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1*/
       

      };

      var[name,setName]=useState("");
      var[password,setPassword]=useState("");

      const handleSignup = async(event) => {
        event.preventDefault();
        const req=await axios.post("http://localhost:3001/login", {
          
          
          userName:name,
          password: password,
         
        });
        const message=req.data.message;
        const isLogin=req.data.isLogin;
        const userType = req.data.userType;
        if(isLogin){
            nav("/", {replace: true});
            alert(message);
        }
        else{
          alert(message)
        }
      };
    
    
    return(
        <div  className="login-container">

<div className="login-image" style={{ backgroundImage: `url(${backgroundImage})` }}>

</div>
            <div className="login-form">
            <form  onSubmit={handleSignup} action="/">
            <h2>Login</h2>
    <div className="form-group">
   <label htmlFor="name">Username:</label>
    <input name="name" type="text" placeholder="enter your username" onChange={(e)=>setName(e.target.value)} /></div>
<div className="form-group">
    <label htmlFor="password">Password:</label>
    <input type="password" placeholder="enter a password" onChange={(e)=>setPassword(e.target.value)} /></div>

    <button type="submit" className="login-button">Submit</button><br />
    <label>Create a new Account </label>
          <Link to="/signup">Signup</Link>
</form>
</div>




        </div>
    );
}
export default Login;