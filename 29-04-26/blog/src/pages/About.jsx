import { Users, Target, Heart, Award } from 'lucide-react';

const About = () => {
  const team = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Founder & CEO',
      bio: 'Passionate about technology and sharing knowledge with the community.',
      avatar: '👨‍💼',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Lead Developer',
      bio: 'Full-stack developer with 10+ years of experience in web technologies.',
      avatar: '👩‍💻',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Content Strategist',
      bio: 'Expert in creating engaging content that resonates with developers.',
      avatar: '👨‍🎨',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      role: 'UX Designer',
      bio: 'Dedicated to creating intuitive and beautiful user experiences.',
      avatar: '👩‍🎨',
    },
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Our Mission',
      description: 'To provide high-quality, accessible content that helps developers and designers grow their skills.',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Our Values',
      description: 'We believe in community, continuous learning, and sharing knowledge openly.',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Our Commitment',
      description: 'Delivering accurate, up-to-date, and practical content that makes a real difference.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About BlogHub</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            We're on a mission to make learning technology accessible to everyone
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Drives Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-indigo-600 mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Articles Published</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-lg opacity-90">Monthly Readers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-lg opacity-90">Expert Contributors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-lg opacity-90">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
