import { useState, useEffect } from 'react';
import axios from 'axios';

interface Order {
  _id: string;
  user: string;
  products: {
    product: string;
    count: number;
    _id: string;
  }[];
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  username: string;
}

const OrdersPanel = (): JSX.Element => {
  const [value, setValue] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const itemsPerPage = 4;

  //   const fetchOrders = async (): Promise<void> => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/api/orders');
  //       setOrders(response.data.data.orders);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const fetchUsers = async (): Promise<void> => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/api/users', {
  //         headers: {
  //           Authorization: '',
  //         },
  //       });
  //       setUsers(response.data.data.users);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchOrders();
  //     fetchUsers();
  //   }, []);

  const filteredOrders = orders.filter((order) => {
    if (value === 'waiting') {
      return order.deliveryStatus === true;
    } else if (value === 'done') {
      return order.deliveryStatus === false;
    } else {
      return true;
    }
  });

  //   const formatPrice = (price: number): string => {
  //     const formattedPrice = price.toLocaleString();
  //     return formattedPrice;
  //   };

  //   const formatDate = (dateString: string) => {
  //     const date = new Date(dateString);
  //     const formattedDate = date.toLocaleDateString('en-US');
  //     return formattedDate;
  //   };

  //   const maxPages: number = Math.ceil(filteredOrders.length / itemsPerPage);
  //   const indexOfLastItem: number = currentPage * itemsPerPage;
  //   const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  //   const currentData: Order[] = filteredOrders.slice(
  //     indexOfFirstItem,
  //     indexOfLastItem
  //   );

  //   const handleNextPage = (): void => {
  //     setCurrentPage((prev) => prev + 1);
  //   };

  //   const handlePrevPage = (): void => {
  //     setCurrentPage((prev) => prev - 1);
  //   };

  //   const userIdToUsernameMap: { [key: string]: string } = {};
  //   users.forEach((user) => {
  //     userIdToUsernameMap[user._id] = user.username;
  //   });

  return (
    <>
      <div className="mb-16 flex justify-between px-4">
        <h2 className="text-2xl font-bold text-slate-700">مدیریت سفارش‌ها</h2>
        <div className="text-slate-700">
          <div className="flex items-center">
            <input
              type="radio"
              id="all"
              value="all"
              checked={value === 'all'}
              onChange={(e) => setValue(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="all" className="bg-blue-300 rounded-lg p-2">
              همه
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="waiting"
              value="waiting"
              checked={value === 'waiting'}
              onChange={(e) => setValue(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="waiting" className="bg-blue-300 rounded-lg p-2">
              در انتظار تحویل
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="done"
              value="done"
              checked={value === 'done'}
              onChange={(e) => setValue(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="done" className="bg-blue-300 rounded-lg p-2">
              تحویل داده شده
            </label>
          </div>
        </div>
      </div>

      <div className="rounded border border-gray-400 p-2">
        <table className="w-full">
          <thead className="bg-blue-300 text-xl">
            <tr className="text-xl font-bold text-white">
              <th className="py-2 px-4">شماره سفارش</th>
              <th className="py-2 px-4">نام کاربری</th>
              <th className="py-2 px-4">تاریخ سفارش</th>
              <th className="py-2 px-4">مبلغ کل</th>
              <th className="py-2 px-4">وضعیت تحویل</th>
              <th className="py-2 px-4">جزئیات</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((order) => (
              <tr key={order._id} className="text-gray-800">
                <td className="py-2 px-4">{order._id}</td>
                <td className="py-2 px-4">{userIdToUsernameMap[order.user]}</td>
                <td className="py-2 px-4">{formatDate(order.createdAt)}</td>
                <td className="py-2 px-4">{formatPrice(order.totalPrice)}</td>
                <td className="py-2 px-4">
                  {order.deliveryStatus ? 'تحویل داده شده' : 'در انتظار تحویل'}
                </td>
                <td className="py-2 px-4">
                  {/* <CheckOrderModal order={order} /> */}
                  بررسی سفارش ها
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div className="flex justify-between mt-4">
          <button
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            className="bg-blue-300 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            صفحه قبلی
          </button>
          <button
            disabled={currentPage === maxPages}
            onClick={handleNextPage}
            className="bg-blue-300 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            صفحه بعدی
          </button>
        </div> */}
      </div>
    </>
  );
};

export default OrdersPanel;
