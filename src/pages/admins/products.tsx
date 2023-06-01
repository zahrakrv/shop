import TableAddProduct from '@/components/tables/tableAddProduct';
import LayoutAdmin from './../../layout/layoutAdmin';
import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from './../context/GlobalContext';

const Products = () => {
  const [categories, setCategories] = useState([]);

  const { fetchProducts } = useContext(GlobalContext);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await fetchProducts();
        // if (Array.isArray(categoriesData)) {
        console.log(categoriesData);
        setCategories(categoriesData.data.products);
        // }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    getCategories();
  }, [fetchProducts]);
  return (
    <>
      <LayoutAdmin>
        <div className="py-2 container mx-auto">
          <TableAddProduct
            categories={categories}
            setCategories={setCategories}
          />
        </div>
      </LayoutAdmin>
      ;
    </>
  );
};

export default Products;
