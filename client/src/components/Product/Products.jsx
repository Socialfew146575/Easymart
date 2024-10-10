import React, { useEffect, useState } from 'react';
import Product from '../Home/Product';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions/productActions';
import Navigation from './Navigation';
import Filter from './Filter';
import NoProduct from "../../images/product-not-found.png";
import { IoSearch } from "react-icons/io5";
import Search from './Search';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { useSearchParams } from 'react-router-dom';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, filteredProductsCount, resultPerPage } = useSelector((state) => state.product);
  const alert = useAlert();
  const totalPages = Math.ceil(filteredProductsCount / resultPerPage);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState(searchParams.get('search') || "");
  const [filters, setFilters] = useState({ category: searchParams.get('category') || "", priceRange: [0, 10000], rating: 0 });

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getAllProducts(keyword, currentPage, filters.category, filters.priceRange, filters.rating));
    window.scrollTo(0, 0);
  }, [dispatch, currentPage, keyword, filters, error, alert]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setKeyword(searchParams.get('search') || "");
  }, [searchParams]);

  const handleSearch = (keyword) => {
    setCurrentPage(1);
    setKeyword(keyword);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleApplyFilters = (category, priceRange, rating) => {
    setFilters({ category, priceRange, rating });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ category: "", priceRange: [0, 10000], rating: 2 });
  };

  // New function to toggle filter visibility
  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div className='flex flex-col py-6 xl:px-2'>
      <div className='xl:grid xl:grid-cols-5 xl:gap-2'>
        <div className='lg:col-span-1 bg-white rounded-md xl:p-4 sticky top-0 h-screen overflow-auto xl:flex hidden'>
          <Filter
            initialCategory={filters.category}
            initialPriceRange={filters.priceRange}
            initialRating={filters.rating}
            handleApplyFilters={handleApplyFilters}
            handleClearFilters={handleClearFilters}
          />
        </div>

        <div className='lg:col-span-4'>
          {/* Button to toggle filters on md and smaller screens */}
          <button className='mb-4 lg:hidden bg-blue-500 text-white p-2 rounded' onClick={toggleFilters}>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {showFilters && (
            <div className="flex xl:hidden">
              <Filter
                initialCategory={filters.category}
                initialPriceRange={filters.priceRange}
                initialRating={filters.rating}
                handleApplyFilters={handleApplyFilters}
                handleClearFilters={handleClearFilters}
              />
            </div>
          )}

          <div className='bg-white rounded-b-md px-2 relative min-h-screen'>
            {loading && <Loader />}
            {!loading && filteredProductsCount < 1 ? (
              <div className='flex items-center justify-center min-h-screen'>
                <img src={NoProduct} alt="No Product Found" />
              </div>
            ) : (
              <>
                <div className='bg-white p-2 relative'>
                  <p className='text-[#97a2b5] text-xs font-medium'>{products.length} ITEMS</p>
                </div>
                <div id="container" className='flex mx-2 lg:mx-auto lg:w-[80vw] flex-wrap gap-4 items-center max-w-[100%]'>
                  {products.map((product) => (
                    <Product product={product} key={product._id} />
                  ))}
                </div>
                <div className='absolute -bottom-4 -right-16 transform -translate-x-1/2'>
                  <Navigation
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
