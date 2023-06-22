import { useState, useContext, useEffect, useRef } from 'react';
import React from 'react';
import { GlobalContext } from './../pages/api/context/GlobalContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

const DropdownMenu2 = ({
  isOpen,
  setIsOpen,
  subMenuOpen,
  setSubMenuOpen,
  toggleMenu,
  toggleSubMenu,
}) => {
  const router = useRouter();
  const {
    categories,
    subCategory,
    setCategories,
    setSubCategory,
    fetchCategories,
    fetchSubCategories,
  } = useContext(GlobalContext);
  // const [categories, setCategories] = useState([]);
  // const [subCategory, setSubCategory] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
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
                className={`"dropdown-menu absolute top-12 left-0 w-full bg-white border text-xl border-gray-300 shadow-md py-2 "${
                  subMenuOpen ? 'open' : 'hidden'
                }`} ////hidden add be jaye ''
              >
                <ul
                  className={`z-40 bg-white ${
                    subMenuOpen ? 'block' : 'hidden'
                  }`}
                >
                  {categories.map((category) => {
                    const subCategories = subCategory.filter(
                      (sub) => sub.category === category._id
                    );

                    return (
                      <li
                        className="mb-4 font-semibold px-2"
                        key={category._id}
                      >
                        {/* toggleSubMenu(category._id) */}
                        <button
                          //   href="#"
                          onClick={(e) => {
                            // console.log('hhhh');
                            e.preventDefault();
                            router.push({
                              pathname: '/landing',
                              query: {
                                category: category.name,
                                categoryId: category._id,
                              },
                            });
                            setMenuOpen(!menuOpen);
                          }}
                        >
                          {category.name}
                        </button>

                        <ul
                          className={`z-40 mt-6 bg-white ${
                            menuOpen === true ? 'block' : 'hidden'
                          }`}
                        >
                          {subCategories.map((sub) => (
                            <li key={sub._id}>{sub.name}</li>
                          ))}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
            <li className="mb-4 font-semibold px-2 text-sm">
              <a href="#">درباره ما</a>
            </li>
            <li className="mb-4 font-semibold px-2 text-sm">
              <a href="#">تماس با ما</a>
            </li>
          </ul>
        </div>
      </div>

      {/* //////////sm menu */}
      <div className="h-16 p-4 hidden sm:flex justify-between items-center gap-6 text-xl ">
        <div className="flex justify-start items-center  bg-white z-40 self-start gap-12 ">
          {categories.map((category) => {
            const subCategories = subCategory.filter(
              (sub) => sub.category === category._id
            );

            return (
              <span
                className=" text-slate-500 text-sm rounded p-2 mb-10"
                key={category._id}
              >
                <a
                  className="mb-8 hover:text-blue-950 hover:font-bold"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push({
                      pathname: '/landing',
                      query: {
                        category: category.name,
                        categoryId: category._id,
                      },
                    });
                    setMenuOpen(!menuOpen);
                  }}
                >
                  {category.name}
                </a>
                <ul
                  className={`z-40 mt-8 ${
                    menuOpen === true ? 'block' : 'hidden'
                  }`}
                >
                  {subCategories.map((sub) => (
                    <li
                      className="mb-6 cursor-pointer hover:text-blue-950 hover:font-bold "
                      key={sub._id}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push({
                          pathname: '/landing',
                          query: {
                            category: category.name,
                            categoryId: category._id,
                            subCategory: sub.name,
                            subCategoryId: sub._id,
                          },
                        });
                      }}
                    >
                      {sub.name}
                    </li>
                  ))}
                </ul>
              </span>
            );
          })}
        </div>
        <div className="flex justify-start items-center gap-8 text-sm">
          <Link href="/about">
            <span className="text-slate-500 hover:text-blue-950 hover:font-bold">
              درباره ما
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-slate-500 hover:text-blue-950 hover:font-bold">
              تماس با ما
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DropdownMenu2;
