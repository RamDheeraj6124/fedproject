import React, { useEffect, useState } from 'react';

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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Bookings</h2>
            <div>
                <h3>Future Bookings</h3>
                {bookings.futureBookings.length > 0 ? (
                    <ul>
                        {bookings.futureBookings.map((booking) => (
                            <li key={booking._id}>
                                <strong>{booking.shop.shopname}</strong><strong>{booking.groundname} on {new Date(booking.date).toLocaleDateString()}</strong> from {booking.timeSlot.start} to {booking.timeSlot.end}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No future bookings found.</p>
                )}
            </div>
            <div>
                <h3>Today's Bookings</h3>
                {bookings.todaysBookings.length > 0 ? (
                    <ul>
                        {bookings.todaysBookings.map((booking) => (
                            <li key={booking._id}>
                                <strong>{booking.shop.shopname}</strong><strong>{booking.groundname} on {new Date(booking.date).toLocaleDateString()}</strong> from {booking.timeSlot.start} to {booking.timeSlot.end}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bookings for today.</p>
                )}
            </div>
            <div>
                <h3>Past Bookings</h3>
                {bookings.pastBookings.length > 0 ? (
                    <ul>
                        {bookings.pastBookings.map((booking) => (
                            <li key={booking._id}>
                                <strong>{booking.shop.shopname}</strong><strong>{booking.groundname} on {new Date(booking.date).toLocaleDateString()}</strong> from {booking.timeSlot.start} to {booking.timeSlot.end}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No past bookings found.</p>
                )}
            </div>
        </div>
    );
};

export default BookingsList;
