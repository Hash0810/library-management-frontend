import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Adminpage.css";
import api from "../api";

const BookInventory = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const userRole = localStorage.getItem("role")?.toUpperCase()
    useEffect(() => {
        api.get("/librarian/bookInventory")
          .then((response) => {
            const data = response.data;
            if (Array.isArray(data)) {
              setBooks(data); // ✅ Only set if data is an array
            } else {
              console.error("Unexpected API response:", data);
              setBooks([]); // ✅ Set empty array if response is invalid
            }
          })
          .catch((error) => {
            console.error("Error fetching books:", error);
            setBooks([]);
          })
          .finally(() => setLoading(false)); // ✅ Stop loading after fetch
      }, []);
      return (
        <div>
            <Navbar role={userRole}/>
            <div className="admin-container">
                <h2>Book Inventory</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : books.length === 0 ? (
                    <p>No books available.</p>
                ) : (
                    <div className="table-container">
                        <table className="book-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Book Name</th>
                                    <th>Author</th>
                                    <th>Genre</th>
                                    <th>Available</th>
                                    <th>Books Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book) => (
                                    <tr key={book.id}>
                                        <td>{book.id}</td>
                                        <td>{book.bookName}</td>
                                        <td>{book.author}</td>
                                        <td>{book.genre}</td>
                                        <td className={book.available ? "available-yes" : "available-no"}>{book.available ? "Yes" : "No"}</td>
                                        <td>{book.copies}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookInventory;
