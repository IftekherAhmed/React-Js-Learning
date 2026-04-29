import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const slides = [
    {
      id: 1,
      title: 'Welcome to BlogHub',
      subtitle: 'Discover insights on technology, design, and programming',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&h=600&fit=crop',
    },
    {
      id: 2,
      title: 'Learn & Grow',
      subtitle: 'Stay updated with the latest trends and best practices',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=600&fit=crop',
    },
    {
      id: 3,
      title: 'Join Our Community',
      subtitle: 'Connect with developers and designers worldwide',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&h=600&fit=crop',
    },
  ];

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches ? e.targetTouches[0].clientX : e.clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches ? e.targetTouches[0].clientX : e.clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div 
      className="position-relative overflow-hidden"
      style={{height: '500px', cursor: 'grab', borderRadius: '0 0 1rem 1rem'}}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="position-absolute top-0 start-0 w-100 h-100 transition-opacity"
          style={{
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 1s ease-in-out'
          }}
        >
          <div className="position-relative w-100 h-100">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-100 h-100"
              style={{objectFit: 'cover'}}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{opacity: 0.5}}></div>
            <div className="position-absolute top-50 start-50 translate-middle text-center text-white px-4" style={{zIndex: 1}}>
              <h1 className="display-4 fw-bold mb-4">{slide.title}</h1>
              <p className="fs-5" style={{maxWidth: '700px', margin: '0 auto', opacity: 0.9}}>
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={goToPrev}
        className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-3 rounded-circle opacity-75"
        style={{zIndex: 10}}
      >
        <ChevronLeft />
      </button>
      <button
        onClick={goToNext}
        className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-3 rounded-circle opacity-75"
        style={{zIndex: 10}}
      >
        <ChevronRight />
      </button>

      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2" style={{zIndex: 10}}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`btn rounded-pill ${index === currentSlide ? 'btn-light' : 'btn-outline-light opacity-50'}`}
            style={{width: index === currentSlide ? '32px' : '12px', height: '12px', padding: 0}}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
