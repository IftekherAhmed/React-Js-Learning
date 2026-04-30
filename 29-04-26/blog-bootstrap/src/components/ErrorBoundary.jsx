import { Component } from 'react';

// Catches JavaScript errors in child components and shows fallback UI
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console or error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when error occurs
      return (
        <div className="container py-5 text-center">
          <div className="alert alert-danger" role="alert">
            <h2 className="alert-heading">Something went wrong</h2>
            <p>We're sorry, but something unexpected happened.</p>
            <hr />
            <p className="mb-0">
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-danger"
              >
                Reload Page
              </button>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
