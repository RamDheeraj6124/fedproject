import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleRegister = async (e) => {
        e.preventDefault();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.exec(email)) {
            setEmailError('Enter a valid email');
            return;
        } else {
            setEmailError('');
        }
        if (!passwordPattern.exec(password)) {
            setPasswordError('!Password must be at least 8 characters long, contain a mix of uppercase, lowercase, numeric, and special characters.');
            return;
        } else {
            setPasswordError('');
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError('!Passwords do not match');
            return;
        } else {
            setConfirmPasswordError('');
        }
        try {
            const res = await fetch('http://localhost:5000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            if (res.ok) {
                console.log('User registered successfully');
                navigate('/login');
            } else {
                console.log('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="background-wrapper">
            <div className='shoplink'>
                <a href="/login" className='underline'><h1>User</h1></a>
            </div>
            <div className="login-container">
                <h2 className='center'>Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <span className="icon">
                            <img src="https://img.icons8.com/ios-filled/20/000000/user.png" alt="Username" />
                        </span>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <span className="icon">
                            <img src="https://img.icons8.com/ios-filled/20/000000/email-open.png" alt="Email" />
                        </span>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span>
                            <p className="m1">{emailError}</p>
                        </span>
                    </div>
                    <div className="input-group">
                        <span className="icon">
                            <img src="https://img.icons8.com/ios-filled/20/000000/lock.png" alt="Password" />
                        </span>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <span>
                            <p className="m1"><i class="fas fa-exclamation"></i>{passwordError}</p>
                        </span>
                    <div className="input-group">
                        <span className="icon">
                            <img src="https://img.icons8.com/ios-filled/20/000000/lock.png" alt="Confirm Password" />
                        </span>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <span>
                            <p className="m1"><i class="fas fa-exclamation"></i>{confirmPasswordError}</p>
                        </span>
                    <div className="options">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" className="login-btn">
                        Register Now
                    </button>
                    <div className="register-link">
                        Already have an account? <Link to="/login">Login Now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;