import { Link } from 'react-router-dom'
import { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
        <nav>
            <div className='logo'>Bella's Bites</div>
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className={isMenuOpen ? 'active' : ''}>
                <li><Link to='/' onClick={closeMenu}>Home</Link></li>
                <li><Link to='/menu' onClick={closeMenu}>Menu</Link></li>
                <li><Link to='/about' onClick={closeMenu}>About</Link></li>
                <li><Link to='/contact' onClick={closeMenu}>Contact</Link></li>
            </ul>
        </nav>
    </header>
  );
}

export default Header;
