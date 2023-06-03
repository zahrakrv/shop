import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from './../../pages/context/GlobalContext';
import { TablePagination } from '@mui/material';

const TableAddProduct = () => {
  const [products, setProducts] = useState([]);
  const { fetchCategories, fetchProducts } = useContext(GlobalContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [totalPage, setTotalPage] = useState();
  const [totalProducts, setTotalProducts] = useState();

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
      <table className="mr-20 bg-white rounded-xl p-4">
        <thead className="mx-auto border-gray-400 border-b">
          <tr>
            <th className="p-6 shadow">تصویر</th>
            <th className="p-6 shadow">نام کالا</th>
            <th className="p-6 shadow">قیمت</th>
            <th className="p-6 shadow">تعداد موجود</th>
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
          {products.map((category: any) => (
            // console.log(category),
            <tr key={category.id}>
              <td className="p-3 shadow">
                <img
                  className="w-24 rounded"
                  src={`http://localhost:8000/images/products/images/${category.images[0]}`}
                />
              </td>
              <td className="p-3 shadow">{category.name}</td>
              <td className="p-3 shadow">{category.price}</td>
              <td className="p-3 shadow">{category.quantity}</td>
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
          ))}
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
        className=""
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

// import React, { useState, useContext } from 'react';
// import { GlobalContext } from './../../pages/context/GlobalContext';
// import { TablePagination } from '@mui/material';

// const TableAddProduct = ({ setProducts, products }) => {
//   const { fetchCategories } = useContext(GlobalContext);
//   // const [page, setPage] = useState(0);
//   // const [rowsPerPage, setRowsPerPage] = useState(4);

//   fetchCategories().then((res) => {
//     console.log(res);
//   });

//   //////////////pagination
//   // interface paginationProps {
//   //   event: React.MouseEvent<HTMLButtonElement> | null;
//   //   newPage: number;
//   // }
//   // interface paginationRowsProps {
//   //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
//   // }

//   // const handleChangePage = ({ event, newPage }: paginationProps) => {
//   //   setPage(newPage);
//   // };
//   // const handleChangeRowsPerPage = ({ event }: paginationRowsProps) => {
//   //   setRowsPerPage(parseInt(event.target.value, 4));
//   //   setPage(0);
//   // };
//   // const emptyRows =
//   //   rowsPerPage - Math.min(rowsPerPage, categories.length - page * rowsPerPage);

//   return (
//     <>
//       <table className="mr-20 bg-white rounded-xl p-4">
//         <thead className="mx-auto border-gray-400 border-b">
//           <tr>
//             <th className="p-6 shadow">تصویر</th>
//             <th className="p-6 shadow">نام کالاها</th>
//             <th className="p-6 shadow">قیمت</th>
//             <th className="p-6 shadow">تعداد موجود</th>
//             <th className="p-6 shadow">ویرایش / حذف</th>
//           </tr>
//         </thead>
//         <tbody className="text-center">
//           {/* {(rowsPerPage > 0
//             ? categories.slice(
//                 page * rowsPerPage,
//                 page * rowsPerPage + rowsPerPage
//               )
//             : categories
//           ).map((category: any) =>
//            ( */}
//           {products.map((category: any) => (
//             // console.log(category),
//             <tr key={category.id}>
//               <td className="p-3 shadow">
//                 <img
//                   className="w-24 rounded"
//                   src={`http://localhost:8000/images/products/images/${category.images[0]}`}
//                 />
//               </td>
//               <td className="p-3 shadow">{category.name}</td>
//               <td className="p-3 shadow">{category.price}</td>
//               <td className="p-3 shadow">{category.quantity}</td>
//               <td>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   height="1em"
//                   viewBox="0 0 512 512"
//                   className="fill-green"
//                 >
//                   <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
//                 </svg>
//               </td>
//               <td>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   height="1em"
//                   viewBox="0 0 448 512"
//                 >
//                   <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
//                 </svg>
//               </td>
//             </tr>
//           ))}
//           {/* {emptyRows > 0 && (
//             <tr style={{ height: 53 * emptyRows }}>
//               <td colSpan={5} />
//             </tr>
//           )} */}
//         </tbody>
//       </table>
//       {/* ///////pagination */}
//       {/* <TablePagination
//         className=""
//         component="div"
//         count={categories.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         // rowsPerPageOptions={[4, 8, 12]}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       /> */}
//     </>
//   );
// };

// export default TableAddProduct;

// // import Box from '@mui/material/Box';
// // import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// // import React, { useState, useContext } from 'react';
// // import { GlobalContext } from './../../pages/context/GlobalContext';

// // const columns: GridColDef[] = [
// //   { field: 'تصویر', headerName: 'تصویر', width: 90 },
// //   {
// //     field: 'نام کالا',
// //     headerName: 'نام کالا',
// //     width: 150,
// //     editable: true,
// //   },
// //   {
// //     field: 'قیمت',
// //     headerName: 'قیمت',
// //     width: 150,
// //     editable: true,
// //   },
// //   {
// //     field: 'تعداد موجود',
// //     headerName: 'تعداد موجود',
// //     type: 'number',
// //     width: 110,
// //     editable: true,
// //   },
// //   {
// //     field: 'ویرایش',
// //     headerName: 'ویرایش',
// //     description: 'This column has a value getter and is not sortable.',
// //     sortable: false,
// //     width: 160,
// //     valueGetter: (params: GridValueGetterParams) =>
// //       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
// //   },
// //   {
// //     field: 'حذف',
// //     headerName: 'حذف',
// //     description: 'This column has a value getter and is not sortable.',
// //     sortable: false,
// //     width: 160,
// //     valueGetter: (params: GridValueGetterParams) =>
// //       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
// //   },
// // ];

// // const rows = [
// //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
// //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
// //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
// //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
// //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
// //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
// //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
// //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
// //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// // ];

// // export default function DataGridDemo({ setCategories, categories }) {
// //   const { fetchCategories } = useContext(GlobalContext);

// //   return (
// //     <Box sx={{ height: 400, width: '100%' }}>
// //       <DataGrid
// //         // sx={{ direction: 'ltr' }}
// //         rows={rows}
// //         columns={columns}
// //         initialState={{
// //           pagination: {
// //             paginationModel: {
// //               pageSize: 5,
// //             },
// //           },
// //         }}
// //         pageSizeOptions={[5]}
// //         checkboxSelection
// //         disableRowSelectionOnClick
// //       />
// //     </Box>
// //   );
// // }

// import React, { useState, useContext } from 'react';
// import { GlobalContext } from './../../pages/context/GlobalContext';
// import { TablePagination } from '@mui/material';

// const TableAddProduct = ({ setProducts, products }) => {
//   const { fetchCategories } = useContext(GlobalContext);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(4);

//   fetchCategories().then((res) => {
//     console.log(res);
//   });

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const emptyRows =
//     rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

//   return (
//     <>
//       <table className="mr-20 bg-white rounded-xl p-4">
//         <thead className="mx-auto border-gray-400 border-b">
//           <tr>
//             <th className="p-6 shadow">تصویر</th>
//             <th className="p-6 shadow">نام کالاها</th>
//             <th className="p-6 shadow">قیمت</th>
//             <th className="p-6 shadow">تعداد موجود</th>
//             <th className="p-6 shadow">ویرایش / حذف</th>
//           </tr>
//         </thead>
//         <tbody className="text-center">
//           {(rowsPerPage > 0
//             ? products.slice(
//                 page * rowsPerPage,
//                 page * rowsPerPage + rowsPerPage
//               )
//             : products
//           ).map((product) => (
//             <tr key={product.id}>
//               <td className="p-3 shadow">
//                 <img
//                   className="w-24 rounded"
//                   src={`http://localhost:8000/images/products/images/${product.images[0]}`}
//                 />
//               </td>
//               <td className="p-3 shadow">{product.name}</td>
//               <td className="p-3 shadow">{product.price}</td>
//               <td className="p-3 shadow">{product.quantity}</td>
//               <td>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   height="1em"
//                   viewBox="0 0 512 512"
//                   className="fill-green"
//                 >
//                   <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
//                 </svg>
//               </td>
//               <td>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   height="1em"
//                   viewBox="0 0 448 512"
//                 >
//                   <path d="M135.2 17.7L128.1 10.6C119.5 2 105.6 2 97 10.6L10.6 97c-8.6 8.6-8.6 22.5 0 31.1l391.8 391.8c8.6 8.6 22.5 8.6 31.1 0l86.4-86.4c8.6-8.6 8.6-22.5 0-31.1L166.3 17.7c-8.6-8.6-22.5-8.6-31.1 0zm72.9 415.4c-4.7 4.7-12.3 4.7-17 0L64 267.9c-4.7-4.7-4.7-12.3 0-17l126.1-126.1c4.7-4.7 12.3-4.7 17 0l120.9 120.9c4.7 4.7 4.7 12.3 0 17L207.9 433.1zM400 160v288c0 26.5-21.5 48-48 48H96c-26.5 0-48-21.5-48-48V160c0-26.5 21.5-48 48-48h256c26.5 0 48 21.5 48 48zm-176-32h-96c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16zm0 96h-96c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16z" />
//                 </svg>
//               </td>
//             </tr>
//           ))}
//           {emptyRows > 0 && (
//             <tr style={{ height: 53 * emptyRows }}>
//               <td colSpan={5} />
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <TablePagination
//         component="div"
//         count={products.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </>
//   );
// };

// export default TableAddProduct;
