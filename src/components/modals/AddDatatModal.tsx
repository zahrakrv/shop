import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import React, { Component } from 'react';
import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Context } from '@ckeditor/ckeditor5-core';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import dynamic from 'next/dynamic';

const AddDataModal = ({ isOpenAdding, onClose }) => {
  // const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  // const [data, setData] = useState<string>('');

  // useEffect(() => {
  //   setEditorLoaded(true);
  // }, []);
  /////mutate (send) data to database
  const mutation = useMutation([]);
  const [productAdded, setProductAdded] = useState({
    nameProduct: '',
    priceProduct: 0,
    quantityProduct: 0,
    brand: '',
    category: '',
    subCategory: '',
    image: [],
  });

  ////show added images
  const handleImageSelect = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setProductAdded({ ...productAdded, images: filesArray });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e.currentTarget.elements);
    // const {
    //   nameProduct,
    //   priceProduct,
    //   quantityProduct,
    //   brand,
    //   category,
    //   subCategory,
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
                    name="nameProduct"
                  ></input>
                </div>
                <div className="my-4 flex flex-col gap-3 justify-start">
                  <label> قیمت </label>
                  <input
                    className="border border-teal-950 rounded bg-teal-50 p-2"
                    type="text"
                    name="priceProduct"
                  ></input>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="my-4 flex flex-col gap-3 justify-start">
                  <label> موجودی</label>
                  <input
                    className="border border-teal-950 rounded bg-teal-50 p-2"
                    type="text"
                    name="quantityProduct"
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
                <select name="category">
                  <option> adff </option>
                  <option> aref </option>
                </select>
              </div>
              <div className="my-4">
                <label> زیرگروه</label>
                <br></br>
                <select name="subCategory">
                  <option> rrrrr </option>
                  <option> ttttt </option>
                </select>
              </div>
              <div className="my-4">
                <label> تصویر کالا </label>
                <input
                  type="file"
                  name="image"
                  multiple
                  onChange={handleImageSelect}
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
