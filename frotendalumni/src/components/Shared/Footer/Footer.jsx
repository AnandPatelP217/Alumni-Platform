import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="gold-footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Logo and Contact Info */}
          <div className="footer-column logo-column">
            <div className="footer-logo-container">
              <img
                src="https://www.sistec.ac.in/assets/web/images/footer/bottom-logo.png"
                className="footer-logo"
                alt="Institute Logo"
              />
              <h3 className="institute-name">
                Sagar Institute of Science and Technology
              </h3>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>SISTec Gandhi Nagar, Opposite International Airport, Bhopal (M.P.) 462036</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>SISTec Ratibad, Near Ratibad, Bhopal (M.P.) 462044</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone-alt"></i>
                <a href="tel:+919109975760">+91 91099 75760</a>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <a href="mailto:admission@sistec.ac.in">admission@sistec.ac.in</a>
              </div>
            </div>
          </div>

          {/* Enterprises and Campuses */}
          <div className="footer-column">
            <h4 className="footer-heading">Our Enterprises</h4>
            <ul className="footer-links">
              <li>
                <a href="https://www.thesagar.in/">
                  <i className="fas fa-chevron-right"></i> The Sagar
                </a>
              </li>
              <li>
                <a href="https://www.agrawalbuilders.com/">
                  <i className="fas fa-chevron-right"></i> Agrawal Builders
                </a>
              </li>
              <li>
                <a href="https://www.spsbhopal.ac.in/">
                  <i className="fas fa-chevron-right"></i> Sagar Public School
                </a>
              </li>
              <li>
                <a href="https://www.sagarmanufacturers.com/">
                  <i className="fas fa-chevron-right"></i> Sagar Manufacturers
                </a>
              </li>
            </ul>

            <h4 className="footer-heading">Our Campuses</h4>
            <ul className="footer-links">
              <li>
                <a href="https://www.sistecgn.ac.in/">
                  <i className="fas fa-chevron-right"></i> SISTec
                </a>
              </li>
              <li>
                <a href="https://www.sistecr.ac.in/">
                  <i className="fas fa-chevron-right"></i> SISTec-R
                </a>
              </li>
              <li>
                <a href="https://www.sistece.ac.in/">
                  <i className="fas fa-chevron-right"></i> SISTec-E
                </a>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div className="footer-column">
            <h4 className="footer-heading">Important Links</h4>
            <ul className="footer-links">
              <li>
                <a href="https://www.sistec.ac.in/mou-industry-collaboration">
                  <i className="fas fa-chevron-right"></i> MOUs
                </a>
              </li>
              <li>
                <a href="https://www.sistec.ac.in/startup">
                  <i className="fas fa-chevron-right"></i> Startups
                </a>
              </li>
              <li>
                <a href="https://www.sistec.ac.in/research-innovation">
                  <i className="fas fa-chevron-right"></i> Research & Innovation
                </a>
              </li>
            </ul>

            <h4 className="footer-heading">Useful Links</h4>
            <ul className="footer-links">
              <li>
                <a href="https://www.education.gov.in/">
                  <i className="fas fa-chevron-right"></i> MoE
                </a>
              </li>
              <li>
                <a href="https://www.aicte-india.org/">
                  <i className="fas fa-chevron-right"></i> AICTE
                </a>
              </li>
              <li>
                <a href="https://www.rgpv.ac.in/">
                  <i className="fas fa-chevron-right"></i> RGPV
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright">
            &copy; {new Date().getFullYear()} SISTec. All Rights Reserved.
          </p>
          <div className="social-icons">
            <a href="https://www.facebook.com/sagargroupofinstitutionssistec" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/sagarcollegebhopal/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCytOCmxQb7IFU2BVFdI7T7w" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://www.linkedin.com/school/sagar-institute-of-science-technology-sistec/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <p className="design-credit">Designed by P217</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;