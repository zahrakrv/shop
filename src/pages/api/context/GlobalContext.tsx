import { createContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

export type SubCategoryType = {
  _id: string;
  name: string;
  category: string;
};
export interface GlobalContextType {
  adminToken: string | boolean;
  adminLogin: (data: any) => void;
  fetchProducts: (page: number, limit: number) => Promise<any>;
  fetchCategories: () => Promise<any>;
  fetchOrders: (
    page: number,
    limit: number,
    sortDelivery: string,
    deliveryStatus: string | undefined
  ) => Promise<any>;
  fetchSortPrice: (
    page: number,
    limit: number,
    sortOrder: boolean
  ) => Promise<any>;
  fetchSubCategories: () => Promise<any>;
  fetchUsers: () => Promise<any>;
  categories: any[];
  setCategories: React.Dispatch<React.SetStateAction<never[]>>;
  setSubCategory: React.Dispatch<React.SetStateAction<never[]>>;
  subCategory: SubCategoryType[];
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<never[]>>;
  fetchAllProducts: () => Promise<any>;
  setAllProducts: React.Dispatch<React.SetStateAction<never[]>>;
  allProducts: any[];
}

export const GlobalContext = createContext<GlobalContextType>(
  {} as GlobalContextType
);

/////check for window is not server side
const ISSERVER = typeof window === 'undefined';
const GlobalProvider = ({ children }: any) => {
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

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
          cookies.set('adminToken', res.data.token.accessToken);
          cookies.set('refreshToken', res.data.token.accessToken);

          // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzJmY2ZlMTY0YjE3YTE1OTg4ZWQzZiIsImlhdCI6MTY4NTUxOTQ1MCwiZXhwIjoxNjg1NTIwMzUwfQ.IOg2EujMb9YEiNkmuAh0jnacNrWOJ-aRNpSXK3zoGTw
          router.push('/admins/dashboard');
        } else {
          alert('fff');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('connection failed');
      });
  };

  ////product
  const fetchProducts = async (page: number, limit: number) => {
    try {
      //localhost:8000/api/categories
      const response = await axios.get(
        // `http://localhost:8000/api/products?page=${page}&limit=${limit}&sort=price`,
        `http://localhost:8000/api/products?page=${page}&limit=${limit}&sort=-createdAt`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      // console.log(response.data);
      // console.log(response.data.data.products);

      // const categoriiii = response.data.data.products.map(async (item) => {
      // const categoryName = await axios.get(
      // `http://localhost:8000/api/categories`,
      // {
      // headers: { Authorization: `Bearer ${adminToken}` },
      // }
      // );
      // console.log(categoryName);
      // const x = categoryName.data.data.category.name;
      // return categoryName;
      // });
      // console.log(categoriiii);

      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/products?limit=all&sort=-createdAt',
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      // console.log(response.data);
      setAllProducts(response.data.data.products);

      return response.data;
    } catch (error) {
      console.error('Error fetching allProducts:', error);
      return [];
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/categories/`);
      // .then((response) => {
      //   console.log(response);

      return response;
      // });
      // return res.data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    // console.log(res.data.data);
  };
  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/subcategories?limit=all`
      );
      // .then((response) => {
      //   console.log(response);

      return response;
      // });
      // return res.data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    // console.log(res.data.data);
  };

  const fetchOrders = async (
    page: number,
    limit: number,
    sortDelivery: string,
    deliveryStatus: boolean
  ) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/orders?page=${page}&sort=${sortDelivery}&limit=${limit}${
          deliveryStatus !== undefined
            ? '&deliveryStatus=' + deliveryStatus
            : ''
        }`
      );
      // console.log(res.data);
      return res;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    // console.log(res.data.data);
  };

  const fetchSortPrice = async (
    page: number,
    limit: number,
    sortOrder: string
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products?page=${page}&limit=${limit}&fields=-rating,-createdAt,-updatedAt,-__v&sort=${
          sortOrder ? 'price' : '-price'
        }&quantity[gte]=8`
        // {
        //   headers: { Authorization: `Bearer ${adminToken}` },
        // }
      );
      // console.log(response.data);
      // setSortOrder((prev) => !prev);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users`);
      console.log(response);

      return response;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        adminToken,
        adminLogin,
        fetchProducts,
        fetchCategories,
        fetchOrders,
        fetchSortPrice,
        fetchSubCategories,
        fetchUsers,
        categories,
        setCategories,
        subCategory,
        setSubCategory,
        products,
        setProducts,
        fetchAllProducts,
        setAllProducts,
        allProducts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
