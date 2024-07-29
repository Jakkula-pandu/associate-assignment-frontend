import React from 'react';
import './Header.css';
import { HEADER_TEXT } from '../../constants/uiTextSamples';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={HEADER_TEXT.HEADER_IMAGE} alt={HEADER_TEXT.ALT} />
      </div>
    </header>
  );
};

export default Header;
