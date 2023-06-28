import React, { useState, useContext, useEffect, Component } from 'react';
import { GlobalContext } from '../../pages/api/context/GlobalContext';
import { TablePagination } from '@mui/material';
import Button from './../../kit/Button';
import axios from 'axios';
import EasyEdit from 'react-easy-edit';
import { request } from '@/utils/request';

interface ProductType {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}
const TableInventory: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { fetchCategories, fetchProducts, fetchSortPrice, fetchUsers } =
    useContext(GlobalContext);
  const [page, setPage] = useState(0);

  ////about pagination
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalPage, setTotalPage] = useState();
  const [totalProducts, setTotalProducts] = useState();
  // const [users, setUsers] = useState([]);

  ////about sorting
  const [sortOrder, setSortOrder] = useState(true);
  const [isRotated, setIsRotated] = useState(false);
  ////edit mode
  const [isEditing, setIsEditing] = useState(false);
  ///save all
  const [arrSendRequest, setArrSendRequest] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchSortPrice(
          page + 1,
          rowsPerPage,
          sortOrder
        );
        setTotalPage(productsData.total_pages);
        setProducts(productsData.data.products);
        setTotalProducts(productsData.total);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
  }, [sortOrder, rowsPerPage, page, fetchSortPrice]);

  // useEffect(() => {
  //   fetchUsers().then((res) => {
  //     console.log(res.data);

  // setUsers(res.data.data.categories);
  //   });
  // }, []);

  /////handling editing quantity & price function
  const handleSave = async (
    itemId: string,
    fieldName: string,
    newValue: any
  ) => {
    try {
      const updatedProduct = { change: { [fieldName]: newValue }, id: itemId };
      await request.patch(`/products/${itemId}`, updatedProduct);

      const updatedProducts = products.map((product) => {
        if (product._id === itemId) {
          return { ...product, [fieldName]: newValue };
        }
        console.log(itemId);
        return product;
      });
      //   setProducts(updatedProducts);
      setArrSendRequest((prev) => [...prev, updatedProduct]);
      console.log(`Product ${itemId} ${fieldName} updated successfully`);
    } catch (error) {
      console.error(`Error updating product ${itemId} ${fieldName}:`, error);
    }
  };

  const handleCancel = () => {
    fetchProducts();
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleDiscard = () => {
    fetchProducts();
    setIsEditing(false);
  };

  //   const handleSaveAll = async () => {
  //     try {
  //       setIsEditing(false);

  //       const patchRequests = [];
  //       products.forEach((item) => {
  //         //دیتاهای آپدیت شده
  //         const updatedProduct = {
  //           name: item.name,
  //           price: item.price,
  //           quantity: item.quantity,
  //         };
  //         patchRequests.push(
  //           axios.patch(
  //             `http://localhost:8000/api/products/${item._id}`,
  //             updatedProduct
  //           )
  //         );
  //       });

  //       // ارسال همه درخواست‌های patch به صورت همزمان
  //       await Promise.all(patchRequests);
  //       // دریافت دیتاهای جدید از سرور
  //       const updatedProductsData = await fetchSortPrice(
  //         page + 1,
  //         rowsPerPage,
  //         sortOrder
  //       );
  //       console.log(updatedProductsData.data.data.products);
  //       setProducts(updatedProductsData.data.data.products);

  //       console.log('All changes saved successfully');
  //     } catch (error) {
  //       console.error('Error saving changes:', error);
  //     }
  //   };
  const handleSaveAll = () => {
    arrSendRequest.map((item) => {
      axios.patch(`http://localhost:8000/api/products/${item.id}`, item.change);
    });
  };
  //////////////pagination
  interface paginationProps {
    event: React.MouseEvent<HTMLButtonElement> | null;
    newPage: number;
  }
  interface paginationRowsProps {
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    // console.log(newPage);

    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      {/* <div className="flex justify-start mb-12">
        <Button>ذخیره</Button>
      </div> */}
      {isEditing ? (
        <>
          <Button onClick={handleSaveAll}>ذخیره</Button>
          <Button onClick={handleDiscard}>انصراف</Button>
        </>
      ) : (
        <Button onClick={handleEdit}>ویرایش</Button>
      )}
      <table className=" mr-20 mt-12 bg-white rounded-xl p-4 border items-center">
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
                موجودی
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products.map((item: any) => (
            // console.log(item),
            <tr key={item.id}>
              <td className="p-3 shadow">
                {/* {users.map((i) => {
                  return item.name === i._id && <span>{i.name}</span>;
                })} */}
                {/* {item.name} */}
                {isEditing ? (
                  <EasyEdit
                    type="text"
                    value={item.name}
                    onSave={(newValue) =>
                      handleSave(item._id, 'name', newValue)
                    }
                    onCancel={handleCancel}
                    saveButtonLabel="ذخیره"
                    cancelButtonLabel="لغو"
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="p-3 shadow">
                {/* {item.price} */}
                {isEditing ? (
                  <EasyEdit
                    type="number"
                    value={item.price.toString()}
                    onSave={(newValue) =>
                      handleSave(item._id, 'price', parseFloat(newValue))
                    }
                    onCancel={handleCancel}
                    saveButtonLabel="ذخیره"
                    cancelButtonLabel="لغو"
                  />
                ) : (
                  item.price
                )}
              </td>
              <td className="p-3 shadow">
                {/* {item.quantity} */}
                {isEditing ? (
                  <EasyEdit
                    type="number"
                    value={item.quantity.toString()}
                    onSave={(newValue) =>
                      handleSave(item._id, 'quantity', parseFloat(newValue))
                    }
                    onCancel={handleCancel}
                    saveButtonLabel="ذخیره"
                    cancelButtonLabel="لغو"
                  />
                ) : (
                  item.quantity
                )}
              </td>
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
