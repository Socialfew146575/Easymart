import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardDoubleArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowRight } from "react-icons/md";

const Navigation = ({ currentPage, totalPages, handlePageChange }) => {
    // console.log(currentPage, totalPages);

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <div className='w-full flex justify-center items-center mb-2 text-md gap-3 '>
            {/* Previous buttons */}
            <span
                className={`p-1 border border-gray-300 rounded-md cursor-pointer ${isFirstPage ? 'bg-white text-gray-400' : 'bg-white text-light-blue-500'}`}
                onClick={() => !isFirstPage && handlePageChange(1)}
            >
                <MdKeyboardDoubleArrowLeft className={`${isFirstPage ? 'text-gray-400' : 'text-light-blue-500'}`} />
            </span>
            <span
                className={`p-1 border border-gray-300 rounded-md cursor-pointer ${isFirstPage ? 'bg-white text-gray-400' : 'bg-white text-light-blue-500'}`}
                onClick={() => !isFirstPage && handlePageChange(currentPage - 1)}
            >
                <MdKeyboardArrowLeft className={`${isFirstPage ? 'text-gray-400' : 'text-light-blue-500'}`} />
            </span>

            {/* Current page indicator */}
            <span className='p-2 text-xs text-blue-600 font-bold rounded-md'>{currentPage}</span>

            {/* Next buttons */}
            <span
                className={`p-1 border border-gray-300 rounded-md cursor-pointer ${isLastPage ? 'bg-white text-gray-400' : 'bg-white text-light-blue-500'}`}
                onClick={() => !isLastPage && handlePageChange(currentPage + 1)}
            >
                <MdKeyboardArrowRight className={`${isLastPage ? 'text-gray-400' : 'text-light-blue-500'}`} />
            </span>
            <span
                className={`p-1 border border-gray-300 rounded-md cursor-pointer ${isLastPage ? 'bg-white text-gray-400' : 'bg-white text-light-blue-500'}`}
                onClick={() => !isLastPage && handlePageChange(totalPages)}
            >
                <MdKeyboardDoubleArrowRight className={`${isLastPage ? 'text-gray-400' : 'text-light-blue-500'}`} />
            </span>
        </div>
    );
};

export default Navigation;
