import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { categories } from '../data/categories';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 1. Fetch data once
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setAllPosts(data))
      .catch(err => console.error(err));
  }, []);

  // 2. Derived State (Shorter & Faster than useEffect filtering)
  // Only recompute when searchQuery or allPosts changes
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allPosts
      .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);
  }, [searchQuery, allPosts]);

  // 3. Unified Search Handler for both "View All" and individual post clicks
  // If postId is provided, navigate to that post. Otherwise, navigate to the search results page.
  const handleSearch = (e, postId) => {
    if (e) e.preventDefault();
    const path = postId ? `/post/${postId}` : `/search?q=${searchQuery}`;
    navigate(path);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold text-primary fs-3">BlogHub</Link>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="navbar-toggler">
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            {/* 3. Consolidated Navigation Mapping */}
            {['Home', 'About', 'Categories', 'Blog', 'Contact'].map((name) => {
              const path = name === 'Home' ? '/' : `/${name.toLowerCase()}`;
              const isCat = name === 'Categories';

              return (
                <li key={name} className={`nav-item ${isCat ? 'dropdown' : ''}`} onMouseLeave={() => isCat && setShowDropdown(false)}>
                  {isCat ? (
                    <>
                      <button className="nav-link dropdown-toggle" onMouseEnter={() => setShowDropdown(true)}>Categories</button>
                      <ul className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                        {categories.map(cat => (
                          <li key={cat.slug}><Link className="dropdown-item" to={`/category/${cat.slug}`}>{cat.name}</Link></li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link to={path} className={`nav-link ${pathname === path ? 'active text-primary' : ''}`}>{name}</Link>
                  )}
                </li>
              );
            })}

            {/* Optimized Search Bar */}
            <li className="nav-item ms-3 position-relative">
              <form onSubmit={handleSearch}>
                <div className="position-relative">
                  <Search className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" size={16} />
                  <input
                    type="text" value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="form-control ps-4" placeholder="Search..."
                  />
                </div>
              </form>

              {isSearchFocused && searchQuery && (
                <div className="card shadow position-absolute mt-2" style={{ width: '350px', zIndex: 1000 }}>
                  <div className="list-group list-group-flush">
                    {/* Map Top 5 Results */}
                    {searchResults.map(post => (
                      <button 
                        key={post.id} 
                        onClick={() => handleSearch(null, post.id)} 
                        className="list-group-item list-group-item-action text-truncate"
                      >
                        {post.title}
                      </button>
                    ))}

                    {/* 1. Show "View All" if there are results */}
                    {searchResults.length > 0 ? (
                      <button 
                        onClick={() => handleSearch()} // Calls handleSearch without a postId
                        className="list-group-item list-group-item-action text-center text-primary fw-bold"
                      >
                        View all results for "{searchQuery}"
                      </button>
                    ) : (
                      /* 2. Show "No results" only if the list is empty */
                      <div className="p-3 text-center text-muted">No results found</div>
                    )}
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;