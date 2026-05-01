import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import SkeletonLoader from '../components/SkeletonLoader';
import useFetch from '../hooks/useFetch';
import { Search as SearchIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // 1. Always fetch the "Source of Truth"
  const { data: allPosts, loading: fetchLoading } = useFetch('https://jsonplaceholder.typicode.com/posts');

  // 2. Sync local input with URL (This allows the search to be bookmarkable)
  const query = searchParams.get('q') || '';

  // 3. Derived Data: Filter results automatically when query or allPosts change
  const filteredPosts = useMemo(() => {
    if (!allPosts || !query) return [];
    const lowerQuery = query.toLowerCase();
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(lowerQuery) || 
      post.body.toLowerCase().includes(lowerQuery)
    );
  }, [allPosts, query]);

  // 4. Derived Data: Pagination
  const { currentPosts, totalPages } = useMemo(() => {
    const total = Math.ceil(filteredPosts.length / postsPerPage);
    const start = (currentPage - 1) * postsPerPage;
    return {
      currentPosts: filteredPosts.slice(start, start + postsPerPage),
      totalPages: total
    };
  }, [filteredPosts, currentPage]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchParams(value ? { q: value } : {});
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const paginate = (num) => {
    setCurrentPage(num);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    document.title = query ? `Search: ${query} | BlogHub` : 'Search Posts | BlogHub';
  }, [query]);

  return (
    <main className="bg-light py-5 min-vh-100">
      <div className="container">
        <h1 className="fw-bold mb-4">Search Results</h1>

        {/* Search Input Section */}
        <div className="card border-0 shadow-sm mb-5">
          <div className="card-body p-2">
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-transparent border-0">
                <SearchIcon size={20} className="text-muted" />
              </span>
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Type to search insights..."
                className="form-control border-0 shadow-none fs-5"
              />
            </div>
          </div>
        </div>

        {fetchLoading ? (
          <div className="row g-4">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4"><SkeletonLoader type="card" /></div>
            ))}
          </div>
        ) : query ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="text-muted mb-0">
                Found <strong>{filteredPosts.length}</strong> results for "{query}"
              </p>
            </div>

            {filteredPosts.length > 0 ? (
              <>
                <div className="row g-4">
                  {currentPosts.map(post => (
                    <div key={post.id} className="col-12 col-md-6 col-lg-4">
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="d-flex justify-content-center gap-2 mt-5">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="btn btn-white border shadow-sm">
                      <ChevronLeft size={18} />
                    </button>
                    <span className="btn btn-white border shadow-sm disabled">
                      {currentPage} / {totalPages}
                    </span>
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-white border shadow-sm">
                      <ChevronRight size={18} />
                    </button>
                  </nav>
                )}
              </>
            ) : (
              <div className="text-center py-5">
                <h3 className="text-muted">No matches found</h3>
                <p>Try checking your spelling or use different keywords.</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-5 opacity-50">
            <SearchIcon size={48} className="mb-3" />
            <p className="fs-5">Start typing to search our blog archives</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Search;