import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Signup.css';
import OTPVerification from './OTPVerification';
import { useDispatch } from 'react-redux';

function AdminSignup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        username: '',
        password: '',
        confirmPassword:''
    });
    const [showOtpVerification, setShowOtpVerification] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        // Basic validation
        if (!formData.username || !formData.password || !formData.email) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const response = await axios.post('/api/u/admin-signup', formData);
            
            
            localStorage.setItem('otpEmail', formData.email);
            localStorage.setItem('otpType', 'admin-signup');
            setShowOtpVerification(true);
        } catch (error) {
            alert("Signup failed: " + (error.response ? error.response.data.message : "Unknown error"));
        }
    };
    const handleSuccess = () => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: { role: formData.role } });
        navigate('/');
    };
    
    if (showOtpVerification) {
        return <OTPVerification type="admin-signup" onSuccess={handleSuccess} />;
    }
    
    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <h2>Admin Signup</h2>
                <input name="name" placeholder="Enter your name" onChange={handleChange} />
                <input name="email" placeholder="Enter your email" onChange={handleChange} />
                <input name="phoneNumber" placeholder="Enter your phone number" onChange={handleChange} />
                <input name="dateOfBirth" type="date" onChange={handleChange} />
                <input name="username" placeholder="Enter username" onChange={handleChange} />
                <input name="password" type="password" placeholder="Enter password" onChange={handleChange} />
                <input name="confirmPassword" type="password" placeholder="Confirm password" onChange={handleChange} required />
                <button type="submit">Create Admin Account</button>
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </form>
        </div>
    );
}

export default AdminSignup;
