import { useState, useContext, useEffect } from 'react';
import React from 'react';
import { GlobalContext } from './../pages/api/context/GlobalContext';
import Link from 'next/link';

const DropdownMenu = ({
  isOpen,
  setIsOpen,
  subMenuOpen,
  setSubMenuOpe,
  toggleMenu,
  toggleSubMenu,
}) => {
  const { fetchCategories, fetchSubCategories } = useContext(GlobalContext);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res.data.data.categories);
    });
  }, []);
  useEffect(() => {
    fetchSubCategories().then((response) => {
      setSubCategory(response.data.data.subcategories);
    });
  }, []);
  // const [isOpen, setIsOpen] = useState(false);
  // const [subMenuOpen, setSubMenuOpen] = useState(true);

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  //   setSubMenuOpen(true);
  // };

  // const toggleSubMenu = () => {
  //   setSubMenuOpen(!subMenuOpen);
  // };
  // useEffect(() => {
  //   const getCategories = async () => {
  //     try {
  //       const response = await fetchCategories().then((response) => {
  //         console.log(response);
  //         setCategories(response);
  //       });
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };

  //   getCategories();
  // }, [fetchCategories]);

  // console.log('subCategory', subCategory);

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
          <span className="mt-3 text-xl sm:text-2xl sm:font-semibold">
            همه ی دسته بندی ها
          </span>
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
                <ul
                  className={`z-40 bg-white ${
                    subMenuOpen ? 'block' : 'hidden'
                  }`}
                >
                  {categories.map((item) => (
                    <li className="mb-4 font-semibold px-2" key={item.id}>
                      {item.name}

                      <ul>
                        {subCategory.map((sub) => {
                          return (
                            item._id === sub.category && (
                              <li key={sub._id}>{sub.name}</li>
                            )
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                  {/* <li className="mb-4 font-semibold px-2">
                    <a href="#">sdsfsd</a>
                  </li> */}
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
      <div className="h-16 p-4 hidden sm:flex justify-between items-center gap-6 text-xl font-bold ">
        <div className="flex justify-start items-center self-start gap-8">
          {categories.map((item) => (
            <span
              className=" text-slate-500 text-sm rounded p-2 hover:text-blue-900 cursor-pointer"
              key={item.id}
              className=" text-slate-500 text-sm rounded p-2 hover:text-blue-900 cursor-pointer"
              key={item.id}
            >
              {item.name}
              <ul>
                {subCategory.map((sub) => {
                  return (
                    item._id === sub.category && (
                      <li key={sub._id}>{sub.name}</li>
                    )
                  );
                })}
              </ul>
            </span>
          ))}
        </div>
        <div className="flex justify-start items-center gap-8">
          <Link href="/about">
            <span className="text-slate-500 text-sm hover:text-blue-900 cursor-pointer">
              درباره ما
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-slate-500 text-sm hover:text-blue-900 cursor-pointer">
              تماس با ما
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DropdownMenu;
