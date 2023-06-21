import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from './../pages/api/context/GlobalContext';
import MiniCardProduct2 from './MiniCardProduct2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import box from '../../public/box.png';

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
  const router = useRouter();

  useEffect(() => {
    fetchCategories().then((res) => {
      if (res.success) {
        setCategories(res.data.data.categories);
      }
    });
  }, []);

  useEffect(() => {
    fetchAllProducts().then((res) => {
      if (res.success) {
        //   console.log(res.data);
        setAllProducts(res.data.products);
      }
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
          // console.log(category);

          //   console.log(categoryProducts);
          const randomProducts = categoryProducts
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
          //   console.log(randomProducts);
          return (
            <div key={category._id}>
              <Link
                // href={`/landing?category=${category.name}&categoryId=${category._id}`}
                href={{
                  pathname: '/landing',
                  query: { category: category.name, categoryId: category._id },
                }}
              >
                <h2 className="hel drop-shadow-2xl text-blue-900 text-[30px] font-Bold p-2 cursor-pointer flex gap-4 items-center">
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
              </Link>
              <div className="bg-red-500 my-10 mx-3 py-4 px-4 flex rounded flex justify-between items-center">
                {/* ///div categori pix */}
                <div className="px-14 flex flex-col items-center justify-center">
                  {/* <h2 className="text-white text-xl font-semiBold p-4">
                    {category.name}
                  </h2> */}
                  <img src={images[index % images.length]} className="w-32" />
                </div>
                {/* <MiniCardProduct2 products={randomProducts} /> */}
                {/* /////div miniCards */}
                <div className="flex flex-col gap-10">
                  <div className="flex gap-12">
                    <MiniCardProduct2
                      products={randomProducts.slice(0, 3)}
                      useRouter={useRouter}
                    />
                  </div>
                  <div className="flex mt-4 gap-12">
                    <MiniCardProduct2
                      products={randomProducts.slice(3, 6)}
                      useRouter={useRouter}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  {/* ////////div pishnahad */}
                  <div className="ml-4 w-44 flex flex-col justify-between items-center p-3">
                    <p className="text-white text-xl text-center mb-2">
                      پیشنهاد
                      <br /> شگفت <br />
                      انگیز
                    </p>
                    <Image src={box} alt="" width={112} height={112} />
                    {/* <img className="w-28" src="./box.png" /> */}
                    <Link
                      // href={`/landing?category=${category.name}&categoryId=${category._id}`}
                      href={{
                        pathname: '/landing',
                        query: {
                          category: category.name,
                          categoryId: category._id,
                        },
                      }}
                    >
                      <div className="flex items-center gap-3 mt-2 hover:text-blue-900">
                        {' '}
                        <p className="text-white text-xl text-center">
                          مشاهده ی همه
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 320 512"
                          className="fill-white"
                        >
                          <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                        </svg>
                      </div>
                    </Link>
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
