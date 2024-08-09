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
        </div>
      </footer>
  
    );
};

export default Footer;
