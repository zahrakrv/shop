import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from './../pages/api/context/GlobalContext';
import MiniCardProduct from './MiniCardProduct';
import axios from 'axios';

const MainContent = () => {
  const {
    categories,
    // subCategory,
    setCategories,
    // setSubCategory,
    fetchCategories,
    // fetchSubCategories,
    products,
    setProducts,
    fetchProducts,
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
  //   useEffect(() => {
  //     fetchProducts().then((res) => {
  //       console.log(res.data.products);
  //       setProducts(res.data.products);
  //     });
  //   }, []);

  //////randomly get products
  useEffect(() => {
    fetchProducts(1, 10).then((res) => {
      //   const randomProducts = getRandomProducts(res.data.products, 6);
      setProducts(res.data.products);
      //   console.log(randomProducts);
    });
  }, []);

  //   const getRandomProducts = (products, count) => {
  //     const randomProducts = [];
  //     const productCount = products.length;
  //     for (let i = 0; i < count; i++) {
  //       const randomIndex = Math.floor(Math.random() * productCount);
  //       randomProducts.push(products[randomIndex]);
  //     }
  //     return randomProducts;
  //   };

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       try {
  //         const response = await axios.get('http://localhost:8000/api/products');
  //         setProducts(response.data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchProducts();
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
            <div className=" px-8 flex flex-col items-center">
              <h2 className="text-white text-xl font-semiBold p-4">
                {category.name}
              </h2>
              <img
                src={images[category._id % images.length]}
                className="w-32"
              ></img>
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
          </div>
        ))}
      </div>
    </>
  );
};

export default MainContent;
