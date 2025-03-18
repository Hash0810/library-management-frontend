// src/pages/UserDashboard.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/UserDashboard.css";

function UserDashboard({ role }) {
    const [books, setBooks] = useState([]);
    const username = localStorage.getItem("username");

    useEffect(() => {
        fetch("/api/u/books/available")
            .then((response) => response.json())
            .then((data) => setBooks(data));
    }, []);

    const borrowBook = (bookId) => {
        fetch(`/api/u/books/borrow?username=${username}&bookId=${bookId}`, { method: "POST" })
            .then((response) => response.text())
            .then((message) => alert(message));
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
