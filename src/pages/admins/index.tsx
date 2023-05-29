import Head from 'next/head';
import React, { useContext, useState } from 'react';
import { GlobalContext } from './../context/GlobalContext';
const AdminLogin = () => {
  ////marboot be authentication admin
  const { adminLogin } = useContext(GlobalContext);
  // console.log(context);
  const [admins, setAdmins] = useState({
    username: '',
    password: '',
  });
  const onChangeHndler = (e) => {
    setAdmins({ ...admins, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    const data = { username: admins.username, password: admins.password };
    adminLogin(data);
  };
  ////////
  return (
    <>
      <Head>
        <title>Admin Login</title>
      </Head>
      <div className="container absolute top-[20%] left-[50%] -translate-x-2/4 max-w-md mx-auto">
        <div className="shadow bg-teal-500 rounded-xl">
          <h1 className="text-white text-4xl text-center my-4 pt-4">
            {' '}
            ورود به پنل ادمین
          </h1>
          <form action="" className="p-6" onSubmit={submit}>
            {/* //user */}
            <div className="">
              <label className="text-md text-white font-semibold">
                نام کاربری{' '}
              </label>
              <input
                onChange={onChangeHndler}
                value={admins.username}
                type="text"
                name="username"
                id=""
                className="rounded w-full my-3 px-2 py-1 text-md outline-teal-500"
              ></input>
            </div>
            {/* pass */}
            <div className="">
              <label className="text-md text-white font-semibold">
                {' '}
                رمز عبور
              </label>
              <input
                onChange={onChangeHndler}
                value={admins.password}
                type="password"
                name="password"
                id=""
                className="rounded w-full my-3 px-2 py-1 text-md outline-teal-500"
              ></input>
            </div>
            <button className="flex items-center rounded my-3 px-6 py-1 text-md text-teal-900 font-semibold mx-auto  bg-teal-200 hover:bg-teal-900">
              ورود
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
