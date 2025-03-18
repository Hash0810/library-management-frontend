import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      {/* Hamburger Menu Icon (Visible only on mobile) */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Logo */}
      <Link to="/" className="navbar-logo">
        Library Management
      </Link>

      {/* Links + Actions (All inside one div for toggling) */}
      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <div className="navbar-links">
          {role === "ADMIN" && (
            <>
              <Link to="/add-user">Add User</Link>
              <Link to="/add-admin">Add Admin</Link>
              <Link to="/book-inventory">Book Inventory</Link>
              <Link to="/librarian-info">Librarian Info</Link>
            </>
          )}
          {role === "LIBRARIAN" && (
            <>
              <Link to="/add-book">Add Book</Link>
              <Link to="/update-book-status">Update Book Status</Link>
              <Link to="/issue-books">Issue Books</Link>
              <Link to="/book-inventory">Book Inventory</Link>
              <Link to="/generate-receipt">Generate Receipt</Link>
            </>
          )}
          {role && role !== "ADMIN" && role!=="LIBRARIAN" && (
            <>
              <Link to="/borrow-books">Borrow Books</Link>
              <Link to="/return-books">Return Books</Link>
              <Link to="/book-inventory">Book Inventory</Link>
              <Link to="/book-history">Book History</Link>
            </>
          )}

          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Actions (Dashboard + Logout) */}
        <div className="navbar-actions">
          <button className="navbar-btn" onClick={() => navigate("/profile")}>
              Profile
            </button>
          <button className="navbar-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;