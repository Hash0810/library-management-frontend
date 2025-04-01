import React, { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import "../styles/Homepage.css";

const Homepage = () => {
    const [userRole, setUserRole] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [genres, setGenres] = useState([]);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);

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

        api.get("/librarian/bookInventory")
            .then((res) => setBooks(res.data))
            .catch((err) => console.error("Error fetching books:", err));

        api.get("/librarian/genres")
            .then((res) => setGenres(res.data))
            .catch((err) => console.error("Error fetching genres:", err));
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === "") {
            setFilteredBooks([]);
        } else {
            const results = books.filter(
                (book) =>
                    book.bookName.toLowerCase().includes(query.toLowerCase()) ||
                    book.author.toLowerCase().includes(query.toLowerCase()) ||
                    book.genre.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredBooks(results);
        }
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
                        placeholder="Search books..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button>Search</button>
                </div>
            </header>

            <section className="genres-section">
                <h2>{searchQuery ? "Search Results" : "Genres"}</h2>
                <ul className="genres-list">
                    {searchQuery ? (
                        filteredBooks.length > 0 ? (
                            filteredBooks.map((book, index) => (
                                <li key={index} className="genre-item">
                                    {book.bookName} ({book.author}, {book.genre})
                                </li>
                            ))
                        ) : (
                            <li className="no-data">No books found.</li>
                        )
                    ) : (
                        genres.map((genre, index) => (
                            <li key={index} className="genre-item">{genre}</li>
                        ))
                    )}
                </ul>
            </section>
        </div>
    );
};

export default Homepage;
