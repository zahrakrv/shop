import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.png';

const HeaderSite = () => {
  return (
    <>
      <div className="hidden md:flex">
        <img src="/banner.gif"></img>
      </div>
      <div className="">
        <div className="w-full sm:w-full md:w-full sm:flex sm:justify-between sm:items-center sm:gap-4">
          <Link href="/">
            <div className="flex items-center justify-center sm:w-52">
              {/* <img src="logo.png" className="sm:w-52 w-44"></img> */}
              <Image src={logo} alt="express" height={80} width={176} />
            </div>
          </Link>
          {/* ////div search & cart */}
          <div className="flex gap-3 justify-between sm:justify-between items-center px-2">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className="fill-slate-400 absolute right-0 top-3 px-3"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
              <input
                type="text"
                placeholder="جستجو"
                className="sm:w-72 w-52 rounded bg-slate-100 px-8 py-2 outline-none"
              />{' '}
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-4 pr-3 text-blue-950 cursor-pointer border border-slate-300 rounded py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                  className="sm:h-6 h-4 fill-blue-950"
                >
                  <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                </svg>
                <Link href="/admins">
                  <span className="font-semibold text-sm sm:text-xl pl-2">
                    مدیریت
                  </span>
                </Link>
              </div>
              {/* <div className="flex items-center text-blue-950 cursor-pointer"> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="sm:w-8 w-6 fill-blue-950 border-r-slate-300"
              >
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
              {/* <a className="font-semibold sm:text-xl ">سبد خرید</a> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderSite;
