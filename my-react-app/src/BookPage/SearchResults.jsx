import React, { useEffect, useState, useRef } from 'react';
import SearchCard from '../BookPage/SearchCard';
import './Venue2.css';
import Header from '../Home/partials/Header';
import SearchSection from '../Home/partials/SearchSection';
import Loader2 from './Loader2';

function SearchResults() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const effectRan = useRef(false);

  // Static venues data
  const staticVenues = [];

  useEffect(() => {
    if (effectRan.current === false) {
      const fetchVenues = async () => {
        try {
          const response = await fetch('http://localhost:5000/shop/searchloadvenues', {
            credentials: 'include'
          });
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched Data:', data);

            // Check if data structure matches expected format
            if (Array.isArray(data) && data.length > 0) {
              // Merge static venues with fetched venues data
              setVenues([...staticVenues, ...data]);
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
          setLoading(false); // Stop loading regardless of success or failure
        }
      };

      fetchVenues();
      effectRan.current = true;
    }

    return () => {
      effectRan.current = true; // Cleanup to prevent double fetch in strict mode
    };
  }, []);

  if (loading) {
    return <Loader2 />;  // Show loader when data is being fetched
  }

  return (
    <div className="venue-section2">
      <Header />
      <SearchSection />
      <div className="venue-section">
        <div className="venue-header2">
          <h2 className="venue-heading2">Book Venues</h2>
        </div>
        <div className="venue-grid2">
          {venues.map((venue, index) => (
            <SearchCard key={index} venue={venue} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
