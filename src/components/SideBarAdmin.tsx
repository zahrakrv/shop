import Link from 'next/link';
import { useRouter } from 'next/router';

import { useContext, useState } from 'react';
import { GlobalContext } from '../pages/api/context/GlobalContext';
import DashboardContent from './allCategories';
import TableAddProduct from './tables/tableAddProduct';
import LayoutAdmin from './../layout/layoutAdmin';

interface SideBarAdminProps {
  sidebar: boolean;
}
const SideBarAdmin = ({ sidebar, setShowTable }: SideBarAdminProps) => {
  const { pathname } = useRouter();
  const { fetchProducts } = useContext(GlobalContext);
  const [categories, setCategories] = useState([]);
  // const [showTable, setShowTable] = useState(false);

  // const handlefetchProducts = async () => {
  //   try {
  //     const categoriesData = await fetchProducts();
  //     setCategories(categoriesData.data.products);
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //   }
  // };
  // const handleShowTable = () => {
  //   setShowTable(true);
  // };
  return (
    <div>
      <div
        className={`absolute right-0 top-0 md:w-64 md:flex ${
          sidebar ? 'block ' : 'hidden'
        } w-64 bg-teal-500 h-screen`}
      >
        <div className="pt-7">
          <ul>
            {/* <li className="flex bg-teal-600 items-center py-2 px-4 rounded mx-2 my-3 mb-12 text-xl font-bold">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="h-6 fill-white"
                >
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>
              <span className="text-white mr-3 font-semibold">
                {' '}
                پنل مدیریت فروشگاه
              </span>
            </li> */}
            {/* //// */}
            <li
              className={`flex bg-teal-600 items-center py-2 px-4 rounded mx-2 my-3 cursor-pointer hover:bg-teal-800 transition hover:text-white font-bold ${
                pathname === '/admins/products' ? 'bg-teal-800' : ''
              } focus:text-white p-2 px-4 rounded`}
              // onClick={() => {
              // handlefetchProducts();
              // setShowTable(true);
              // }}
            >
              <Link href="/admins/products" className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-6 fill-white"
                >
                  <path d="M326.3 218.8c0 20.5-16.7 37.2-37.2 37.2h-70.3v-74.4h70.3c20.5 0 37.2 16.7 37.2 37.2zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-128.1-37.2c0-47.9-38.9-86.8-86.8-86.8H169.2v248h49.6v-74.4h70.3c47.9 0 86.8-38.9 86.8-86.8z" />
                </svg>
                <span className="text-white mr-3 font-semibold"> کالاها </span>
              </Link>
            </li>
            {/* //// */}
            <li
              className={`bg-teal-600 items-center py-2 px-4 rounded mx-2 my-3 cursor-pointer hover:bg-teal-800 transition hover:text-white font-bold ${
                pathname === '/admins/inventory' ? 'bg-teal-800' : ''
              } focus:text-white p-2 px-4 rounded`}
            >
              <Link href="/admins/inventory" className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-6 fill-white"
                >
                  <path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                </svg>
                <span className="text-white mr-3 font-semibold">
                  {' '}
                  موجودی و قیمت
                </span>
              </Link>
            </li>
            {/* /// */}
            <li
              className={`flex bg-teal-600 items-center py-2 px-4 rounded mx-2 my-3 cursor-pointer hover:bg-teal-800 transition hover:text-white font-bold ${
                pathname === '/admins/orders' ? 'bg-teal-800' : ''
              } focus:text-white p-2 px-4 rounded`}
            >
              <Link href="/admins/orders" className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="h-6 fill-white"
                >
                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
                <span className="text-white mr-3 font-semibold">
                  {' '}
                  سفارش ها{' '}
                </span>
              </Link>
            </li>
            {/* <Link href="/"> */}
            <li
              className="flex bg-teal-600 items-center py-2 px-4 rounded mx-2 my-3 cursor-pointer hover:bg-teal-800 transition"
              onClick={() => window.location.replace('/')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="h-6 fill-white"
              >
                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
              </svg>
              <span className="text-white mr-3 font-semibold">
                {' '}
                بازگشت به سایت{' '}
              </span>
            </li>
            {/* </Link> */}
          </ul>
        </div>
      </div>
      {/* <TableAddProduct categories={categories} /> */}
    </div>
  );
};

export default SideBarAdmin;
