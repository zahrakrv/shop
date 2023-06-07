import TableAddProduct from '@/components/tables/tableAddProduct';
import LayoutAdmin from './../../layout/layoutAdmin';
import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../api/context/GlobalContext';
import TableOrders from './../../components/tables/tableOrders';
import TableOrders2 from './../../components/tables/tableOrders2';

const Orders = () => {
  const { fetchOrders } = useContext(GlobalContext);

  return (
    <>
      <LayoutAdmin>
        <div className="py-2 container mx-auto">
          <TableOrders />
          {/* <TableOrder2 /> */}
        </div>
      </LayoutAdmin>
    </>
  );
};

export default Orders;
