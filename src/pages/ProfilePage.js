import React, { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState({});
    const [bookHistory, setBookHistory] = useState([]);
    const [fineHistory, setFineHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const userRole = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user details
                const userRes = await api.post(`/api/u/profile`, { username });
                setUserDetails(userRes.data);

                // Fetch limited book history (first 5 records)
                const bookRes = await api.post(`/api/u/book-history`, {
                    username,
                    page: 0,
                    size: 5
                });
                if (bookRes.data && bookRes.data.content) {
                    setBookHistory(bookRes.data.content);
                } else {
                    setBookHistory([]); // Set empty array if content is missing
                }


                // Fetch fine history
                const fineRes = await api.post(`/api/u/fine-history`, { username });
                setFineHistory(fineRes.data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    if (loading) {
    return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <div className="profile-page-container">
            <Navbar role={userRole} />

            <div className="profile-content">
                {/* Left column: User Details */}
                <div className="profile-details">
                    <h2>User Details</h2>
                    <p><strong>Name:</strong> {userDetails.name}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Role:</strong> {userDetails.role}</p>
                    <p><strong>Date of Birth:</strong> {userDetails.dateOfBirth || 'N/A'}</p>
                    <p><strong>Username:</strong> {userDetails.username}</p>
                </div>

                {/* Right column: Tables */}
                <div className="profile-tables">
                    {/* Book History */}
                    <div className="table-container">
                        <div className="table-header">
                            <h2>Recent Book History</h2>
                            
                        </div>
                        <table>
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
                                            <td>{transaction.book?.bookName || 'N/A'}</td>
                                            <td>{transaction.book?.author || 'N/A'}</td>
                                            <td>{transaction.borrowDate || 'N/A'}</td>
                                            <td className={transaction.returnDate ? "returned" : "not-returned"}>
                                                {transaction.returnDate || "Not Returned"}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="no-data">No recent book history</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {bookHistory.length >= 5 && (
                                <Link to="/book-history" className="view-all-link">
                                    View All
                                </Link>
                        )}
                    </div>

                    {/* Fine History */}
                    <div className="table-container">
                        <h2>Fine History</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Book Title</th>
                                    <th>Fine Amount</th>
                                    <th>Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fineHistory.length > 0 ? (
                                    fineHistory.map((fine, index) => (
                                        <tr key={index}>
                                            <td>{fine.bookName || 'N/A'}</td>
                                            <td>${fine.amount?.toFixed(2) || '0.00'}</td>
                                            <td>{fine.reason || 'N/A'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="no-data">No fine history available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
