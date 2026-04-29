import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
      setLoading(true);

      const filtered = allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(urlQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(urlQuery.toLowerCase())
      );

      setPosts(filtered);
      setLoading(false);
    }
  }, [searchParams, allPosts]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setSearchParams(e.target.value ? { q: e.target.value } : {});
  };

  useEffect(() => {
    if (query) {
      document.title = `Search: "${query}" | BlogHub`;
    } else {
      document.title = 'Search Posts | BlogHub';
    }
  }, [query]);

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
            {[1, 2, 3].map((i) => (
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
              <div className="row g-4">
                {posts.map((post) => (
                  <div key={post.id} className="col-12 col-md-6 col-lg-4">
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
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
