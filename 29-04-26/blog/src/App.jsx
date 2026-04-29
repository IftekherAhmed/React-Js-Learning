import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import { CategoryProvider } from './context/CategoryContext';
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
      <SearchProvider>
        <CategoryProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
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
        </CategoryProvider>
      </SearchProvider>
    </Router>
  );
}

export default App;
