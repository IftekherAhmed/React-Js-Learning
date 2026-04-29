import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SkeletonLoader from '../components/SkeletonLoader';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <SkeletonLoader type="detail" />;
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-indigo-600 hover:text-indigo-800">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Calculate reading time
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Blog
        </Link>

        {/* Post Header */}
        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Post Image Placeholder */}
          <div className="h-64 md:h-96 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-8xl font-bold opacity-30">{post.id}</span>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-8 md:p-12">
            {/* Category */}
            <div className="flex items-center mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                <Tag className="h-4 w-4 mr-2" />
                {category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>Author {post.userId}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Post Body */}
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {post.body}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mt-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mt-6">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </article>

        {/* Related Posts Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => {
              const relatedId = (parseInt(id) + i) % 100 || 1;
              return (
                <Link
                  key={i}
                  to={`/post/${relatedId}`}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-indigo-600">
                    Related Post #{relatedId}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    Click to read this related article and expand your knowledge on this topic.
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
