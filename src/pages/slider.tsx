import React from 'react';
import SlideShow from '../components/SlideShow';
import DropdownMenu from './../components/DropdownMenu';
import { useState } from 'react';

const Slider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setSubMenuOpen(true);
  };

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };
  return (
    <div className="relative">
      <DropdownMenu
        isOpen={isOpen}
        subMenuOpen={subMenuOpen}
        toggleMenu={toggleMenu}
        toggleSubMenu={toggleSubMenu}
      />
      <div className={`slider-container ${isOpen ? 'dropdown-open' : ''}`}>
        <SlideShow />
      </div>
    </div>
  );
};

export default Slider;
