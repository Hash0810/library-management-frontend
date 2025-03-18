import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const UpdateBookStatus = () => {
    const [bookId, setBookId] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const userRole = localStorage.getItem("role")?.toUpperCase();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/librarian/updateBookStatus?bookId=${bookId}&isAvailable=${isAvailable}`);
            alert("Book status updated!");
            setBookId("");
        } catch (error) {
            alert("Error updating status!");
        }
    };

    return (
        <>
            <Navbar role={userRole}/>
            <div className="container">
                <h2>Update Book Status</h2>
                <form onSubmit={handleSubmit}>
                    <input type="number" placeholder="Book ID" value={bookId} onChange={(e) => setBookId(e.target.value)} required />
                    <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value === "true")}>
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                    <button type="submit">Update Status</button>
                </form>
            </div>
        </>
    );
};

export default UpdateBookStatus;
