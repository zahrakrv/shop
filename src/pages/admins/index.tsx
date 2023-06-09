import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginRequestData {
  username: string;
  password: string;
}

const AdminLogin = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    mode: 'onChange',
  });

  const getLogin = async (data: LoginRequestData) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/login',
        data
      );
      const cookie = new Cookies();
      cookie.set('adminToken', response.data.token.accessToken);
      cookie.set('refreshToken', response.data.token.refreshToken);
      router.push('/admins/dashboard');
      return response.data;
    } catch (error) {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError('');
    getLogin(data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-teal-400 rounded-xl p-2">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            ورود به پنل ادمین
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                نام کاربری
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                {...register('username', {
                  required: 'نام کاربری الزامی است',
                })}
                className={`bg-teal-200 mb-4 rounded-none relative block w-full px-3 py-2 border ${
                  formState.errors.username
                    ? 'border-red-500 focus:outline-none focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:z-10 sm:text-sm`}
                placeholder="نام کاربری خود را وارد کنید"
              />
              {formState.errors.username && (
                <p className="mt-2 text-sm text-red-600 mb-4">
                  {formState.errors.username?.message}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="sr-only">
                رمز عبور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                {...register('password', {
                  required: 'رمز عبور الزامی است',
                })}
                className={`bg-teal-200 mb-6 rounded-none relative block w-full px-3 py-2 border ${
                  formState.errors.password
                    ? 'border-red-500 focus:outline-none focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:z-10 sm:text-sm`}
                placeholder="رمز عبور خود را وارد کنید"
              />
              {formState.errors.password && (
                <p className="mt-2 text-sm text-red-600 mb-4">
                  {formState.errors.password?.message}
                </p>
              )}
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <div className="flex items-center justify-end mt-4">
            <div className="text-sm">
              <Link
                href="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                بازگشت به سایت
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className={`group relative flex justify-center py-2 px-4 mb-6 text-sm font-medium rounded-md text-white ${
                formState.isValid
                  ? 'bg-teal-800 hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!formState.isValid || isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 018 8v-2a6 6 0 00-6-6h-2zm-6 6a6 6 0 006-6H10v6z"
                  ></path>
                </svg>
              ) : null}
              ورود
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
