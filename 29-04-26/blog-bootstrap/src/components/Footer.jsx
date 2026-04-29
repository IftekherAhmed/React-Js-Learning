import { Link } from 'react-router-dom';
import { Link as LinkIcon, Share2, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <h3 className="fw-bold text-primary mb-3">BlogHub</h3>
            <p className="text-secondary mb-3">
              A modern blog platform sharing insights on technology, design, programming, and lifestyle.
              Stay updated with the latest trends and best practices.
            </p>
            <div className="d-flex gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover-white">
                <LinkIcon />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover-white">
                <Share2 />
              </a>
              <a href="mailto:contact@bloghub.com" className="text-secondary hover-white">
                <Mail />
              </a>
            </div>
          </div>

          <div className="col-md-3">
            <h5 className="fw-semibold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
              <li><Link to="/about" className="text-secondary text-decoration-none">About</Link></li>
              <li><Link to="/blog" className="text-secondary text-decoration-none">Blog</Link></li>
              <li><Link to="/contact" className="text-secondary text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="fw-semibold mb-3">Categories</h5>
            <ul className="list-unstyled">
              <li><Link to="/category/technology" className="text-secondary text-decoration-none">Technology</Link></li>
              <li><Link to="/category/design" className="text-secondary text-decoration-none">Design</Link></li>
              <li><Link to="/category/programming" className="text-secondary text-decoration-none">Programming</Link></li>
              <li><Link to="/category/lifestyle" className="text-secondary text-decoration-none">Lifestyle</Link></li>
            </ul>
          </div>
        </div>

        <hr className="my-4 bg-secondary" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-secondary mb-2 mb-md-0">
            © {currentYear} BlogHub. All rights reserved.
          </p>
          <p className="text-secondary mb-0 d-flex align-items-center">
            Made with <Heart className="mx-1 text-danger" style={{width: '16px', height: '16px'}} /> by BlogHub Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
