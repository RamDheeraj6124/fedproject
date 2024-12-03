import React from 'react';
import { Link } from 'react-router-dom';
import './VenueCard.css';

const VenueCard = ({ venue }) => {
  const formattedVenueName = venue.name.replace(/\s+/g, '-');
  const formattedGroundName = venue.groundname.replace(/\s+/g, '-');

  return (
    <div className="venue-card">
      <a href={`/Booking/${formattedVenueName}_${formattedGroundName}`}><img src={venue.image} alt={venue.name} className="venue-image" /></a>
      <div className="venue-details">
        <h3>{venue.name}</h3>
        <p>{venue.address}</p>
        <div className="Venuhighlight">

        </div>
        <button className='vcbutton'><Link to={`/Booking/${formattedVenueName}_${formattedGroundName}`}>Book Now</Link></button>
      </div>
    </div>
  );
};

export default VenueCard;
