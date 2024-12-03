import React, { useState, useEffect } from 'react';
import './SearchSection.css';
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from 'react-router-dom';

const SearchSection = () => {
    const [isOpen, setIsOpen] = useState(false); // State for sports dropdown toggle
    const [query, setQuery] = useState(""); // State for search query
    const [suggestions, setSuggestions] = useState([]); // State for fetched suggestions
    const [isSearchDropdownVisible, setSearchDropdownVisible] = useState(false); // State for search dropdown visibility

    const navigate = useNavigate();

    // Fetch suggestions from the backend
    const fetchSuggestions = async (searchText) => {
        try {
            const response = await fetch(`http://localhost:5000/shop/venues?search=${searchText}`);
            const data = await response.json();
            setSuggestions(data.searchShop || []); // Safely set suggestions from backend response
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    // Handle search input changes
    const handleInput = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim()) {
            fetchSuggestions(value);
            setSearchDropdownVisible(true);
        } else {
            setSearchDropdownVisible(false);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.groundname); // Set query to selected suggestion
        setSearchDropdownVisible(false); // Hide dropdown
    };

    // Toggle the sport dropdown menu
    const toggleDropdown = () => setIsOpen((prev) => !prev);

    // Handle click outside to close suggestion dropdown
    useEffect(() => {
        const handleClickOutside = () => setSearchDropdownVisible(false);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    // Navigate to the booking page
    const searchpage = (suggestion) => {
        const formattedVenueName = suggestion.shopname.replace(/\s+/g, '-');
        const formattedGroundName = suggestion.groundname.replace(/\s+/g, '-');
        navigate(`/Booking/${formattedVenueName}_${formattedGroundName}`);
    };

    return (
        <div className="search-section">
            <div>
                <h1 className="search-heading">
                    Book Top Sports Complexes in Hyderabad Online
                </h1>
            </div>

            <div className="search-input">
                <i className="bx bx-search-alt-2"></i>
                <input
                    type="text"
                    value={query}
                    onChange={handleInput}
                    onClick={(e) => e.stopPropagation()} // Prevent dropdown close on input click
                    placeholder="Search by venue name"
                />
                {isSearchDropdownVisible && suggestions.length > 0 && (
                    <div className="search-dropdown">
                        {suggestions.map((suggestion, index) => (
                            <div className='search-dropdown2'>
                            <button 
                                key={index} 
                                onClick={() => searchpage(suggestion)} 
                                className="search-dropdown-item"
                            >
                                <div className='dropdownstyle'>
                                    <h1> {suggestion.groundname} </h1>
                                    <div>
                                    <p>{suggestion.shopname}, {suggestion.address}</p>
                                    </div>
                                </div>
                            </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="dropdown-menu">
                <button className="dropdown-button" onClick={toggleDropdown}>
                    <i className="bx bx-cricket-ball"></i>
                    Select Sport
                </button>
                {isOpen && (
                    <div className="dropdown-content">
                        <div className="dropdown-grid">
                            <div className="dropdown-item">
                            <a href="/Book">All Sports</a>
                            </div>
                            <div className="dropdown-item">
                                <a href="/footballvenue">Football</a>
                            </div>
                            <div className="dropdown-item">
                                <a href="/cricketvenue">Cricket</a>
                            </div>
                            <div className="dropdown-item">
                                <a href='/basketballvenue'>Basketball</a>
                            </div>
                            <div className="dropdown-item">
                            <a href="/tennisvenue">Tennis</a>
                            </div>
                            <div className="dropdown-item">
                                <a href='/badmintionVenue'>Badminton</a>
                            </div>
                            <div className="dropdown-item">
                            <a href='/volleyballvenue'>Volleyball</a>
                            </div>
                            <div className="dropdown-item">
                                <a href='/baseballvenue'>Baseball</a>
                            </div>
                            <div className="dropdown-item">
                            <a href='/hockeyvenue'>Hockey</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchSection;
