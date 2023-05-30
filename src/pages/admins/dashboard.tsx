import NavBarAdmin from '@/components/NavBarAdmin';
import SideBarAdmin from '../../components/sideBarAdmin';
import { useState } from 'react';
import AllCategories from './../../components/allCategories';

const Dashboard = () => {
  const [sidebar, setSideBar] = useState(false);
  return (
    <div>
      <div className="flex relative">
        <SideBarAdmin sidebar={sidebar} />
        <div className="content md:mr-52 m-0 w-full">
          <div>
            <NavBarAdmin updateSideBar={setSideBar} sidebar={sidebar} />
            <div className="mr-16">
              {' '}
              <AllCategories />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
