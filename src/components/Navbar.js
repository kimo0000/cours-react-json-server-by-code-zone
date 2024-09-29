import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar() {
    return (
      <>
        <nav className="navbar">
          <Link to="/" className="logo">Logo</Link>
          <ul className="links">
            <li className="link">
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </>
    );
}

export default Navbar;