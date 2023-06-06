import React, { useState, useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component';
import { GlobalContext } from '../../pages/api/context/GlobalContext';

function TableAddProduct2() {
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
      name: 'تصویر کالا',
      selector: (row) => row.img,
      sortable: true,
    },
    {
      name: 'نام کالا',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'دسته بندی',
      selector: (row) => getCategoryName(row.category),
      sortable: true,
    },
    {
      name: 'ویرایش/حذف',
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
    img: (
      <img
        // className="w-24 rounded"
        src={`http://localhost:8000/images/products/images/${product.images[0]}`}
        alt={product.name}
      />
    ),
    name: product.name,
    // category: {product.price},
    edit: 'svg',
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
export default TableAddProduct2;
