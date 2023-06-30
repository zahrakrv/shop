import Image from 'next/image';
import shaparak from '../../public/shaparak.png';
import shp from '../../public/shp.png';
import sadad from '../../public/sadad.jpg';
import { useContext, useState } from 'react';
import { request } from '@/utils/request';
import Cookies from 'universal-cookie';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import MyDialog from '@/components/modals/modalSuccess';
import UnsuccessModal from '@/components/modals/modalUnSuccess';
import { GlobalContext } from './api/context/GlobalContext';
import {FORM} from '@/redux/slice/cart'

const PaymentPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { cartItems, setCartItems } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const deliveryDate = useSelector((state) => state.deliveryDate);

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
    // localStorage.removeItem('cartItems');
    localStorage.setItem('cartItems', JSON.stringify([]));
    setCartItems([]);
    dispatch(FORM({ type: 'RESET_CART' }));
    // dispatch({ type: 'SET_DELIVERY_DATE', payload: null });
    ///modal
    setIsOpen(true);
  };
  const handleModalCancel = () => {
    setIsOpenModal(true);
  };
  return (
    <div className="p-3">
      {/* <div className="container flex justify-center items-center"> */}
      <div className="bg-[#f2f2f2] h-32 w-full">
        <div className="flex justify-between">
          <Image
            className=""
            src={shp}
            alt="shaparak"
            height={80}
            width={100}
          />
          <Image className="" src={sadad} alt="sadad" height={80} width={100} />
        </div>
        <div className="bg-[#ffcb04] h-8 mt-2"></div>
      </div>
      {/* absolute top-0 mr-8 */}
      <div className="flex justify-between">
        <div>
          <Image
            className=""
            src={shaparak}
            alt="shaparak"
            height={1000}
            width={650}
          />
        </div>
        <div className="w-1/3">
          <div className="flex flex-col items-center justify-center gap-10 my-12 border border-gray-300 rounded">
            <button
              className="bg-green-500 px-20 rounded py-2 text-white w-2/3 mt-4"
              // onClick={() => handleFormSubmit(formData)}
              onClick={() => handlePayment()}
            >
              پرداخت
            </button>
            <button
              className="bg-red-500 px-14 rounded py-2 text-white w-1/3 mb-4"
              onClick={handleModalCancel}
            >
              انصراف
            </button>
          </div>
          <div className="border border-gray-300 rounded flex flex-col gap-10 p-4">
            {/* <div>
          <span>مبلغ تراکنش :</span>
          <span></span>
        </div> */}
            <div className="mt-3 flex justify-between items-center">
              <span>شماره پذیرش:</span>
              <span>1223456677</span>
            </div>
            <div className=" flex justify-between items-center">
              <span>شماره سفارش:</span>
              <span>454545677334</span>
            </div>
            <div className="mb-3 flex justify-between items-center">
              <span>آدرس وب :</span>
              <span>megamag.ir</span>
            </div>
          </div>
        </div>
      </div>
      <MyDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <UnsuccessModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />

      {/* </div> */}
    </div>
  );
};

export default PaymentPage;
