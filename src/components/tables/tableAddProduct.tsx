import React, { useState } from 'react';

const TableAddProduct = ({ setCategories, categories }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>تصویر</th>
            <th>نام کالاها</th>
            <th>قیمت</th>
            <th>تعداد موجود</th>
            <th>ویرایش / حذف</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(
            (category: any) => (
              console.log(category),
              (
                <tr key={category.id}>
                  <td>
                    <img
                      className="w-20"
                      src={`http://localhost:8000/images/products/images/${category.images[0]}`}
                    />
                  </td>
                  <td>`${category.name}`</td>
                  <td>`${category.price}`</td>
                  <td>`${category.quantity}`</td>
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
