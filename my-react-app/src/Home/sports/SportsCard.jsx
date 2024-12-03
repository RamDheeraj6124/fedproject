import React from 'react';
import './SportsCard.css'; // External CSS for styling the sports cards

const SportsCard = ({ image, title, link}) => {
  return (
    <div className="sports-card">
      <a href={link}>
      <img src={image} alt={title} className="sports-image" />
      <div className="sports-title">{title}</div>
      </a>
    </div>
  );
};

export default SportsCard;
