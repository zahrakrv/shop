import TableAddProduct from '@/components/tables/tableAddProduct';
import LayoutAdmin from './../../layout/layoutAdmin';
// import { useState, useContext, useEffect } from 'react';
// import { GlobalContext } from '../api/context/GlobalContext';

const Products = () => {
  // const { fetchProducts } = useContext(GlobalContext);

  return (
    <>
      <LayoutAdmin>
        <div className="py-2 container mx-auto">
          <TableAddProduct />
        </div>
      </LayoutAdmin>
    </>
  );
};

export default Products;
