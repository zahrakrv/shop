import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from './../pages/api/context/GlobalContext';

const MiniCardProduct2 = ({ products }) => {
  //   console.log(products);
  return (
    <>
      {products.map((product) => {
        // Format price with comma after every three digits
        const formattedPrice = product.price.toLocaleString();
        return (
          <div
            key={product._id}
            className="bg-white rounded-xl w-44 flex flex-col justify-center items-center gap-8"
          >
            <img
              className="w-32 mt-3"
              src={`http://localhost:8000/images/products/images/${product.images[0]}`}
              alt={product.name}
            />
            <p className="font-semibold">{product.name}</p>
            <p className="mb-3">{formattedPrice} تومان</p>
          </div>
        );
      })}
    </>
  );
};

export default MiniCardProduct2;
