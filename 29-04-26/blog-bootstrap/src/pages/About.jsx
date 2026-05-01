import { useEffect } from 'react';
import { Target, Heart, Award } from 'lucide-react';

// 1. Move static data outside to prevent re-creation on every render
const TEAM = [
  { id: 1, name: 'John Doe', role: 'Founder & CEO', bio: 'Passionate about technology and sharing knowledge.', avatar: '👨‍💼' },
  { id: 2, name: 'Jane Smith', role: 'Lead Developer', bio: 'Full-stack developer with 10+ years experience.', avatar: '👩‍💻' },
  { id: 3, name: 'Mike Johnson', role: 'Content Strategist', bio: 'Expert in creating engaging content.', avatar: '👨‍🎨' },
  { id: 4, name: 'Sarah Williams', role: 'UX Designer', bio: 'Dedicated to beautiful user experiences.', avatar: '👩‍🎨' },
];

const VALUES = [
  { icon: Target, title: 'Our Mission', description: 'To provide high-quality, accessible content that helps developers grow.' },
  { icon: Heart, title: 'Our Values', description: 'We believe in community, continuous learning, and sharing knowledge.' },
  { icon: Award, title: 'Our Commitment', description: 'Delivering accurate, up-to-date, and practical content.' },
];

const STATS = [
  { label: 'Articles Published', value: '500+' },
  { label: 'Monthly Readers', value: '50K+' },
  { label: 'Expert Contributors', value: '100+' },
  { label: 'Years Experience', value: '10+' },
];

const About = () => {
  useEffect(() => {
    document.title = 'About Us | BlogHub';
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary bg-gradient text-white py-5 shadow-sm">
        <div className="container py-4 text-center">
          <h1 className="display-3 fw-bold mb-3">About BlogHub</h1>
          <p className="lead opacity-75 mx-auto" style={{ maxWidth: '700px' }}>
            We're on a mission to bridge the gap between complex technology and passionate learners worldwide.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-5">
        <div className="container py-lg-5">
          <h2 className="text-center fw-bold mb-5">What Drives Us</h2>
          <div className="row g-4">
            {VALUES.map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm transition-hover">
                  <div className="card-body text-center p-4">
                    <div className="bg-primary-soft p-3 rounded-circle d-inline-block mb-3 text-primary">
                      <item.icon size={32} />
                    </div>
                    <h4 className="fw-bold mb-3">{item.title}</h4>
                    <p className="text-muted mb-0">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-light py-5 border-top border-bottom">
        <div className="container py-lg-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Meet Our Team</h2>
            <p className="text-muted">The humans behind the code and content.</p>
          </div>
          <div className="row g-4">
            {TEAM.map((member) => (
              <div key={member.id} className="col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100 text-center team-card">
                  <div className="card-body p-4">
                    <div className="display-3 mb-3 bg-white rounded-circle shadow-sm d-inline-block p-3" style={{ width: '100px', height: '100px', lineHeight: '1' }}>
                      {member.avatar}
                    </div>
                    <h5 className="fw-bold mb-1">{member.name}</h5>
                    <p className="text-primary small fw-semibold text-uppercase mb-3">{member.role}</p>
                    <p className="text-muted small mb-0">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-dark text-white py-5">
        <div className="container py-4">
          <div className="row g-4 text-center">
            {STATS.map((stat, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="display-5 fw-bold text-primary mb-1">{stat.value}</div>
                <div className="small text-uppercase opacity-50 fw-semibold tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;