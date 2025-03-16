import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import backgroundImage from "../assets/login.avif";
import "../Css/Login.css";

const API_URL = import.meta.env.VITE_API_URL;

function Login(){
    //const nav=useNavigate();
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

      const { login } = useContext(AuthContext);
      const { fetchUserType } = useContext(AuthContext);
      const nav = useNavigate();
  
      const [name, setName] = useState("");
      const [password, setPassword] = useState("");
  
      const handleLogin = async (event) => {
          event.preventDefault();
          const response = await login(name, password);
          
          if (response.isLogin) {
            fetchUserType(name);
              nav("/", { replace: true });
              alert(response.message);
          } else {
              alert(response.message);
          }
      };
    
    
    return(
        <div  className="login-container">

<div className="login-image" style={{ backgroundImage: `url(${backgroundImage})` }}>

</div>
            <div className="login-form">
            <form  onSubmit={handleLogin} action="/">
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