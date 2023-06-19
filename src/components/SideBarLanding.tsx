import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from './../pages/api/context/GlobalContext';
import axios from 'axios';

const SideBarLanding = () => {
  // const [product, setProduct] = useState(null);

  // useEffect(() => {
  //   const fetchProductsForCategory = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:8000/api/products');
  //       // console.log(res.data.data.products[0].subcategory.name);
  //       // setProduct(res.data.data.product);
  //       setCategory(res.data.data.products[0].category.name);
  //       setSubCategory(res.data.data.products[0].subcategory.name);
  //       // console.log(res.data.data.product.category.name);
  //     } catch (error) {
  //       console.error('Error fetching product:', error);
  //     }
  //   };
  //   fetchProductsForCategory();
  // }, []);

  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:8000/api/categories');
  //       setCategories(res.data.data.categories);
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const {
    categories,
    subCategory,
    setCategories,
    setSubCategory,
    fetchCategories,
    fetchSubCategories,
  } = useContext(GlobalContext);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const categoriesResponse = await fetchCategories();
  //     const subCategoriesResponse = await fetchSubCategories();

  //     if (categoriesResponse && subCategoriesResponse) {
  //       console.log(categoriesResponse.data)
  //       setCategories(categoriesResponse.data.data);
  //       setSubCategory(subCategoriesResponse.data.data);
  //     }
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res.data.data.categories);
    });
  }, []);

  useEffect(() => {
    fetchSubCategories().then((response) => {
      setSubCategory(response.data.data.subcategories);
    });
  }, []);
  return (
    <>
      <div>
        {categories?.map((category) => (
          <div key={category._id}>
            <h2 className='mt-10 mb-6 mr-2'>{category.name}</h2>
            <ul>
              {subCategory?
                .filter((subcategory) => subcategory.category === category._id)
                .map((subcategory) => (
                  <li key={subcategory._id} className='py-2'>{subcategory.name}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default SideBarLanding;
