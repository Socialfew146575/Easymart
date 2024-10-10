import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star'; // Import star icon

const StyledSlider = styled(Slider)({
    color: "#316afb"
});

const Filter = ({ initialCategory, initialPriceRange, initialRating, handleApplyFilters, handleClearFilters }) => {
    const categories = [
        "Laptops",
        "Smartphones",
        "Ipad"
    ];

    const [category, setCategory] = useState(initialCategory);
    const [priceRange, setPriceRange] = useState(initialPriceRange);
    const [rating, setRating] = useState(initialRating);

    const handleCategorySelect = (e) => {
        setCategory(e.target.value);
    };

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleClearFilterClick = () => {
        setRating(2);
        setPriceRange([0, 10000]);
        setCategory("");
        handleClearFilters();
    };

    // Function to create stars based on the rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <div key={i} className="flex items-center text-xs justify-end w-full">
                    <StarIcon
                        style={{
                            color: i < rating ? '#FFD700' : '#e0e0e0', // Gold for filled stars, gray for empty
                            fontSize: '12px',
                        }}
                    />
                    <span className="ml-1">{i + 1}</span> {/* Add the rating number next to the star */}
                </div>
            );
        }
        return stars;
    };

    return (
        <div className='flex flex-col px-4 gap-2 font-sans border-2 rounded-lg w-full bg-white mb-4 xl:mb-0 transition-all ease-in-out  pb-6'>
            <h1 className='font-semibold text-sm pt-3 font-opensans'>Filter</h1>

            <div className='flex flex-col font-sans gap-0 border-b-2 pb-4'>
                <p className='font-semibold text-xs'>Ratings</p>
                <StyledSlider
                    getAriaLabel={() => 'Rating'}
                    value={rating}
                    onChange={handleRatingChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                />
                {/* Display the stars and numbers below the slider */}
                <div className='flex gap-5 ml-7 mt-2'>
                    {renderStars(rating)}
                </div>
            </div>

            <div className='flex flex-col font-sans gap-1 text-xs py-3'>
                <p className='font-semibold text-xs '>Category</p>
                {categories.map((cat, index) => (
                    <div key={index} className='flex items-center gap-3 font-light'>
                        <input
                            type="radio"
                            name="category"
                            id={`category-${index}`}
                            value={cat}
                            checked={cat === category}
                            className="custom-radio"
                            onChange={handleCategorySelect}
                        />
                        <label htmlFor={`category-${index}`}>{cat}</label>
                    </div>
                ))}
            </div>

            <hr className='w-full rounded-md h-[2px] border-none bg-[#e9ecef]' />

            <div className='flex flex-col font-sans gap-1 py-4'>
                <p className='font-semibold text-xs'>Price Range</p>
                <StyledSlider
                    getAriaLabel={() => 'Price range'}
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={25000}
                />
            </div>

            <hr className='w-full rounded-md h-[2px] border-none bg-[#e9ecef]' />
            <button className='p-2 mt-6 px-6 xl:px-2 bg-[#316afb] text-white rounded-md  w-fit xl:w-full mx-auto hover:bg-[#285db5] transition duration-300 ease-in-out' onClick={() => handleApplyFilters(category, priceRange, rating)}>
                Apply Filters
            </button>

            <button className='p-2 px-6 xl:px-2 text-[#316afb] border-2 border-[#316afb] bg-white rounded-md  w-fit xl:w-full mx-auto hover:bg-[#e0e0e0] transition duration-300 ease-in-out' onClick={handleClearFilterClick}>
                Clear Filters
            </button>


        </div>
    );
};

export default Filter;
