import React from 'react';
import { FaUniversity, FaGraduationCap, FaUsers, FaBookOpen, FaChalkboardTeacher } from 'react-icons/fa';
import './AboutSISTec.css';

const AboutSISTec = () => {
  return (
    <div className="about-sistec">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to <span>SISTec-R</span></h1>
          <p className="subtitle">Sagar Institute of Science, Technology & Research</p>
          <div className="gold-divider"></div>
          <p className="hero-text">Where Innovation Meets Excellence</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-wrapper">
          {/* About Section */}
          <section className="about-section">
            <h2>About Our Institute</h2>
            <p className="about-description">
              Established in 2009, SISTec-R is a premier engineering college located in the serene suburbs of Bhopal. 
              Spread across a lush 12-acre campus in Sikandrabad, Ratibad, it operates under the esteemed Sagar Group 
              of Institutions®. The institute is dedicated to imparting technical education beyond engineering, 
              fostering an environment of creative learning and overall development.
            </p>
            
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-number">12+</div>
                <div className="stat-label">Years of Excellence</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">12</div>
                <div className="stat-label">Acre Campus</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Students</div>
              </div>
            </div>
          </section>

          {/* Campus Image Section */}
          <div className="campus-showcase">
            <div className="image-container">
              <img 
                src="https://media.istockphoto.com/id/1078153008/photo/group-of-six-indian-businessman-in-suits.jpg?s=2048x2048&w=is&k=20&c=XB8e0mQ04MyQdaFcCKIMS5APARtBhNEN0HiYDF63Fv0=" 
                alt="SISTec Ratibad Campus" 
                className="campus-image"
              />
              <div className="image-overlay">
                <FaUniversity className="overlay-icon" />
                <p>Our State-of-the-Art Campus</p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <section className="features-section">
            <h2>Why Choose SISTec-R?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaChalkboardTeacher />
                </div>
                <h3>Expert Faculty</h3>
                <p>Learn from experienced professors and industry experts dedicated to your success.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <FaBookOpen />
                </div>
                <h3>Modern Curriculum</h3>
                <p>Industry-relevant programs designed to meet current technological demands.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <FaGraduationCap />
                </div>
                <h3>Placement Support</h3>
                <p>Strong industry connections leading to excellent placement opportunities.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <FaUsers />
                </div>
                <h3>Holistic Development</h3>
                <p>Focus on overall growth through extracurricular activities and workshops.</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <div className="cta-section">
            <h3>Ready to Begin Your Journey at SISTec-R?</h3>
            <p>Join our community of innovators and leaders in technical education.</p>
            <a
              href="https://www.sistecr.ac.in/admissions"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              Explore Admissions
              <span className="button-hover-effect"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSISTec;