import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setAllPosts(data))
      .catch(err => console.error(err));
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allPosts
      .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);
  }, [searchQuery, allPosts]);

  const handleSearch = (e, postId) => {
    if (e) e.preventDefault();
    const path = postId ? `/post/${postId}` : `/search?q=${searchQuery}`;
    navigate(path);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <div className="nav-item ms-md-3 position-relative">
      <form onSubmit={handleSearch}>
        <div className="position-relative">
          <Search className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)} // Timeout allows clicking results
            className="form-control ps-4"
            placeholder="Search..."
          />
        </div>
      </form>

      {isSearchFocused && searchQuery && (
        <div className="card shadow position-absolute mt-2 end-0" style={{ width: '350px', zIndex: 1000 }}>
          <div className="list-group list-group-flush">
            {searchResults.map(post => (
              <button 
                key={post.id} 
                onClick={() => handleSearch(null, post.id)} 
                className="list-group-item list-group-item-action text-truncate"
              >
                {post.title}
              </button>
            ))}

            {searchResults.length > 0 ? (
              <button 
                onClick={() => handleSearch()} 
                className="list-group-item list-group-item-action text-center text-primary fw-bold"
              >
                View all results for "{searchQuery}"
              </button>
            ) : (
              <div className="p-3 text-center text-muted">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;