import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

// Floating button that appears when user scrolls down
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolled down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="btn btn-primary position-fixed rounded-circle shadow"
        style={{
          bottom: '30px',
          right: '30px',
          width: '50px',
          height: '50px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Back to top"
      >
        <ArrowUp size={24} />
      </button>
    )
  );
};

export default BackToTop;
