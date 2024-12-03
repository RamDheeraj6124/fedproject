import React, { useEffect, useState } from 'react';
import './CricketSlide.css'; // Reuse the same CSS file

const FootballSlide = () => {
  const [visibleSections, setVisibleSections] = useState({
    rules: false,
    findGround: false,
    dimensions: false,
    basics: false,
  });

  useEffect(() => {
    const timers = [];

    // Function to show each section with a delay
    const showSection = (section, delay) => {
      timers.push(
        setTimeout(() => {
          setVisibleSections((prev) => ({ ...prev, [section]: true }));
        }, delay)
      );
    };

    showSection('rules', 0);        // Show rules immediately
    showSection('findGround', 2000); // Show find ground after 2 seconds
    showSection('dimensions', 4000); // Show dimensions after 4 seconds
    showSection('basics', 6000);     // Show basics after 6 seconds

    return () => {
      // Clean up timers on component unmount
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="cricket-container">
      <header className="cricket-header">
        <h1>Football Basics & Rules</h1>
      </header>

      {visibleSections.rules && (
        <section className="cricket-rules">
          <h2>Football Rules</h2>
          <ul>
            <li>Each team consists of 11 players, including a goalkeeper.</li>
            <li>The game lasts for 90 minutes, divided into two halves of 45 minutes each.</li>
            <li>The objective is to score more goals than the opposition by the end of the match.</li>
            <li>Players can use any part of their body except their hands and arms to control the ball, except for goalkeepers within their penalty area.</li>
          </ul>
        </section>
      )}

      {visibleSections.findGround && (
        <section className="find-cricket-ground">
          <h2>Find Football Grounds Nearby</h2>
          <p>Looking for a place to play football? Check out our curated list of nearby football grounds and book your slot today!</p>
        </section>
      )}

      {visibleSections.dimensions && (
        <section className="cricket-dimensions">
          <h2>Football Field Dimensions</h2>
          <ul>
            <li>The field is typically 100-110 meters long and 64-75 meters wide.</li>
            <li>The goal is 7.32 meters wide and 2.44 meters high.</li>
            <li>The penalty area extends 16.5 meters from the goal line and is 40.3 meters wide.</li>
          </ul>
        </section>
      )}

      {visibleSections.basics && (
        <section className="cricket-basics">
          <h2>Football Basics</h2>
          <p>Football, also known as soccer in some countries, is a team sport played with a spherical ball. Teams compete to score goals by advancing the ball into the opposing goal area.</p>
        </section>
      )}

      <footer className="cricket-footer">
        <p>&copy; 2024 Football Central. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default FootballSlide;
