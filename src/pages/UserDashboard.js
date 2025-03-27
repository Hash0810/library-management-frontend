// src/pages/UserDashboard.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/UserDashboard.css";
import api from "../api";

function UserDashboard({ role }) {
    const [books, setBooks] = useState([]);
    const username = localStorage.getItem("username");
    useEffect(() => {
        api.get("/api/u/books/available")
            .then((response) => setBooks(response.data))
            .catch((error) => console.error("Error fetching books:", error));
    }, []);
    const borrowBook = (bookId) => {
        api.post(`/api/u/books/borrow`, null, {
            params: { username: username, bookId: bookId }
        })
        .then((response) => alert(response.data))
        .catch((error) => console.error("Error borrowing book:", error));
    };

    return (
        <div className="dashboard">
            <Navbar role={role} />
            <h2>{role} Dashboard</h2>
            <h3>Available Books</h3>
            <ul className="books-list">
                {books.map((book) => (
                    <li key={book.id} className="book-item">
                        {book.title} - {book.author}
                        <button onClick={() => borrowBook(book.id)}>Borrow</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserDashboard;
