import NavBarAdmin from '@/components/NavBarAdmin';
import SideBarAdmin from './../components/SideBarAdmin';
import { ReactNode } from 'react';

const LayoutAdmin = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container relative">
      <NavBarAdmin />
      {/* <div className="flex flex-col"> */}
      <div className="md:mr-52 flex">
        <SideBarAdmin />
        {children}
      </div>
    </div>
    // </div>
  );
};

export default LayoutAdmin;
