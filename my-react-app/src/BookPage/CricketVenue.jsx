import React, { useEffect, useState } from 'react';
import VenueCard2 from './VenueCard2'; // Reusing the VenueCard2 component
import './Venue2.css'; // Reusing existing styles
import Loader2 from './Loader2'; // Loader component
import Header from '../Home/partials/Header';
import SearchSection from '../Home/partials/SearchSection';

const CricketVenue = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCricketVenues = async () => {
      try {
        const response = await fetch('http://localhost:5000/shop/loadvenues', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();

          // Filter venues where groundname includes 'cricket'
          const cricketVenues = data.filter((venue) =>
            venue.groundname.toLowerCase().includes('cricket')
          );

          setVenues(cricketVenues);
        } else {
          console.error('Failed to load venues:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching venues:', error);
        alert('An error occurred while fetching venues.');
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchCricketVenues();
  }, []);

  if (loading) {
    return <Loader2 />; // Show loader while fetching data
  }

  return (
    <div className="venue-section2">
      <Header />
      <SearchSection />
      <div className="venue-section">
        <div className="venue-header2">
          <h2 className="venue-heading2">Book Cricket Venues</h2>
        </div>
        <div className="venue-grid2">
          {venues.map((venue, index) => (
            <VenueCard2 key={index} venue={venue} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CricketVenue;