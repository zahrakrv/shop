import Image from 'next/image';
import shaparak from '../../public/shaparak.png';
import shp from '../../public/shp.png';
import { GlobalContext } from './api/context/GlobalContext';
import { useContext, useState } from 'react';
import { request } from '@/utils/request';
import Cookies from 'universal-cookie';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';

const PaymentPage = () => {
  const cartState = useSelector((state) => state.cartState);
  const cookie = new Cookies();
  const userID = cookie.get('id');
  // const { handleFormSubmit } = useContext(GlobalContext);
  const [formData, setFormData] = useState({});
  const updateFormData = (newData) => {
    setFormData(newData);
  };
  console.log(formData);
  const postOrder = async (data) => {
    return await request.post('/orders', data);
  };
  const mutationOrder = useMutation({
    mutationFn: (data) => postOrder(data),
    onSuccess: () => {
      console.log('added');
    },
  });
  const handlePayment = () => {
    const productCart = JSON.parse(localStorage.getItem('cartItems'));
    const orderArr = productCart.map((item) => {
      return {
        product: item.product._id,
        count: item.quantity,
      };
    });
    console.log(userID);
    const ordersData = {
      user: userID,
      deliveryDate: cartState.deliveryDate,
      products: orderArr,
      deliveryStatus: false,
    };
    // console.log(data);
    // console.log(productCart);
    mutationOrder.mutate(ordersData);
    console.log(ordersData);
  };
  return (
    <>
      {/* <div className="container flex justify-center items-center"> */}
      <div className="bg-[#f2f2f2] h-40 w-full">
        <Image className="" src={shp} alt="shaparak" height={80} width={100} />
      </div>
      {/* absolute top-0 mr-8 */}
      <Image
        className=""
        src={shaparak}
        alt="shaparak"
        height={1000}
        width={650}
      />
      <button
        className="bg-green-500 z-40 absolute top-52 left-20 px-20 rounded py-2 text-white"
        // onClick={() => handleFormSubmit(formData)}
        onClick={() => handlePayment()}
      >
        پرداخت
      </button>
      <button className="bg-red-500 z-40 absolute top-72 left-28 px-14 rounded py-2 text-white">
        انصراف
      </button>
      <div className="absolute border border-gray-300 rounded bottom-14 left-0">
        <div>
          <span>مبلغ تراکنش :</span>
          <span></span>
        </div>
        <div>
          <span>شماره پذیرش:</span>
          <span>1223456677</span>
        </div>
        <div>
          <span>شماره سفارش:</span>
          <span>454545677334</span>
        </div>
        <div>
          <span>آدرس وب :</span>
          <span>megamag.ir</span>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default PaymentPage;
