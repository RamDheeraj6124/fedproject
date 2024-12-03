import React, { useEffect, useState } from 'react';
import './CricketSlide.css'; // Reusing the same CSS

const HockeySlide = () => {
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
        <h1>Hockey: The Game of Speed and Skill</h1>
      </header>

      {visibleSections.rules && (
        <section className="cricket-rules">
          <h2>Basic Rules of Hockey</h2>
          <ul>
            <li>Hockey is played between two teams of 11 players each.</li>
            <li>The objective is to score goals by hitting the ball into the opponent's net using a hockey stick.</li>
            <li>Each match consists of four quarters, each lasting 15 minutes.</li>
            <li>Players can only use the flat side of their stick to control the ball.</li>
            <li>No physical contact is allowed; fouls include stick tackles and obstruction.</li>
          </ul>
        </section>
      )}

      {visibleSections.findGround && (
        <section className="find-cricket-ground">
          <h2>Find Hockey Fields Nearby</h2>
          <p>
            Want to hit the field? Use our app to locate hockey fields near you, complete with astro-turf surfaces and lighting facilities for night play.
          </p>
          <p>
            Book your time and join hockey enthusiasts for exciting matches and training sessions.
          </p>
        </section>
      )}

      {visibleSections.dimensions && (
        <section className="cricket-dimensions">
          <h2>Hockey Field Dimensions</h2>
          <ul>
            <li>The field is rectangular, measuring 91.4 meters (100 yards) in length and 55 meters (60 yards) in width.</li>
            <li>The goal area is 14.63 meters (16 yards) from the goal line.</li>
            <li>The penalty spot is 6.4 meters (7 yards) from the goal.</li>
            <li>The shooting circle is a 16-yard semicircle around the goal.</li>
          </ul>
        </section>
      )}

      {visibleSections.basics && (
        <section className="cricket-basics">
          <h2>Hockey Basics</h2>
          <p>
            Hockey is a fast-paced sport where players use sticks to control the ball and score goals. Each player specializes in a position, such as forwards, midfielders, defenders, or the goalkeeper.
          </p>
          <p>
            The game emphasizes skillful ball control, tactical passing, and precise teamwork.
          </p>
        </section>
      )}

      {visibleSections.strategies && (
        <section className="cricket-rules">
          <h2>Winning Strategies in Hockey</h2>
          <ul>
            <li><strong>Ball Possession:</strong> Maintain control of the ball to dominate the game tempo.</li>
            <li><strong>Offensive Positioning:</strong> Place forwards strategically to exploit gaps in the opponent's defense.</li>
            <li><strong>Quick Passes:</strong> Use short, accurate passes to advance the ball and bypass defenders.</li>
            <li><strong>Solid Defense:</strong> Employ zonal or man-to-man marking to block scoring opportunities.</li>
            <li><strong>Penalty Corners:</strong> Master penalty corner techniques to convert them into goals.</li>
          </ul>
        </section>
      )}

      {visibleSections.famousPlayers && (
        <section className="cricket-rules">
          <h2>Famous Hockey Players</h2>
          <ul>
            <li><strong>Dhyan Chand:</strong> Known as "The Wizard," he led India to three Olympic gold medals.</li>
            <li><strong>Jamie Dwyer:</strong> Australian legend and five-time FIH World Player of the Year.</li>
            <li><strong>Luciana Aymar:</strong> Argentine star often called the "Maradona of Hockey."</li>
            <li><strong>Teun de Nooijer:</strong> Dutch player recognized for his exceptional skill and longevity.</li>
            <li><strong>Rani Rampal:</strong> Inspirational captain of the Indian women’s hockey team.</li>
          </ul>
        </section>
      )}

      <footer className="cricket-footer">
        <p>&copy; 2024 Hockey Central. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HockeySlide;
