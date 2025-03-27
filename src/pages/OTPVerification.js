// src/pages/OTPVerification.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import '../styles/Otp.css';
// src/pages/OTPVerification.js

const OTPVerification = ({ onSuccess }) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const email = localStorage.getItem("resetEmail") || localStorage.getItem("otpEmail");
    const type = localStorage.getItem("otpType"); // Get type from local storage
    const username = localStorage.getItem("username"); 
    useEffect(() => {
        if (!email) {
            setError("Email not found. Please enter your email.");
            navigate("/forgot-password");
        }
    }, [email, navigate]);

    const handleChange = (value, index) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 3) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
        setError("Please enter a 4-digit OTP.");
        return;
    }
    setIsLoading(true);
    setError("");
    try {
        const urlMap = {
            signup: "/api/u/verify-signup-otp",
            login: "/api/u/verify-login-otp",
            "reset-password": "/api/u/verify-reset-password-otp",
            "admin-signup": "/api/u/verify-admin-signup-otp",
        };
        const url = urlMap[type]; 
        if (!url) {
            setError("Invalid OTP type.");
            return;
        }

        const response = await api.post(url, {
            email: email,
            otp: otpValue
        }, {
            headers: { "Content-Type": "application/json" }
        });

        if (response.data.includes("successful")) {
            if (type === "reset-password") {
                onSuccess();
                navigate("/reset-password"); 
            } else {
                onSuccess();
                navigate("/", { replace: true });
            }
        } else {
            setError("Invalid OTP. Please try again.");
        }
    } catch (error) {
        setError("Failed to verify OTP. Please try again.");
    } finally {
        setIsLoading(false);
    }
};


    return (
        <div className="otp-container">
            <h2>Enter OTP</h2>
            <div className="otp-inputs">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        className="otp-input"
                    />
                ))}
            </div>
            {error && <p className="error-text">{error}</p>}
            <button onClick={handleSubmit} className="verify-button" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
        </div>
    );
};

export default OTPVerification;
