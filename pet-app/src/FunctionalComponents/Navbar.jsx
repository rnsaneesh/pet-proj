import { Link } from "react-router-dom";
import "../Css/Navbar.css";
import Logo from '../assets/logo.jpeg'

const Navbar =()=>{
    return(
        <header>
          <div className="nav-container">
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h3>PetDestined</h3>
          </div>
        <nav>
          <ul>
          <li><Link to="/home" className="link">Home</Link></li>
          <li><Link to="/about" className="link">About</Link></li>
          <li><Link to="/requests" className="link">Requests</Link></li>
          <li ><Link to="/Login" className="link">Login</Link></li>
          <li><Link to="/signup" className="link">Signup</Link></li>




        </ul>
        </nav>
        </div>
        </header>

    )

}
export default Navbar;