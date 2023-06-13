import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../pages/api/context/GlobalContext';
import { ListItem, TablePagination } from '@mui/material';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Button from './../../kit/button';
import AddDataModal from '../modals/AddDatatModal';

const TableAddProduct = () => {
  ////////opening adding modal
  const [isOpenAdding, setIsOpenAdding] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const { fetchCategories, fetchProducts } = useContext(GlobalContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalPage, setTotalPage] = useState();
  const [totalProducts, setTotalProducts] = useState();
  const cookies = new Cookies();
  const admintoken = cookies.get('adminToken');
  // console.log(products);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts(page + 1, rowsPerPage);
        // console.log(productsData);
        // console.log(productsData);
        // console.log(productsData.total_pages);
        // console.log(productsData.data.total);
        // console.log(productsData.data.products);

        setTotalPage(productsData.total_pages);
        setProducts(productsData.data.products);
        setTotalProducts(productsData.total);
        // fetchCategories().then((res) => {
        //   console.log(res);
        // });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
  }, [fetchProducts, rowsPerPage, page]);

  useEffect(() => {
    fetchCategories().then((res) => {
      // console.log(res.data.data.categories);

      setCategories(res.data.data.categories);
    });
  }, []);
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

  /////////delete item
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}`);
      // حذف آیتم از لیست products
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center gap-24 mb-12 mt-5">
        {/* <span className="font-semibold"> جدول کالاها </span> */}
        <button
          className="bg-teal-400 rounded-lg p-2"
          onClick={() => setIsOpenAdding(true)}
        >
          افزودن کالا
        </button>
      </div>
      <table className="mr-20 bg-white p-4 border rounded">
        <thead className="mx-auto border-gray-400 border-b">
          <tr>
            <th className="p-6 shadow">تصویر</th>
            <th className="p-6 shadow">نام کالا</th>
            <th className="p-6 shadow">دسته بندی</th>
            <th className="p-6 shadow"> ویرایش</th>
            <th className="p-6 shadow">حذف </th>
          </tr>
        </thead>
        <tbody className="text-center ">
          {products.map((product: any) => {
            return (
              <tr key={product._id}>
                <td className="p-3 shadow">
                  <img
                    className="w-24 rounded"
                    src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                  />
                </td>
                <td className="p-3 shadow">{product.name}</td>
                <td className="p-3 shadow">
                  {categories.map((item) => {
                    return (
                      product.category === item._id && <span>{item.name}</span>
                    );
                    // console.log(item.name);
                  })}
                </td>

                <td className="p-3 shadow">
                  <button className="cursor-pointer bg-green-500 rounded p-2 text-white">
                    {' '}
                    ویرایش{' '}
                  </button>
                </td>
                <td
                  className="p-3 shadow"
                  onClick={() => handleDelete(product._id)}
                >
                  <button className="cursor-pointer bg-rose-500 rounded p-2 text-white">
                    {' '}
                    حذف{' '}
                  </button>
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
      {/* ///modal */}
      <AddDataModal
        isOpenAdding={isOpenAdding}
        onClose={() => setIsOpenAdding(false)}
      />

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
    </>
  );
};

export default TableAddProduct;
