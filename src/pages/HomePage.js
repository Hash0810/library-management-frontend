import React, { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import "../styles/Homepage.css";

const Homepage = () => {
    const [userRole, setUserRole] = useState(null);
    const [books, setBooks] = useState([]); // State to store all books
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            api.post(`/api/u/profile`, { username })
                .then((res) => {
                    setUserRole(res.data.role);
                    localStorage.setItem("role", res.data.role);
                })
                .catch((err) => console.error("Error fetching user role:", err));
        }

        // Fetch book inventory from backend
        api.get("/librarian/bookInventory")
            .then((res) => {
                setBooks(res.data);
                setFilteredBooks(res.data); // Initially show all books
            })
            .catch((err) => console.error("Error fetching books:", err));
    }, []);

    // Handle search input change
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter books based on search query
        const filtered = books.filter((book) =>
            book.title.toLowerCase().includes(query) || 
            book.author.toLowerCase().includes(query) || 
            book.genre.toLowerCase().includes(query)
        );

        setFilteredBooks(filtered);
    };

    return (
        <div className="homepage-container">
            <Navbar role={userRole} />
            <header className="homepage-header">
                <h1>Welcome to the Library</h1>
                <p>Explore books and genres at your fingertips.</p>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search books by title, author, or genre..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button>Search</button>
                </div>
            </header>
            <section className="genres-section">
                <h2>Available Books</h2>
                {filteredBooks.length > 0 ? (
                    <ul className="book-list">
                        {filteredBooks.map((book) => (
                            <li key={book.id} className="book-item">
                                <strong>{book.title}</strong> by {book.author} ({book.genre})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No books found.</p>
                )}
            </section>
        </div>
    );
};

export default Homepage;
