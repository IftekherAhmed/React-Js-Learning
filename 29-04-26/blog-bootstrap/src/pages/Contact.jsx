import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  // Form state - single object for all fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Validation and submission state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Set page title on mount
  useEffect(() => {
    document.title = 'Contact Us - BlogHub';
  }, []);

  // Validate form fields - returns errors object
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change - updates formData when user types
  // Uses dynamic [e.target.name] to update correct field
  const handleChange = (e) => {
    setFormData({
      ...formData,  // Keep existing fields
      [e.target.name]: e.target.value,  // Update changed field
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  // Handle form submission - validates and submits form
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload on submit

    // Validate before submitting
    if (!validateForm()) {
      return;  // Stop if validation fails
    }

    setIsSubmitting(true);  // Show loading state

    // Simulate API call (in real app, send to backend)
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);  // Hide loading
      setIsSubmitted(true);  // Show success message
      setFormData({  // Reset form
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="bg-light py-5">
      <div className="container">
        <h1 className="display-5 fw-bold mb-5 text-center">Contact Us</h1>

        <div className="row g-4">
          {/* Contact Information */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h2 className="h4 fw-semibold mb-4">Get in Touch</h2>
                <p className="text-muted mb-4">
                  Have a question or want to work together? We'd love to hear from you.
                </p>

                <div className="d-flex align-items-start mb-4">
                  <Mail className="text-primary me-3 mt-1" size={24} />
                  <div>
                    <h3 className="fw-semibold mb-1 fs-5">Email</h3>
                    <p className="text-muted mb-0">contact@bloghub.com</p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-4">
                  <Phone className="text-primary me-3 mt-1" size={24} />
                  <div>
                    <h3 className="fw-semibold mb-1 fs-5">Phone</h3>
                    <p className="text-muted mb-0">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <MapPin className="text-primary me-3 mt-1" size={24} />
                  <div>
                    <h3 className="fw-semibold mb-1 fs-5">Address</h3>
                    <p className="text-muted mb-0">
                      123 Blog Street<br />
                      San Francisco, CA 94102
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                {isSubmitted ? (
                  <div className="text-center py-5">
                    <CheckCircle className="text-success mx-auto mb-3" size={64} />
                    <h2 className="h4 fw-semibold mb-2">
                      Message Sent!
                    </h2>
                    <p className="text-muted">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-4">
                      {/* Name */}
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>

                      {/* Email */}
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="mb-4">
                      <label htmlFor="subject" className="form-label">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                        placeholder="Subject of your message"
                      />
                      {errors.subject && (
                        <div className="invalid-feedback">{errors.subject}</div>
                      )}
                    </div>

                    {/* Message */}
                    <div className="mb-4">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                        placeholder="Your message..."
                      ></textarea>
                      {errors.message && (
                        <div className="invalid-feedback">{errors.message}</div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} className="me-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
