import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from './../pages/api/context/GlobalContext';

const MainContent = () => {
  const {
    categories,
    // subCategory,
    setCategories,
    // setSubCategory,
    fetchCategories,
    // fetchSubCategories,
  } = useContext(GlobalContext);

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res.data.data.categories);
    });
  }, []);

  //   useEffect(() => {
  //     fetchSubCategories().then((response) => {
  //       setSubCategory(response.data.data.subcategories);
  //     });
  //   }, []);

  return (
    <>
      <div>
        {categories.map((category, index) => (
          <div key={index} className="bg-red-500 my-10 py-4">
            <h2>{category.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainContent;
