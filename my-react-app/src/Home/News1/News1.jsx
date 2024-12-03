import React, { useEffect, useState } from "react";
import NewsItem1 from "./NewsItem1";
import './News.css';

const News1 = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Fetch the data from the News API
        fetch("https://newsdata.io/api/1/news?apikey=pub_572449b7f589c7333393d11ef7321211a6a13&q=cricket")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setArticles(data.results || [])) // Use 'results' based on the data structure you provided
            .catch((error) => console.error("Error fetching articles:", error));
    }, []);

    return (
        <div className="news-container">
            <h2 className="news-title">Trending News</h2>
            <div className="single-row">
                {articles && articles.length > 0 ? (
                    articles.slice(0, 5).map((article, index) => ( // Slice to get only 6 articles
                        <div className="col" key={index}>
                            <NewsItem1 
                                title={article.title} 
                                discription={article.description} 
                                image_url={article.image_url} 
                                source_url={article.source_url} 
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p>No articles available.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default News1;
