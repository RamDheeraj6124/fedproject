import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../partials/Header';
import './UserDashboard.css';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [userBookings, setUserBookings] = useState([]);
    const [contact, setContact] = useState('');
    const [editingContact, setEditingContact] = useState(false);
    const [error, setError] = useState('');
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [currentBooking, setCurrentBooking] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSessions = async () => {
            try {
                const userResponse = await fetch('http://localhost:5000/user/checksession', {
                    credentials: 'include',
                });

                if (userResponse.ok) {
                    const data = await userResponse.json();
                    setUser(data.user);
                    setContact(data.user.contact || '');
                } else {
                    setUser(null);
                    navigate('/login');
                }

                const bookingsResponse = await fetch('http://localhost:5000/user/userbookings', {
                    credentials: 'include',
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
        if (!/^\d{10}$/.test(contact)) {
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
                setUser(data);
                setEditingContact(false);
                setError('');
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
                alert('Feedback saved successfully.');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    const filterUpcomingBookings = () =>
        userBookings.filter((booking) => new Date(booking.date).getTime() > Date.now());

    const filterPastBookings = () =>
        userBookings.filter((booking) => new Date(booking.date).getTime() <= Date.now());

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

            <h2 className="ud-bookings-title">Your Upcoming Bookings</h2>
            <div className="ud-bookings">
                {filterUpcomingBookings().length === 0 ? (
                    <p>No upcoming bookings found.</p>
                ) : (
                    filterUpcomingBookings().map((booking) => (
                        <div className="ud-booking-card" key={booking._id}>
                            <h2>{booking.shop.shopname}</h2>
                            <h2 className="ud-ground-name">{booking.groundname}</h2>
                            <p className="ud-date">Date: {new Date(booking.date).toLocaleDateString()}</p>
                            <p className="ud-time-slot">Time Slot: {booking.timeSlot.start} - {booking.timeSlot.end}</p>
                            <p className="ud-amount-paid">Amount Paid: ${booking.amountPaid}</p>
                            <p className="ud-status">Status: {booking.status}</p>
                        </div>
                    ))
                )}
            </div>

            <h2 className="ud-bookings-title">Your Past Bookings</h2>
            <div className="ud-bookings">
                {filterPastBookings().length === 0 ? (
                    <p>No past bookings found.</p>
                ) : (
                    filterPastBookings().map((booking) => (
                        <div className="ud-booking-card" key={booking._id}>
                            <h2>{booking.shop.shopname}</h2>
                            <h2 className="ud-ground-name">{booking.groundname}</h2>
                            <p className="ud-date">Date: {new Date(booking.date).toLocaleDateString()}</p>
                            <p className="ud-time-slot">Time Slot: {booking.timeSlot.start} - {booking.timeSlot.end}</p>
                            <p className="ud-amount-paid">Amount Paid: ${booking.amountPaid}</p>
                            <p className="ud-status">Status: {booking.status}</p>
                            {!booking.feedback && (
                                <button onClick={() => handleOpenRatingModal(booking)}>Give Rating</button>
                            )}
                            {booking.feedback && (
                                <div className="ud-feedback">
                                    <p>Rating: {booking.feedback.rating}/5</p>
                                    <p>Review: {booking.feedback.review}</p>
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
                                    {star} Star
                                </option>
                            ))}
                        </select>
                        <label>Review:</label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write your review here"
                        ></textarea>
                        <button className="ud-submit-feedback-btn" onClick={handleSubmitRating}>
                            Submit Feedback
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
