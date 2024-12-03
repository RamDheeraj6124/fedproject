import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Email pattern validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.exec(email)) {
            setEmailError("Enter a valid email");
            return;
        } else {
            setEmailError("");
        }

        try {
            const res = await fetch('http://localhost:5000/shop/shoplogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // This ensures cookies are sent with the request
            });

            if (res.ok) {
                navigate('/shopdashboard'); // Redirect to shop dashboard after successful login
            } else {
                setErrorMessage("Invalid email or password");
            }
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="background-wrapper">
            <div className='shoplink'>
                <a href="/login" className='underline'><h1>User</h1></a>
            </div>
            <div className="login-container">
                <h2 className='center'>Shop Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <span className="icon">
                            <img src="https://img.icons8.com/ios-filled/20/000000/email-open.png" alt="Email"/>
                        </span>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}  
                            required 
                        />
                        {emailError && <p className='error-message'>{emailError}</p>}
                    </div>
                    <div className="input-group">
                        <span className="icon">
                            <img src="https://img.icons8.com/ios-filled/20/000000/lock.png" alt="Password"/>
                        </span>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="options">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" className="login-btn">Login Now</button>
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                    <div className="register-link">
                        Don't have an account? <Link to="/shopregister">Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
