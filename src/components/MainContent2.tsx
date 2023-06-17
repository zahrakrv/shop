import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from './../pages/api/context/GlobalContext';
import MiniCardProduct2 from './MiniCardProduct2';

const MainContent2 = () => {
  const {
    categories,
    setCategories,
    fetchCategories,
    products,
    setProducts,
    fetchProducts,
    setAllProducts,
    allProducts,
    fetchAllProducts,
  } = useContext(GlobalContext);

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res.data.data.categories);
    });
  }, []);

  useEffect(() => {
    fetchAllProducts().then((res) => {
      //   console.log(res.data);
      setAllProducts(res.data.products);

      //   setCategories(res.data.data.categories);
    });
  }, []);
  //   console.log(allProducts);
  //   console.log(categories);

  const images = [
    '/1-cat-mob.png',
    '/2-cat-lap.png',
    '/3-cat-janebi.png',
    '/4-cat-watch.png',
  ];

  return (
    <>
      <div className="p-4 rounded-xl">
        {categories.map((category, index) => {
          //   <div key={category._id} className="bg-red-500 my-10 py-4 px-4 flex">
          const categoryProducts = allProducts.filter((product) => {
            return product.category._id === category._id;
            // console.log(product.categoryId);
            // console.log(product.category._id);
            // console.log(product);
          });
          //   console.log(categoryProducts);
          const randomProducts = categoryProducts
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
          //   console.log(randomProducts);
          return (
            <div key={category._id}>
              <h2 className="hel drop-shadow-2xl text-blue-900 text-3xl font-Bold p-2 cursor-pointer flex gap-4 items-center">
                کالاهای گروه {category.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 256 512"
                  className="fill-red-500"
                >
                  <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
                </svg>
              </h2>

              <div className="bg-red-500 my-10 mx-3 py-4 px-4 flex rounded">
                <div className="px-14 flex flex-col items-center justify-center">
                  {/* <h2 className="text-white text-xl font-semiBold p-4">
                    {category.name}
                  </h2> */}
                  <img src={images[index % images.length]} className="w-32" />
                </div>
                {/* <MiniCardProduct2 products={randomProducts} /> */}
                <div className="flex flex-col gap-10">
                  <div className="flex gap-12">
                    <MiniCardProduct2 products={randomProducts.slice(0, 3)} />
                  </div>
                  <div className="flex mt-4 gap-12">
                    <MiniCardProduct2 products={randomProducts.slice(3, 6)} />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-white w-44">
                    <img src="./box.png" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MainContent2;
