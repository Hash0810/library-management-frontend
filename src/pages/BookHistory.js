import React, { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import "../styles/BookHistory.css"; // Separate CSS for styling

const BookHistory = () => {
    const [bookHistory, setBookHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // Backend pages start from 0
    const recordsPerPage = 10;
    const [totalPages, setTotalPages] = useState(1); // Track total pages

    const userRole = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    useEffect(() => {
        fetchBookHistory(currentPage);
    }, [currentPage]); // Refetch data when page changes

    const fetchBookHistory = (page) => {
        api.post("/api/u/book-history", { 
                username, 
                page,    // Send page number in request body
                size: recordsPerPage 
        })
        .then((res) => {
            setBookHistory(res.data.content);
            setTotalPages(res.data.totalPages); // Update total pages from response
        })
        .catch((error) => console.error("Error fetching book history:", error));
    };

    return (
        <div className="book-history-container">
            <Navbar role={userRole} />

            <div className="book-history-content">
                <h2>📚 Book History</h2>
                <table className="book-history-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Borrowed Date</th>
                            <th>Returned Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookHistory.length > 0 ? (
                            bookHistory.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.book.bookName}</td>
                                    <td>{transaction.book.author}</td>
                                    <td>{transaction.borrowDate}</td>
                                    <td>{transaction.returnDate ? transaction.returnDate : "Not Returned"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="no-data">No book history available</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button 
                            className="nav-button" 
                            disabled={currentPage === 0} 
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            &lt;
                        </button>
                        <span>Page {currentPage + 1} of {totalPages}</span>
                        <button 
                            className="nav-button" 
                            disabled={currentPage + 1 === totalPages} 
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            &gt;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookHistory;
