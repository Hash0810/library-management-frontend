import React, { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import "../styles/BookHistory.css"; // Separate CSS for styling

const BookHistory = () => {
    const [bookHistory, setBookHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const userRole = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    useEffect(() => {
        api.post(`/api/u/book-history`, { username })
            .then((res) => setBookHistory(res.data))
            .catch((error) => console.error("Error fetching book history:", error));
    }, [username]);

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = bookHistory.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(bookHistory.length / recordsPerPage);

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
                        {currentRecords.length > 0 ? (
                            currentRecords.map((transaction, index) => (
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
                {bookHistory.length > recordsPerPage && (
                    <div className="pagination">
                        <button 
                            className="nav-button" 
                            disabled={currentPage === 1} 
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            &lt;
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button 
                            className="nav-button" 
                            disabled={currentPage === totalPages} 
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
