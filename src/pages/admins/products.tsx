import TableAddProduct from '@/components/tables/tableAddProduct';
import LayoutAdmin from './../../layout/layoutAdmin';
import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../api/context/GlobalContext';

const Products = () => {
  // const [products, setProducts] = useState([]);
  //   const [page, setPage] = useState(1);
  //   const [rowsPerPage] = useState(4);
  const { fetchProducts } = useContext(GlobalContext);

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const productsData = await fetchProducts();
  //       console.log(productsData);
  //       setProducts(productsData.data.products);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   };
  //   getProducts();
  // }, [fetchProducts]);

  //   const handleNextPage = () => {
  //     setPage(page + 1);
  //   };

  //   const handlePrevPage = () => {
  //     if (page > 1) {
  //       setPage(page - 1);
  //     }
  //   };

  //   const startIndex = (page - 1) * rowsPerPage;
  //   const endIndex = startIndex + rowsPerPage;
  //   const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <>
      <LayoutAdmin>
        <div className="py-2 container mx-auto">
          {/* <div>
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
              <tbody className="text-center">
                {paginatedProducts.map((category: any) => (
                  <tr key={category.id}>
                    <td className="p-3 shadow">
                      <img
                        className="w-24 rounded"
                        src={`http://localhost:8000/images/products/images/${category.images[0]}`}
                        alt="Product Image"
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
              </tbody>
            </table>
          </div>
          <div className="text-center flex">
            <div className="cursor-pointer w-5" onClick={handlePrevPage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="#2e2e2e"
              >
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
              </svg>
            </div>
            <span>{page}</span>
            <div className="cursor-pointer w-5" onClick={handleNextPage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="#2e2e2e"
              >
                <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
              </svg>
            </div>
          </div> */}
          <TableAddProduct />
        </div>
      </LayoutAdmin>
    </>
  );
};

export default Products;
//////////////////////////////////////////////////////////////////
