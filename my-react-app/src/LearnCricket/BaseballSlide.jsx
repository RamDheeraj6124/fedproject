import React, { useEffect, useState } from 'react';
import './CricketSlide.css'; // Reusing the same CSS

const BaseballSlide = () => {
  const [visibleSections, setVisibleSections] = useState({
    rules: false,
    findGround: false,
    dimensions: false,
    basics: false,
    strategies: false,
    famousPlayers: false,
  });

  useEffect(() => {
    const timers = [];

    const showSection = (section, delay) => {
      timers.push(
        setTimeout(() => {
          setVisibleSections((prev) => ({ ...prev, [section]: true }));
        }, delay)
      );
    };

    showSection('rules', 0);          // Show rules immediately
    showSection('findGround', 2000);  // Show find ground after 2 seconds
    showSection('dimensions', 4000);  // Show dimensions after 4 seconds
    showSection('basics', 6000);      // Show basics after 6 seconds
    showSection('strategies', 8000);  // Show strategies after 8 seconds
    showSection('famousPlayers', 10000); // Show famous players after 10 seconds

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="cricket-container">
      <header className="cricket-header">
        <h1>Baseball: The Great American Pastime</h1>
      </header>

      {visibleSections.rules && (
        <section className="cricket-rules">
          <h2>Basic Rules of Baseball</h2>
          <ul>
            <li>The game is played between two teams of nine players each.</li>
            <li>A standard game consists of nine innings, with each team taking turns to bat and field.</li>
            <li>The batting team tries to score runs by hitting the ball and running between bases.</li>
            <li>The fielding team aims to prevent runs and get batters out through strikeouts, catches, or tagging bases.</li>
            <li>A run is scored when a player completes a circuit of four bases without being out.</li>
          </ul>
        </section>
      )}

      {visibleSections.findGround && (
        <section className="find-cricket-ground">
          <h2>Find Baseball Fields Nearby</h2>
          <p>
            Looking to play ball? Locate nearby baseball fields equipped with professional-grade facilities, batting cages, and coaching programs.
          </p>
          <p>
            Whether you're playing for fun or competing, our app helps you find the perfect diamond!
          </p>
        </section>
      )}

      {visibleSections.dimensions && (
        <section className="cricket-dimensions">
          <h2>Baseball Field Dimensions</h2>
          <ul>
            <li>The distance between bases is 90 feet (27.43 meters).</li>
            <li>The pitching mound is 60 feet 6 inches (18.44 meters) from home plate.</li>
            <li>The outfield dimensions vary but are typically 300–400 feet (91–122 meters) from home plate to the fence.</li>
            <li>The infield features a diamond shape, with bases arranged in a square.</li>
          </ul>
        </section>
      )}

      {visibleSections.basics && (
        <section className="cricket-basics">
          <h2>Baseball Basics</h2>
          <p>
            Baseball is a bat-and-ball sport where teams alternate between batting and fielding. The batting team scores runs by advancing runners around four bases, while the fielding team tries to prevent runs and make outs.
          </p>
          <p>
            Key skills include batting, pitching, fielding, and base running. Communication and teamwork are essential to success on the field.
          </p>
        </section>
      )}

      {visibleSections.strategies && (
        <section className="cricket-rules">
          <h2>Winning Strategies in Baseball</h2>
          <ul>
            <li><strong>Pitching Precision:</strong> Control the pace and placement of pitches to challenge batters.</li>
            <li><strong>Defensive Positioning:</strong> Position players strategically to anticipate hits and minimize scoring chances.</li>
            <li><strong>Base Running:</strong> Use speed and timing to steal bases and take extra bases on hits.</li>
            <li><strong>Lineup Optimization:</strong> Arrange batters in the lineup to maximize scoring opportunities.</li>
            <li><strong>Situational Awareness:</strong> Make tactical decisions based on outs, base runners, and the score.</li>
          </ul>
        </section>
      )}

      {visibleSections.famousPlayers && (
        <section className="cricket-rules">
          <h2>Famous Baseball Players</h2>
          <ul>
            <li><strong>Babe Ruth:</strong> Legendary slugger known as "The Sultan of Swat," with 714 career home runs.</li>
            <li><strong>Jackie Robinson:</strong> The first African-American player in Major League Baseball, known for breaking barriers.</li>
            <li><strong>Mickey Mantle:</strong> A powerful switch-hitter and New York Yankees icon.</li>
            <li><strong>Ichiro Suzuki:</strong> Japanese star renowned for his hitting precision and outfield prowess.</li>
            <li><strong>Hank Aaron:</strong> Held the record for most career home runs (755) for decades.</li>
          </ul>
        </section>
      )}

      <footer className="cricket-footer">
        <p>&copy; 2024 Baseball Central. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default BaseballSlide;
