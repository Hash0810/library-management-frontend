// src/pages/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from './api';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function Login({ setIsOtpVerified }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // src/pages/Login.js
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/u/login', { username, password });
            localStorage.setItem('otpEmail', response.data.email);
            localStorage.setItem('otpType', 'login'); // Set type for OTP verification
            localStorage.setItem('isAuthenticated', 'false');
            localStorage.setItem('username', username);
            dispatch({ type: 'LOGIN_SUCCESS', payload: { role: response.data.role } });
            setIsOtpVerified(false); // Set OTP verification state
            navigate('/otp-verification'); // Navigate to OTP verification
        } catch (err) {
            console.error(err); // Log the error for debugging
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <button type="button" className="forgot-password-btn" onClick={() => navigate('/forgot-password')}>
                    Forgot Password?
                </button>
                <p>Don't have an account? <Link to="/signup">Register here</Link></p>
            </form>
        </div>
    );
}

export default Login;
