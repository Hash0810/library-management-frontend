import React, { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar"; // Add Navbar import
import "../styles/Homepage.css";

const Homepage = () => {
    const [userRole, setUserRole] = useState(null); // State to store user role

    useEffect(() => {
    const username = localStorage.getItem("username"); // Retrieve username from localStorage
    if (username) {
      api.post(`/api/u/profile`, { username }) // Sending username in request body
        .then((res) => {
          setUserRole(res.data.role); // Set role from API response
          localStorage.setItem("role", res.data.role); // Store role in localStorage for future use
        })
        .catch((err) => console.error("Error fetching user role:", err));
    }
  }, []);
    
    const genres = ["Fiction", "Non-Fiction", "Science", "Romance", "Horror", "History"];

    return (
        <div className="homepage-container">
            {/* Pass the retrieved role to Navbar */}
            <Navbar role={userRole} />
            <header className="homepage-header">
                <h1>Welcome to the Library</h1>
                <p>Explore books and genres at your fingertips.</p>
                <div className="search-bar">
                    <input type="text" placeholder="Search genres..." />
                    <button>Search</button>
                </div>
            </header>
            <section className="genres-section">
                <h2>Genres</h2>
                <ul className="genres-list">
                    {genres.map((genre, index) => (
                        <li key={index} className="genre-item">
                            {genre}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Homepage;
