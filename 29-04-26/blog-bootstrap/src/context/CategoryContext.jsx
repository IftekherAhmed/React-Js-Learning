import { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Technology', slug: 'technology' },
    { id: 2, name: 'Design', slug: 'design' },
    { id: 3, name: 'Programming', slug: 'programming' },
    { id: 4, name: 'Lifestyle', slug: 'lifestyle' },
    { id: 5, name: 'Business', slug: 'business' },
    { id: 6, name: 'Health', slug: 'health' },
  ]);

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  const clearCategory = () => {
    setSelectedCategory(null);
  };

  return (
    <CategoryContext.Provider value={{ 
      selectedCategory, 
      setSelectedCategory,
      categories, 
      setCategories,
      selectCategory,
      clearCategory
    }}>
      {children}
    </CategoryContext.Provider>
  );
};
