import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { Search as SearchIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();  // Read ?q= from URL
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Fetch all posts once on mount - used for client-side filtering
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setAllPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts when URL query parameter changes
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
      setLoading(true);

      // Filter posts by title or body
      const filtered = allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(urlQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(urlQuery.toLowerCase())
      );

      setPosts(filtered);
      setLoading(false);
    }
  }, [searchParams, allPosts]);  // Runs when URL changes or posts load

  // Update URL when user types in search box
  const handleSearch = (e) => {
    setQuery(e.target.value);
    setSearchParams(e.target.value ? { q: e.target.value } : {});  // Update ?q= in URL
    setCurrentPage(1);  // Reset to page 1 when search changes
  };

  // Calculate posts for current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Handle page change - scrolls to top
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update page title based on search query
  useEffect(() => {
    if (query) {
      document.title = `Search: "${query}" - Page ${currentPage} | BlogHub`;
    } else {
      document.title = 'Search Posts | BlogHub';
    }
  }, [query, currentPage]);

  return (
    <div className="bg-light py-5">
      <div className="container">
        <h1 className="fw-bold mb-4">Search Posts</h1>

        <div className="row justify-content-center mb-5">
          <div className="col-md-12">
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-white border-end-0">
                <SearchIcon size={20} className="text-muted" />
              </span>
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search for posts..."
                className="form-control border-start-0"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="row g-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <SkeletonLoader key={i} type="card" />
              </div>
            ))}
          </div>
        ) : query ? (
          <>
            <div className="mb-4">
              <p className="fs-5 text-muted">
                Found <span className="fw-bold text-primary">{posts.length}</span> result
                {posts.length !== 1 ? 's' : ''} for "{query}"
              </p>
            </div>

            {posts.length > 0 ? (
              <>
                <div className="row g-4">
                  {currentPosts.map((post) => (
                    <div key={post.id} className="col-12 col-md-6 col-lg-4">
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-center align-items-center gap-2 mt-5">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-outline-secondary"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`btn ${currentPage === number ? 'btn-primary' : 'btn-outline-primary'}`}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-outline-secondary"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-5">
                <p className="fs-5 text-muted">
                  No posts found matching "{query}". Try a different search term.
                </p>
                <Link to="/blog" className="btn btn-primary">Browse All Posts</Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-5">
            <p className="fs-5 text-muted">Enter a search term to find posts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
