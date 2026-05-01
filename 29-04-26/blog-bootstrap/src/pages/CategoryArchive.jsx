import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import SkeletonLoader from '../components/SkeletonLoader';
import useFetch from '../hooks/useFetch';
import { categories } from '../data/categories';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const CategoryArchive = () => {
  const { slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // 1. Centralized Data Fetching
  const { data: allPosts, loading } = useFetch('https://jsonplaceholder.typicode.com/posts');

  // 2. Memoized Category & Filtering (Prevents recalculating on every render)
  const currentCategory = useMemo(() => categories.find(c => c.slug === slug), [slug]);
  
  const filteredPosts = useMemo(() => {
    if (!allPosts || !currentCategory) return [];
    const catIndex = categories.findIndex(c => c.slug === slug);
    return allPosts.filter(post => post.id % categories.length === catIndex);
  }, [allPosts, slug, currentCategory]);

  // 3. Derived Pagination Data
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  // SEO and Reset Page on Slug Change
  useEffect(() => {
    setCurrentPage(1);
    document.title = currentCategory ? `${currentCategory.name} | BlogHub` : 'Not Found';
  }, [slug, currentCategory]);

  const paginate = (num) => {
    setCurrentPage(num);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!currentCategory) return (
    <div className="container py-5 text-center">
      <h1 className="fw-bold">Category Not Found</h1>
      <Link to="/" className="btn btn-primary mt-3">Back Home</Link>
    </div>
  );

  return (
    <main className="bg-light py-5 min-vh-100">
      <div className="container">
        <Link to="/" className="text-decoration-none d-flex align-items-center mb-4 text-muted">
          <ArrowLeft size={18} className="me-2" /> Back to Home
        </Link>
        
        <header className="mb-5">
          <h1 className="fw-bold display-5">{currentCategory.name}</h1>
          <p className="lead text-muted">Discover the best content in {currentCategory.name}</p>
        </header>

        <div className="row g-4">
          {loading ? (
            Array(postsPerPage).fill(0).map((_, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4"><SkeletonLoader type="card" /></div>
            ))
          ) : (
            currentPosts.map(post => (
              <div key={post.id} className="col-12 col-md-6 col-lg-4"><PostCard post={post} /></div>
            ))
          )}
        </div>

        {/* 4. Cleaner Pagination UI */}
        {!loading && totalPages > 1 && (
          <nav className="d-flex justify-content-center align-items-center gap-2 mt-5">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="btn btn-white shadow-sm border">
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button 
                key={num} 
                onClick={() => paginate(num)} 
                className={`btn ${currentPage === num ? 'btn-primary' : 'btn-white shadow-sm border'}`}
              >
                {num}
              </button>
            ))}

            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-white shadow-sm border">
              <ChevronRight size={20} />
            </button>
          </nav>
        )}
      </div>
    </main>
  );
};

export default CategoryArchive;