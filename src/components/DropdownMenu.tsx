import { useState } from 'react';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <>
      <div className="dropdown relative h-14 flex items-center p-6 sm:hidden">
        <button
          className="dropdown-toggle flex gap-4 justify-between items-center"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="h-8"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
          <span className="text-2xl font-semibold">همه ی دسته بندی ها</span>
        </button>

        <div
          className={`dropdown-menu absolute top-14 left-0 w-full bg-white border text-xl border-gray-300 shadow-md py-2 ${
            isOpen ? 'open' : ''
          }`}
        >
          <ul>
            <li className="mb-4 font-semibold px-2">
              <a href="#" onClick={toggleSubMenu}>
                همه ی کالاها
              </a>

              <div
                className={`"dropdown-menu absolute top-12 left-0 w-full bg-white border text-xl border-gray-300 shadow-md py-2"${
                  subMenuOpen ? 'open' : ''
                }`}
              >
                <ul className={`${subMenuOpen ? 'block' : 'hidden'}`}>
                  <li className="mb-4 font-semibold px-2">
                    <a href="#">گروه 1</a>
                  </li>
                  <li className="mb-4 font-semibold px-2">
                    <a href="#">گروه 2</a>
                  </li>
                  <li className="mb-4 font-semibold px-2">
                    <a href="#">گروه 3</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="mb-4 font-semibold px-2">
              <a href="#">درباره ما</a>
            </li>
            <li className="mb-4 font-semibold px-2">
              <a href="#">تماس با ما</a>
            </li>
          </ul>
        </div>
      </div>

      {/* //////////sm menu */}
      <div className="h-16 p-2 hidden sm:flex justify-evenly items-center gap-6 text-xl font-bold ">
        <div className="flex justify-start items-center self-start gap-8">
          <span className="bg-blue-800 text-white rounded p-2 hover:bg-blue-900 hover:text-white">
            گروه کالای 1
          </span>
          <span className="bg-blue-800 text-white rounded p-2 hover:bg-blue-900 hover:text-white">
            گروه کالای 2
          </span>
          <span className="bg-blue-800 text-white rounded p-2 hover:bg-blue-900 hover:text-white">
            گروه کالای 3
          </span>
        </div>
        <div className="flex justify-start items-center gap-8">
          <span className="text-blue-950">درباره ما</span>
          <span className="text-blue-950">تماس با ما</span>
        </div>
      </div>
    </>
  );
};

export default DropdownMenu;
