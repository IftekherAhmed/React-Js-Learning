import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SkeletonLoader from '../components/SkeletonLoader';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();  // Get :id from URL (e.g., /post/5 → id = "5")
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single post by ID - re-runs when :id changes in URL
  // Dependency [id] means: fetch again if user navigates to different post
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await response.json();
        setPost(data);  // Update state → triggers re-render with post data
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);  // Hide loading spinner
      }
    };

    fetchPost();
  }, [id]);  // ← IMPORTANT: Re-fetches when id changes

  // Update page title when post data loads
  useEffect(() => {
    if (post) {
      document.title = `${post.title} - BlogHub`;
    } else {
      document.title = 'Loading Post... | BlogHub';
    }
  }, [post]);  // Runs when post state changes

  if (loading) {
    return <SkeletonLoader type="detail" />;
  }

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <h1 className="fw-bold mb-4">Post Not Found</h1>
        <Link to="/blog" className="btn btn-primary">← Back to Blog</Link>
      </div>
    );
  }

  // Calculate reading time based on post body length (200 words per minute)
  const readingTime = Math.max(3, Math.floor((post.body?.length || 100) / 200));
  
  // Format date
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Assign category
  const categories = ['Technology', 'Design', 'Programming', 'Lifestyle', 'Business', 'Health'];
  const category = categories[post.id % categories.length];

  return (
    <div className="bg-light py-5">
      <div className="container">
        {/* Back Button */}
        <Link to="/blog" className="btn btn-link text-decoration-none mb-4">
          <ArrowLeft size={20} className="me-2" />
          Back to Blog
        </Link>

        {/* Post Header */}
        <article className="card border-0 shadow">
          {/* Post Image Placeholder */}
          <div className="card-header bg-primary text-white d-flex align-items-center justify-content-center" style={{height: '300px'}}>
            <span className="display-1 fw-bold opacity-25">{post.id}</span>
          </div>

          {/* Post Content */}
          <div className="card-body p-5">
            {/* Category */}
            <div className="mb-3">
              <span className="badge bg-primary">
                <Tag size={14} className="me-1" />
                {category}
              </span>
            </div>

            {/* Title */}
            <h1 className="card-title fw-bold mb-4">{post.title}</h1>

            {/* Meta Information */}
            <div className="d-flex flex-wrap gap-4 text-muted mb-4 pb-4 border-bottom">
              <div className="d-flex align-items-center">
                <User size={18} className="me-2" />
                <span>Author {post.userId}</span>
              </div>
              <div className="d-flex align-items-center">
                <Calendar size={18} className="me-2" />
                <span>{formattedDate}</span>
              </div>
              <div className="d-flex align-items-center">
                <Clock size={18} className="me-2" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Post Body */}
            <div className="card-text">
              <p className="fs-5 lh-lg">{post.body}</p>
              <p className="fs-5 lh-lg mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="fs-5 lh-lg mt-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </article>

        {/* Related Posts Section */}
        <div className="mt-5">
          <h2 className="fw-bold mb-4">Related Posts</h2>
          <div className="row g-4">
            {[1, 2].map((i) => {
              const relatedId = (parseInt(id) + i) % 100 || 1;
              return (
                <div key={i} className="col-md-6">
                  <Link
                    to={`/post/${relatedId}`}
                    className="card border-0 shadow-sm text-decoration-none text-dark h-100"
                  >
                    <div className="card-body">
                      <h5 className="card-title fw-semibold mb-2">Related Post #{relatedId}</h5>
                      <p className="card-text text-muted">
                        Click to read this related article and expand your knowledge on this topic.
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
