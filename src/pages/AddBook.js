import React, { useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar"; // Adjust path as needed
import "../styles/AddBook.css";
function AddBook() {
  const [book, setBook] = useState({
    bookName: "",
    author: "",
    genre: "",
    available: true,
    copies: 1,
  });

  
  const userRole = localStorage.getItem("role")?.toUpperCase();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: name === "copies" ? parseInt(value) || 0 : value,
    });};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/librarian/addBook", book, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("Book added successfully!");
        setBook({ bookName: "", author: "", genre: "", available: true });
      } else {
        alert("Failed to add book.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || "Failed to add book."}`);
      } else if (error.request) {
        alert("Error: No response from server.");
      } else {
        alert("Error: Something went wrong.");
      }
    }
  };

  return (
    <>
      <Navbar role={userRole} />
      <div className="add-book-container">
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <label>Book Name:</label>
          <input
            type="text"
            name="bookName"
            value={book.bookName}
            onChange={handleChange}
            required
          />

          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />

          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            required
          />
          <label>Number of Copies:</label>
          <input
            type="number"
            name="copies"
            min="1"
            value={book.copies}
            onChange={handleChange}
            required
          />
          <button type="submit" className="add-btn">Add Book</button>
        </form>
      </div>
    </>
  );
}

export default AddBook;
