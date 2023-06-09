import React, { useState, useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component';
import { GlobalContext } from '../../pages/api/context/GlobalContext';

function TableOrder2() {
  const { fetchProducts, fetchCategories } = useContext(GlobalContext);
  const [records, setRecords] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsResponse = await fetchProducts(1, 'all'); // Fetch products with page 1 and limit 10
      const categoriesResponse = await fetchCategories(); // Fetch categories

      setRecords(productsResponse.data.products);
      console.log(categoriesResponse.data);
      setCategories(categoriesResponse.categories);
    };
    fetchData();
  }, []);
  const columns = [
    {
      name: 'نام کاربر',
      selector: (row) => row.img,
      sortable: true,
    },
    {
      name: 'مجموع مبلغ',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'زمان سفارش',
      selector: (row) => getCategoryName(row.category),
      sortable: true,
    },
    {
      name: 'بررسی سفارش',
      selector: (row) => row.edit,
      sortable: true,
    },
  ];
  function getCategoryName(categoryId) {
    const category =
      categories && categories.find((cat) => cat._id === categoryId);
    return category ? category.name : '';
  }
  const data = records.map((product) => ({
    id: product.id,
<<<<<<<< HEAD:src/components/tables/tableOrders2.tsx
========
    img: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
        className="fill-green-500"
      >
        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
      </svg>
    ),
>>>>>>>> adminPanel:src/components/tables/tableAddProduct2.tsx
    name: product.name,
    price: product.price,
    date: product.quantity,
    // category: {product.price},
    order: 'بررسی سفارش',
  }));

  function handleFilter(e) {
    const newData = data.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
  }
  return (
    <div className="container mt-5">
      <div className="text-end">
        <input
          className="bg-red-500"
          type="text"
          onChange={handleFilter}
        ></input>
      </div>
      <DataTable
        columns={columns}
        data={records}
        selectableRows
        fixedHeader
        pagination
      ></DataTable>
    </div>
  );
}
export default TableOrder2;
