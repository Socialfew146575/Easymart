import React, { useState } from 'react';
import ReactStars from "react-rating-stars-component";
const ReviewDialog = ({ onClose }) => {
    const [reviewText, setReviewText] = useState('');
    const [rating,setRating] = useState(0)
    const handleSubmit = () => {
        // Handle the submit logic here, e.g., dispatch an action or call an API
        console.log("Review Submitted: ", reviewText);
        console.log("Rating",rating)
        onClose(); // Close the dialog after submission
    };

    const handleDialogClick = (e) => {
        // Prevent the dialog click from closing the modal
        e.stopPropagation();
    };

    const options = {
        edit: true, // Ensures the rating is editable
        color: "rgba(20,20,20,0.1)",
        activeColor: "#ffd700",
        value: rating, // The current rating value
        isHalf: true, // Allows half-star ratings
        size: window.innerWidth < 600 ? 24 : 32,
        
    };


    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.75)]' onClick={onClose}>
            <div
                className='bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 relative'
                onClick={handleDialogClick}
            >
                <button
                    className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none'
                    onClick={onClose}
                >
                    &#x2715; {/* Close icon */}
                </button>
                <h2 className='text-2xl font-semibold mb-4'>Submit Your Review</h2>
                <ReactStars {...options} onChange={(newRating)=>setRating(newRating)} />
                <textarea
                    className='w-full p-2 border border-gray-300 rounded-md mt-4 focus:outline-none'
                    rows='4'
                    placeholder='Write your review here...'
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
                <div className='flex justify-end mt-4'>
                    <button
                        className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition ease-in-out'
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition ease-in-out ml-2'
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewDialog;
