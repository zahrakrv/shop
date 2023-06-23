import { Dialog } from '@headlessui/react';
import React, { Component, useEffect, useState, useRef, useMemo } from 'react';
import { MutationObserver, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Cookies from 'universal-cookie';
import { request } from '@/utils/request';
import Previews from './Previews';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';

const createProduct = async (productData) => {
  const cookie = new Cookies();
  const response = await request.post(
    'http://localhost:8000/api/products',
    productData,
    {
      // headers: {
      //   'Content-Type': `multipart/form-data; boundary=${productData._boundary}`,
      //   Authorization: `Bearer ${cookie.get('adminToken')}`,
      // },
      headers: {
        'Content-Type':
          'multipart/form-data; boundary=' + productData._boundary,
        Authorization: 'Bearer ' + cookie.get('adminToken'),
      },
    }
  );
  return response.data;
};

const updateProduct = async (id, productData) => {
  try {
    const cookie = new Cookies();
    const response = await request.patch(
      'http://localhost:8000/api/products/' + id,
      productData
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const AddDataModal = ({
  isOpenAdding,
  onClose,
  selectedProduct,
  isEditing,
  fetchingData,
  page,
}) => {
  // console.log(selectedProduct);
  // console.log(isEditing);
  // const refTextEditor = useRef(null);
  ////editor
  const [editor, setEditor] = useState('');
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    register,
    reset,
  } = useForm();
  // const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  // const [data, setData] = useState<string>('');

  // useEffect(() => {
  //   setEditorLoaded(true);
  // }, []);
  /////mutate (send) data to database
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      reset();
      // router.push(router.pathname);
      onClose();
    },
  });

  const mutationEdit = useMutation({
    mutationFn: ({ id, productData }) => updateProduct(id, productData),
    onSuccess: () => {
      reset();
      onClose();
      // updateProduct(id, productData);
    },
  });

  const [category, setCategory] = useState();
  const [subcategory, setSubcategory] = useState([]);
  const [description, setDescription] = useState('توضیحات');
  /////thumbnail
  const [currentThumbnailName, setCurrentThumbnailName] = useState([]);
  ///image
  const [currentImages, setCurrentImages] = useState([]);
  const [imgName, setImgName] = useState([]);
  const [reload, setReload] = useState();
  const [open, setOpen] = useState(true);
  // console.log(category);

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
  // const Editor = dynamic(() => import('../EditorQuil'), { ssr: false });
  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const image = e.currentTarget.elements.image.files;
  //   const thumbnail = e.currentTarget.elements.thumbnail.files;

  //   const productData = new FormData();
  //   const elements = e.currentTarget.querySelectorAll(
  //     'input:not([type="file"]), select, textarea'
  //   );
  //   elements.forEach((element) => {
  //     productData.append(element.name, element.value);
  //   });
  //   for (let i = 0; i < image.length; i++) {
  //     productData.append('images', image[i]);
  //   }
  //   for (let i = 0; i < thumbnail.length; i++) {
  //     productData.append('thumbnail', thumbnail[i]);
  //   }
  //   // imgName.map((item) => productData.append('images', item));
  //   // axios.post('http://localhost:8000/api/products', productData);
  //   // setReload(!reload);
  //   // setOpen(false);
  //   // imgName.map((item) => productData.append('thumbnail', item));
  //   // axios.post('http://localhost:8000/api/products', productData);
  //   // setReload(!reload);
  //   // setOpen(false);

  //   productData.append('description', description);
  //   // console.log(Object.fromEntries(productData));
  //   isEditing
  //     ? mutationEdit.mutate(
  //         {
  //           id: selectedProduct._id,
  //           productData: productData,
  //         },
  //         {
  //           onSuccess: () => {
  //             fetchingData(page + 1);
  //           },
  //         }
  //       )
  //     : mutation.mutate(productData, {
  //         onSuccess: () => {
  //           fetchingData(page + 1);
  //         },
  //       });
  // };

  const onSubmit = (data, e) => {
    const {
      name,
      price,
      quantity,
      brand,
      category,
      subcategory,
      image,
      thumbnail,
    } = data;
    // const elements = e.currentTarget;
    // const image = e.currentTarget.elements.image.files;
    // const thumbnail = e.currentTarget.elements.thumbnail.files;
    const productData = new FormData();
    productData.append('name', name);
    productData.append('price', price);
    productData.append('quantity', quantity);
    productData.append('brand', brand);
    productData.append('category', category);
    productData.append('description', editor);

    // productData.append('subcategory', subcategory);
    productData.append('subcategory', subcategory || []);

    for (let i = 0; i < image?.length; i++) {
      productData.append('images', image[i]);
    }
    // if (thumbnail) {
    //   productData.append('thumbnail', thumbnail[0]);
    // }
    // productData.append('description', description);

    isEditing
      ? mutationEdit.mutate(
          {
            id: selectedProduct._id,
            productData: productData,
          },
          {
            onSuccess: () => {
              fetchingData(page + 1);
            },
          }
        )
      : mutation.mutate(productData, {
          onSuccess: () => {
            fetchingData(page + 1);
          },
        });
  };

  const fetchData = async (url: string) => {
    const response = await request.get(url);
    // console.log(response.data);
    return response.data;
  };

  //category
  const {
    data: data1,
    isLoading: isLoading1,
    isError: isError1,
    error: error1,
  } = useQuery(['category1'], () => fetchData('/categories'));
  // console.log(data1);

  ////subcategory
  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
    refetch,
  } = useQuery(
    ['data2', category],
    () => fetchData(`/subcategories?category=${category}`),
    /////تا زمانی که کتگوری enable نیست، ساب کتگوری رو نگیر
    { enabled: !!category }
  );
  // console.log(data2);
  // console.log(data2?.data.subcategories);
  // console.log(data2);

  useEffect(() => {
    if (category) {
      refetch();
    }
  }, [category]);
  useEffect(() => {
    if (data2) {
      setSubcategory(data2?.data.subcategories);
    }
  }, [data2]);

  const handleCategoryChange = (categoryId: number) => {
    setCategory(categoryId);
    // console.log(categoryId);
  };

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
  };

  // if (isLoading1) {
  //   return <div>Loading...</div>;
  // }

  useEffect(() => {
    if (selectedProduct) {
      setValue('name', selectedProduct.name);
      setValue('price', selectedProduct.price);
      setValue('brand', selectedProduct.brand);
      setValue('quantity', selectedProduct.quantity);
      setValue('category', selectedProduct.category._id);
      setValue('subcategory', selectedProduct.subcategory._id);
      setCategory(selectedProduct.category._id);
      console.log(selectedProduct.category.name);
      // setSubcategory(selectedProduct.subcategory);
    }
  }, [selectedProduct]);
  //////textEditor
  // const Editor = dynamic(() => import('../Editor'), { ssr: false });
  // const Editor = dynamic(() => import('../EditorQuil'), { ssr: false });
  const ReactQuill = useMemo(
    () => dynamic(import('react-quill'), { ssr: false }),
    []
  );

  /////thumbnail
  const fileInputRef2 = useRef(null);
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]; // for (let i = 0; i < files.length; i++) { //   const file = files[i]; //   console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setCurrentThumbnailName(reader.result);
    };
    reader.onerror = () => {
      console.log(reader.error);
    };
    const imageName2 = e.currentTarget.files;
    const entries = Object.entries(imageName2);
    const Array = entries.map((item) => item[1]);
    setCurrentThumbnailName(Array[0]);
  };
  /////image
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = [...currentImages];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setCurrentImages([...currentImages, ...newImages]);
        }
      };
      reader.readAsDataURL(files[i]);
    }

    const imageName2 = e.currentTarget.files;
    const entries = Object.entries(imageName2);
    const Array = entries.map((item) => item[1]);
    setImgName(Array);
  };

  ///delete picture
  const handleImageDelete = (index) => {
    const imagesCopy = [...currentImages];
    imagesCopy.splice(index, 1);
    setCurrentImages(imagesCopy);
  };
  return (
    <>
      <Dialog open={isOpenAdding} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex overflow-y-auto items-center justify-center px-4 mb-3">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-xl rounded bg-white">
              <Dialog.Title>
                <div className="flex justify-between p-2">
                  <span> افزودن / ویرایش کالا </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    onClick={onClose}
                    className="fill-red-500"
                  >
                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                  </svg>
                </div>
              </Dialog.Title>
              <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                  <div className="my-3 flex flex-col gap-3 justify-start">
                    {/* <label> نام کالا </label> */}
                    <Controller
                      control={control}
                      name="name"
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name } }) => {
                        return (
                          <input
                            // {...field}
                            className="border border-teal-950 rounded bg-teal-50 p-2"
                            type="text"
                            name={name}
                            onChange={onChange}
                            value={value}
                            placeholder="نام کالا"
                          />
                        );
                      }}
                    />
                    {errors.name && (
                      <p className="text-red-500"> نام کالا الزامیست</p>
                    )}
                  </div>
                  <div className="my-3 flex flex-col gap-3 justify-start">
                    {/* <label> قیمت </label> */}
                    <Controller
                      control={control}
                      name="price"
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name } }) => {
                        return (
                          <input
                            // {...field}
                            className="border border-teal-950 rounded bg-teal-50 p-2"
                            type="text"
                            name={name}
                            onChange={onChange}
                            value={value}
                            placeholder="قیمت"
                          />
                        );
                      }}
                    />
                    {errors.price && (
                      <p className="text-red-500"> قیمت الزامیست</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="my-3 flex flex-col gap-3 justify-start">
                    {/* <label> موجودی</label> */}
                    <Controller
                      control={control}
                      name="quantity"
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name } }) => {
                        return (
                          <input
                            // {...field}
                            className="border border-teal-950 rounded bg-teal-50 p-2"
                            type="text"
                            name={name}
                            onChange={onChange}
                            value={value}
                            placeholder="تعداد"
                          />
                        );
                      }}
                    />
                    {errors.quantity && (
                      <p className="text-red-500"> تعداد کالا الزامیست</p>
                    )}
                  </div>
                  <div className="my-3 flex flex-col gap-3 justify-start">
                    {/* <label> برند</label> */}
                    <Controller
                      control={control}
                      name="brand"
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name } }) => {
                        return (
                          <input
                            // {...field}
                            className="border border-teal-950 rounded bg-teal-50 p-2"
                            type="text"
                            name={name}
                            onChange={onChange}
                            value={value}
                            placeholder="برند"
                          />
                        );
                      }}
                    />
                    {errors.brand && (
                      <p className="text-red-500"> نام برند الزامیست</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="my-3 ">
                    {/* <label> دسته بندی </label> */}
                    <br></br>
                    <Controller
                      control={control}
                      name="category"
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name } }) => {
                        return (
                          <select
                            // {...field}
                            value={value}
                            name={name}
                            onChange={(event) => {
                              handleCategoryChange(event.target.value);
                              onChange(event);
                            }}
                            className="border border-teal-950 rounded bg-teal-50 p-2"
                          >
                            <option value=""> انتخاب دسته بندی </option>
                            {isLoading1 ? (
                              <option>Loading...</option>
                            ) : isError1 ? (
                              <option>Error loading categories</option>
                            ) : (
                              data1?.data?.categories.map((item) => {
                                return (
                                  <option
                                    key={item._id}
                                    value={item._id}
                                    onClick={() => {
                                      setCategory(item._id);
                                    }}
                                  >
                                    {item.name}
                                  </option>
                                );
                              })
                            )}

                            {/* {data1?.categories.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    );
                    })} */}
                          </select>
                        );
                      }}
                    />
                    {errors.category && (
                      <p className="text-red-500"> دسته بندی الزامیست</p>
                    )}
                  </div>
                  <div className="my-3 ">
                    {/* <label> زیرگروه</label> */}
                    <br></br>
                    <select
                      className="border border-teal-950 rounded bg-teal-50 p-2"
                      // onChange={handleInputChange}
                      {...register('subcategory')}
                    >
                      {!selectedProduct && <option> انتخاب زیر گروه </option>}
                      {isLoading2 ? (
                        <option>Loading....</option>
                      ) : isError2 ? (
                        <option>Error loading subcategories</option>
                      ) : subcategory.length > 0 ? (
                        subcategory.map((isub) => {
                          return (
                            <option key={isub._id} value={isub._id}>
                              {isub.name}
                            </option>
                          );
                        })
                      ) : (
                        <option>زیرگروهی وجود ندارد</option>
                      )}
                      {/* {category.length !== 0 && data2 && data2.subcategories ? (
                    data2?.subcategories.map((isub) => {
                      return (
                        <option key={isub._id} value={isub._id}>
                          {isub.name}
                        </option>
                      );
                    })
                   ) : (
                    <option>زیرگروهی وجود ندارد</option>
                    )} */}
                    </select>
                    {errors.category && (
                      <p className="text-red-500"> زیر گروه الزامیست</p>
                    )}
                  </div>
                </div>
                <div className="my-4">
                  <label> تصویر </label>
                  <input
                    type="file"
                    name="image"
                    multiple
                    {...register('image', { required: !isEditing })}
                    className="input"
                  />
                  {errors.image && (
                    <span className="text-red-500">
                      {isEditing ? 'تصویر الزامی نیست' : 'تصویر الزامی است'}
                    </span>
                  )}
                </div>
                <div className="my-4">
                  <label> تصویر کوچک </label>
                  <input
                    type="file"
                    name="thumbnail"
                    {...register('thumbnail')}
                    className="input"
                  />
                  {errors.thumbnail && (
                    <span className="text-red-500">
                      {isEditing
                        ? 'تصویر کوچک الزامی نیست'
                        : 'تصویر کوچک الزامی است'}
                    </span>
                  )}
                </div>
                {/* /////thumbnail */}
                {/* <div className="flex flex-col gap-5 w-full">
                    <div className="flex gap-10">
                      <div>
                        <Image
                          src={currentThumbnailName}
                          alt=""
                          width={150}
                          height={150}
                        />
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef2}
                      onChange={handleThumbnailChange}
                      onClick={() => fileInputRef2.current?.click()}
                    />
                  </div> */}

                {/* //////img */}
                {/* <div className="flex flex-col gap-5 w-full">
                  <div className="flex gap-10">
                    {currentImages &&
                      currentImages.map((image, index) => (
                        <div key={index}>
                          <Image
                            src={image}
                            alt=""
                            onChange={(e) => handleInputChange(e)}
                            width={150}
                            height={150}
                          />
                          <button onClick={() => handleImageDelete(index)}>
                            Delete
                          </button>
                        </div>
                      ))}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    onClick={() => fileInputRef.current.click()}
                    multiple
                  />
                  </div> */}
                {/* <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => ( */}
                {/* <label> تصویر کالا </label>
                  <input
                    // {...field}
                    type="file"
                    name="image"
                    multiple
                    // onChange={handleImageSelect}
                  /> */}
                {/* )}
                  /> */}
                {/* {errors.category && <p> تصویر الزامیست</p>} */}
                {/* </div>
                <div className="my-4"> */}
                {/* <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => ( */}
                {/* <label> تصویر تامبنیل</label>
                  <input
                    // {...field}
                    type="file"
                    name="thumbnail"
                    multiple
                    // onChange={handleImageSelect}
                  /> */}
                {/* )}
                  /> */}
                {/* {errors.category && <p> تصویر تامبنیل الزامیست</p>} */}
                {/* </div> */}
                {/* {productAdded?.images.map((image) => (
                    <img key={image} src={image} alt="product" />
                  ))} */}
                {/* </input>
                </div> */}
                {/* /////////////////////////////////////////text editor */}
                {/* <Editor
                  value={description}
                  // defaultValue={description}
                  onChange={(v) => setDescription(v)}
                /> */}
                <ReactQuill
                  theme="snow"
                  value={editor}
                  placeholder="توضیحات"
                  onChange={(v) => setEditor(v)}
                />

                <div className="flex justify-center gap-4 mt-3">
                  <button
                    className="mb-3 p-3 rounded bg-teal-400"
                    type="submit"
                    // onClick={handleSubmit}
                    // onClick={onClose}
                  >
                    {isEditing ? 'ویرایش' : 'افزودن'}
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
        </div>
      </Dialog>
    </>
  );
};

export default AddDataModal;
