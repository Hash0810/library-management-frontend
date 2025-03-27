// src/pages/ForgotPassword.js
import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import OTPVerification from "./OTPVerification";
import "../styles/Auth.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showOtpVerification, setShowOtpVerification] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/u/reset-password-initiate", { email });
            if (response.data.includes("OTP has been sent")) {
                setMessage(response.data);
                localStorage.setItem("resetEmail", email); // Store the email for later use
                setShowOtpVerification(true);
            } else {
                setError(response.data);
            }
        } catch (error) {
            setError("Error sending reset password request. Please try again.");
        }
    };

    const handleOtpSuccess = () => {
        navigate("/reset-password"); // Redirect to reset password page after OTP verification
    };

    if (showOtpVerification) {
        return <OTPVerification type="reset-password" onSuccess={handleOtpSuccess} />;
    }

    return (
        <div className="login-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ForgotPassword;
