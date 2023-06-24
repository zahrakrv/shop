import { useContext } from 'react';
import { GlobalContext } from './api/context/GlobalContext';
import Layout from '@/layout/layout';
import HeaderSite from '@/components/header';
import Image from 'next/image';
import emptyCart from '../../public/empty-cart.png';

const ShoppingCart = () => {
  const { cartItems, removeFromCart } = useContext(GlobalContext);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cartItems) {
      totalPrice += item.product.price * item.quantity;
    }
    const formatedTotalPrice = Intl.NumberFormat('fa-IR').format(totalPrice);
    return formatedTotalPrice;
  };
  const handleFinalizeCart = () => {
    // Handle the logic to finalize the shopping cart
  };
  return (
    <>
      <Layout>
        {/* <div className="bg-red-300 mt-20">
        dddd
        {cartItems.map((item) => {
          return (
            <div className="flex" key={item.product.name}>
              <div className="flex">
                <div>
                  <h1 className="hel mt-10 text-xl">سبد خرید شما</h1>
                  <h2>{item.product.name}</h2>
                  <div>
                    <p> تعداد: </p>

                    {Intl.NumberFormat('fa-IR').format(item.quantity)}

                    <button
                      className="bg-red-500 text-white rounded p-2"
                      onClick={removeFromCart}
                    >
                      حذف
                    </button>
                  </div>
                </div>
                <div>
                  <span>قیمت واحد:</span>
                  <span>
                    {Intl.NumberFormat('fa-IR').format(item.product.price)}{' '}
                    تومان
                  </span>
                  <span>قیمت نهایی:</span>
                  <span>
                    {Intl.NumberFormat('fa-IR').format(
                      item.product.price * item.quantity
                    )}
                  </span>
                </div>
              </div>
              <div>
                <h3>جزئیات پرداخت </h3>
                <div className="flex">
                  <span>مبلغ کل: {calculateTotalPrice()} تومان</span>
                  <span>هزینه ارسال</span>
                </div>
                <div className="flex">
                  <span>محاسبه نشده</span>
                  <span>مبلغ قابل پرداخت: {calculateTotalPrice()} تومان</span>
                </div>
                <button
                  className="bg-green-500 p-2 w-full text-white rounded"
                  onClick={handleFinalizeCart}
                >
                  پرداخت و خرید
                </button>
              </div>
            </div>
          );
        })}
      </div> */}
        {cartItems.length === 0 ? (
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
        )}
      </Layout>
    </>
  );
};

export default ShoppingCart;
