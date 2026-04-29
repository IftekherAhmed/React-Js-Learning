import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag } from 'lucide-react';

const PostCard = ({ post }) => {
  // Generate a random reading time based on post length
  const readingTime = Math.max(3, Math.floor((post.body?.length || 100) / 200));
  
  // Format the date
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Assign a category based on post ID
  const categories = ['Technology', 'Design', 'Programming', 'Lifestyle', 'Business', 'Health'];
  const category = categories[post.id % categories.length];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Post Image Placeholder */}
      <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-6xl font-bold opacity-30">{post.id}</span>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="flex items-center mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            <Tag className="h-3 w-3 mr-1" />
            {category}
          </span>
        </div>

        {/* Post Title */}
        <Link to={`/post/${post.id}`} className="block mt-2">
          <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
            {post.title}
          </h3>
        </Link>

        {/* Post Excerpt */}
        <p className="mt-3 text-gray-600 line-clamp-3">
          {post.body}
        </p>

        {/* Post Meta */}
        <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-4">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>Author {post.userId}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Read More Link */}
        <Link
          to={`/post/${post.id}`}
          className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
