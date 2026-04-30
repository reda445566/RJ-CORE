import { Link } from "react-router-dom";
import "./nav.css";

export default function NavBar() {
  return (
    <div className="navbar">
      <h2>RJ&CORE</h2>

      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

