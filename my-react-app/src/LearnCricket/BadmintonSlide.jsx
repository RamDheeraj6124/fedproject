import React, { useEffect, useState } from 'react';
import './CricketSlide.css'; // Reuse the same CSS file

const BadmintonSlide = () => {
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
        <h1>Badminton: Speed, Precision, and Agility</h1>
      </header>

      {visibleSections.rules && (
        <section className="cricket-rules">
          <h2>Basic Rules of Badminton</h2>
          <ul>
            <li>Badminton can be played in singles or doubles formats.</li>
            <li>A match consists of the best of three games; the first player/team to score 21 points wins a game.</li>
            <li>Points are scored on every rally, whether serving or receiving.</li>
            <li>If the score reaches 20-20, a player/team must win by 2 points (e.g., 22-20). At 29-29, the first to 30 wins.</li>
            <li>The serve must be below the server’s waist, and the shuttle must land in the diagonally opposite service court.</li>
          </ul>
        </section>
      )}

      {visibleSections.findGround && (
        <section className="find-cricket-ground">
          <h2>Find Badminton Courts Nearby</h2>
          <p>
            Looking for a place to smash and drop? Explore nearby badminton courts equipped with top-notch facilities for both recreational and competitive play.
          </p>
          <p>
            Check availability, coaching programs, and equipment rentals through our app. Indoor and outdoor court options available!
          </p>
        </section>
      )}

      {visibleSections.dimensions && (
        <section className="cricket-dimensions">
          <h2>Badminton Court Dimensions</h2>
          <ul>
            <li>The court is 13.4 meters (44 feet) long and 6.1 meters (20 feet) wide for doubles. For singles, the width is reduced to 5.18 meters (17 feet).</li>
            <li>The net is 1.55 meters (5 feet 1 inch) high at the posts and 1.524 meters (5 feet) at the center.</li>
            <li>The service courts are divided into left and right halves by a center line and a short service line 1.98 meters (6 feet 6 inches) from the net.</li>
          </ul>
        </section>
      )}

      {visibleSections.basics && (
        <section className="cricket-basics">
          <h2>Badminton Basics</h2>
          <p>
            Badminton is a high-paced racket sport where players hit a shuttlecock across a net. It demands quick reflexes, agility, and precise shot placement.
          </p>
          <p>
            Common strokes include the smash (a powerful downward hit), drop shot (a soft shot that lands near the net), and clear (a deep, high shot to the back of the court). Serving techniques and court positioning are crucial for success.
          </p>
        </section>
      )}

      {visibleSections.strategies && (
        <section className="cricket-rules">
          <h2>Winning Strategies in Badminton</h2>
          <ul>
            <li><strong>Control the Net:</strong> Dominate the frontcourt to pressure your opponent and set up winning shots.</li>
            <li><strong>Vary Your Shots:</strong> Mix smashes, drops, and clears to keep your opponent guessing and off-balance.</li>
            <li><strong>Footwork:</strong> Maintain quick and efficient movement to cover the court and respond to shots effectively.</li>
            <li><strong>Target Weaknesses:</strong> Exploit your opponent's weak hand or limited mobility by directing shots strategically.</li>
            <li><strong>Consistency:</strong> Avoid unforced errors and keep the shuttle in play to force mistakes from your opponent.</li>
          </ul>
        </section>
      )}

      {visibleSections.famousPlayers && (
        <section className="cricket-rules">
          <h2>Famous Badminton Players</h2>
          <ul>
            <li><strong>Lin Dan:</strong> Known as "Super Dan," a two-time Olympic gold medalist from China.</li>
            <li><strong>P. V. Sindhu:</strong> Indian superstar and Olympic silver and bronze medalist with a dominant smash game.</li>
            <li><strong>Lee Chong Wei:</strong> Malaysian legend, renowned for his agility and consistency on the court.</li>
            <li><strong>Carolina Marín:</strong> Spanish world champion with explosive speed and tactical intelligence.</li>
            <li><strong>Saina Nehwal:</strong> Indian pioneer who has inspired countless players with her achievements on the global stage.</li>
          </ul>
        </section>
      )}

      <footer className="cricket-footer">
        <p>&copy; 2024 Badminton Central. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default BadmintonSlide;
