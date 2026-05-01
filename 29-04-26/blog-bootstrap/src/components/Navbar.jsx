import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { categories } from '../data/categories';
import SearchBar from './SearchBar'; // Import the new component

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { pathname } = useLocation();

  const navLinks = ['Home', 'About', 'Categories', 'Blog', 'Contact'];

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold text-primary fs-3">BlogHub</Link>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="navbar-toggler">
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            {navLinks.map((name) => {
              const path = name === 'Home' ? '/' : `/${name.toLowerCase()}`;
              const isCat = name === 'Categories';

              return (
                <li 
                  key={name} 
                  className={`nav-item ${isCat ? 'dropdown' : ''}`} 
                  onMouseLeave={() => isCat && setShowDropdown(false)}
                >
                  {isCat ? (
                    <>
                      <button 
                        className="nav-link dropdown-toggle" 
                        onMouseEnter={() => setShowDropdown(true)}
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        Categories
                      </button>
                      <ul className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                        {categories.map(cat => (
                          <li key={cat.slug}>
                            <Link className="dropdown-item" to={`/category/${cat.slug}`}>
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link to={path} className={`nav-link ${pathname === path ? 'active text-primary' : ''}`}>
                      {name}
                    </Link>
                  )}
                </li>
              );
            })}

            {/* Render the separated SearchBar component */}
            <SearchBar />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;