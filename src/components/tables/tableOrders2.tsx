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
