import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { categories } from '../data/categories';

const PostCard = memo(({ post }) => {
  // 1. Memoize calculations so they don't run on every small re-render
  const postMeta = useMemo(() => {
    const readingTime = Math.max(3, Math.floor((post.body?.length || 100) / 200));
    const catName     = categories[post.id % categories.length]?.name || 'General';
    const date        = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric' 
    });
    
    return { readingTime, catName, date };
  }, [post.id, post.body]);

  return (
    <article className="card h-100 shadow-sm border-0 transition-hover">
      {/* Visual Placeholder for Image */}
      <div className="card-header bg-primary bg-gradient text-white d-flex align-items-center justify-content-center" style={{ height: '180px' }}>
        <span className="display-1 fw-bold opacity-25">{post.id}</span>
      </div>

      <div className="card-body d-flex flex-column">
        <div className="mb-2">
          <span className="badge rounded-pill bg-primary-soft text-primary px-3">
            <Tag size={12} className="me-1" /> {postMeta.catName}
          </span>
        </div>

        <Link to={`/post/${post.id}`} className="text-decoration-none">
          <h5 className="card-title text-dark fw-bold mb-3 line-clamp-2">{post.title}</h5>
        </Link>

        <p className="card-text text-muted mb-4 line-clamp-3">
          {post.body}
        </p>

        {/* 2. Metadata Section - Pushed to bottom with mt-auto */}
        <div className="mt-auto">
          <div className="d-flex flex-wrap gap-3 small text-muted mb-3 border-top pt-3">
            <span className="d-flex align-items-center"><User size={14} className="me-1" /> Author {post.userId}</span>
            <span className="d-flex align-items-center"><Calendar size={14} className="me-1" /> {postMeta.date}</span>
            <span className="d-flex align-items-center"><Clock size={14} className="me-1" /> {postMeta.readingTime} min</span>
          </div>

          <Link to={`/post/${post.id}`} className="btn btn-link p-0 text-primary text-decoration-none fw-bold">
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
});

PostCard.displayName = 'PostCard';
export default PostCard;