import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../partials/Header';
import './UserDashboard.css';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [userBookings, setUserBookings] = useState([]);
    const [contact, setContact] = useState('');
    const [editingContact, setEditingContact] = useState(false);
    const [error, setError] = useState(''); // For form validation
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
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

    const handleOpenRatingModal = (booking) => {
        setCurrentBooking(booking);
        setShowRatingModal(true);
    };

    const handleSubmitRating = async () => {
        if (!rating || rating < 1 || rating > 5) {
            alert('Please select a rating between 1 and 5.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/user/submitfeedback', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookingId: currentBooking._id,
                    rating,
                    review,
                }),
            });

            if (response.ok) {
                const updatedBooking = await response.json();
                setUserBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking._id === updatedBooking._id ? updatedBooking : booking
                    )
                );
                setShowRatingModal(false);
                setRating(0);
                setReview('');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
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
                            {!booking.feedback && (
                                <div className="userfeedback">
                                    <button onClick={() => handleOpenRatingModal(booking)}>Give Rating</button>
                                </div>
                            )}
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

            {showRatingModal && (
                <div className="ud-rating-modal">
                    <div className="ud-modal-content">
                        <button className="ud-close-modal" onClick={() => setShowRatingModal(false)}>X</button>
                        <h3>Rate & Review</h3>
                        <label>Rating:</label>
                        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                            <option value="">Select Rating</option>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <option key={star} value={star}>
                                    {star} Star{star > 1 ? 's' : ''}
                                </option>
                            ))}
                        </select>
                        <label>Review:</label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write your review here"
                        />
                        <button onClick={handleSubmitRating}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;