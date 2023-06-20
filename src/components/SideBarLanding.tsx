import { useState, useContext, useEffect } from 'react';
import { GlobalContext,GlobalContextType,SubCategoryType } from './../pages/api/context/GlobalContext';
import axios from 'axios';
import Link from 'next/link';


const SideBarLanding = () => {


  const {
    categories,
    subCategory,
    setCategories,
    setSubCategory,
    fetchCategories,
    fetchSubCategories,
  } = useContext<GlobalContextType>(GlobalContext);

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res.data.data.categories);
    });
  }, []);

  useEffect(() => {
    fetchSubCategories().then((response) => {
      setSubCategory(response.data.data.subcategories);
    });
  }, []);
  return (
    <>
      <div>
        {categories?.map((category) => (
          <div key={category._id}>
            <Link
                // href={`/landing?category=${category.name}&categoryId=${category._id}`}
                href={{pathname:'/landing', query:{category:category.name, categoryId:category._id}}}
              >
            <h2 className='hel mt-10 mb-6 mr-2 text-xl'>{category.name}</h2>
            </Link>
            <ul>
              {subCategory?
              .filter((subcategory:SubCategoryType) => subcategory.category === category._id)
                .map((subcategory:SubCategoryType) => (
                  <Link
                  key={subcategory._id}
                  // href={`/landing?category=${category.name}&categoryId=${category._id}&subCategory=${subcategory.name}&subCategoryId=${subcategory._id}`}
                href={{pathname:'/landing', query:{category:category.name, categoryId:category._id,subCategory: subcategory.name,subCategoryId:subcategory._id}}}

                >
                  <li key={subcategory._id} className='py-2 cursor-pointer'>{subcategory.name}</li>
                  </Link>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default SideBarLanding;
