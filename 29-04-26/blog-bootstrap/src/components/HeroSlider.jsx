import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  { 
    id: 1, 
    title: 'Welcome to BlogHub', 
    subtitle: 'Discover insights on tech', 
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&h=600&fit=crop' 
  },
  { 
    id: 2, 
    title: 'Learn & Grow', 
    subtitle: 'Stay updated with trends', 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=600&fit=crop' 
  },
  { 
    id: 3, 
    title: 'Join Our Community', 
    subtitle: 'Connect with developers', 
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&h=600&fit=crop' 
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  // 1. Single navigation logic for everything
  const move = (dir) => setCurrent(prev => (prev + dir + SLIDES.length) % SLIDES.length);

  // 2. Automated slide timer
  useEffect(() => {
    const timer = setInterval(() => move(1), 5000);
    return () => clearInterval(timer);
  }, []);

  // 3. Simplified Swipe/Drag Logic
  const handleSwipe = (endX) => {
    if (!touchStart) return;
    const distance = touchStart - endX;
    if (Math.abs(distance) > 50) move(distance > 0 ? 1 : -1);
    setTouchStart(0);
  };

  const getCoord = (e) => e.targetTouches ? e.targetTouches[0].clientX : e.clientX;

  return (
    <div 
      className="position-relative overflow-hidden" 
      style={{ height: '500px', cursor: 'grab', borderRadius: '0 0 1rem 1rem' }}
      onMouseDown={e => setTouchStart(getCoord(e))}
      onMouseUp={e => handleSwipe(getCoord(e))}
      onTouchStart={e => setTouchStart(getCoord(e))}
      onTouchEnd={e => handleSwipe(getCoord(e))}
    >
      {SLIDES.map((slide, i) => (
        <div key={slide.id} className="position-absolute w-100 h-100 transition" style={{ opacity: i === current ? 1 : 0, transition: 'opacity 1s ease', zIndex: i === current ? 1 : 0 }}>
          <img src={slide.image} alt={slide.title} className="w-100 h-100" style={{ objectFit: 'cover' }} />
          <div className="position-absolute top-0 w-100 h-100 bg-dark opacity-50" />
          <div className="position-absolute top-50 start-50 translate-middle text-center text-white w-100">
            <h1 className="display-4 fw-bold">{slide.title}</h1>
            <p className="fs-5 opacity-75">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button onClick={() => move(-1)} className="btn btn-light position-absolute top-50 start-0 ms-3 rounded-circle p-2" style={{ zIndex: 10 }}><ChevronLeft /></button>
      <button onClick={() => move(1)} className="btn btn-light position-absolute top-50 end-0 me-3 rounded-circle p-2" style={{ zIndex: 10 }}><ChevronRight /></button>

      {/* Dots */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2" style={{ zIndex: 10 }}>
        {SLIDES.map((_, i) => (
          <button key={i} 
            onClick={() => setCurrent(i)} 
            className={`btn rounded-pill p-0 ${i === current ? 'btn-light' : 'btn-outline-light opacity-50'}`} 
            style={{ width: i === current ? '30px' : '10px', height: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;