import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'submitted'

  useEffect(() => {
    document.title = 'Contact Us | BlogHub';
  }, []);

  // 1. Improved Validation Logic
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // 2. Pro Tip: Clear error specifically for the field being typed in
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Submitted Data:', formData);
    setStatus('submitted');
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset status after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <main className="bg-light py-5 min-vh-100">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">Get in Touch</h1>
          <p className="text-muted lead">We usually respond within 24 hours.</p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Info Sidebar */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm bg-primary text-white h-100">
              <div className="card-body p-4 p-xl-5">
                <h3 className="mb-4">Contact Information</h3>
                
                {[
                  { icon: Mail, label: 'Email', val: 'hello@bloghub.com' },
                  { icon: Phone, label: 'Phone', val: '+1 (555) 000-1234' },
                  { icon: MapPin, label: 'Office', val: 'San Francisco, CA' }
                ].map((item, i) => (
                  <div key={i} className="d-flex mb-4">
                    <item.icon size={24} className="me-3 opacity-75" />
                    <div>
                      <p className="small mb-0 opacity-75">{item.label}</p>
                      <p className="fw-medium mb-0">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-xl-5">
                {status === 'submitted' ? (
                  <div className="text-center py-4">
                    <CheckCircle className="text-success mb-3" size={60} />
                    <h3>Message Received!</h3>
                    <p className="text-muted">Thanks for reaching out. Check your inbox soon.</p>
                    <button onClick={() => setStatus('idle')} className="btn btn-outline-primary btn-sm mt-3">Send another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Full Name</label>
                        <input name="name" type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={formData.name} onChange={handleChange} placeholder="John Doe" />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Email Address</label>
                        <input name="email" type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold">Subject</label>
                      <input name="subject" type="text" className={`form-control ${errors.subject ? 'is-invalid' : ''}`} value={formData.subject} onChange={handleChange} />
                      {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                    </div>

                    <div className="mb-4">
                      <label className="form-label small fw-bold">Message</label>
                      <textarea name="message" rows="5" className={`form-control ${errors.message ? 'is-invalid' : ''}`} value={formData.message} onChange={handleChange}></textarea>
                      {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>

                    <button type="submit" disabled={status === 'submitting'} className="btn btn-primary btn-lg w-100 shadow-sm">
                      {status === 'submitting' ? (
                        <><span className="spinner-border spinner-border-sm me-2" /> Sending...</>
                      ) : (
                        <><Send size={18} className="me-2" /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;