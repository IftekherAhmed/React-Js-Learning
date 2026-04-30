import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PostListing from './pages/PostListing';
import PostDetail from './pages/PostDetail';
import CategoryArchive from './pages/CategoryArchive';
import Search from './pages/Search';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      {/* ScrollToTop: Auto-scroll to top on route change */}
      <ScrollToTop />
      {/* ErrorBoundary: Catches errors and shows fallback UI */}
      <ErrorBoundary>
        <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<PostListing />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/category/:slug" element={<CategoryArchive />} />
            <Route path="/search" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </ErrorBoundary>
      {/* BackToTop: Floating button for quick scroll to top */}
      <BackToTop />
    </Router>
  );
}

export default App;
