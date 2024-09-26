import React, { useEffect, useState } from 'react';
import './TodaysBookings.css'
import Header from '../partials/Header';

const TodayBooking = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:5000/shop/todaybookings',{
                    method: 'GET',
                    credentials:'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setBookings(data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div className="tb-container">
            <Header />
            <h1 className="tb-title">Today's Bookings</h1>
            <div className="tb-bookings">
                {bookings.map((booking) => (
                    <div className="tb-booking-card" key={booking._id}>
                        <h2>{booking.shop.shopname}</h2>
                        <h2 className="tb-ground-name">{booking.groundname}</h2>
                        <h2>{booking.user.username}</h2>
                        <p className="tb-date">Date: {new Date(booking.date).toLocaleDateString()}</p>
                        <p className="tb-time-slot">
                            Time Slot: {booking.timeSlot.start} - {booking.timeSlot.end}
                        </p>
                        <p className="tb-status">Status: {booking.status}</p>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodayBooking;
