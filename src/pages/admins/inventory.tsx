import TableAddProduct from '@/components/tables/tableAddProduct';
import LayoutAdmin from './../../layout/layoutAdmin';
import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../api/context/GlobalContext';
import TableInventory from './../../components/tables/tableInventory';

const Inventory = () => {
  const { fetchInventory } = useContext(GlobalContext);

  return (
    <>
      <LayoutAdmin>
        <div className="py-2 container mx-auto">
          <TableInventory />
        </div>
      </LayoutAdmin>
    </>
  );
};

export default Inventory;
