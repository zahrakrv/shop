import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from './../pages/api/context/GlobalContext';
import Image from 'next/image';

interface ProductType {
  _id: string | number;
  name: string;
  price: number;
  images: string[];
}
interface MiniCardProduct2Props {
  products: string[];
  className?: string;
  useRouter?: any;
}
const MiniCardProduct2: React.FC<MiniCardProduct2Props> = ({
  products,
  useRouter,
  className,
}) => {
  const router = useRouter();
  //   console.log(products);

  const handleCardClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };
  return (
    <>
      {products.map((product) => {
        // Format price with comma after every three digits
        const formattedPrice = Intl.NumberFormat('fa-IR').format(product.price);
        return (
          <div
            key={product._id}
            className="mini-card bg-white rounded-xl w-44 flex flex-col justify-center items-center gap-8 border border-gray-200 shadow p-2"
            onClick={() => handleCardClick(product._id)}
          >
            <Image
              src={`http://localhost:8000/images/products/images/${product.images[0]}`}
              alt=""
              width={256}
              height={256}
            />
            {/* <img
              className="w-32 mt-3"
              src={`http://localhost:8000/images/products/images/${product.images[0]}`}
              alt={product.name}
            /> */}
            <p className="font-semibold">{product.name}</p>
            <p className="mb-2">{formattedPrice} تومان</p>

            <button className="mini-card-button font-semibold bg-red-500 mb-3 rounded-3xl text-white p-2">
              مشاهده کالا
            </button>
          </div>
        );
      })}
    </>
  );
};

export default MiniCardProduct2;
