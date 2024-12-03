import React from 'react';
import SportsCard from './SportsCard';
import './PopularSports.css'; // External CSS for styling the sports container

const sportsData = [
  { title: 'Badminton', image: 'BatmintonSolo.jpg', link: '/badmintionVenue'},
  { title: 'Football', image: 'FootballSolo.jpg' , link: '/footballvenue' },
  { title: 'Cricket', image: 'CricketSolo.jpg', link: '/cricketvenue'},
  { title: 'VolleyBall', image: 'swimming.jpg', link: '/volleyballvenue'},
  { title: 'Tennis', image: 'tennis.jpg', link:'/tennisvenue'},
  { title: 'basketball', image: 'Table-tennis.png', link:'/basketballvenue'},
  { title: 'Hockey', image: 'Hockey.jpg', link:'/hockeyvenue'},
];

const PopularSports = () => {
  return (
    <div className="popular-sports-container">
      <h2>Popular Sports</h2>
      <div className="sports-card-container">
        {sportsData.map((sport, index) => (
          <SportsCard key={index} image={sport.image} title={sport.title} link={sport.link}/>
        ))}
      </div>
    </div>
  );
};

export default PopularSports;
