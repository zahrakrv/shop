import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

const CheckingOrderModal = ({
  isOpen,
  onClose,
  totalOrders,
  userName,
  formatDate,
  modalData,
  modalUserName,
  setIsChange,
  isChange,
  // selectedOrderId,
}) => {
  const [deliveryStatus, setDeliveryStatus] = useState(false);
  useEffect(() => {
    if (modalData.deliveryStatus) {
      setDeliveryStatus(true);
    } else {
      setDeliveryStatus(false);
    }
    // console.log(modalUserName);
    console.log(modalData);
    // console.log(modalData?.products[0].product.name);
  }, [modalData.deliveryStatus]);

  // const getSelectedOrder = (orderId) => {
  //   return totalOrders.find((order) => order.id === orderId);
  // };
  // const selectedOrder = getSelectedOrder(selectedOrderId);
  // console.log(modalData);

  // const handleClick = async (id) => {
  //   if (!deliveryStatus) {
  //     try {
  //       const response = await axios.patch(
  //         `http://localhost:8000/api/orders/${id}`
  //         // {
  //         //   method: 'PUT',
  //         //   body: JSON.stringify({ deliveryStatus: true }),
  //         // }
  //       );
  //       if (response.ok) {
  //         setDeliveryStatus(true);
  //         modalData.deliveryStatus = true;
  //         products: modalData.products.map((item) => {
  //           return {
  //             product: item.product._id,
  //             _id: item._id,
  //             count: item.count,
  //           };
  //         });
  //       } else {
  //         console.error('خطا در درخواست');
  //       }
  //     } catch (error) {
  //       console.error('خطا در ارتباط با سرور', error);
  //     }
  //   }
  // };

  const handleClick = (id) => {
    const deliveryStatus = 'true';
    const data = {
      deliveryStatus: deliveryStatus,
      products: modalData.products.map((item) => {
        return {
          product: item.product._id,
          // _id: item._id,
          count: item.count,
        };
      }),
    };
    axios.patch(`http://localhost:8000/api/orders/${id}`, data);
    // setDeliveryStatus(!deliveryStatus);
    setIsChange(!isChange);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white">
            <div>
              <Dialog.Title>
                <div className="flex justify-between p-2">
                  <span className="font-semibold"> نمایش سفارش </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    className="fill-teal-500"
                    onClick={onClose}
                  >
                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                  </svg>
                </div>
              </Dialog.Title>
            </div>
            {/* <Dialog.Description>
              This will permanently deactivate your account
            </Dialog.Description> */}
            {/* {console.log(modalData)}; */}
            {/* {totalOrders?.map((order) => { */}
            {/* <div key={order.id}> */}
            <div className="p-3 mb-3">
              {/* {userName?.map((i) => { */}
              {/* // console.log(order);
                    // console.log(i); */}
              {/* return ( */}

              {/* <div key={i.id}> */}
              <div className="mb-2">
                <span>نام مشتری:</span>
                <span>{modalUserName?.username}</span>
              </div>
              <div className="mb-2">
                <span> آدرس: </span>
                <span> {modalUserName.address}</span>
              </div>
              <div className="mb-2">
                <span> تلفن: </span>
                <span> {modalUserName.phoneNumber} </span>
              </div>
              <div className="mb-2">
                <span> زمان تحویل: </span>
                <span> {formatDate(modalData.deliveryDate)} </span>
              </div>
              <div className="mb-2">
                <span> زمان سفارش: </span>
                <span> {formatDate(modalData.createdAt)} </span>
              </div>
              {/* </div> */}
              {/* ); */}
              {/* })} */}
            </div>
            <div className="p-3 mx-auto ">
              <table className="rounded-xl border w-full text-center">
                <thead>
                  <tr>
                    <th className="shadow py-2"> نام کالا </th>
                    <th className="shadow py-2"> قیمت </th>
                    <th className="shadow py-2"> تعداد</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                    <td className="shadow py-2">
                      {/* {modalData.length > 0 */}
                  {/* ?  */}
                  {/* {modalData?.products[0].product.name} */}
                  {/* : null} */}
                  {/* </td>
                    <td className="shadow py-2">{modalData.totalPrice}</td> */}
                  {/* <td className="shadow py-2"> */}
                  {/* {modalData.length > 0 ?  */}
                  {/* {modalData.products[0].count} */}
                  {/* : null} */}
                  {/* </td> */}
                  {/* </tr> */}
                  {modalData?.products?.map((product, index) => (
                    <tr key={index}>
                      <td className="shadow py-2">{product.product.name}</td>
                      <td className="shadow py-2">{product.product.price}</td>
                      <td className="shadow py-2">{product.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mb-3">
              <button
                className="bg-teal-500 text-white rounded p-2 mx-auto"
                onClick={() => {
                  handleClick(modalData._id);
                }}
              >
                {isChange ? 'تحویل داده شده' : 'در انتظار تحویل'}
              </button>
            </div>
            {/* <button onClick={onClose}>Deactivate</button>
            <button onClick={onClose}>Cancel</button> */}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default CheckingOrderModal;
