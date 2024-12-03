import React, { useState } from 'react';
import './ArticleCard.css';
import Header from '../Home/partials/Header';
import CardList from './CardList';

const articles = [
  {
    title: "Football: The World's Most Popular Sport",
    author: "Alex Johnson",
    date: "September 20, 2024",
    category: "Football",
    comments: 7,
    description: "Football, known as soccer in some regions, is the most popular sport globally. From the World Cup to local leagues, the game has captured the hearts of millions. Learn more about the rules, field dimensions, and why it's such a beloved sport...",
    link: '/Learnfootball'
  },
  {
    title: "Cricket: Mastering the Pitch and Field",
    author: "Sakshi Dembla",
    date: "September 19, 2024",
    category: "Cricket",
    comments: 2,
    description: "Cricket fans know the excitement of a well-placed boundary or a perfect bowling delivery. But how much do you know about the dimensions of the pitch and the rules governing this classic game? Dive into the world of cricket to learn more...",
    link: '/Learncricket'
  },
  {
    title: "Basketball: High-Flying Action on the Court",
    author: "John Doe",
    date: "September 21, 2024",
    category: "Basketball",
    comments: 4,
    description: "Basketball is a fast-paced, action-packed game that requires skill, agility, and strategy. From the dimensions of the court to the high-flying dunks, get the inside scoop on what makes basketball so thrilling...",
    link: "/Learnbasketball"
  },
  {
    title: "Tennis: The Ultimate Showdown of Skill and Speed",
    author: "Jane Smith",
    date: "September 22, 2024",
    category: "Tennis",
    comments: 3,
    description: "Tennis is a sport of precision, power, and endurance. Whether you're playing on grass, clay, or hard courts, knowing the rules and layout of the tennis court can give you the edge you need to dominate your matches...",
    link: "/LearnTennis"
  },
  {
    title: "Badminton: Fast-Paced Fun with Every Smash",
    author: "Emily Davis",
    date: "September 23, 2024",
    category: "Badminton",
    comments: 1,
    description: "Badminton is a game of quick reflexes and strategic play. Whether you're smashing or dropping, every shot counts. Get familiar with the court dimensions and rules that make badminton a game of skill and excitement...",
    link: "/LearnBadminton"
  },
  {
    title: "Volleyball: Teamwork and Strategy on the Sand or Court",
    author: "Michael Thompson",
    date: "September 24, 2024",
    category: "Volleyball",
    comments: 6,
    description: "Volleyball is all about teamwork, precision, and communication. Whether you're playing on the beach or an indoor court, the layout and dimensions of the playing area can affect your strategy. Learn more about the sport's unique challenges...",
    link: "/Learnvolleyball"
  },
  {
    title: "Baseball: The Classic American Pastime",
    author: "Sarah Lee",
    date: "September 25, 2024",
    category: "Baseball",
    comments: 9,
    description: "Baseball is known for its rich history and iconic moments. From home runs to strikeouts, the layout of the diamond and the rules of the game are essential for understanding how to play. Explore the dimensions of the field and more...",
    link: "/LearnBaseball"
  },
  {
    title: "Hockey: Ice Cold and Full of Action",
    author: "David Williams",
    date: "September 26, 2024",
    category: "Hockey",
    comments: 3,
    description: "Hockey is a fast, aggressive, and thrilling sport. Played on an ice rink, the game requires speed, skill, and strategy. Learn more about the rink dimensions and rules that make hockey one of the most intense sports out there...",
    link: "/LearnHockey"
  },
  // Add more articles as needed
];

const ArticleCard = () => {
  const [currentArticle, setCurrentArticle] = useState(0);

  const handleNext = () => {
    setCurrentArticle((prev) => (prev + 1) % articles.length);
  };

  const handlePrev = () => {
    setCurrentArticle((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const article = articles[currentArticle];

  return (
    <div className="article-card-container2">
      <Header />
      <div className="article-card-container">
        <div className='black-background'>
        <h2 className="venue-heading"> 
            Learn Your Favorite Sport!
        </h2>
        </div>
        <div className="article-card">
          <button className="prev-btn" onClick={handlePrev}>&lt;</button>
          <div className="article-content">
            <h1 className="article-title">{article.title}</h1>
            <p className="article-meta">
              by {article.author} | {article.date} | {article.category} | {article.comments} Comments
            </p>
            <p className="article-description">{article.description}</p>
            <a href={article.link} className="read-more-btn">Read More</a>
          </div>
          <button className="next-btn" onClick={handleNext}>&gt;</button>
        </div>
        <CardList />
      </div>
    </div>
  );
};

export default ArticleCard;
