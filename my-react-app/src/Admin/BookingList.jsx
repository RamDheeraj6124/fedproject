import React, { useEffect, useState } from 'react';
import './BookingList.css';

const BookingsList = () => {
    const [bookings, setBookings] = useState({
        futureBookings: [],
        todaysBookings: [],
        pastBookings: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:5000/admin/getallbookings'); // Adjust the URL based on your API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }
                const data = await response.json();
                setBookings({
                    futureBookings: data.futureBookings,
                    todaysBookings: data.todaysBookings,
                    pastBookings: data.pastBookings
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="bookings-list">
            <h1>Bookings</h1>
            <div className='bookings'>
            <div>
                <h2>Future Bookings</h2>
                {bookings.futureBookings.length > 0 ? (
                    <ul>
                        {bookings.futureBookings.map((booking) => (
                            <li key={booking._id}>
                                <strong>{booking.shop.shopname}</strong><br />
                                <strong>{booking.groundname} on {new Date(booking.date).toLocaleDateString()}</strong><br />
                                from {booking.timeSlot.start} to {booking.timeSlot.end}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No future bookings found.</p>
                )}
            </div>
            <div>
                <h2>Today's Bookings</h2>
                {bookings.todaysBookings.length > 0 ? (
                    <ul>
                        {bookings.todaysBookings.map((booking) => (
                            <li key={booking._id}>
                                <strong>{booking.shop.shopname}</strong><br />
                                <strong>{booking.groundname} on {new Date(booking.date).toLocaleDateString()}</strong><br /><br />
                                from {booking.timeSlot.start} to {booking.timeSlot.end}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bookings for today.</p>
                )}
            </div>
            <div>
                <h2>Past Bookings</h2>
                {bookings.pastBookings.length > 0 ? (
                    <ul>
                        {bookings.pastBookings.map((booking) => (
                            <li key={booking._id}>
                                <strong>{booking.shop.shopname}</strong><br />
                                <strong>{booking.groundname} on {new Date(booking.date).toLocaleDateString()}</strong><br />
                                from {booking.timeSlot.start} to {booking.timeSlot.end}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No past bookings found.</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default BookingsList;