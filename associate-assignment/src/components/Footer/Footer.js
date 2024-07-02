import React from "react";
import "./Footer.css";
import { FOOTER } from "../../constants/uiTextSamples";
const Footer = () => {
  return (
    <footer className="bg-light fixed-bottom">
      <div className="text-center">
        <div>{FOOTER.FOOTER_TEXT}</div>
      </div>
    </footer>
  );
};

export default Footer;
