const SkeletonLoader = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
        {/* Image Placeholder */}
        <div className="h-48 bg-gray-300"></div>

        {/* Content Placeholder */}
        <div className="p-6">
          {/* Category Badge */}
          <div className="h-6 bg-gray-300 rounded-full w-24 mb-3"></div>

          {/* Title */}
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>

          {/* Excerpt */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>

          {/* Meta Info */}
          <div className="flex gap-4 mb-4">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>

          {/* Read More Link */}
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
        {/* Title */}
        <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>

        {/* Meta */}
        <div className="flex gap-4 mb-6">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/5"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
