import React, { useState, useEffect } from "react";
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

  const [librarianId, setLibrarianId] = useState(null);
  const userRole = localStorage.getItem("role")?.toUpperCase();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/api/u/profile"); // Adjust the endpoint as needed
        if (response.status === 200) {
          const userData = response.data;
          if (userData.role && userData.role.toUpperCase() === "LIBRARIAN") {
            setLibrarianId(userData.id); // Assuming the ID is in userData.id
          } else {
            alert("You do not have librarian access.");
          }
        } else {
          alert("Failed to fetch user profile.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        alert("Error fetching user profile. Please try again.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: name === "copies" ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!librarianId) {
      alert("Librarian ID not found! Please log in again.");
      return;
    }

    const bookData = {
      librarianId: librarianId, // Use the fetched librarian ID
      book: { ...book },
    };

    try {
      const response = await api.post("/librarian/addBook", bookData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("Book added successfully!");
        setBook({ bookName: "", author: "", genre: "", available: true, copies: 1 });
      } else {
        alert("Failed to add book.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding book. Please try again.");
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
