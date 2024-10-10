import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import { IoCartSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import toast, { Toaster } from 'react-hot-toast';

const Product = ({ product }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "#2e6afd",
        value: product.ratings,
        isHalf: true,
        size: 14
    };

    const { cart, error: cartError } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cartError) {
            toast.error(cartError);
        }
    }, [cartError]);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (product.stock <= 0) return;

        dispatch(addToCart(product, 1));

        if (cart.some(item => item.product.id === product.id)) {
            toast.success("Product Added to Cart.");
        }
    };

    return (
        <>
            <Link to={`/product/${product._id}`} className='rounded-xl overflow-hidden w-56 h-80 flex flex-col no-underline text-[rgb(48,48,48)]  pb-4 p-3 border-[#bebaba] border-[1px] shadow-md'>
                <img src={product.images[0].url} alt={product.name} className='w-48 h-32 object-cover rounded-xl mb-4 mx-auto ' />

                <p className='font-["Roboto"] text-sm font-bold mb-1'>{product.name}</p>
                <p className='font-["Roboto"] text-xs font-medium text-gray-400 mb-1 '>{product.description.substring(0, 50)}...</p>

                {/* Add category name here */}
                <p className='font-["Roboto"] text-xs text-gray-600 mb-2'>{product.category}</p>

                <div className='flex justify-between items-center mb-4 mt-auto'>
                    <span className='font-sans text-xs font-semibold'>₹{product.price}</span>
                    <ReactStars {...options} />
                </div>

                <div className='flex justify-between items-center mt-auto'>
                    <span className={`text-[0.5rem] py-[0.3] px-2 rounded-sm ${product.stock > 0 ? "bg-[#d9ed92] w-[50px] text-[#4c956c]" : "bg-[#ff758f] w-[65px] text-[#a4133c]"}`}>
                        {product.stock > 0 ? "In-Stock" : "Out Of Stock"}
                    </span>

                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                        className={`w-6 h-6 ${product.stock > 0 ? "bg-blue-600" : "bg-red-600"} rounded-full flex items-center justify-center ${product.stock <= 0 && "cursor-not-allowed opacity-50"}`}
                    >
                        <IoCartSharp size={16} color='white' />
                    </button>
                </div>
            </Link>
            <Toaster />
        </>
    );
};

export default Product;
