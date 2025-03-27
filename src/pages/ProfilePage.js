import React, { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar"; // Add Navbar import
import "../styles/ProfilePage.css";

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState({});
    const [bookHistory, setBookHistory] = useState([]);
    const [fineHistory, setFineHistory] = useState([]);

    const userRole = localStorage.getItem("role"); // Fetch user role from localStorage

    useEffect(() => {
        const username = localStorage.getItem("username");
        api.post(`/api/u/profile`, { username }).then((res) => setUserDetails(res.data));
        api.get(`/api/u/book-history?username=${username}`).then((res) => setBookHistory(res.data));
        api.get(`/api/u/fine-history?username=${username}`).then((res) => setFineHistory(res.data));
    }, []);

    return (
        <div className="profile-page-container">
            {/* Navbar at the top */}
            <Navbar role={userRole} />

            {/* Content layout */}
            <div className="profile-content">
                {/* Left column: User Details */}
                <div className="profile-details">
                    <h2>User Details</h2>
                    <p><strong>Name:</strong>{userDetails.name}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Role:</strong>{userDetails.role}</p>
                    <p><strong>Date of Birth:</strong> {userDetails.dateOfBirth}</p>
                    <p><strong>Username:</strong>{userDetails.username}</p>
                </div>
                {/* Right column: Tables */}
                <div className="profile-tables">
                    {/* Book History */}
                    <div className="table-container">
                        <h2>Book History</h2>
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
                                            <td>{transaction.book.bookName}</td>  {/* ✅ Fix: book.title → book.bookName */}
                                            <td>{transaction.book.author}</td>    {/* ✅ Fix: No change needed */}
                                            <td>{transaction.borrowDate}</td>    {/* ✅ Fix: borrowedDate → borrowDate */}
                                            <td  className={transaction.returnDate ? "returned" : "not-returned"}>{transaction.returnDate ? transaction.status : "Not Returned"}</td>  {/* ✅ Fix: Use 'status' */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="no-data">No book history available</td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
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
                                            <td>{fine.bookName}</td>  {/* Ensure this matches the DTO field name */}
                                            <td>{fine.amount}</td>
                                            <td>{fine.reason}</td>
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
