// src/pages/Signup.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../api';
import '../styles/Auth.css';
import { Link,useNavigate } from 'react-router-dom';
import OTPVerification from './OTPVerification';

function Signup() {
    const Role = ["Student", "Teacher", "Librarian"];
    const [formData, setFormData] = useState({ name: '', email: '', phoneNumber: '', dateOfBirth: '', username: '', password: '', confirmPassword: '', role: '' });
    const [showOtpVerification, setShowOtpVerification] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            const response = await api.post('/api/u/signup', formData);
            localStorage.setItem('otpEmail', formData.email);
            localStorage.setItem('otpType', 'signup');
            setShowOtpVerification(true);
        } catch (error) {
            setError('Signup failed: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };

    const handleSuccess = () => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: { role: formData.role } });
        navigate('/');
    };
    
    if (showOtpVerification) {
        return <OTPVerification type="signup" onSuccess={handleSuccess} />;
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <input name="name" placeholder="Enter your name" onChange={handleChange} required />
                <input name="email" placeholder="Enter your email" onChange={handleChange} required />
                <input name="phoneNumber" placeholder="Enter your phone number" onChange={handleChange} required />
                <input name="dateOfBirth" type="date" placeholder="dd-mm-yyyy" onChange={handleChange} required />
                <input name="username" placeholder="Enter username" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Enter password" onChange={handleChange} required />
                <input name="confirmPassword" type="password" placeholder="Confirm password" onChange={handleChange} required />
                <select id="role" name="role" onChange={handleChange} required>
                    <option value="" disabled selected>Select Role</option>
                    {Role.map((role) => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Create Account</button>
                <p> Already have an account? <Link to="/login">Log in</Link> </p> 
            </form>
        </div>
    );
}

export default Signup;
