import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag } from 'lucide-react';

const PostCard = ({ post }) => {
  const readingTime = Math.max(3, Math.floor((post.body?.length || 100) / 200));
  
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const categories = ['Technology', 'Design', 'Programming', 'Lifestyle', 'Business', 'Health'];
  const category = categories[post.id % categories.length];

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-header bg-primary text-white d-flex align-items-center justify-content-center" style={{height: '200px'}}>
        <span className="display-1 fw-bold opacity-25">{post.id}</span>
      </div>

      <div className="card-body">
        <div className="mb-2">
          <span className="badge bg-primary">
            <Tag style={{width: '12px', height: '12px'}} className="me-1" />
            {category}
          </span>
        </div>

        <Link to={`/post/${post.id}`} className="text-decoration-none">
          <h5 className="card-title text-dark hover-primary">{post.title}</h5>
        </Link>

        <p className="card-text text-muted">{post.body}</p>

        <div className="d-flex flex-wrap gap-3 small text-muted mb-3">
          <div className="d-flex align-items-center">
            <User style={{width: '14px', height: '14px'}} className="me-1" />
            <span>Author {post.userId}</span>
          </div>
          <div className="d-flex align-items-center">
            <Calendar style={{width: '14px', height: '14px'}} className="me-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="d-flex align-items-center">
            <Clock style={{width: '14px', height: '14px'}} className="me-1" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        <Link to={`/post/${post.id}`} className="text-primary text-decoration-none fw-semibold">
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
