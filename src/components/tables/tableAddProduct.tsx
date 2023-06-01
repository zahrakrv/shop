import React, { useState } from 'react';

const TableAddProduct = ({ setCategories, categories }) => {
  return (
    <>
      <table className="mr-20 bg-white rounded-xl p-4">
        <thead className="mx-auto border-gray-400 border-b">
          <tr>
            <th className="p-6 shadow">تصویر</th>
            <th className="p-6 shadow">نام کالاها</th>
            <th className="p-6 shadow">قیمت</th>
            <th className="p-6 shadow">تعداد موجود</th>
            <th className="p-6 shadow">ویرایش / حذف</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(
            (category: any) => (
              console.log(category),
              (
                <tr key={category.id}>
                  <td className="p-6 shadow">
                    <img
                      className="w-24 rounded"
                      src={`http://localhost:8000/images/products/images/${category.images[0]}`}
                    />
                  </td>
                  <td className="p-6 shadow">`${category.name}`</td>
                  <td className="p-6 shadow">`${category.price}`</td>
                  <td className="p-6 shadow">`${category.quantity}`</td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableAddProduct;
