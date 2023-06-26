import SideBarLanding from '@/components/SideBarLanding';
import Layout from '@/layout/layout';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { GlobalContext } from './../pages/api/context/GlobalContext';
import { useContext, useState, useEffect } from 'react';
import MiniCardProduct2 from '@/components/MiniCardProduct2';
import styles from '../localStyle/LandingPage.module.css';

const LandingPage = () => {
  const { allProducts } = useContext(GlobalContext);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const router = useRouter();
  const { category, categoryId, subCategory, subCategoryId } = router.query;
  ////pagination
  const [page, setPage] = useState(1);
  const perPage = 6;

  // useEffect(() => {
  //   if (categoryId) {
  //     const products = allProducts.filter(
  //       (product) => product.category._id === categoryId
  //     );
  //     // setCategoryProducts(products);
  //   } else if (category) {
  //     const products = allProducts.filter(
  //       (product) => product.category.slugname === category
  //     );
  //     // setCategoryProducts(products);
  //   }

  // }, [allProducts, category, categoryId]);

  useEffect(() => {
    let filteredProducts = allProducts;

    if (categoryId) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category._id === categoryId
      );
    } else if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.slugname === category
      );
    }

    if (subCategoryId) {
      filteredProducts = filteredProducts.filter(
        (product) => product.subcategory._id === subCategoryId
      );
    } else if (subCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.subcategory.slugname === subCategory
      );
    }

    setCategoryProducts(filteredProducts);
  }, [allProducts, category, categoryId, subCategory, subCategoryId]);

  ////pagination
  const handleChange = (event, value) => {
    setPage(value);
  };
  const getPaginatedData = () => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return categoryProducts.slice(startIndex, endIndex);
  };

  return (
    <>
      <Layout>
        <div className="flex gap-2 p-4">
          <div className="w-1/4 h-full mt-16 px-5 border border-red-500 border-b-0 rounded-xl rounded-b-none shadow">
            <SideBarLanding />
          </div>
          <div className="w-3/4 border border-b-0 border-red-500 rounded-xl rounded-b-none shadow my-16 px-5">
            <h1 className="hel drop-shadow-2xl text-blue-900 text-3xl font-Bold px-2 py-4 cursor-pointer flex gap-4 items-center mb-12 ">
              گروه کالای: {category}
            </h1>
            <div className="flex flex-wrap items-center justify-between p-6">
              <MiniCardProduct2
                // products={categoryProducts}
                products={getPaginatedData()}
                useRouter={useRouter}
                className={styles['mini-card']}
              />
            </div>
            {/* {categoryProducts.map((product) => (
            <div key={product._id}>
              <p>{product.name}</p>
              <img src={product.image} alt={product.name} />
            </div>
          ))} */}
            {/* //////pagination */}
            <Stack spacing={2}>
              <Typography>Page: {page}</Typography>
              <Pagination
                count={Math.ceil(categoryProducts.length / perPage)}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default LandingPage;
