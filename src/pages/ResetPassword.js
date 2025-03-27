// src/pages/ResetPassword.js
import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const resetPasswordData = {
                email: localStorage.getItem("resetEmail"), // Use the stored email
                newPassword: password,
            };
            const response = await api.post("/api/u/reset-password", resetPasswordData);
            if (response.data.includes("successful")) {
                setMessage("Password reset successful! Redirecting to login page...");
                localStorage.removeItem("resetEmail"); // Clear the email from local storage
                setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2 seconds
            } else {
                setError("Failed to reset password. Please try again.");
            }
        } catch (error) {
            setError("Error resetting password. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPassword;
