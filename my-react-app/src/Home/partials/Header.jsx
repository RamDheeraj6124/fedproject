import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [username, setUsername] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const hasCheckedSessions = useRef(false);

    useEffect(() => {
        const checkSessions = async () => {
            if (hasCheckedSessions.current) return;

            hasCheckedSessions.current = true;

            try {
                const userResponse = await fetch('http://localhost:5000/user/checksession', {
                    credentials: 'include'
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUsername(userData.user.username);
                } else {
                    setUsername(null);
                }

                const shopResponse = await fetch('http://localhost:5000/shop/checkshopsession', {
                    credentials: 'include'
                });

                if (shopResponse.ok) {
                    navigate('/shopdashboard');
                }
            } catch (error) {
                console.error('Error checking sessions:', error);
            }
        };

        checkSessions();
    }, [navigate]);

    const handleLogout = async () => {
        await fetch('http://localhost:5000/user/logout', { credentials: 'include', method: 'POST' });
        setUsername(null);
        navigate('/');
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev); // Toggle dropdown visibility
    };

    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <a href="/"><span className="highlight">B</span>ox<span className="highlight">P</span>lay</a>
                </div>
                <ul className="nav-links1">
                    <li><a href="/play">Play</a></li>
                    <li><a href="/Book">Book</a></li>
                    <li><a href="/Learn">Learn</a></li>
                    <li><a href="/News">News</a></li>
                </ul>
                <div className="auth">
                    {username ? (
                        <div className="username">
                            <span onClick={toggleDropdown} className='h-user'>{username}</span> {/* Click to toggle dropdown */}
                            {dropdownOpen && (
                                <div className="dropdown">
                                    <button onClick={() => navigate('/userdashboard')}>Go to Dashboard</button>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <a href="./login">Login/Sign Up</a>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
