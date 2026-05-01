import { useState, useEffect, useMemo } from 'react';
import PostCard from '../components/PostCard';
import SkeletonLoader from '../components/SkeletonLoader';
import useFetch from '../hooks/useFetch';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PostListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // 1. Fetch data using our hook
  const { data: posts, loading } = useFetch('https://jsonplaceholder.typicode.com/posts');

  // 2. Derive pagination data using useMemo
  const { currentPosts, totalPages } = useMemo(() => {
    if (!posts) return { currentPosts: [], totalPages: 0 };
    
    const total = Math.ceil(posts.length / postsPerPage);
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    
    return {
      currentPosts: posts.slice(start, end),
      totalPages: total
    };
  }, [posts, currentPage]);

  useEffect(() => {
    document.title = `Blog - Page ${currentPage} | BlogHub`;
  }, [currentPage]);

  const paginate = (num) => {
    setCurrentPage(num);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-light py-5 min-vh-100">
      <div className="container">
        <header className="mb-5">
          <h1 className="fw-bold display-4">All Blog Posts</h1>
          <p className="text-muted fs-5">Explore our complete collection of insights and stories.</p>
        </header>

        <div className="row g-4">
          {loading ? (
            Array(postsPerPage).fill(0).map((_, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <SkeletonLoader type="card" />
              </div>
            ))
          ) : (
            currentPosts.map(post => (
              <div key={post.id} className="col-12 col-md-6 col-lg-4">
                <PostCard post={post} />
              </div>
            ))
          )}
        </div>

        {/* 3. Simplified Pagination UI */}
        {!loading && totalPages > 1 && (
          <nav className="d-flex justify-content-center align-items-center gap-2 mt-5">
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1} 
              className="btn btn-white shadow-sm border px-3"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Pagination Numbers */}
            <div className="d-none d-md-flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button 
                  key={num} 
                  onClick={() => paginate(num)} 
                  className={`btn btn-sm ${currentPage === num ? 'btn-primary px-3' : 'btn-white border'}`}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Simple indicator for mobile */}
            <span className="d-md-none small fw-bold mx-2">
              Page {currentPage} of {totalPages}
            </span>

            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages} 
              className="btn btn-white shadow-sm border px-3"
            >
              <ChevronRight size={18} />
            </button>
          </nav>
        )}
      </div>
    </main>
  );
};

export default PostListing;