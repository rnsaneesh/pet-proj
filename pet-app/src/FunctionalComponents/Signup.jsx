import { Link } from "react-router-dom";
import "../Css/Signup.css";
import backgroundImage from '../assets/signup.avif';

function Signup() {
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
      
    
    return (
      <div  className="signup-container">

        <div className="signup-form">
        <form>
        <h2>SignUp</h2>
        <div className="form-group">
          <label htmlFor="frname">FirstName:</label>
          <input type="text" id="name" placeholder="enter your first name" /><br /></div>
          <div className="form-group">
          <label htmlFor="lnname">LastName:</label>
          <input type="text" id="name" placeholder="enter your last name" /><br /></div>
        <div className="form-group">
          <label htmlFor="usrname">Username:</label>
          <input type="text" id="name" placeholder="enter a username(ex:petlover143)" /><br /></div>
         <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="enter a email" /><br /></div>
          <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="enter a password" /><br /></div>
  
          
  
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
  
  export default Signup;
  