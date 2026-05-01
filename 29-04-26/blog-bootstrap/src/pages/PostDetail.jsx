import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import SkeletonLoader from '../components/SkeletonLoader';
import useFetch from '../hooks/useFetch';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  
  // 1. One-line fetch using our custom hook
  const { data: post, loading, error } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  // 2. Grouped and memoized metadata
  const meta = useMemo(() => {
    if (!post) return null;
    const categories = ['Technology', 'Design', 'Programming', 'Lifestyle', 'Business', 'Health'];
    return {
      readingTime: Math.max(3, Math.floor((post.body?.length || 100) / 200)),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      category: categories[post.id % categories.length]
    };
  }, [post]);

  // 3. Dynamic Page Title
  useEffect(() => {
    document.title = post ? `${post.title} | BlogHub` : 'Loading...';
  }, [post]);

  if (loading) return <SkeletonLoader type="detail" />;
  if (error || !post) return (
    <div className="container py-5 text-center">
      <h2 className="mb-4">Post not found</h2>
      <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
    </div>
  );

  return (
    <main className="bg-light py-5 min-vh-100">
      <div className="container">
        <Link to="/blog" className="text-decoration-none d-inline-flex align-items-center mb-4 text-muted">
          <ArrowLeft size={18} className="me-2" /> Back to Blog
        </Link>

        <article className="card border overflow-hidden">
          {/* Header Visual */}
          <div className="bg-primary bg-gradient text-white d-flex align-items-center justify-content-center" style={{ height: '350px' }}>
            <span className="display-1 fw-bold opacity-25">{post.id}</span>
          </div>

          <div className="card-body p-4 p-lg-5">
            <span className="badge bg-primary-soft text-primary rounded-pill mb-3">
              <Tag size={14} className="me-1" /> {meta.category}
            </span>

            <h1 className="display-5 fw-bold mb-4">{post.title}</h1>

            {/* Author & Info Bar */}
            <div className="d-flex flex-wrap gap-4 text-muted mb-5 pb-4 border-bottom">
              <span className="d-flex align-items-center"><User size={18} className="me-2" /> Author {post.userId}</span>
              <span className="d-flex align-items-center"><Calendar size={18} className="me-2" /> {meta.date}</span>
              <span className="d-flex align-items-center"><Clock size={18} className="me-2" /> {meta.readingTime} min read</span>
            </div>

            {/* Body Content */}
            <div className="post-content fs-5 lh-lg">
              <p className="mb-4">{post.body}</p>
              <p className="text-muted italic">
                {/* Simulated extended content for visual weight */}
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
            </div>
          </div>
        </article>

        {/* Related Posts Section */}
        <section className="mt-5">
          <h3 className="fw-bold mb-4">Related Posts</h3>
          <div className="row g-4">
            {[1, 2].map((offset) => {
              const relatedId = (parseInt(id) + offset) % 100 || 1;
              return (
                <div key={offset} className="col-md-6">
                  <Link to={`/post/${relatedId}`} className="card border-0 shadow-sm text-decoration-none text-dark h-100 hover-lift">
                    <div className="card-body">
                      <h5 className="fw-bold mb-2">Continue Reading Post #{relatedId}</h5>
                      <p className="text-muted small mb-0">Expand your knowledge on this topic with our curated recommendations.</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default PostDetail;