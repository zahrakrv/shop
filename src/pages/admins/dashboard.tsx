import NavBarAdmin from '@/components/NavBarAdmin';
import SideBarAdmin from '../../components/sideBarAdmin';
import { useState } from 'react';

const Dashboard = () => {
  const [sidebar, setSideBar] = useState(false);
  return (
    <div>
      <div className="flex relative">
        <SideBarAdmin sidebar={sidebar} />
        <div className="content md:mr-52 m-0 w-full">
          <div>
            <NavBarAdmin updateSideBar={setSideBar} sidebar={sidebar} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
