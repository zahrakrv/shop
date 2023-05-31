import { createContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

export const GlobalContext = createContext({});

/////check for window is not server side
const ISSERVER = typeof window === 'undefined';
const GlobalProvider = ({ children }: any) => {
  ///router
  const router = useRouter();
  ///////admin auth token state
  const [adminToken, setAdminToken] = useState(
    !ISSERVER ? localStorage.getItem('adminToken') || false : ''
  );

  const adminLogin = (data: any) => {
    const { username, password } = data;
    axios
      .post('http://localhost:8000/api/auth/login', { username, password })
      .then((res) => {
        const cookies = new Cookies();
        console.log(res.data);
        if (res.data.status === 'success') {
          // alert(res.data.message);
          localStorage.setItem(
            'adminToken',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIxMWEzZmM5ZjRlMzQ3MGY0OTMwNSIsImlhdCI6MTY4NTI3NTY5MSwiZXhwIjoxNjg1Mjc2NTkxfQ.wfOeQ5-712CDoabydnpO5gafSs0pxDZNR4Ay4ZjnNG4'
          );
          cookies.set(
            'adminToken',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzJmY2ZlMTY0YjE3YTE1OTg4ZWQzZiIsImlhdCI6MTY4NTUxOTQ1MCwiZXhwIjoxNjg1NTIwMzUwfQ.IOg2EujMb9YEiNkmuAh0jnacNrWOJ-aRNpSXK3zoGTw'
          );
          router.push('/admins/dashboard');
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ////product
  const fetchCategories = async () => {
    try {
      //localhost:8000/api/categories
      const response = await axios.get(
        'http://localhost:8000/api/products?page=1&limit=4&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8',
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  return (
    <GlobalContext.Provider value={{ adminToken, adminLogin, fetchCategories }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
