import React, { useState } from 'react';
import alumniData from '../../APIs/alumniData.json';
import "../../stylesheets/AlumniNewsFeed/AlumniNewsFeed.css";

const NewsFeed = () => {
  const [news] = useState(alumniData);
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <div className="alumni-news-container">
      <div className="alumni-news-header">
        <h2 className="section-title">Alumni News & Updates</h2>
        <div className="section-divider"></div>
        <p className="section-subtitle">Stay connected with our alumni community</p>
      </div>

      <div className="alumni-news-grid">
        {news.map((item, index) => (
          <div 
            className={`news-card ${expandedItem === index ? 'expanded' : ''}`} 
            key={index}
            onClick={() => toggleExpand(index)}
          >
            <div className="news-image-container">
              <img 
                src={item.urlToImage} 
                alt={item.title} 
                className="news-image" 
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x225?text=News+Image';
                }}
              />
              <div className="news-date-badge">
                {new Date(item.publishedAt).toLocaleDateString()}
              </div>
            </div>
            
            <div className="news-content">
              <h3 className="news-title">{item.title}</h3>
              <p className={`news-description ${expandedItem === index ? 'show-full' : ''}`}>
                {item.description}
              </p>
              
              <div className="news-actions">
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="read-more-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  Read Full Story
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;