import './Sidebar.css';
import {Link} from 'react-router-dom';

function Sidebar() {
    return (
      <>
        <div className="sidebar">
          <ul className="menu list-unstyled">
            <li>
              <Link to="/allProducts">All Product</Link>
            </li>
            <li>
              <Link to="/allCategory">All Category</Link>
            </li>
          </ul>
        </div>
      </>
    );
}

export default Sidebar;