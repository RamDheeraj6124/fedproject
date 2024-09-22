// Card.jsx
import React from 'react';
import './Card.css';

const Card = ({ image, title, date, category, description }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <p className="card-date">{date} | {category}</p>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;