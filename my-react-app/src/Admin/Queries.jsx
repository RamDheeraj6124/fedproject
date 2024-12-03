import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';


const QueryMode = () => {
    const [queries, setqueries] = useState(null);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const response = await fetch('http://localhost:5000/admin/checksession', {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setUsername(data.username);
                setqueries(data.details.queries)
                
            } else {
                navigate('/login');
                setUsername(null);
            }
        };

        checkSession();
    }, [navigate]);


    if (!username) {
        return <div className="login-message">You must be logged in as an admin to view this page.</div>;
    }

    return (
        <div className="admin-dashboard">
            <h1 id="ad-dashboard-title">Welcome, {username}</h1>

            <h2 id="ad-users-title">Users</h2>
            <ul id="ad-users-list">
                {queries.map(query => (
                    <li key={query._id} id={`ad-user-${query._id}`} >
                        <p>Username: {query.name}</p>
                        <p>Email: {query.email}</p>
                        <p>Mobile:{query.mobile}</p>
                        <p>Message:{query.message}</p>
                    </li>
                ))}
            </ul>

        </div>
    )

}
export default QueryMode;