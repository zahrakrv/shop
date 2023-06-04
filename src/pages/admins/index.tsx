import Head from 'next/head';
import React, { useContext, useState } from 'react';
import { GlobalContext } from '../api/context/GlobalContext';
import Button from './../../components/Button';
const AdminLogin = () => {
  ////marboot be authentication admin
  const { adminLogin } = useContext(GlobalContext);
  // console.log(context);
  const [admins, setAdmins] = useState({
    username: '',
    password: '',
  });
  const onChangeHndler = (e: any) => {
    setAdmins({ ...admins, [e.target.name]: e.target.value });
  };
  const submit = (e: any) => {
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
            <Button>ورود</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
