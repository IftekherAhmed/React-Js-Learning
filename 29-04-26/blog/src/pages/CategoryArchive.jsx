import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { useCategory } from '../context/CategoryContext';
import { ArrowLeft } from 'lucide-react';

const CategoryArchive = () => {
  const { slug } = useParams();
  const { categories } = useCategory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Find the current category
  const currentCategory = categories.find((cat) => cat.slug === slug);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Fetch all posts and filter by simulating category assignment
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        
        // Simulate category filtering by assigning categories based on post ID
        const categoryIndex = categories.findIndex((cat) => cat.slug === slug);
        const filteredPosts = data.filter(
          (post) => post.id % categories.length === categoryIndex
        );
        
        setPosts(filteredPosts.slice(0, 6)); // Limit to 6 posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPosts();
    }
  }, [slug, categories]);

  if (!currentCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link to="/" className="text-indigo-600 hover:text-indigo-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button & Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">
            {currentCategory.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Browse all posts in the {currentCategory.name} category
          </p>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              No posts found in this category yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryArchive;
