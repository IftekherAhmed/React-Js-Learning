import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { categories } from '../data/categories';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // State for search query and results
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Categories', subItems: categories.map(cat => ({ ...cat, path: `/category/${cat.slug}` })) },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;


  // useEffect to fetch posts only once on component mount 
  // It is used for client-side search filtering in navbar dropdown
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setAllPosts(data);
      } catch (error) {
        console.error('Error fetching posts for search:', error);
      }
    };

    fetchPosts();
  }, []);

  // It is used to update search results in real-time as user types
  // useEffect to filter posts based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allPosts]);

  // Handle search form submission
  // Navigates to search page with query parameter
  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  }, [searchQuery, navigate]);

  // Handle click on search result item
  // Navigates directly to the selected post
  // Clears search state and closes dropdown
  const handleResultClick = useCallback((postId) => {
    navigate(`/post/${postId}`);
    setSearchQuery('');
    setIsSearchFocused(false);
  }, [navigate]);

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold text-primary fs-3">
          BlogHub
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="navbar-toggler"
          type="button"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Nav Links */}
            {navLinks.map((link) =>
              link.subItems && link.subItems.length > 0 ? (
                <li className="nav-item dropdown" key={link.name} onMouseLeave={() => setShowCategoryDropdown(false)}>
                  <button
                    className="nav-link dropdown-toggle"
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    onMouseEnter={() => setShowCategoryDropdown(true)}
                  >
                    {link.name}
                  </button>
                  <ul className={`dropdown-menu ${showCategoryDropdown ? 'show' : ''}`}>
                    {link.subItems.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          to={subItem.path}
                          className="dropdown-item"
                          onClick={() => setShowCategoryDropdown(false)}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li className="nav-item" key={link.path}>
                  <Link
                    to={link.path}
                    className={`nav-link ${isActive(link.path) ? 'active text-primary' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            )}
            {/* End Nav link */}

            {/* Search Form */}
            <li className="nav-item ms-3 position-relative">
              <form onSubmit={handleSearchSubmit}>
                <div className="position-relative">
                  <Search className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" style={{width: '16px', height: '16px'}} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search posts..."
                    className="form-control ps-4"
                    style={{width: '250px'}}
                  />
                </div>
              </form>
              {/* End Search Form */}

              {/* Search Results */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="card shadow position-absolute mt-2" style={{width: '400px', zIndex: 1000}}>
                  <div className="list-group list-group-flush">
                    {searchResults.map((post) => (
                      <button
                        key={post.id}
                        onClick={() => handleResultClick(post.id)}
                        className="list-group-item list-group-item-action"
                      >
                        <h6 className="mb-1 text-truncate">{post.title}</h6>
                        <small className="text-muted text-truncate d-block">{post.body}</small>
                      </button>
                    ))}
                  </div>
                  <div className="card-footer text-center">
                    <button
                      onClick={handleSearchSubmit}
                      className="btn btn-link text-primary text-decoration-none"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  </div>
                </div>
              )}
              {/* End Search Results */}

              {/* No Search Results */}
              {isSearchFocused && searchQuery && searchResults.length === 0 && (
                <div className="card shadow position-absolute mt-2 p-3 text-center" style={{width: '400px', zIndex: 1000}}>
                  <p className="text-muted mb-0">No posts found</p>
                </div>
              )}
              {/* End No Search Results */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
