import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import PostCard from '../components/PostCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { categories } from '../data/categories';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'BlogHub - Home | Modern Blog Platform';
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
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

  return (
    <div>
      <HeroSlider />

      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">Browse by Category</h2>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="btn btn-outline-primary rounded-pill px-4 py-2"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="container pb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Recent Posts</h2>
          <Link to="/blog" className="btn btn-link text-decoration-none">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="row g-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <SkeletonLoader type="card" />
              </div>
            ))}
          </div>
        ) : (
          <div className="row g-4">
            {posts.map((post) => (
              <div key={post.id} className="col-12 col-md-6 col-lg-4">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
