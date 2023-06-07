import Head from 'next/head';
import React, { useContext, useState } from 'react';
import { GlobalContext } from '../api/context/GlobalContext';
import Button from '../../kit/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
const AdminLogin = () => {
  const schema = z.object({
    username: z
      .string()
      .min(3, { message: 'بیشتر از 3 حرف باشد' })
      .max(10, { message: 'کمتر از 10 حرف باشد' }),
    password: z.string().min(3).max(10),
  });
  const {
    setValue,
    // for error
    register,
    ///empty form
    reset,
    // error
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(schema),
  });

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
                errors={errors}
                register={register}
                onChange={onChangeHndler}
                value={admins.username}
                type="text"
                name="username"
                id=""
                className="rounded w-full my-3 px-2 py-1 text-md outline-teal-500"
              ></input>
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            {/* pass */}
            <div className="">
              <label className="text-md text-white font-semibold">
                {' '}
                رمز عبور
              </label>
              <input
                errors={errors}
                register={register}
                onChange={onChangeHndler}
                value={admins.password}
                type="password"
                name="password"
                id=""
                className="rounded w-full my-3 px-2 py-1 text-md outline-teal-500"
              ></input>
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <Button>ورود</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
