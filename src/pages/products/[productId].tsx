import { useRouter } from 'next/router';
import Layout from '@/layout/layout';
import { GlobalContext } from '../../pages/api/context/GlobalContext';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ProductPage = () => {
  const router = useRouter();
  //   const { id } = router.query;
  const { query } = router;
  const id = query.productId;
  ///null برای انکه اولش هیچی نباشه و با یوزافکت بیاد فچ بزنه
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductsByID = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}`);
        console.log(res.data);
        setProduct(res.data.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    if (id) {
      fetchProductsByID();
    }
  }, [id]);
  if (!product) {
    return <p>Loading...</p>;
  }
  const formattedPrice = product.price.toLocaleString();

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  return (
    <>
      <Layout>
        <div className="flex p-4 mt-10">
          <div>
            <img
              className="w-64 rounded"
              src={`http://localhost:8000/images/products/images/${product.images[0]}`}
            />
          </div>
          <div className="w-[40rem]">
            <h1 className="font-semibold text-gray-700 text-xl mb-6">
              {product.name}
            </h1>
            <p>category</p>
            <p>subcategory</p>
            <div className="mb-6">
              <span className="font-semibold text-gray-700 ">قیمت :</span>
              <span>{formattedPrice} تومان</span>
            </div>
            <div className="mb-6">
              <span className="font-semibold text-gray-700">
                درباره ی محصول:
              </span>
              <span className="mb-6"> {product.description}</span>
            </div>
          </div>
        </div>
        <div className="p-4 mr-20 flex gap-4">
          <input
            type="number"
            className="w-24 border"
            value={quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setQuantity(value >= 1 ? value : 1);
            }}
          />
          <button
            className="bg-green-500 rounded p-2"
            onClick={incrementQuantity}
          >
            <div className="flex gap-3">
              افزودن به سبد خرید{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                viewBox="0 0 512 512"
                className="fill-white"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
              </svg>
            </div>
          </button>
        </div>
      </Layout>
    </>
  );
};
export default ProductPage;
