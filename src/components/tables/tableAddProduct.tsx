import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../pages/api/context/GlobalContext';
import { TablePagination } from '@mui/material';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Button from './../../kit/Button';

const TableAddProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();

  const { fetchCategories, fetchProducts } = useContext(GlobalContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalPage, setTotalPage] = useState();
  const [totalProducts, setTotalProducts] = useState();
  const cookies = new Cookies();
  const admintoken = cookies.get('adminToken');
  console.log(products);

  // fetchCategories().then((res) => {
  //   console.log(res);
  // });

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts(page + 1, rowsPerPage);
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
  }, [fetchProducts, rowsPerPage, page, totalProducts]);
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

  return (
    <>
      <div className="flex justify-start mb-12">
        <Button>افزودن کالا</Button>
      </div>
      <table className="mr-20 bg-white p-4 border rounded">
        <thead className="mx-auto border-gray-400 border-b">
          <tr>
            <th className="p-6 shadow">تصویر</th>
            <th className="p-6 shadow">نام کالا</th>
            <th className="p-6 shadow">دسته بندی</th>
            <th className="p-6 shadow">حذف و ویرایش</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {/* {(rowsPerPage > 0
            ? categories.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : categories
          ).map((category: any) =>
           ( */}
          {/* await axios
              .get(`http://localhost:8000/api/categories/${product.category}`, {
                headers: { Authorization: `Bearer ${admintoken}` },
              })
              .then((res) => {
                setCategories(res.data.data.category.name);
                // console.log(res.data);
              }); */}
          {products.map(async (product: any) => {
            return (
              <tr key={product.id}>
                <td className="p-3 shadow">
                  <img
                    className="w-24 rounded"
                    src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                  />
                </td>
                <td className="p-3 shadow">{product.name}</td>
                {/* <td className="p-3 shadow">{categories}</td> */}

                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    className="fill-green"
                  >
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                  </svg>
                </td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                </td>
              </tr>
            );
          })}
          {/* {emptyRows > 0 && (
            <tr style={{ height: 53 * emptyRows }}>
              <td colSpan={5} />
            </tr>
          )} */}
        </tbody>
      </table>
      {/* ///////pagination */}
      <TablePagination
        dir="ltr"
        className="absolute right-1/2 mt-12"
        component="div"
        count={totalProducts}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[4, 8, 12]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableAddProduct;
