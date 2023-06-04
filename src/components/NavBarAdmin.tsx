import React from 'react';

interface NavBarAdminProps {
  updateSideBar: (sidebar: boolean) => void;
  sidebar: boolean;
}

const NavBarAdmin = ({ updateSideBar, sidebar }: NavBarAdminProps) => {
  const toggle = () => {
    updateSideBar(!sidebar);
    // console.log('ddd');
  };
  return (
    <div>
      <div className="bg-teal-500 py-2 ">
        <div className="flex justify-center container mx-auto ">
          <h2 className="text-xl text-white pr-60">پنل مدیریت فروشگاه</h2>
          <h2 className="text-xl text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="cursor-pointer h-6 fill-white pl-3 md:hidden"
              onClick={toggle}
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default NavBarAdmin;
