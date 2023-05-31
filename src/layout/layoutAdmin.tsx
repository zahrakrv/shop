import NavBarAdmin from '@/components/NavBarAdmin';
import SideBarAdmin from './../components/SideBarAdmin';
import { ReactNode } from 'react';

const LayoutAdmin = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex relative">
      <SideBarAdmin />
      <div className="content md:mr-52 m-0 w-full">
        <NavBarAdmin />
      </div>
      {children}
    </div>
  );
};

export default LayoutAdmin;
