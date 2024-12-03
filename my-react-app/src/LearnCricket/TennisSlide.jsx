import React, { useEffect, useState } from 'react';
import './CricketSlide.css'; // Reuse the same CSS file

const TennisSlide = () => {
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

    // Function to show each section with a delay
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
      // Clean up timers on component unmount
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="cricket-container">
      <header className="cricket-header">
        <h1>Tennis: A Game of Skill and Precision</h1>
      </header>

      {visibleSections.rules && (
        <section className="cricket-rules">
          <h2>Basic Rules of Tennis</h2>
          <ul>
            <li>A match consists of sets, and a player must win 6 games (with at least a 2-game lead) to win a set.</li>
            <li>The scoring system is unique: 15, 30, 40, and game. A "deuce" occurs at 40-40, requiring a 2-point lead to win the game.</li>
            <li>Players alternate serving every game; a serve must land diagonally in the opponent's service box.</li>
            <li>The ball must not bounce more than once on either side before being returned.</li>
            <li>In doubles, the alley (extra width on the court) is in play, making the court wider than in singles.</li>
          </ul>
        </section>
      )}

      {visibleSections.findGround && (
        <section className="find-cricket-ground">
          <h2>Find Tennis Courts Nearby</h2>
          <p>Discover the best tennis courts near you! Whether you're a beginner or a seasoned player, find courts with booking facilities, coaching sessions, and friendly matches.</p>
          <p>
            Check out options for indoor and outdoor courts to suit your preferences. Download our app to explore locations, availability, and ratings for the perfect match!
          </p>
        </section>
      )}

      {visibleSections.dimensions && (
        <section className="cricket-dimensions">
          <h2>Tennis Court Dimensions</h2>
          <ul>
            <li>The court measures 23.77 meters (78 feet) in length.</li>
            <li>For singles, the width is 8.23 meters (27 feet), while for doubles, it is 10.97 meters (36 feet).</li>
            <li>The net is 1.07 meters (3.5 feet) high at the posts and 0.91 meters (3 feet) high at the center.</li>
            <li>The service boxes are divided by the center service line, creating two equal areas on each side.</li>
          </ul>
        </section>
      )}

      {visibleSections.basics && (
        <section className="cricket-basics">
          <h2>Tennis Basics</h2>
          <p>
            Tennis is played on different surfaces, such as grass, clay, or hard courts, each influencing the game's speed and bounce. 
            Players use rackets to hit a ball over the net, aiming to outmaneuver their opponent and win points.
          </p>
          <p>
            A good understanding of footwork, racket grips, and shot types (forehand, backhand, volley, serve) is essential for success. 
            Matches test not only physical skill but also mental endurance and strategy.
          </p>
        </section>
      )}

      {visibleSections.strategies && (
        <section className="cricket-rules">
          <h2>Winning Strategies in Tennis</h2>
          <ul>
            <li><strong>Serve and Volley:</strong> Serve aggressively and rush to the net to finish points quickly.</li>
            <li><strong>Baseline Play:</strong> Dominate from the back of the court with powerful groundstrokes.</li>
            <li><strong>Spin and Placement:</strong> Use topspin, slice, and precise placement to control the game.</li>
            <li><strong>Mental Strength:</strong> Stay focused, manage emotions, and anticipate the opponent’s moves.</li>
            <li><strong>Adaptability:</strong> Adjust strategies based on the surface and your opponent's style.</li>
          </ul>
        </section>
      )}

      {visibleSections.famousPlayers && (
        <section className="cricket-rules">
          <h2>Famous Tennis Players</h2>
          <ul>
            <li><strong>Roger Federer:</strong> Known for his elegance and dominance on grass courts.</li>
            <li><strong>Serena Williams:</strong> A legend in women’s tennis with powerful serves and resilience.</li>
            <li><strong>Rafael Nadal:</strong> The "King of Clay" with unmatched tenacity and top-spin shots.</li>
            <li><strong>Novak Djokovic:</strong> Master of all surfaces and a mental fortress under pressure.</li>
            <li><strong>Steffi Graf:</strong> Holder of the Golden Slam (all four Grand Slams and Olympic gold in a single year).</li>
          </ul>
        </section>
      )}

      <footer className="cricket-footer">
        <p>&copy; 2024 Tennis Central. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default TennisSlide;
