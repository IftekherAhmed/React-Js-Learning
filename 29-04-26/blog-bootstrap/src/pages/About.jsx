import { useEffect } from 'react';
import { Target, Heart, Award } from 'lucide-react';

const About = () => {
  useEffect(() => {
    document.title = 'About Us - BlogHub';
  }, []);
  const team = [
    { id: 1, name: 'John Doe', role: 'Founder & CEO', bio: 'Passionate about technology and sharing knowledge.', avatar: '👨‍💼' },
    { id: 2, name: 'Jane Smith', role: 'Lead Developer', bio: 'Full-stack developer with 10+ years experience.', avatar: '👩‍💻' },
    { id: 3, name: 'Mike Johnson', role: 'Content Strategist', bio: 'Expert in creating engaging content.', avatar: '👨‍🎨' },
    { id: 4, name: 'Sarah Williams', role: 'UX Designer', bio: 'Dedicated to beautiful user experiences.', avatar: '👩‍🎨' },
  ];

  const values = [
    { icon: <Target size={32} />, title: 'Our Mission', description: 'To provide high-quality, accessible content that helps developers grow.' },
    { icon: <Heart size={32} />, title: 'Our Values', description: 'We believe in community, continuous learning, and sharing knowledge.' },
    { icon: <Award size={32} />, title: 'Our Commitment', description: 'Delivering accurate, up-to-date, and practical content.' },
  ];

  return (
    <div>
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">About BlogHub</h1>
          <p className="fs-5 opacity-75">We're on a mission to make learning technology accessible to everyone</p>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="text-center fw-bold mb-5">What Drives Us</h2>
        <div className="row g-4">
          {values.map((value, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="text-primary mb-3">{value.icon}</div>
                  <h5 className="fw-semibold mb-3">{value.title}</h5>
                  <p className="text-muted">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Meet Our Team</h2>
          <div className="row g-4">
            {team.map((member) => (
              <div key={member.id} className="col-6 col-lg-3">
                <div className="card border-0 shadow-sm text-center">
                  <div className="card-body p-4">
                    <div className="display-4 mb-3">{member.avatar}</div>
                    <h5 className="fw-semibold mb-2">{member.name}</h5>
                    <p className="text-primary mb-2">{member.role}</p>
                    <p className="text-muted small">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-success text-white py-5">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <div className="display-4 fw-bold mb-2">500+</div>
              <div>Articles Published</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="display-4 fw-bold mb-2">50K+</div>
              <div>Monthly Readers</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="display-4 fw-bold mb-2">100+</div>
              <div>Expert Contributors</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="display-4 fw-bold mb-2">10+</div>
              <div>Years Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
