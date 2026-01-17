import React, { useState } from "react";
import "./FifthComponent.css";

const FAQs = [
  {
    question: "How can I connect with alumni from my department?",
    answer: "You can connect with alumni through our official alumni portal, LinkedIn groups, and during events such as reunions and networking sessions.",
  },
  {
    question: "How can I connect with alumni from my department?",
    answer: "You can connect with alumni through our official alumni portal, LinkedIn groups, and during events such as reunions and networking sessions.",
  },
  {
    question: "How can I connect with alumni from my department?",
    answer: "You can connect with alumni through our official alumni portal, LinkedIn groups, and during events such as reunions and networking sessions.",
  },
  // ... (keep the rest of your FAQ items)
];

const FifthComponent = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-icon">✧</span>
            <span className="divider-line"></span>
          </div>
          <p className="section-subtitle">Find answers to common questions about our alumni network</p>
        </div>
        
        <div className="faq-grid">
          {FAQs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-card ${openIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <span className={`faq-icon ${openIndex === index ? 'rotate' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FifthComponent;