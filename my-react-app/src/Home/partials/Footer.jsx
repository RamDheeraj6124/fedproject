import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
        <a href="#">BoxPlay</a>
        </div>
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="heading">Company</h3>
            <ul>
              <li><a href="/AboutUs">About Us</a></li>
              <li><a href="/Contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="heading">Social</h3>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="heading">Privacy & Terms</h3>
            <ul>
              <li><a href="/faqs">FAQs</a></li>
              <li><a href="/privacypolicy">Privacy Policy</a></li>
              <li><a href="/termsofservice">Terms of Service</a></li>
              <li><a href="/cancellationpolicy">Cancellation Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

