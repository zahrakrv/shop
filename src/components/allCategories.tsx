import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './../pages/context/GlobalContext';

const AllCategories = () => {
  const { fetchProducts } = useContext(GlobalContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await fetchProducts();
        // if (Array.isArray(categoriesData)) {
        console.log(categoriesData);

        setCategories(categoriesData.data.products);
        // }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
  }, [fetchProducts]);
  //   [fetchProducts]
  if (categories.length === 0) {
    return <div>No categories available.</div>;
  }

  return (
    // <div>
    //   <h2>Dashboard Content</h2>
    //   <ul>
    //     {categories.map((category) => (
    //       <li key={category.id}>{category.name}</li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default AllCategories;
