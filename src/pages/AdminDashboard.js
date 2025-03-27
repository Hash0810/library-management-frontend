import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
    const Role = ["Student", "Teacher", "Librarian"];
   const [formData, setFormData] = useState({ name: "", email: "", role: "Student" });
    const [showInventory, setShowInventory] = useState(true);
    const [libraryInventory, setLibraryInventory] = useState([]);
    const [newUser, setNewUser] = useState({ username: "", role: "Student" });
    const [userRole, setUserRole] = useState(null); // State to store the user role

    // Fetch the user role from the backend or global state
    useEffect(() => {
        const username = localStorage.getItem("username"); // Retrieve username from localStorage
        if (username) {
            api.get(`/api/u/profile?username=${username}`)
                .then((res) => {
                    setUserRole(res.data.role); // Set role from API response
                    localStorage.setItem("role", res.data.role); // Store role in localStorage for future use
                })
                .catch((err) => console.error("Error fetching user role:", err));
        }

        // Fetch inventory using axios
        api.get("/admin/getInventory")
            .then((res) => setLibraryInventory(res.data))
            .catch((error) => console.error("Error fetching inventory:", error));
    }, []);
    const toggleView = () => {
        setShowInventory(!showInventory);
    };

    const addUser = () => {
        fetch("/admin/addUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        })
            .then((res) => res.json())
            .then(() => {
                alert("User added successfully.");
                setNewUser({ username: "", role: "Student" }); // Reset form
            })
            .catch((error) => console.error("Error adding user:", error));
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="admin-dashboard">
            {/* Pass the role to Navbar */}
            <Navbar role={userRole} />
            <div className="dashboard-container">
                <h2>Admin Dashboard</h2>
                <button className="toggle-btn" onClick={toggleView}>
                    {showInventory ? "Hide Inventory" : "Show Inventory"}
                </button>

                {showInventory ? (
                    <div className="inventory-section">
                        <h3>Library Inventory</h3>
                        {libraryInventory.length > 0 ? (
                            <ul className="inventory-list">
                                {libraryInventory.map((item, index) => (
                                    <li key={index}>
                                        {item.category} - {item.count} books
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No books available in the library.</p>
                        )}
                    </div>
                ) : (
                    <div className="add-user-section">
                        <h3>Add New User</h3>
                        
                    <input name="name" placeholder="Name" onChange={handleChange} required />
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                    <input name="phoneNumber" placeholder="Enter your phone number" onChange={handleChange} required />
                    <input name="dateOfBirth" type="date" placeholder="dd-mm-yyyy" onChange={handleChange} required />
                    <input name="username" placeholder="Enter username" onChange={handleChange} required />
                    <input name="password" type="password" placeholder="Enter password" onChange={handleChange} required />
                    <input name="confirmPassword" type="password" placeholder="Confirm password" onChange={handleChange} required />    
                    <select name="role" onChange={handleChange} required>
                        <option value="" disabled selected>Select Role</option>
                        {Role.map((userRole) => (
                            <option key={userRole} value={userRole}>{userRole}</option>
                        ))}
                    </select>
                        <button onClick={addUser}>Add User</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;