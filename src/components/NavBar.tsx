import Link from 'next/link';
import DropdownMenu from '../components/DropdownMenu';
import { useState } from 'react';

const NavBar = () => {
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
    <>
      {/* /////////////////////Menu */}
      <DropdownMenu
        isOpen={isOpen}
        subMenuOpen={subMenuOpen}
        toggleMenu={toggleMenu}
        toggleSubMenu={toggleSubMenu}
      />
    </>
  );
};

export default NavBar;
