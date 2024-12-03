import React from "react";
import './NewsItem.css';
const NewsItem = ({ title, discription, image_url, source_url }) => {
    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
                <img src={image_url || "https://via.placeholder.com/150"} className="card-img-top" alt="Article" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{discription}</p>
                    <a href={source_url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read more</a>
                </div>
            </div>
        </div>
    );
}

export default NewsItem;
