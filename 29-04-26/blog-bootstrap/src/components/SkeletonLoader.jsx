const SkeletonLoader = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="card shadow-sm border-0">
        <div className="bg-secondary" style={{height: '200px', opacity: 0.25}}></div>
        <div className="card-body">
          <div className="mb-3">
            <span className="badge bg-secondary" style={{width: '80px', height: '24px'}}></span>
          </div>
          <div className="mb-2 bg-secondary" style={{height: '24px', width: '75%', opacity: 0.25}}></div>
          <div className="mb-3">
            <div className="bg-secondary mb-2" style={{height: '16px', opacity: 0.25}}></div>
            <div className="bg-secondary mb-2" style={{height: '16px', width: '85%', opacity: 0.25}}></div>
            <div className="bg-secondary" style={{height: '16px', width: '65%', opacity: 0.25}}></div>
          </div>
          <div className="d-flex gap-3 mb-3">
            <div className="bg-secondary" style={{height: '16px', width: '60px', opacity: 0.25}}></div>
            <div className="bg-secondary" style={{height: '16px', width: '80px', opacity: 0.25}}></div>
            <div className="bg-secondary" style={{height: '16px', width: '50px', opacity: 0.25}}></div>
          </div>
          <div className="bg-secondary" style={{height: '16px', width: '80px', opacity: 0.25}}></div>
        </div>
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="bg-secondary mb-3" style={{height: '40px', width: '75%', opacity: 0.25}}></div>
            <div className="d-flex gap-3 mb-4">
              <div className="bg-secondary" style={{height: '16px', width: '100px', opacity: 0.25}}></div>
              <div className="bg-secondary" style={{height: '16px', width: '80px', opacity: 0.25}}></div>
              <div className="bg-secondary" style={{height: '16px', width: '70px', opacity: 0.25}}></div>
            </div>
            <div>
              <div className="bg-secondary mb-2" style={{height: '16px', opacity: 0.25}}></div>
              <div className="bg-secondary mb-2" style={{height: '16px', width: '85%', opacity: 0.25}}></div>
              <div className="bg-secondary mb-2" style={{height: '16px', width: '80%', opacity: 0.25}}></div>
              <div className="bg-secondary mb-2" style={{height: '16px', opacity: 0.25}}></div>
              <div className="bg-secondary" style={{height: '16px', width: '75%', opacity: 0.25}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
