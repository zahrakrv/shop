import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from './../pages/api/context/GlobalContext';

const MiniCardProduct = ({ products }) => {
  const getRandomProducts = (products, count) => {
    const randomProducts = [];
    const productCount = products.length;
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * productCount);
      randomProducts.push(products[randomIndex]);
    }
    return randomProducts;
  };

  const randomProducts = getRandomProducts(products, 6);
  console.log(randomProducts);
  return (
    <>
      <div className="bg-white rounded-xl w-44">
        {randomProducts?.map((product) => {
          return (
            <div key={product._id}>
              <img
                src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                alt={product.name}
              ></img>
              <p>{product.name}</p>
              <p>{product.price}</p>
              {/* <p>name</p>
            <p>price</p> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MiniCardProduct;
