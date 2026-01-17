import React from 'react';
import './SecondComponent.css';

const SecondComponent = () => {
  const counters = [
    {
      icon: 'fa-graduation-cap',
      limit: 24,
      title: 'Years in Education',
      color: '#8b5cf6',
    },
    {
      icon: 'fa-chalkboard-teacher',
      limit: 2000,
      title: 'Highly Skilled Faculties',
      color: '#06b6d4',
    },
    {
      icon: 'fa-user-graduate',
      limit: 25000,
      title: 'Students Network',
      color: '#f59e0b',
    },
    {
      icon: 'fa-briefcase',
      limit: 1150,
      title: 'Job Offers to 2024 Batch',
      color: '#10b981',
    },
  ];

  return (
    <section id="web-counter" className="web-counter-section">
      <div className="container">
        <div className="section-header">
          <h2>The SISTec Spread</h2>
          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-icon">✻</span>
            <span className="divider-line"></span>
          </div>
          <p className="section-subtitle">These are the statistics of SISTEC</p>
        </div>
        <div className="counter-grid">
          {counters.map((counter, index) => (
            <div key={index} className="counter-item">
              <div className="counter-card">
                <div className="counter-icon" style={{ color: counter.color }}>
                  <i className={`fas ${counter.icon}`}></i>
                </div>
                <div className="counter-content">
                  <div className="count-number">
                    <span className="count">{counter.limit.toLocaleString()}</span>
                    <span className="plus-sign">+</span>
                  </div>
                  <h3 className="counter-title">{counter.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecondComponent;