import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-us-container">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Get In Touch</h1>
          <div className="hero-divider"></div>
          <p className="hero-subtitle">We'd love to hear from you</p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="contact-content">
        {/* Map Section */}
        <div className="map-section">
          <div className="section-header">
            <h2>Our Location</h2>
            <div className="section-divider"></div>
          </div>
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.691029278887!2d77.29907037351373!3d23.181474210383115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c5c3c7b0aa7e1%3A0xf4798e9656dfb029!2sSagar%20Institute%20of%20Science%2C%20Technology%20%26%20Research%2C%20Ratibad!5e0!3m2!1sen!2sin!4v1744444507850!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SISTec Map"
            ></iframe>
          </div>
        </div>

        {/* Contact Form Section with Image */}
        <div className="form-image-section">
          <div className="section-header">
            <h2>Send Us a Message</h2>
            <div className="section-divider"></div>
            <p>Have questions or feedback? We're here to help.</p>
          </div>

          <div className="form-image-container">
            <div className="contact-image">
              <img
                src="https://img.freepik.com/premium-vector/customer-support-flat-design-illustration_1149263-18898.jpg?w=740"
                alt="Contact Support"
                className="support-image"
              />
            </div>

            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="contact-info-section">
          <div className="contact-card">
            <div className="contact-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Address</h3>
            <p>Sagar Institute of Science, Technology & Research, Ratibad, Bhopal, MP</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3>Phone</h3>
            <p>+91 123 456 7890</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Email</h3>
            <p>info@sistec.ac.in</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;