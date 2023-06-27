import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

export type SubCategoryType = {
  _id: string;
  name: string;
  category: string;
};
interface CartItem {
  product: Product;
  price: number;
  quantity: number;
}
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
  cartItems: CartItem[];
  addToCart: (product: Product, price: number, quantity: number) => void;
  removeFromCart: (productName: string) => void;
  clearCart: () => void;
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
  const [cartItems, setCartItems] = useState([]);
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
      console.log(response.data);
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

  ////سبد خرید
  // useEffect(() => {
  //   console.log(cartItems);
  //   // const savedCartItems = cookies.get('cartItems');
  //   const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
  //   if (savedCartItems) {
  //     setCartItems(savedCartItems);
  //     console.log('localstorage found');
  //   } else {
  //     localStorage.setItem('cartItems', JSON.stringify([]));
  //     console.log('localstorage not found');
  //   }
  // }, []);
  // const addToCart = (product: Product, price: number, quantity: number) => {
  //   const cartItem = {
  //     product: product,
  //     price: price,
  //     quantity: quantity,
  //     image: image,
  //   };
  //   // بررسی وجود محصول تکراری در سبد خرید
  //   const existingItem = cartItems.find(
  //     (item) => item.product.name === product.name
  //   );
  //   if (existingItem) {
  //     // اگر محصول تکراری وجود داشت، فقط مقدار تعداد آن را افزایش می‌دهیم
  //     const updatedCartItems = cartItems.map((item) => {
  //       if (item.product.name === product.name) {
  //         return {
  //           ...item,
  //           quantity: item.quantity + quantity,
  //         };
  //       }
  //       return item;
  //     });

  //     setCartItems(() => {
  //       localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  //       return updatedCartItems;
  //     });
  //   } else {
  //     setCartItems((prevCartItems) => {
  //       const prevCart = [...prevCartItems, cartItem];

  //       localStorage.setItem('cartItems', JSON.stringify(prevCart));
  //       return prevCart;
  //     });
  //   }
  // };

  // const removeFromCart = (productName) => {
  //   setCartItems((prevCartItems) =>
  //     prevCartItems.filter((item) => item.product.name !== productName)
  //   );
  // };

  // const clearCart = () => {
  //   setCartItems([]);
  // };

  /////سبد خرید با دیتا
  const fetchProductsCartItems = async (cartItemsData) => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/products?limit=all'
      );
      const products = response.data.data.products;
      setProducts(response.data.data.products);
      // console.log(response.data);
      const updatedCartItems = cartItemsData.map((cartItem) => {
        const product = products.find(
          (item) => item.name === cartItem.product.name
        );
        return {
          ...cartItem,
          product: product ? product : cartItem.product,
        };
      });

      return {
        products: response.data,
        cartItems: updatedCartItems,
      };
    } catch (error) {
      console.error('Error fetching allProducts:', error);
      return {
        products: [],
        cartItems: cartItemsData,
      };
    }
  };
  const addToCart = (product, price, quantity, image, id) => {
    const cartItem = {
      product: product,
      price: price,
      quantity: quantity,
      image: image,
      id: id,
    };

    const existingItem = cartItems.find(
      (item) => item.product.name === product.name
    );
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.product.name === product.name) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        }
        return item;
      });

      setCartItems(() => {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return updatedCartItems;
      });
    } else {
      setCartItems((prevCartItems) => {
        const prevCart = [...prevCartItems, cartItem];

        localStorage.setItem('cartItems', JSON.stringify(prevCart));
        return prevCart;
      });
    }
  };

  // const handleFormSubmit = async (formData) => {
  //   try {
  //     const response = await fetch('http://localhost:8000/api/orders', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     if (response.ok) {
  //       console.log('Form submitted successfully');
  //       // انجام دیگر عملیات یا نمایش پیغام موفقیت آمیز بودن ارسال اطلاعات
  //     } else {
  //       console.error('Form submission failed');
  //       // نمایش پیغام خطا در صورت بروز خطا در ارسال اطلاعات
  //     }
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //     // نمایش پیغام خطا در صورت بروز خطا در ارسال اطلاعات
  //   }
  // };
  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/orders',
        data
      );
      console.log('Response:', response);
      // انجام دیگر عملیات یا نمایش پیغام موفقیت آمیز بودن ارسال اطلاعات
    } catch (error) {
      console.error('Error submitting form:', error);
      // نمایش پیغام خطا در صورت بروز خطا در ارسال اطلاعات
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
        cartItems,
        setCartItems,
        addToCart,
        // removeFromCart,
        // clearCart,
        fetchProductsCartItems,
        handleFormSubmit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
