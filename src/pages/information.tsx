import Layout from '@/layout/layout';
import { request } from '@/utils/request';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { GlobalContext } from './api/context/GlobalContext';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { FORM } from '@/redux/slice/cart';
import DatePicker from 'react-multi-date-picker';
import { Calendar } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Controller, FieldErrors } from 'react-hook-form';
import weekends from 'react-multi-date-picker/plugins/highlight_weekends';

const UserInformation = () => {
  const router = useRouter();
  ////redux toolkit
  const dispatch = useDispatch();
  const { handleFormSubmit } = useContext(GlobalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      deliveryDate: '',
    },
  });
  const [users, setUsers] = useState([]);
  //   const [isDataLoaded, setIsDataLoaded] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await request.get(`/users`);
        setUsers(response.data.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUserData();
  }, []);
  // const postOrder = async (data) => {
  //   return await request.post('/orders', data);
  // };
  // const mutationOrder = useMutation({
  //   mutationFn: (data) => postOrder(data),
  //   onSuccess: () => {
  //     console.log('added');

  //     // updateProduct(id, productData);
  //   },
  // });
  const cookie = new Cookies();
  const userID = cookie.get('id');
  const getUserData = async () => {
    return await request
      .get(`/users/${userID}`)
      .then((res) => res.data.data.user);
  };
  const { isLoading, data, refetch, isError } = useQuery([], getUserData, {
    onSuccess: (data) => {
      // console.log("Get data!");
      // console.log(data);
      setValue('firstname', data.firstname);
      setValue('lastname', data.lastname);
      setValue('address', data.address);
      setValue('phoneNumber', data.phoneNumber);
      // setValue('deliveryDate', data.deliveryDate);
    },
  });
  const onSubmit = (data) => {
    dispatch(FORM({ date: data.deliveryDate * 1000, type: 'add' }));
    handleFormSubmit(data);
    console.log(data);
    router.push('/payment');
    // const productCart = JSON.parse(localStorage.getItem('cartItems'));
    // const orderArr = productCart.map((item) => {
    //   return {
    //     product: item.product._id,
    //     count: item.quantity,
    //   };
    // });
    // console.log(userID);
    // const ordersData = {
    //   user: userID,
    //   deliveryDate: data.deliveryDate,
    //   products: orderArr,
    //   deliveryStatus: false,
    // };
    // // console.log(data);
    // // console.log(productCart);
    // mutationOrder.mutate(ordersData);
    // console.log(ordersData);
  };
  if (isLoading) {
    return <div>loading...</div>;
  }

  // const handleUserSelect = (userId) => {
  //   // const selectedUser = users.find((user) => user._id === userId);
  //   if (selectedUser) {
  //     setValue('firstname', selectedUser.firstname);
  //     setValue('lastname', selectedUser.lastname);
  //     setValue('address', selectedUser.address);
  //     setValue('phoneNumber', selectedUser.phoneNumber);
  //     setValue('deliveryDate', selectedUser.deliveryDate);
  //   }
  // };
  return (
    <>
      <Layout>
        <div className="container flex justify-center items-center">
          <div className="form mt-10 max-[600px] p-5 bg-[#f2f2f2] rounded shadow-md">
            <h1 className="hel mt-10 text-2xl mb-10">نهایی کردن خرید</h1>
            <form
              className="flex flex-col justify-center items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* <div>
                <label className="ml-4">انتخاب کاربر:</label>
                <select
                  className="border border-gray-200 rounded p-3 mb-6"
                  {...register('userId')}
                  onChange={(e) => handleUserSelect(e.target.value)}
                >
                  <option value="">انتخاب کنید</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.firstname} {user.lastname}
                    </option>
                  ))}
                </select>
                {users.map((user) => console.log(user))}
              </div> */}
              <div className="flex gap-4 mb-8">
                <label>
                  نام
                  <input
                    className="mr-3 p-3 border border-gray-200 rounded w-96"
                    type="text"
                    placeholder="نام"
                    // disabled="true"
                    {...register('firstname', { required: 'نام الزامی است' })}
                  />
                  {errors.firstName && (
                    <span className="text-red-500">
                      {errors.firstname.message}
                    </span>
                  )}
                </label>
                <label className="">
                  نام خانوادگی
                  <input
                    className="mr-3 p-3 border border-gray-200 rounded w-96"
                    type="text"
                    placeholder="نام خانوادگی"
                    // disabled="true"
                    {...register('lastname', {
                      required: 'نام خانوادگی الزامی است',
                    })}
                  />
                  {errors.lastname && <span>{errors.lastname.message}</span>}
                </label>
              </div>
              <div className="mb-8 flex gap-4 items-center">
                <label className="flex items-center">
                  آدرس
                  <textarea
                    className="mr-3 p-3 border border-gray-200 rounded w-96"
                    placeholder="آدرس"
                    // disabled="true"
                    {...register('address', { required: 'آدرس الزامی است' })}
                  />
                  {errors.address && <span>{errors.address.message}</span>}
                </label>

                <label>
                  تلفن همراه
                  <input
                    className="mr-3 p-3 border border-gray-200 rounded w-96"
                    type="number"
                    placeholder="تلفن همراه"
                    // disabled="true"
                    {...register('phoneNumber', {
                      required: 'تلفن همراه الزامی است',
                    })}
                  />
                  {errors.phoneNumber && (
                    <span>{errors.phoneNumber.message}</span>
                  )}
                </label>
              </div>
              <label className="mb-8 ml-4">
                تاریخ تحویل{' '}
                {/* <input
                  type="date"
                  className="p-3 border border-gray-200 rounded"
                  {...register('deliveryDate', {
                    required: 'تاریخ تحویل الزامی است',
                  })}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.deliveryDate && (
                  <span>{errors.deliveryDate.message}</span>
                )} */}
                <Controller
                  control={control}
                  name="deliveryDate"
                  rules={{ required: true }} //optional
                  render={({ field: { onChange, name, value } }) => (
                    <div className="w-full">
                      <DatePicker
                        name={name}
                        className="w-full "
                        calendar={persian}
                        locale={persian_fa}
                        // value={value || ''}
                        minDate={new Date().setDate(31)}
                        inputClass="style-picker"
                        placeholder="تاریخ تحویل را انتخاب کنید"
                        // plugins={[weekends()]}
                        // weekDays={weekDays}
                        // maxDate={new Date().setDate(0)}
                        onChange={(date) =>
                          setValue('deliveryDate', date?.unix.toString())
                        }
                        // format={language === 'en' ? 'MM/DD/YYYY' : 'YYYY/MM/DD'}
                        // {...register('deliveryDate', {
                        //   required: 'تاریخ تحویل الزامیست',
                        // })}
                      />
                      <div className="text-btnCard  h-2 pt-2 pb-2">
                        {errors.deliveryDate?.message}
                      </div>
                    </div>
                  )}
                />
              </label>
              {/* <Link href="/payment"> */}
              <button
                className="bg-green-500 text-white rounded px-5 py-2"
                type="submit"
              >
                ادامه ی پرداخت
              </button>
              {/* </Link> */}
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserInformation;
