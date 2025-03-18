import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/Adminpage.css";

const AddUser = () => {
    const Role = ["Student", "Teacher", "Librarian"];
    const [formData, setFormData] = useState({ name: "", email: "", role: "Student" });
    const userRole = localStorage.getItem("role")?.toUpperCase();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/admin/add-user", formData);
            alert("User added successfully!");
        } catch (error) {
            alert("Failed to add user: " + (error.response?.data?.message || "Unknown error"));
        }
    };

    return (
        <div>
            <Navbar role={userRole}/>
            <div className="admin-container">
                <h2>Add User</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Add User</button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
