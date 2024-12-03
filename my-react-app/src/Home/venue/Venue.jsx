import React, { useEffect, useState, useRef } from 'react';
import VenueCard from './VenueCard';
import Loader from './Loader';  // Ensure Loader is imported
import './Venue.css';

function Venue() {
  const effectRan = useRef(false);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);  // Starts as true

  useEffect(() => {
    if (effectRan.current === false) {
      const venueload = async () => {
        try {
          console.log("Fetching venues...");  // Debugging point
          const response = await fetch('http://localhost:5000/shop/loadvenues', {
            credentials: 'include'
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched Data:', data);

            if (Array.isArray(data) && data.length > 0) {
              setVenues(data);
            } else {
              console.warn('Fetched data is not in expected format:', data);
            }
          } else {
            console.error('Failed to load venues:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching venues:', error);
          alert('An error occurred while fetching venues.');
        } finally {
          setLoading(false); // Set loading to false after data is fetched
          console.log("Loading finished, venues should appear.");
        }
      };

      venueload();
      effectRan.current = true;
    }
    
    return () => {
      effectRan.current = true; // Cleanup
    };
  }, []);

  // Check if the loading state is correct
  console.log("Loading state:", loading);

  // Loader rendering when loading is true
  if (loading) {
    return <Loader />; // Loader should show up here
  }

  return (
    <div className="app">
      <div className="book-venues">
        <div className="heading">
          <h2 className="heading2">Book Venues</h2>
          <a href="/Book" className="see-all">SEE ALL VENUES</a>
        </div>
        <div className="venues-container">
          {venues.slice(0, 6).map((venue, index) => (
            <VenueCard key={index} venue={venue} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Venue;
