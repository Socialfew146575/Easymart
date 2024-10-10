import React from 'react';
import { RiAddFill, RiDeleteBin4Fill, RiSubtractLine } from "react-icons/ri";
import { increment, decrement, removeFromCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const CartCard = ({ cartItem }) => {
    const dispatch = useDispatch();

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(cartItem.product._id));
        toast.success('Product removed from Cart.');
    };

    const handleIncrement = () => {
        dispatch(increment(cartItem.product._id));
    };

    const handleDecrement = () => {
        if (cartItem.quantity > 1) {
            dispatch(decrement(cartItem.product._id));
        }
    };

    // Determine stock status
    const stockStatus = cartItem.product.stock > 0 ? "In Stock" : "Out of Stock";
    const stockClass = cartItem.product.stock > 0 ? "text-green-500" : "text-red-500";

    return (
        <div className="p-4 flex gap-6 border-b-2 items-center ">
            {/* Product Image */}
            <div className="w-28 h-28 md:w-36 md:h-36 border-2 rounded-lg flex items-center justify-center bg-gray-100">
                <img
                    src={cartItem.product.images[0].url}
                    alt={cartItem.product.name}
                    className="object-contain w-full h-full p-4"
                />
            </div>

            {/* Product Details */}
            <div className="w-full flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg text-gray-700 font-semibold">{cartItem.product.name}</h2>
                    <h2 className="text-lg text-blue-600 font-bold">₹{(cartItem.product.price * cartItem.quantity).toFixed(2)}</h2>
                </div>

                {/* Price & Additional Info */}
                <div className="mt-2 flex gap-4 items-center text-sm text-gray-500">
                    <span>₹{cartItem.product.price.toFixed(2)}</span>
                    <span>|</span>
                    <span>{cartItem.product.category}</span>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                        <span>{cartItem.product.ratings.toFixed(1)} ⭐</span>
                        <span>({cartItem.product.numberOfReviews} reviews)</span>
                    </span>
                </div>

                {/* Stock Status */}
                <div className={`mt-2 text-sm font-medium ${stockClass}`}>{stockStatus}</div>

                {/* Quantity Control & Delete Button */}
                <div className="mt-4 flex justify-between items-center">
                    {/* Quantity Controls */}
                    <div className='flex shadow-md'>
                        {/* Decrement Button */}
                        <button
                            className="w-8 h-8 rounded-l-md cursor-pointer text-gray-500 border border-gray-300 "
                            onClick={handleDecrement}
                            disabled={cartItem.quantity === 1}
                        >
                            -
                        </button>

                        {/* Quantity Input */}
                        <input
                            type="number"
                            value={cartItem.quantity}
                            className="w-12 h-8 text-center border border-gray-300 "

                        />

                        {/* Increment Button */}
                        <button
                            className="w-8 h-8 rounded-r-md cursor-pointer  border border-gray-300 text-blue-600 "
                            onClick={handleIncrement}

                        >
                            +
                        </button>
                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={handleRemoveFromCart}
                        className="flex items-center text-gray-500  hover:text-red-600 gap-1 font-semibold"
                    >
                        <RiDeleteBin4Fill size={20} />
                        Remove
                    </button>
                </div>
            </div>

            <Toaster />
        </div>
    );
};

export default CartCard;

