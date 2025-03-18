// src/pages/PublicHome.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PublicHome.css";

const PublicHome = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/login");
    };

    return (
        <div className="public-home-container">
            <header className="public-header">
                <h1>Welcome to the Library Management System</h1>
                <p>
                    Access books, manage records, and explore an array of features designed for students, teachers, and administrators.
                </p>
                <button className="redirect-button" onClick={handleRedirect}>
                    Login to Explore
                </button>
            </header>
            <section className="features-section">
                <h2>Features</h2>
                <div className="features-list">
                    <div className="feature-item" onClick={handleRedirect}>
                        <h3>Borrow Books</h3>
                        <p>Discover and borrow books from our vast collection.</p>
                    </div>
                    <div className="feature-item" onClick={handleRedirect}>
                        <h3>Track History</h3>
                        <p>Monitor your borrowing history and manage fines efficiently.</p>
                    </div>
                    <div className="feature-item" onClick={handleRedirect}>
                        <h3>Admin Tools</h3>
                        <p>Manage users, librarians, and the book inventory seamlessly.</p>
                    </div>
                    <div className="feature-item" onClick={handleRedirect}>
                        <h3>Advanced Search</h3>
                        <p>Quickly find books by genre, author, or title.</p>
                    </div>
                </div>
            </section>
            <footer className="public-footer">
                <p>
                    Already have an account? <span onClick={handleRedirect}>Login here</span>.
                </p>
            </footer>
        </div>
    );
};

export default PublicHome;
