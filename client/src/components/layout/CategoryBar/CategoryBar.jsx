import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const categories = [
  "Laptops",
  "Smartphones",
  "Ipad",
  "All"
];

const CategoryBar = () => {
  // Get the current path using useLocation
  const { pathname } = useLocation();
  if (['/contact', '/login', '/checkout-details', '/register', '/forgotPassword', '/profile', '/cart' , '/products',].includes(pathname) || pathname.split("/")[1] === "password"|| pathname.split("/")[1] === "orders") {
    return null;
  }
  return (
    <div className='flex px-8 py-2 text-sm gap-8'>
      {categories.map((category) => {
        const categoryLink = category === "All"
          ? "/products"
          : `/products?category=${category}`;

        return (
          <Link key={category} to={categoryLink}>
            <span className='cursor-pointer hover:text-blue-500'>
              {category}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default CategoryBar;
