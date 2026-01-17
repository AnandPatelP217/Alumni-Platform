import React, { useEffect, useState } from 'react';
import storiesData from '../../APIs/storiesData.json';
import './ThirdComponent.css';

const ThirdComponent = () => {
  const [currentAlumIndex, setCurrentAlumIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const totalAlumni = storiesData.length;

  const handleNext = () => {
    setCurrentAlumIndex((prevIndex) => (prevIndex + 1) % totalAlumni);
  };

  const handlePrev = () => {
    setCurrentAlumIndex((prevIndex) =>
      prevIndex === 0 ? totalAlumni - 1 : prevIndex - 1
    );
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 5000); // Slowed down to 5 seconds for better UX
    }
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoPlaying, currentAlumIndex]);

  const currentAlum = storiesData[currentAlumIndex];

  return (
    <section className="alumni-section">
      <div className="section-header">
        <h2>Our Distinguished Alumni</h2>
        <p className="section-subtitle">Success stories from our graduates</p>
      </div>
      
      <div className="alumni-container">
        <div className="alumni-card">
          <div className="alumni-info">
            <div className="alumni-meta">
              <span className="graduation-badge">{currentAlum.graduationYear}</span>
              <span className="profession-tag">{currentAlum.profession}</span>
            </div>
            <h2>{currentAlum.name}</h2>
            <p className="alumni-bio">{currentAlum.bio}</p>
            <div className="alumni-stats">
              <div className="stat-item">
                <span className="stat-label">Package</span>
                <span className="stat-value">{currentAlum.pakage}</span>
              </div>
            </div>
          </div>
          
          <div className="alumni-image">
            <img src={currentAlum.image} alt={currentAlum.name} />
            <div className="image-overlay"></div>
          </div>
        </div>
        
        <div className="alumni-controls">
          <button onClick={handlePrev} className="nav-button prev-button">
            <i className="arrow"></i>
          </button>
          
          <div className="pagination-dots">
            {storiesData.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentAlumIndex ? 'active' : ''}`}
                onClick={() => setCurrentAlumIndex(index)}
              />
            ))}
          </div>
          
          <button onClick={handleNext} className="nav-button next-button">
            <i className="arrow"></i>
          </button>
        </div>
        
        <button onClick={toggleAutoPlay} className="autoplay-toggle">
          {isAutoPlaying ? 'Pause' : 'Play'} Slideshow
        </button>
      </div>
    </section>
  );
};

export default ThirdComponent;