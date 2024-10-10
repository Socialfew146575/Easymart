import React from 'react';
import { BiSolidUserCircle } from "react-icons/bi";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(0, 0, 0, 0.1)", // Subtle inactive stars
    activeColor: "#1e3a8a", // Your blue theme color
    value: review.rating,
    isHalf: true,
    size: 18,
  };

  return (
    <div className='bg-white shadow-md border-l-4 border-blue-500 p-4 mb-6 w-full rounded-md'>
      <div className='flex items-center gap-4'>
        <BiSolidUserCircle style={{ height: "3rem", width: "3rem", fill: "#1e3a8a" }} />
        <div>
          <span className='block text-sm font-semibold text-blue-900'>
            {review.user.name}
          </span>
          <span className='text-xs text-gray-500'>Verified Buyer</span>
        </div>
      </div>

      <div className='flex px-2 gap-2 mt-2'>
        <ReactStars {...options} />
      </div>

      <p className='px-2 text-base mt-3 font-bold text-gray-700'>{review.name}</p>

      <p className='mt-4 text-gray-600 text-sm px-2'>
        {review.comment || "No comment provided."}
      </p>
    </div>
  );
};

export default ReviewCard;
