import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import './News.css';
import Header from "../Home/partials/Header";

const News = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Fetch the data from the News API
        fetch("https://newsdata.io/api/1/news?apikey=pub_572449b7f589c7333393d11ef7321211a6a13&q=sport")
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
            <Header />
            <div className="row">
                {articles && articles.length > 0 ? ( // Check if articles exist and has length
                    articles.map((article, index) => (
                        <div className="col-md-3 col-sm-6" key={index}>
                            <NewsItem 
                                title={article.title} 
                                discription={article.description} 
                                image_url={article.image_url} // Fixed variable name to match data
                                source_url={article.source_url} // Fixed variable name to match data
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-12"> {/* Message for no articles */}
                        <p>No articles available.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default News;
