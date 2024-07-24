import React from "react";
import "./Footer.css";
import { FOOTER } from "../../constants/uiTextSamples";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className=" fixed-bottom footer-container">
        <div className="footer-content">
          <div className="footer-text">{FOOTER.FOOTER_TEXT}</div>
          <div className="footer-icons">
            <a href={FOOTER.INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <FaInstagram size={20} />
            </a>
            <a href={FOOTER.LINKEDIN_LINK} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={20} />
            </a>
            <a href={FOOTER.TWITTER_LINK} target="_blank" rel="noopener noreferrer">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </footer>
  
    );
};

export default Footer;
