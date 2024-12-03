import React, { useEffect, useState } from 'react';
import './CricketSlide.css'; // Reuse the same CSS file

const BasketballSlide = () => {
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
        <h1>Basketball Basics & Rules</h1>
      </header>

      {visibleSections.rules && (
        <section className="cricket-rules">
          <h2>Basketball Rules</h2>
          <ul>
            <li>A basketball team consists of 5 players on the court at a time.</li>
            <li>The game is played in four quarters, each lasting 12 minutes (NBA) or 10 minutes (FIBA).</li>
            <li>The objective is to score more points than the opponent by shooting the ball into the hoop.</li>
            <li>Players must dribble the ball while moving; traveling and double dribbling are violations.</li>
          </ul>
        </section>
      )}

      {visibleSections.findGround && (
        <section className="find-cricket-ground">
          <h2>Find Basketball Courts Nearby</h2>
          <p>Searching for a court to practice your shots or play with friends? Explore our list of nearby basketball courts and book a time slot!</p>
        </section>
      )}

      {visibleSections.dimensions && (
        <section className="cricket-dimensions">
          <h2>Basketball Court Dimensions</h2>
          <ul>
            <li>The court is 28 meters long and 15 meters wide (FIBA), or 94 feet by 50 feet (NBA).</li>
            <li>The hoop is 10 feet (3.05 meters) high from the ground.</li>
            <li>The three-point line is 6.75 meters (22 feet, 2 inches) from the basket (FIBA) or 23 feet, 9 inches (NBA).</li>
          </ul>
        </section>
      )}

      {visibleSections.basics && (
        <section className="cricket-basics">
          <h2>Basketball Basics</h2>
          <p>Basketball is a fast-paced, high-scoring game played on a rectangular court. Teams score points by shooting the ball into the opponent's hoop while defending their own basket.</p>
        </section>
      )}

      <footer className="cricket-footer">
        <p>&copy; 2024 Basketball Central. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default BasketballSlide;
