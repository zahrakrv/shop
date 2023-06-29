import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './api/context/GlobalContext';
import Layout from '@/layout/layout';
import HeaderSite from '@/components/header';
import Image from 'next/image';
import emptyCart from '../../public/empty-cart.png';
import Link from 'next/link';
import ModalDelCart from '@/components/modals/ModalDelCart';

const ShoppingCart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { products, cartItems, setCartItems, fetchProductsCartItems } =
    useContext(GlobalContext);
  const [quantity, setQuantity] = useState(0);
  // console.log(localStorage);

  useEffect(() => {
    const savedCartItems =
      JSON.parse(localStorage?.getItem('cartItems') as string) || [];
    if (savedCartItems) {
      fetchProductsCartItems(savedCartItems)
        .then((data) => {
          console.log(data.cartItems);
          // console.log(data.cartItems[0].product.name);
          // console.log(data.cartItems[0].product._id);
          // console.log(data.cartItems[0].price);
          // console.log(data.cartItems[0].quantity);
          setCartItems(data.cartItems);
          // console.log(cartItems);
          console.log('localstorage found');
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setCartItems([]);
        });
    } else {
      localStorage.setItem('cartItems', JSON.stringify([]));
      console.log('localstorage not found');
    }
  }, []);
  // const addToCart = (product, price, quantity, image) => {
  //   const cartItem = {
  //     product: product,
  //     price: price,
  //     quantity: quantity,
  //     image: image,
  //   };

  //   const existingItem = cartItems.find(
  //     (item) => item.product.name === product.name
  //   );
  //   if (existingItem) {
  //     const updatedCartItems = cartItems.map((item) => {
  //       if (item.product.name === product.name) {
  //         return {
  //           ...item,
  //           quantity: item.quantity + quantity,
  //         };
  //       }
  //       return item;
  //     });

  //     setCartItems(() => {
  //       localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  //       return updatedCartItems;
  //     });
  //   } else {
  //     setCartItems((prevCartItems) => {
  //       const prevCart = [...prevCartItems, cartItem];

  //       localStorage.setItem('cartItems', JSON.stringify(prevCart));
  //       return prevCart;
  //     });
  //   }
  // };

  // const removeFromCart = (productId) => {
  //   setCartItems((prevCartItems) =>
  //     prevCartItems.filter((item) => item.product._id !== productId)
  //   );
  // };
  console.log(cartItems);

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.product._id !== productId
    );

    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cartItems) {
      totalPrice += item.price * item.quantity;
    }
    const formatedTotalPrice = Intl.NumberFormat('fa-IR').format(totalPrice);
    return formatedTotalPrice;
  };

  ///افزایش تعداد کالا
  // const incrementCartItem = (productId) => {
  //   const existingItem = cartItems.find(
  //     (item) => item.product._id === productId
  //   );

  //   if (existingItem.quantity < data.cartItems[0].quantity) {
  //     const updatedCartItems = cartItems.map((item) => {
  //       if (item.product._id === productId) {
  //         return {
  //           ...item,
  //           quantity: item.quantity + 1,
  //         };
  //       }
  //       return item;
  //     });

  //     setCartItems(() => {
  //       localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  //       return updatedCartItems;
  //     });
  //   }
  // };
  const incrementCartItem = (productId) => {
    const existingItem = cartItems.find(
      (item) => item.product._id === productId
    );

    const updatedCartItems = cartItems.map((item) => {
      if (item.product._id === productId) {
        return {
          ...item,
          quantity:
            item.quantity < item.product.quantity
              ? item.quantity + 1
              : item.quantity,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  ///کاهش تعداد کالا
  const decrementCartItem = (productId) => {
    const existingItem = cartItems.find(
      (item) => item.product._id === productId
    );

    if (existingItem.quantity === 0) {
      removeFromCart(productId);
    } else if (existingItem.quantity > 0) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.product._id === productId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });

      setCartItems(() => {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return updatedCartItems;
      });
    }
  };

  const handleFinalizeCart = () => {
    // Handle the logic to finalize the shopping cart
  };
  console.log(cartItems);
  return (
    <>
      <Layout>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center gap-4 mt-20">
            <Image src={emptyCart} alt="express" height={80} width={176} />
            <p>سبد خرید شما خالی است!</p>
            <p>برای مشاهده ی محصولات به صفحه ی اصلی مراجعه نمایید</p>
          </div>
        ) : (
          <>
            <h1 className="hel mt-10 text-2xl mb-10">سبد خرید شما</h1>
            <div className="kol flex justify-between items-center p-5 gap-6">
              <div className="firs flex flex-col justify-between self-start w-2/3 border border-gray-200 rounded-xl p-5">
                {cartItems &&
                  cartItems?.map((item) => {
                    // console.log(item);

                    return (
                      <div
                        className="flex justify-between items-center mb-10"
                        key={item.product._id}
                      >
                        <div className="flex justify-between items-center gap-12">
                          {/* /////مشخصات کالا */}
                          <div className="flex justify-between">
                            <Link href={`/products/${item.product._id}`}>
                              <div className="ml-4">
                                <Image
                                  src={`http://localhost:8000/images/products/images/${item.product.images[0]}`}
                                  alt={item.product.name}
                                  width={200}
                                  height={200}
                                />
                              </div>
                            </Link>
                            <div className="flex items-center gap-6">
                              <h2>{item.product.name}</h2>
                              <div className="flex gap-4 items-center">
                                <p> تعداد: </p>
                                <div className="flex gap-2">
                                  <button
                                    className="text-white-500 text-xl rounded px-2 bg-red-500"
                                    onClick={() =>
                                      decrementCartItem(item.product._id)
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="px-3">
                                    {Intl.NumberFormat('fa-IR').format(
                                      item.quantity
                                    )}
                                  </span>
                                  <button
                                    className="text-white-500 text-xl rounded px-2 bg-red-500"
                                    onClick={() =>
                                      incrementCartItem(item.product._id)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  className="bg-red-500 text-white rounded p-2"
                                  // onClick={() =>
                                  // removeFromCart(item.product._id)
                                  // }
                                  onClick={() =>
                                    setIsModalOpen(item.product._id)
                                  }
                                >
                                  حذف
                                </button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <span>قیمت واحد:</span>
                            <span>
                              {Intl.NumberFormat('fa-IR').format(item.price)}{' '}
                              تومان
                            </span>
                            <br />
                            <span>قیمت نهایی:</span>
                            <span>
                              {Intl.NumberFormat('fa-IR').format(
                                item.price * item.quantity
                              )}{' '}
                              تومان
                            </span>
                          </div>
                          <hr className="leading-tight"></hr>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="sec flex flex-col justify-between gap-4 self-end w-1/3 border border-gray-200 rounded-xl p-5">
                <h3>جزئیات پرداخت </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <span>مبلغ کل:</span>
                    <span> {calculateTotalPrice()} تومان</span>
                  </div>
                  <div className="flex justify-between ">
                    <span>هزینه ارسال:</span>
                    <span>محاسبه نشده</span>
                  </div>
                  <div className="flex justify-between">
                    <span>مبلغ قابل پرداخت:</span>
                    <span>{calculateTotalPrice()} تومان</span>
                  </div>
                  <Link href="/information">
                    <button
                      className="bg-green-500 p-2 w-full text-white rounded"
                      onClick={handleFinalizeCart}
                    >
                      پرداخت و خرید
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
        {/* ////////////table */}
        {/* {cartItems.length === 0 ? (
          <div className="flex flex-col items-center gap-4 mt-20">
            <Image src={emptyCart} alt="express" height={80} width={176} />
            <p>سبد خرید شما خالی است!</p>
            <p>برای مشاهده ی محصولات به صفحه ی اصلی مراجعه نمایید</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-between">
            <table className="mt-10 bg-white p-4 border rounded">
              <thead>
                <tr>
                  <th className="p-6 shadow">نام کالا</th>
                  <th className="p-6 shadow">قیمت واحد</th>
                  <th className="p-6 shadow">تعداد</th>
                  <th className="p-6 shadow">قیمت نهایی</th>
                  <th className="p-6 shadow"> </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: any) => (
                  <tr key={item.product.name}>
                    <td className="p-3 shadow">{item.product.name}</td>
                    <td className="p-3 shadow">
                      {Intl.NumberFormat('fa-IR').format(item.product.price)}
                    </td>
                    <td className="p-3 shadow">
                      {Intl.NumberFormat('fa-IR').format(item.quantity)}
                    </td>
                    <td className="p-3 shadow">
                      {Intl.NumberFormat('fa-IR').format(
                        item.product.price * item.quantity
                      )}
                    </td>
                    <td className="p-3 shadow">
                      <button
                        className="bg-red-500 text-white rounded p-2"
                        onClick={() => removeFromCart(item.product.name)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-10 self-start">
              مبلغ قابل پرداخت: {calculateTotalPrice()}
            </p>
            <button
              className="bg-green-500 p-2 text-white rounded"
              onClick={handleFinalizeCart}
            >
              نهایی کردن سبد خرید
            </button>
          </div>
        )} */}
        {isModalOpen && (
          <ModalDelCart
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            removeFromCart={removeFromCart}
            // id={item.product._id}
          />
        )}
      </Layout>
    </>
  );
};

export default ShoppingCart;
