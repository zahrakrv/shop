import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import React, { Component } from 'react';
import { MutationObserver, useMutation, useQuery } from '@tanstack/react-query';

import dynamic from 'next/dynamic';
import Cookies from 'universal-cookie';
import { request } from '@/utils/request';

const createProduct = async (productData) => {
  const cookie = new Cookies();
  const response = await request.post(
    'http://localhost:8000/api/products',
    productData,
    {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${productData._boundary}`,
        Authorization: `Bearer ${cookie.get('adminToken')}`,
      },
    }
  );
  return response.data;
};
const AddDataModal = ({ isOpenAdding, onClose }) => {
  // const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  // const [data, setData] = useState<string>('');

  // useEffect(() => {
  //   setEditorLoaded(true);
  // }, []);
  /////mutate (send) data to database
  const mutation = useMutation(createProduct);
  // const [productAdded, setProductAdded] = useState({
  //   name: '',
  //   price: 0,
  //   quantity: 0,
  //   brand: '',
  //   category: '',
  //   subcategory: '',
  //   image: [],
  // });

  const [category, setCategory] = useState([]);

  // const handleInputChange = (e) => {
  //   setCategory(e.target.value);
  // };
  ////show added images
  // const handleImageSelect = (e: React.ChangeEvent<HTMLFormElement>) => {
  //   if (e.target.files) {
  //     const filesArray = Array.from(e.target.files).map((file) =>
  //       URL.createObjectURL(file)
  //     );
  //     setProductAdded({ ...productAdded, images: filesArray });
  //   }
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e.currentTarget.elements);
    // const {
    //   name,
    //   price,
    //   quantity,
    //   brand,
    //   category,
    //   subcategory,
    // } = e.currentTarget.elements;
    const image = e.currentTarget.elements.image.files;
    const productData = new FormData();
    const elements = e.currentTarget.querySelectorAll(
      'input:not([type="file"]), select, textarea'
    );
    elements.forEach((element) => {
      productData.append(element.name, element.value);
    });
    for (let i = 0; i < image.length; i++) {
      productData.append('images', image[i]);
    }
    console.log(Object.fromEntries(productData));
    MutationObserver.mutate(productData);
  };
  const fetchData = async (url: string) => {
    const response = await request.get(url);
    return response.data.data;
  };

  const {
    data: data1,
    isLoading: isLoading1,
    isError: isError1,
    error: error1,
  } = useQuery(['data1'], () => fetchData('/categories'));
  console.log(data1);

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useQuery(
    ['data2', category],
    () => fetchData(`/categories?category=${category}`),
    { enabled: !!category }
  );
  console.log(data2);

  if (isLoading1) {
    return <div>Loading...</div>;
  }

  //////textEditor
  const Editor = dynamic(() => import('../Editor'), { ssr: false });
  return (
    <>
      <Dialog open={isOpenAdding} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-xl rounded bg-white">
            <Dialog.Title>
              <div className="flex justify-between p-2">
                <span> افزودن / ویرایش کالا </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                  onClick={onClose}
                >
                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                </svg>
              </div>
            </Dialog.Title>
            <form className="p-4" onSubmit={handleSubmit}>
              <div className="flex justify-between items-center">
                <div className="my-4 flex flex-col gap-3 justify-start">
                  <label> نام کالا </label>
                  <input
                    className="border border-teal-950 rounded bg-teal-50 p-2"
                    type="text"
                    name="name"
                  ></input>
                </div>
                <div className="my-4 flex flex-col gap-3 justify-start">
                  <label> قیمت </label>
                  <input
                    className="border border-teal-950 rounded bg-teal-50 p-2"
                    type="text"
                    name="price"
                  ></input>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="my-4 flex flex-col gap-3 justify-start">
                  <label> موجودی</label>
                  <input
                    className="border border-teal-950 rounded bg-teal-50 p-2"
                    type="text"
                    name="quantity"
                  ></input>
                </div>
                <div className="my-4 flex flex-col gap-3 justify-start">
                  <label> برند</label>
                  <input
                    className="border border-teal-950 rounded bg-teal-50 p-2"
                    type="text"
                    name="brand"
                  ></input>
                </div>
              </div>

              <div className="my-4">
                <label> دسته بندی </label>
                <br></br>
                <select
                  name="category"
                  //  onChange={handleInputChange}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option> انتخاب دسته بندی </option>
                  {data1?.categories.map((item) => {
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>;
                  })}
                </select>
              </div>
              <div className="my-4">
                <label> زیرگروه</label>
                <br></br>
                <select
                  name="subcategory"
                  // onChange={handleInputChange}
                >
                  <option> انتخاب زیر گروه </option>
                  {category.length !== 0
                    ? data2?.subcategories.map((isub) => {
                        <option key={isub._id} value={isub._id}>
                          {isub.name}
                        </option>;
                      })
                    : null}
                </select>
              </div>
              <div className="my-4">
                <label> تصویر کالا </label>
                <input
                  type="file"
                  name="image"
                  multiple
                  // onChange={handleImageSelect}
                >
                  {/* {productAdded?.images.map((image) => (
                    <img key={image} src={image} alt="product" />
                  ))} */}
                </input>
              </div>
              {/* /////////////////////////////////////////text editor */}
              <Editor value={'توضیحات'} onChange={(v) => console.log(v)} />
              <div className="flex justify-center gap-4">
                <button
                  className="mb-3 p-3 rounded bg-teal-400"
                  type="submit"
                  // onClick={handleSubmit}
                >
                  افزودن
                </button>
                <button
                  className="mb-3 p-3 rounded bg-red-400"
                  onClick={onClose}
                >
                  انصراف
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default AddDataModal;
