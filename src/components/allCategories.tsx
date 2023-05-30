import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './../pages/context/GlobalContext';

const DashboardContent = () => {
  const { fetchCategories } = useContext(GlobalContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        // if (Array.isArray(categoriesData)) {
        console.log(categoriesData);

        setCategories(categoriesData.data.products);
        // }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    //   useEffect(() => {
    //     const getCategories = async () => {
    //       const categoriesData = await fetchCategories();
    //////categories ro be onvane array nemishnakht in sharto gozashtam
    //   if (Array.isArray(categoriesData)) {
    //     setCategories(categoriesData);
    //   }
    // };

    getCategories();
  }, [fetchCategories]);
  //   [fetchCategories]
  if (categories.length === 0) {
    return <div>No categories available.</div>;
  }

  return (
    <div>
      <h2>Dashboard Content</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardContent;
