import { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from '../assets/login.avif';
import "../Css/Login.css";

function Login(){
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
    
    
    return(
        <div  className="login-container">

<div className="login-image" style={{ backgroundImage: `url(${backgroundImage})` }}>

</div>
            <div className="login-form">
            <form  >
            <h2>Login</h2>
    <div className="form-group">
   <label htmlFor="name">Username:</label>
    <input name="name" type="text" placeholder="enter your username" /></div>
<div className="form-group">
    <label htmlFor="password">Password:</label>
    <input type="password" placeholder="enter a password" /></div>

    <button type="submit" className="login-button">Submit</button><br />
    <label>Create a new Account </label>
          <Link to="/signup">Signup</Link>
</form>
</div>




        </div>
    );
}
export default Login;