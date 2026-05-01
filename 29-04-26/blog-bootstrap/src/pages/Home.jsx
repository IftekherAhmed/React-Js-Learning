import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import PostCard from '../components/PostCard';
import SkeletonLoader from '../components/SkeletonLoader';
import useFetch from '../hooks/useFetch'; // Import our new hook
import { categories } from '../data/categories';

const Home = () => {
  // 1. One line replaces ~15 lines of fetching logic
  const { data: posts, loading } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=6');

  useEffect(() => {
    document.title = 'BlogHub - Home | Modern Blog Platform';
  }, []);

  return (
    <main>
      <HeroSlider />

      {/* Category Section */}
      <section className="container py-5 text-center">
        <h2 className="fw-bold mb-4">Browse by Category</h2>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {categories.map(({ id, name, slug }) => (
            <Link key={id} to={`/category/${slug}`} className="btn btn-outline-primary rounded-pill px-4">
              {name}
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="container pb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Recent Posts</h2>
          <Link to="/blog" className="btn btn-link text-decoration-none">View All →</Link>
        </div>

        <div className="row g-4">
          {loading 
            ? Array(6).fill(0).map((_, i) => (
                <div key={i} className="col-12 col-md-6 col-lg-4">
                  <SkeletonLoader type="card" />
                </div>
              ))
            : posts?.map((post) => (
                <div key={post.id} className="col-12 col-md-6 col-lg-4">
                  <PostCard post={post} />
                </div>
              ))
          }
        </div>
      </section>
    </main>
  );
};

export default Home;