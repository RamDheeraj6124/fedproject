import React, { useState } from 'react';
import Card from './Card';
import './CardList.css';

const CardList = () => {
  const cardsData = [
    {
      image: 'FootballRule.png', 
      title: 'Football Field Dimensions: Size Matters on the Turf!',
      date: 'Sep 20, 2024',
      category: 'Football, Game Rules, Field',
      description: 'Football enthusiasts know the thrill of a 90-minute game, but have you ever thought about the exact dimensions of a football field? Let’s dive into the layout of the field that drives the world’s most popular sport...',
      link: '/Learnfootball' 
    },
    {
      image: 'CricketRule.jpg', 
      title: 'Cricket Ground Dimensions: Pitch Side Insights!',
      date: 'Sep 19, 2024',
      category: 'Cricket, Game Rules, Pitch',
      description: 'Cricket fans here! Please tell me who is not! But have you ever noticed what players measure on the pitch? While bowling, they count certain steps; while batting, they inspect the pitch...',
      link: '/Learncricket'
    },
    {
      image: 'BasketballRule.jpg', 
      title: 'Basketball Court Dimensions: Dribble in Style!',
      date: 'Sep 21, 2024',
      category: 'Basketball, Game Rules, Court',
      description: 'The game of basketball is fast-paced and full of action, but have you ever noticed how the dimensions of the court can affect gameplay? Let’s take a closer look at the layout that hosts some of the most iconic basketball matches...',
      link: '/Learnbasketball'
    },
    {
      image: 'TennisRule.jpg', 
      title: 'Tennis Court Dimensions: Ace Your Knowledge!',
      date: 'Sep 22, 2024',
      category: 'Tennis, Game Rules, Court',
      description: 'Tennis matches can get pretty intense! But have you ever wondered about the exact dimensions of a tennis court? Whether you’re serving or volleying, knowing the court layout can give you a mental edge...',
      link: "/LearnTennis"
    },
    {
      image: 'BadmintonRule.jpg', 
      title: 'Badminton Court Dimensions: Smash and Win!',
      date: 'Sep 23, 2024',
      category: 'Badminton, Game Rules, Court',
      description: 'Badminton might seem like a simple game at first, but have you ever thought about the exact dimensions of the court where all the action happens? Let’s explore the space where smashes and dropshots are born...',
      link: "/LearnBadminton"
    },
    {
      image: 'VolleyballRule.jpg', 
      title: 'Volleyball Court Dimensions: Set, Spike, and Win!',
      date: 'Sep 24, 2024',
      category: 'Volleyball, Game Rules, Court',
      description: 'Volleyball is all about teamwork and precision, but did you know the dimensions of the court can impact the game strategy? Dive into the court layout to see how it affects every serve, set, and spike...',
      link: '/Learnvolleyball' 
    },
    {
      image: 'BaseballRule.gif', 
      title: 'Baseball Field Dimensions: Home Run Essentials!',
      date: 'Sep 25, 2024',
      category: 'Baseball, Game Rules, Field',
      description: 'The thrill of a home run is unmatched, but what about the field dimensions that define the game? Here’s a closer look at the layout of a baseball diamond, where every base counts...',
      link: "/LearnBaseball"
    },
    {
      image: 'HockeyRule.jpg', 
      title: 'Hockey Rink Dimensions: Glide Through the Ice!',
      date: 'Sep 26, 2024',
      category: 'Hockey, Game Rules, Rink',
      description: 'Hockey is fast, fierce, and full of action, but what about the dimensions of the ice rink where it all takes place? Let’s explore the rink that hosts some of the fastest-paced games in sports...',
      link: "/LearnHockey"
    },
    // Add more cards if necessary
  ];

  const [visibleCards, setVisibleCards] = useState(6); // Initially show 9 cards

  const handleReadMore = () => {
    setVisibleCards(prevCount => prevCount + 6); // Show 6 more cards each time "Read More" is clicked
  };

  return (
    <div>
    <div className="card-list">
      {cardsData.slice(0, visibleCards).map((card, index) => (
    <Card
      key={index}
      image={card.image}
      title={card.title}
      date={card.date}
      category={card.category}
      description={card.description}
      link={card.link}  // pass the link to the Card
      />
    ))}
    </div>
      {visibleCards < cardsData.length && (
        <button className="read-more" onClick={handleReadMore}>
          Read More
        </button>
      )}
    </div>
  );
};

export default CardList;