import React, { useState, useContext, useEffect, useMemo } from 'react';
import { GlobalContext } from '../../pages/api/context/GlobalContext';
import { TablePagination } from '@mui/material';
import Button from './../../kit/Button';
import { request } from '@/utils/request';
import { all } from 'axios';
import CheckingOrderModal from '../modals/CheckingOrderModal';

const TableOrders = () => {
  ////for modal
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalUserName, setModalUserName] = useState([]);

  // const [selectedOrderId, setSelectedOrderId] = useState(null);
  // const handleOrderClick = (orderId) => {
  //   setSelectedOrderId(orderId);
  //   setIsOpen(true);
  // };
  // const onCloseModal = () => {
  //   setSelectedOrderId(null);
  //   setIsOpen(false);
  // };
  ////radio button
  const [value, setValue] = useState('all');
  // const [orders, setOrders] = useState<Order[]>([]);

  // const [orders, setOrders] = useState([]);
  const { fetchOrders } = useContext(GlobalContext);

  ////about pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalPage, setTotalPage] = useState();
  const [allOrders, setAllOrders] = useState();
  const [userName, setUserName] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState();
  ////
  const [totalOrders, setTotalOrders] = useState([]);
  ////////
  const [isChange, setIsChange] = useState(false);

  ////about sorting
  const [sortOrder, setSortOrder] = useState(true);
  const [isRotated, setIsRotated] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchOrders(
          page + 1,
          rowsPerPage,
          sortOrder,
          deliveryStatus
        );
        // console.log(productsData);
        // console.log(productsData);
        // console.log(productsData.total_pages);
        // console.log(productsData.data.total);
        console.log(productsData.data.total);
        setTotalPage(productsData.total_pages);
        setTotalOrders(productsData.data.data.orders);
        // setProducts(productsData.data.products);
        setAllOrders(productsData.data.total);
        // const OrdersFilter = productsData.data.data.orders.
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
  }, [sortOrder, rowsPerPage, page, fetchOrders, deliveryStatus, isChange]);
  // console.log(totalOrders);

  useEffect(() => {
    try {
      const getUser = request
        .get(`/users`)
        .then((res) => setUserName(res.data.data.users));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  ///////modal
  const handleId = (id) => {
    const filterTotalOrders = totalOrders.filter((order) => order._id === id);

    setModalData(filterTotalOrders[0]);
  };

  // const handleIdUser = (id) => {
  //   const filterUserName = userName.filter((order) => order._id === id);

  //   setModalUserNam(filterUserName[0]);
  // };
  //////وضضعیت تحویل
  // console.log(totalOrders);
  // const OrdersFilter = totalOrders.filter((order) => {
  //   // console.log(order.deliveryStatus);
  //   if (value === 'waiting') {
  //     return order.deliveryStatus === false;
  //   } else if (value === 'done') {
  //     return order.deliveryStatus === true;
  //   } else {
  //     return true;
  //   }
  // });

  ////how to show date of order
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('fa-IR');
    return formattedDate;
  };

  ///to show first name and last name of user
  // const formatUserName=(user:string)=>{
  //   return `${user.firstName} ${user.lastName}`;
  // }
  //////////////pagination
  interface paginationProps {
    event: React.MouseEvent<HTMLButtonElement> | null;
    newPage: number;
  }
  interface paginationRowsProps {
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  }

  const handleChangePage = (event, newPage) => {
    // console.log(newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 4));
    setPage(0);
  };
  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  ////////sort
  // const handleSort = () => {
  //   const sortedProducts = [...products];

  //   if (sortOrder === 'asc') {
  //     sortedProducts.sort((a, b) => a.price - b.price);
  //     setSortOrder('desc');
  //   } else {
  //     sortedProducts.sort((a, b) => b.price - a.price);
  //     setSortOrder('asc');
  //   }

  //   setProducts(sortedProducts);
  // };

  return (
    <div className="flex-col justify-center">
      <div className="flex justify-start mb-12">
        {/* <div className="flex gap-4 mr-16 mt-6">
          <input type="radio" id="html" name="order_filter" value="done" />
          سفارش های تحویل شده
          <input type="radio" id="html" name="order_filter" value="waiting" />
          سفارش های در انتظار ارسال
          <input type="radio" id="html" name="order_filter" value="all" />
          همه ی سفارش ها
        </div> */}
        <div className="flex flex-row gap-4 mr-16 mt-6">
          <label className="bg-teal-400 rounded-lg p-2">
            <input
              type="radio"
              value="all"
              checked={value === 'all'}
              onChange={(e) => {
                setValue(e.target.value);
                e.target.value === 'all'
                  ? setDeliveryStatus(undefined)
                  : setDeliveryStatus((prev) => prev);
              }}
              className="mr-2"
            />
            همه
          </label>
          <label className="bg-teal-400 rounded-lg p-2">
            <input
              type="radio"
              value="waiting"
              checked={value === 'waiting'}
              onChange={(e) => {
                setValue(e.target.value);
                e.target.value === 'waiting'
                  ? setDeliveryStatus(false)
                  : setDeliveryStatus((prev) => prev);
              }}
              className="mr-2"
            />
            در انتظار تحویل
          </label>
          <label className="bg-teal-400 rounded-lg p-2">
            <input
              type="radio"
              value="done"
              checked={value === 'done'}
              onChange={(e) => {
                setValue(e.target.value);
                e.target.value === 'done'
                  ? setDeliveryStatus(true)
                  : setDeliveryStatus((prev) => prev);
              }}
              className="mr-2"
            />
            تحویل داده شده
          </label>
        </div>
      </div>
      <table className=" mr-20 mt-12 bg-white rounded-xl p-4 border items-center">
        <thead className="mx-auto border-gray-400 border-b">
          <tr>
            <th
              className="p-6 shadow"
              // onClick={handleSort}
            >
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setIsRotated(!isRotated);
                  setSortOrder((prev) => !prev);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 320 512"
                  className={` ${isRotated ? 'rotate-180' : ''}`}
                >
                  <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                </svg>
                نام کاربر
              </div>
            </th>
            <th
              className="flex items-center gap-2 p-6 shadow cursor-pointer"
              // onClick={handleSort}
            >
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsRotated(!isRotated)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 320 512"
                  className={`${isRotated ? 'rotate-180' : ''}`}
                >
                  <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                </svg>
                مجموع مبلغ
              </div>
            </th>
            <th
              className="p-6 shadow"
              // onClick={handleSort}
            >
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsRotated(!isRotated)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 320 512"
                  className={`${isRotated ? 'rotate-180' : ''}`}
                >
                  <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                </svg>
                زمان ثبت سفارش
              </div>
            </th>
            <th>وضعیت سفارش</th>
            <th>بررسی سفارش</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {/* {console.log('sdfd', userName)} */}
          {totalOrders?.map((item: any) => (
            <tr key={item.id}>
              <td className="p-3 shadow">
                {userName?.map((i) => {
                  return i?._id === item?.user && <span>{i?.username}</span>;
                })}
              </td>
              <td className="p-3 shadow">{item.totalPrice}</td>
              <td className="p-3 shadow">{formatDate(item.createdAt)}</td>
              <td className="p-6 shadow">
                {item.deliveryStatus ? 'تحویل داده شده' : 'در انتظار تحویل'}
              </td>
              <td className="p-6 shadow">
                <button
                  onClick={() => {
                    handleId(item._id);
                    const userNameById = userName?.find((i) => {
                      return i?._id === item?.user && i?.username;
                    });
                    setModalUserName(userNameById);
                    setIsOpen(true);
                  }}
                >
                  بررسی سفارش ها
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* ////modal */}
      <CheckingOrderModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        totalOrders={totalOrders}
        userName={userName}
        modalUserName={modalUserName}
        formatDate={formatDate}
        modalData={modalData}
        setIsChange={setIsChange}
        isChange={isChange}
        // selectedOrderId={selectedOrderId}
      />
      {/* ///////pagination */}
      <TablePagination
        dir="ltr"
        className="mr-16 mt-12"
        component="div"
        count={allOrders}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[4, 8, 12]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TableOrders;
