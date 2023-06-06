import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../pages/api/context/GlobalContext';
import { TablePagination } from '@mui/material';
import Button from './../../kit/Button';
import axios from 'axios';

const TableInventory = () => {
  const [products, setProducts] = useState([]);
  const { fetchCategories, fetchProducts, fetchSortPrice } =
    useContext(GlobalContext);
  const [page, setPage] = useState(0);

  ////about pagination
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalPage, setTotalPage] = useState();
  const [totalProducts, setTotalProducts] = useState();

  ////about sorting
  const [sortOrder, setSortOrder] = useState(true);
  const [isRotated, setIsRotated] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchSortPrice(
          page + 1,
          rowsPerPage,
          sortOrder
        );
        // console.log(productsData);
        console.log(productsData);
        console.log(productsData.total_pages);
        console.log(productsData.data.total);

        setTotalPage(productsData.total_pages);
        setProducts(productsData.data.products);
        setTotalProducts(productsData.total);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
  }, [sortOrder, rowsPerPage, page, totalProducts]);
  //////////////pagination
  interface paginationProps {
    event: React.MouseEvent<HTMLButtonElement> | null;
    newPage: number;
  }
  interface paginationRowsProps {
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  }

  const handleChangePage = (event, newPage) => {
    console.log(newPage);

    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 4));
    setPage(0);
  };
  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  ////////sort price
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

  // fetchSortPrice(price);
  return (
    <div className="flex-col justify-center">
      <div className="flex justify-start mb-12">
        <Button>افزودن کالا</Button>
      </div>
      <table className=" mr-20 mt-12 bg-white rounded-xl p-4 border rounded items-center">
        <thead className="mx-auto border-gray-400 border-b">
          <tr>
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
                  className={` ${isRotated ? 'rotate-180' : ''}`}
                >
                  <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                </svg>
                نام کالا
              </div>
            </th>
            <th className="flex items-center gap-2 p-6 shadow cursor-pointer">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setIsRotated(!isRotated);
                  setSortOrder((prev) => !prev);
                }}
                // onClick={() => setIsRotated(!isRotated)}
                // onClick={() => setSortOrder((prev) => !prev)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 320 512"
                  className={`${isRotated ? 'rotate-180' : ''}`}
                >
                  <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                </svg>
                قیمت
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
                موجودی
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products.map((item: any) => (
            // console.log(item),
            <tr key={item.id}>
              <td className="p-3 shadow">{item.name}</td>
              <td className="p-3 shadow">{item.price}</td>
              <td className="p-3 shadow">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* ///////pagination */}
      <TablePagination
        dir="ltr"
        className="mr-16 mt-12"
        component="div"
        count={totalProducts}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[4, 8, 12]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TableInventory;
