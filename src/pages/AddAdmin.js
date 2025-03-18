import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/Adminpage.css";

const AddAdmin = () => {
    const [formData, setFormData] = useState({ name: "", email: "", username: "", password: "" });
    const userRole = localStorage.getItem("role")?.toUpperCase();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/admin/add-admin", formData);
            alert("Admin account created! Please verify via OTP.");
        } catch (error) {
            alert("Failed to create admin: " + (error.response?.data?.message || "Unknown error"));
        }   
    };

    return (
        <div>
            <Navbar role={userRole}/>
            <div className="admin-container">
                <h2>Add Admin</h2>
                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Name" onChange={handleChange} required />
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                    <input name="username" placeholder="Username" onChange={handleChange} required />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                    <button type="submit">Create Admin</button>
                </form>
            </div>
        </div>
    );
};

export default AddAdmin;
