import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/style.css";
import api from "../api";

function ReturnBook() {
  const [bookId, setBookId] = useState("");
  const [message, setMessage] = useState("");
  const userRole = localStorage.getItem("role")?.toUpperCase();
  const handleReturn = async () => {
    if (!bookId) {
      setMessage("Please enter a valid book ID.");
      return;
    }

    const username = localStorage.getItem("username"); // Assuming username is stored in localStorage

    try {
      const response = await api.post("/api/u/books/return", { username, bookId }, {
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.text();
      setMessage(result);
    } catch (error) {
      console.error("Error returning book:", error);
      setMessage("Failed to return book. Please try again.");
    }
  };

  return (
    <>
      <Navbar role={userRole} />
      <div className="return-container">
        <h2>Return a Book</h2>
        <input
          type="number"
          placeholder="Enter Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        />
        <button onClick={handleReturn}>Return</button>
        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
}

export default ReturnBook;
