import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../pages/api/context/GlobalContext';

const AllCategories = () => {
  const { fetchProducts } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        // if (Array.isArray(categoriesData)) {
        console.log(productsData);

        setProducts(productsData.data.products);
        // }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getProducts();
  }, [fetchProducts]);
  //   [fetchProducts]
  if (products.length === 0) {
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
