import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/style.css";
import api from "../api";
function BorrowBook() {
  const [bookId, setBookId] = useState("");
  const [message, setMessage] = useState("");
  const userRole = localStorage.getItem("role")?.toUpperCase();
  const handleBorrow = async () => {
  if (!bookId.trim()) {
    setMessage("Please enter a valid book ID.");
    return;
  }

  const bookIdInt = parseInt(bookId, 10);
  if (isNaN(bookIdInt) || bookIdInt <= 0) {
    setMessage("Invalid book ID.");
    return;
  }

  try {
    const username = localStorage.getItem("username");
    const response = await api.post("/api/u/books/borrow", { username, bookId: bookIdInt });

    setMessage(response.data);
  } catch (error) {
    console.error("Error borrowing book:", error.response?.data || error.message);
    setMessage(error.response?.data || "Failed to borrow book. Please try again.");
  }
};

  return (
    <div>
      <Navbar role={userRole} />
      <div className="borrow-container">
        <h2>Borrow a Book</h2>
        <input
          type="number"
          placeholder="Enter Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        />
        <button onClick={handleBorrow}>Borrow</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default BorrowBook;
