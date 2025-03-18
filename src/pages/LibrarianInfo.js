import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/Adminpage.css";

const LibrarianInfo = () => {
    const [librarians, setLibrarians] = useState([]);
    const userRole = localStorage.getItem("role")?.toUpperCase();
    useEffect(() => {
        const fetchLibrarians = async () => {
            const response = await axios.get("/api/u/librarians");
            setLibrarians(response.data);
        };
        fetchLibrarians();
    }, []);

    return (
        <div>
            <Navbar role={userRole} />
            <div className="admin-page">
                
                <h2>Librarians</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {librarians.length > 0 ? (
                            librarians.map((librarian) => (
                                <tr key={librarian.id}>
                                    <td>{librarian.name}</td>
                                    <td>{librarian.email}</td>
                                    <td>{librarian.phoneNumber}</td>
                                    <td>{librarian.username}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No librarians found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default LibrarianInfo;