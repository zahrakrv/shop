import NavBarAdmin from '@/components/NavBarAdmin';
import SideBarAdmin from '../../components/SideBarAdmin';
import { useState, useEffect, useContext } from 'react';
import AllCategories from './../../components/allCategories';
import TableAddProduct from './../../components/tables/tableAddProduct';
import { GlobalContext } from '../api/context/GlobalContext';

const Dashboard = () => {
  const [sidebar, setSideBar] = useState(false);
  // const [categories, setCategories] = useState([]);
  const [showTable, setShowTable] = useState(false);
  // console.log(categories);

  // const { fetchProducts } = useContext(GlobalContext);

  // useEffect(() => {
  //   const getCategories = async () => {
  //     try {
  //       const categoriesData = await fetchProducts();
  //       // if (Array.isArray(categoriesData)) {
  //       console.log(categoriesData);
  //       setCategories(categoriesData.data.products);
  //       // }
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };
  //   getCategories();
  // }, [fetchProducts]);
  return (
    <div>
      <div className="flex relative">
        <SideBarAdmin sidebar={sidebar} setShowTable={setShowTable} />
        <div className="content md:mr-52 m-0 w-full">
          <div>
            <NavBarAdmin updateSideBar={setSideBar} sidebar={sidebar} />
            <div className="py-2 px-20 container mx-auto">
              {/* {showTable && (
                <TableAddProduct
                  categories={categories}
                  setCategories={setCategories}
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
