import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { categories } from '../data/categories';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const CategoryArchive = () => {
  const { slug } = useParams();  // Get :slug from URL (e.g., /category/technology)
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Find current category object from imported categories array
  const currentCategory = categories.find((cat) => cat.slug === slug);

  // Update page title based on category name
  useEffect(() => {
    if (currentCategory) {
      document.title = `${currentCategory.name} Posts - Page ${currentPage} | BlogHub`;
    } else {
      document.title = 'Category Not Found | BlogHub';
    }
  }, [currentCategory, currentPage]);

  // Fetch all posts and filter by category - runs when slug changes
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        
        // Filter posts by category using modulo (API doesn't have real categories)
        const categoryIndex = categories.findIndex((cat) => cat.slug === slug);
        const filteredPosts = data.filter(
          (post) => post.id % categories.length === categoryIndex
        );
        
        setPosts(filteredPosts);  // Show all filtered posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPosts();
    }
  }, [slug]);  // ← Re-fetch when category changes

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [slug]);

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

  if (!currentCategory) {
    return (
      <div className="container py-5 text-center">
        <h1 className="fw-bold mb-4">Category Not Found</h1>
        <Link to="/" className="btn btn-primary">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-light py-5">
      <div className="container">
        <Link to="/" className="btn btn-link text-decoration-none mb-3">
          <ArrowLeft size={20} className="me-2" />
          Back to Home
        </Link>
        
        <h1 className="fw-bold mb-2">{currentCategory.name}</h1>
        <p className="text-muted mb-4">Browse all posts in the {currentCategory.name} category</p>

        {loading ? (
          <div className="row g-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <SkeletonLoader key={i} type="card" />
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default CategoryArchive;
