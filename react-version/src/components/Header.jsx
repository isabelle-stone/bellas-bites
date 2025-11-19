import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
        <nav>
            <div className='logo'>Bella's Bites</div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/menu'>Menu</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
            </ul>
        </nav>
    </header>
  );
}

export default Header;
