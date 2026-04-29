import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PostListing = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    document.title = `Blog - Page ${currentPage} | BlogHub`;
  }, [currentPage]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-light py-5">
      <div className="container">
        <h1 className="fw-bold mb-4">All Blog Posts</h1>

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

export default PostListing;
