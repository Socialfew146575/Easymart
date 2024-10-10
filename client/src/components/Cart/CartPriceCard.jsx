import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions/cartActions"; // Assuming you have this action
import toast, { Toaster } from 'react-hot-toast';

const CartPriceCard = () => {
    const dispatch = useDispatch();
    const { cart, cartItemsCount } = useSelector((state) => state.cart);

    const [totalPrice, setTotalPrice] = useState("0.00");
    const [shippingCharges, setShippingCharges] = useState(0);
    const [tax, setTax] = useState(0);
    const [totalWithCharges, setTotalWithCharges] = useState("0.00");

    // Handle out-of-stock items
    useEffect(() => {
        const outOfStockItems = cart.filter(item => item.product.stock <= 0);
        if (outOfStockItems.length > 0) {
            toast.error("Some items are out of stock. Please remove them to continue.");
            outOfStockItems.forEach(item => {
                dispatch(removeFromCart(item.product._id)); // Removes out-of-stock items
            });
        }
    }, [cart, dispatch]);

    useEffect(() => {
        const newSubtotal = cart.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
        );

        // Calculate the shipping charges
        const newShippingCharges = newSubtotal > 1000 ? 200 : 0;

        // Calculate the tax (18% of subtotal)
        const newTax = newSubtotal * 0.18;

        // Calculate the total price (subtotal + tax + shipping charges)
        const newTotal = newSubtotal + newTax + newShippingCharges;

        setTotalPrice(newSubtotal.toFixed(2));
        setShippingCharges(newShippingCharges.toFixed(2));
        setTax(newTax.toFixed(2));
        setTotalWithCharges(newTotal.toFixed(2));
    }, [cart]);
    

    return (
        <div className="w-full flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg text-gray-600 text-xs">
            {/* Delivery Options */}
            <div className="flex gap-4 items-center mb-4">
                <span className="font-semibold text-gray-500">Delivery</span>
                <span className={`p-2 text-xs rounded-lg ${shippingCharges === "0.00" ? 'bg-green-100 text-green-600 border-2 border-green-300 px-8' : 'bg-gray-200 text-gray-600'} border`}>
                    {shippingCharges === "0.00" ? "Free" : `₹ ${shippingCharges}`}
                </span>
            </div>

            <div className="border-t border-dotted"></div>

            {/* Promo Code */}
            <div className="flex gap-2">
                <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Promocode"
                />
                <button className="p-2 bg-gray-200 text-sm rounded-md">Apply</button>
            </div>
            <p className="text-xs text-gray-500 mb-2">20% off discount</p>

            <div className="border-t border-dotted"></div>

            {/* Price Details */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <span className="text-sm">Subtotal</span>
                    <span className="text-sm font-semibold">₹ {totalPrice}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm">Discount</span>
                    <span className="text-sm font-semibold">₹ 0.00</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm">Shipping Charges</span>
                    <span className="text-sm font-semibold">₹ {shippingCharges}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm">Tax (18%)</span>
                    <span className="text-sm font-semibold">₹ {tax}</span>
                </div>
            </div>

            <div className="border-t border-dotted"></div>

            {/* Total Price */}
            <div className="flex justify-between mt-4">
                <span className="text-sm font-semibold">Total:</span>
                <span className="text-lg font-semibold text-black">₹ {totalWithCharges}</span>
            </div>

            {/* Buttons */}
            <a href="/checkout-details" className="w-full">
                <button
                    className="w-full p-3 bg-blue-600 text-white rounded-md text-sm font-semibold mt-4"
                >
                    Proceed to checkout | ₹ {totalWithCharges}
                </button>
            </a>

            <a href="/" className="w-full">
                <button className="w-full p-3 mt-2 border border-gray-300 text-gray-600 rounded-md text-sm font-semibold">
                    Continue shopping
                </button>
            </a>

            <Toaster />
        </div>
    );
};

export default CartPriceCard;
