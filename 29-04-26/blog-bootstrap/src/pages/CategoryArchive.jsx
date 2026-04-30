import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { categories } from '../data/categories';
import { ArrowLeft } from 'lucide-react';

const CategoryArchive = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentCategory = categories.find((cat) => cat.slug === slug);

  useEffect(() => {
    if (currentCategory) {
      document.title = `${currentCategory.name} Posts | BlogHub`;
    } else {
      document.title = 'Category Not Found | BlogHub';
    }
  }, [currentCategory]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        
        const categoryIndex = categories.findIndex((cat) => cat.slug === slug);
        const filteredPosts = data.filter(
          (post) => post.id % categories.length === categoryIndex
        );
        
        setPosts(filteredPosts.slice(0, 6));
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
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <SkeletonLoader key={i} type="card" />
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="row g-4">
            {posts.map((post) => (
              <div key={post.id} className="col-12 col-md-6 col-lg-4">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="fs-5 text-muted">No posts found in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryArchive;
