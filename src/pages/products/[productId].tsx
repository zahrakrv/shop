import { useRouter } from 'next/router';
import Layout from '@/layout/layout';
import { GlobalContext } from '../../pages/api/context/GlobalContext';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { request } from '@/utils/request';
interface ProductType {
  name: string;
  price: number;
  quantity: number;
  description: string;
  images: string[];
  category: {
    name: string;
  };
  subcategory: {
    name: string;
  };
}

const ProductPage = () => {
  const router = useRouter();
  //   const { id } = router.query;
  const { query } = router;
  const id = query.productId;
  const [quantity, setQuantity] = useState(1);
  ///null برای انکه اولش هیچی نباشه و با یوزافکت بیاد فچ بزنه
  const [product, setProduct] = useState<ProductType | null>(null);
  const [currentImage, setCurrentImage] = useState(
    'http://localhost:8000/default-image.jpg'
  );
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [isImageLoaded, setImageLoaded] = useState(false);

  const { addToCart } = useContext(GlobalContext);

  useEffect(() => {
    const fetchProductsByID = async () => {
      try {
        const res = await request.get(`/products/${id}`);
        console.log(res.data);
        setProduct(res.data.data.product);
        setCategory(res.data.data.product.category.name);
        setSubCategory(res.data.data.product.subcategory.name);
        // console.log(res.data.data.product.category.name);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    if (id) {
      fetchProductsByID();
    }
  }, [id]);
  useEffect(() => {
    if (product && product.images.length > 0 && !isImageLoaded) {
      setCurrentImage(
        `http://localhost:8000/images/products/images/${product.images[0]}`
      );
      setImageLoaded(true);
    }
  }, [product, isImageLoaded]);
  if (!product) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }
  // const formattedPrice = product.price.toLocaleString();
  const formattedPrice = Intl.NumberFormat('fa-IR').format(product.price);
  const formattedQuant = Intl.NumberFormat('fa-IR').format(product.quantity);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      return newQuantity <= product.quantity ? newQuantity : product.quantity;
    });
  };
  const addToCartDisabled = product.quantity === 0;

  const handleClickThumbnail = (image) => {
    setCurrentImage(`http://localhost:8000/images/products/images/${image}`);
  };
  return (
    <>
      <Layout>
        <div className="flex p-4 gap-6 mt-10">
          <div>
            <Image
              src={currentImage}
              // src={`http://localhost:8000/images/products/images/${product.images[0]}`}
              alt=""
              width={256}
              height={384}
            />
            <div className="flex justify-center mt-6">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="w-20 h-20 mr-2"
                  onClick={() => handleClickThumbnail(image)}
                >
                  <Image
                    src={`http://localhost:8000/images/products/images/${image}`}
                    alt=""
                    width={80}
                    height={80}
                  />
                </div>
              ))}
            </div>
            {/* <img
              className="w-64 rounded"
              src={`http://localhost:8000/images/products/images/${product.images[0]}`}
            /> */}
          </div>
          <div className="w-[40rem] mr-6">
            <div className="flex items-center gap-4 mb-6 text-gray-500">
              <span>{category}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
                className="fill-gray-500"
              >
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
              <span>{subCategory}</span>
            </div>
            <h1 className="font-semibold text-gray-700 text-xl mb-6">
              {product.name}
            </h1>
            <div className="mb-6">
              <span className="font-semibold text-gray-700 ">قیمت :</span>
              <span>{formattedPrice} تومان</span>
            </div>
            <div className="mb-6">
              <span className="font-semibold text-gray-700">
                موجودی این محصول:
              </span>
              <span className="mb-6"> {formattedQuant} عدد</span>
            </div>

            <div>
              <span className="font-semibold text-gray-700 mb-6">
                درباره ی محصول:
              </span>
              <div
                className="mb-6 mt-6"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              {/* <span className="mb-6"> {product.description}</span> */}
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="p-4 mr-20 flex gap-4">
          <input
            type="number"
            className="w-24 border"
            value={quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setQuantity(value >= 1 ? value : 1);
            }}
            min="1"
            max={product.quantity}
          />
          <button
            className={`bg-green-500 rounded p-2 ${
              addToCartDisabled ? 'bg-gray-500 cursor-not-allowed' : ''
            }`}
            onClick={() =>
              addToCart(product, product.price, quantity, product._id)
            }
            disabled={addToCartDisabled}
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
