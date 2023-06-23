import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from './../pages/api/context/GlobalContext';
import MiniCardProduct from './MiniCardProduct';
import axios from 'axios';

const MainContent = () => {
  const {
    categories,
    setCategories,
    fetchCategories,
    products,
    setProducts,
    fetchProducts,
  } = useContext(GlobalContext);

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res.data.data.categories);
    });
  }, []);
  useEffect(() => {
    fetchProducts().then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  //   useEffect(() => {
  //     fetchSubCategories().then((response) => {
  //       setSubCategory(response.data.data.subcategories);
  //     });
  //   }, []);
  //   useEffect(() => {
  //     fetchProducts().then((res) => {
  //       console.log(res.data.products);
  //       setProducts(res.data.products);
  //     });
  //   }, []);

  const images = [
    '/1-cat-mob.png',
    '/2-cat-lap.png',
    '/3-cat-janebi.png',
    '/4-cat-watch.png',
  ];
  return (
    <>
      <div className="p-4 rounded-xl">
        {categories.map((category) => (
          <div key={category._id} className="bg-red-500 my-10 py-4 px-4 flex">
            {console.log(category)}
            <div className=" px-8 flex flex-col items-center">
              <h2 className="text-white text-xl font-semiBold p-4">
                {category.name}
              </h2>
              <img
                src={images[category._id % images.length]}
                className="w-32"
              />
              {/* {products?.map((product, index) => { */}
            </div>
            <MiniCardProduct
              products={products.filter(
                (product) => product.categoryId === category._id
              )}
              // name={product.name}
              // price={product.price}
            />
            {/* //   })} */}

            {/* <MiniCardProduct products={products} /> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default MainContent;
