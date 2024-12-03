import React from 'react';
import { Link } from 'react-router-dom';
import './VenueCard2.css';

const VenueCard2 = ({ venue }) => {
  const formattedVenueName = venue.name.replace(/\s+/g, '-');
  const formattedGroundName = venue.groundname.replace(/\s+/g, '-');

  return (
    <div className="venue-card">
      <a href={`/Booking/${formattedVenueName}_${formattedGroundName}`}><img src={venue.image} alt={venue.name} className="venue-image" /></a>
      <div className="venue-details">
        <h3>{venue.name}</h3>
        <p>{venue.address}</p>
        <button className='vcbutton'><Link to={`/Booking/${formattedVenueName}_${formattedGroundName}`}>Book Now</Link></button>
      </div>
    </div>
  );
};

export default VenueCard2;

