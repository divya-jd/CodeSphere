import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">CodeSphere</Link>
      </div>
      <div className="nav-links">
        <a href="https://github.com/yourusername/codesphere" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
}
