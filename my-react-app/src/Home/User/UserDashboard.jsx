import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../partials/Header';
import './UserDashboard.css';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [userBookings, setUserBookings] = useState([]);
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [editingContact, setEditingContact] = useState(false);
    const [error, setError] = useState(''); // For form validation
    const navigate = useNavigate();

    useEffect(() => {
        const checkSessions = async () => {
            try {
                // Fetch user session
                const userResponse = await fetch('http://localhost:5000/user/checksession', {
                    credentials: 'include'
                });

                if (userResponse.ok) {
                    const data = await userResponse.json();
                    setUser(data.user);
                    setContact(data.user.contact || '');
                } else {
                    setUser(null);
                    navigate('/login'); // Redirect to login if no user session
                }

                // Fetch user bookings
                const bookingsResponse = await fetch('http://localhost:5000/user/userbookings', {
                    credentials: 'include'
                });

                if (bookingsResponse.ok) {
                    const bookingsData = await bookingsResponse.json();
                    setUserBookings(bookingsData.bookings);
                }
            } catch (error) {
                console.error('Error checking sessions:', error);
            }
        };

        checkSessions();
    }, [navigate]);

    const handleSaveContact = async () => {
        if (!contact) {
            setError('Contact number cannot be empty.');
            return;
        }
        if (!/^\d{10}$/.test(contact)) {  // Assuming contact is a 10-digit number
            setError('Invalid contact number. It should be 10 digits.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/user/updatecontact', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contact }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data); // Update user with the new contact
                setEditingContact(false);
                setError(''); // Clear error
            }
        } catch (err) {
            console.error('Error updating contact:', err);
        }
    };

    return (
        <div className="ud-container">
            <Header />
            <div className="ud-user-info">
                <h1 className="ud-title">Welcome, {user?.username}</h1>
                <p className="ud-email">Email: {user?.email}</p>
                <div className="ud-contact">
                    {editingContact ? (
                        <div className="ud-contact-form">
                            <label htmlFor="contact">Update Contact Number:</label>
                            <input
                                id="contact"
                                type="text"
                                placeholder="Enter your contact"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="ud-contact-input"
                            />
                            {error && <p className="ud-error">{error}</p>}
                            <button onClick={handleSaveContact} className="ud-save-contact-btn">Save</button>
                            <button onClick={() => setEditingContact(false)} className="ud-cancel-btn">Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p>Contact: {user?.contact || 'Not Available'}</p>
                            <button onClick={() => setEditingContact(true)} className="ud-add-contact-btn">
                                {user?.contact ? 'Edit Contact' : 'Add Contact'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <h2 className="ud-bookings-title">Your Bookings</h2>
            <div className="ud-bookings">
                {userBookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    userBookings.map((booking) => (
                        <div className="ud-booking-card" key={booking._id}>
                            <h2>{booking.shop.shopname}</h2>
                            <h2 className="ud-ground-name">{booking.groundname}</h2>
                            <p className="ud-date">Date: {new Date(booking.date).toLocaleDateString()}</p>
                            <p className="ud-time-slot">Time Slot: {booking.timeSlot.start} - {booking.timeSlot.end}</p>
                            <p className="ud-amount-paid">Amount Paid: ${booking.amountPaid}</p>
                            <p className="ud-status">Status: {booking.status}</p>
                            {booking.feedback && booking.feedback.rating && (
                                <div className="ud-feedback">
                                    <p className="ud-rating">Rating: {booking.feedback.rating}/5</p>
                                    <p className="ud-comment">Comment: {booking.feedback.comment}</p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
