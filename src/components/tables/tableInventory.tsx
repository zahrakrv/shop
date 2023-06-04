import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../pages/api/context/GlobalContext';
import { TablePagination } from '@mui/material';
import Button from './../../kit/Button';

const TableInventory = () => {
  const [products, setProducts] = useState([]);
  const { fetchCategories, fetchProducts } = useContext(GlobalContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalPage, setTotalPage] = useState();
  const [totalProducts, setTotalProducts] = useState();

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
      <table className="mr-20 bg-white rounded-xl p-4 border rounded">
        <thead className="mx-auto border-gray-400 border-b">
          <tr>
            <th className="p-6 shadow">نام کالا</th>
            <th className="p-6 shadow">قیمت</th>
            <th className="p-6 shadow">موجودی</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products.map((category: any) => (
            // console.log(category),
            <tr key={category.id}>
              <td className="p-3 shadow">{category.name}</td>
              <td className="p-3 shadow">{category.price}</td>
              <td className="p-3 shadow">{category.quantity}</td>
            </tr>
          ))}
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

export default TableInventory;
