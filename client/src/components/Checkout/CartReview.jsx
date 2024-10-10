import React, { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCity, FaFlag, FaPhone } from 'react-icons/fa'
import { CONFIRM_ORDER } from "../../redux/slices/cartSlice";
const CartReview = () => {

    const { shippingInfo, confirmedOrder, cart } = useSelector((state) => state.cart)
    const navigate = useNavigate()



    useEffect(() => {
        const isShippingInfoComplete = (info) => {
            return (
                info?.firstName &&
                info?.lastName &&
                info?.email &&
                info?.phoneNo &&
                info?.address &&
                info?.state &&
                info?.pinCode &&
                info?.country
            );
        };

        // Check if the shipping info is complete before navigating
        if (!isShippingInfoComplete(shippingInfo)) {
            navigate('/checkout-details?tab=shippingInfo');
        }
    }, [shippingInfo, navigate]);


    useEffect(() => {

        if (confirmedOrder) {
            navigate('/checkout-details?tab=checkout')
        }

    }, [confirmedOrder, navigate])

    return (
        <div className='flex lg:flex-row flex-col '>


            <div className="flex-1 py-16  px-8 rounded-lg text-black">
                <h2 className="font-semibold text-2xl mb-3 ">Review Shipping Information</h2>
                <hr className="" />

                <div className="space-y-6 pr-16 mt-8 text-blue-900">
                    {/* Name */}
                    <div className="flex items-center gap-4">
                        <FaUser className="text-blue-600" />
                        <div className="flex justify-between w-full">
                            <span className="text-blue-600 font-semibold">Name:</span>
                            <span className="font-medium text-gray-600">{shippingInfo.firstName} {shippingInfo.lastName}</span>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-4">
                        <FaEnvelope className="text-blue-600" />
                        <div className="flex justify-between w-full">
                            <span className="text-blue-600 font-semibold">Email:</span>
                            <span className="font-medium text-gray-600">{shippingInfo.email}</span>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-center gap-4">
                        <FaMapMarkerAlt className="text-blue-600" />
                        <div className="flex justify-between w-full">
                            <span className="text-blue-600 font-semibold">Address:</span>
                            <span className="font-medium text-gray-600">{shippingInfo.address}</span>
                        </div>
                    </div>

                    {/* City and State */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex items-center gap-4">
                            <FaCity className="text-blue-600" />
                            <div className="flex justify-between w-full">
                                <span className="text-blue-600 font-semibold">City:</span>
                                <span className="font-medium text-gray-600">{shippingInfo.city || '--'} </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaFlag className="text-blue-600" />
                            <div className="flex justify-between w-full">
                                <span className="text-blue-600 font-semibold">State:</span>
                                <span className="font-medium text-gray-600">{shippingInfo.state}</span>
                            </div>
                        </div>
                    </div>

                    {/* Country and ZIP */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex items-center gap-4">
                            <FaFlag className="text-blue-600" />
                            <div className="flex justify-between w-full">
                                <span className="text-blue-600 font-semibold">Country:</span>
                                <span className="font-medium text-gray-600">{shippingInfo.country}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaMapMarkerAlt className="text-blue-600" />
                            <div className="flex justify-between w-full">
                                <span className="text-blue-600 font-semibold">ZIP code:</span>
                                <span className="font-medium text-gray-600">{shippingInfo.pinCode}</span>
                            </div>
                        </div>
                    </div>

                    {/* Phone No */}
                    <div className="flex items-center gap-4">
                        <FaPhone className="text-blue-600" />
                        <div className="flex justify-between w-full">
                            <span className="text-blue-600 font-semibold">Phone No:</span>
                            <span className="font-medium text-gray-600">1234567890</span>
                        </div>
                    </div>
                </div>
            </div>






            <ShippingSummaryCard />
        </div>
    );
};

export default CartReview;

const ShippingSummaryCard = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch()
    const { cart, cartItemsCount } = useSelector((state) => state.cart);
    const [totalPrice, setTotalPrice] = useState("0.00");
    const [subtotal, setSubTotal] = useState("0.00");
    const [shippingCharges, setShippingCharges] = useState("0.00");
    const [tax, setTax] = useState("0.00");

    const [showAllItems, setShowAllItems] = useState(false)

    useEffect(() => {
        // Calculate the subtotal
        const newSubtotal = cart.reduce(
            (acc, item) => acc + item.quantity * item.product.price,
            0
        );

        console.log(newSubtotal)

        // Calculate the shipping charges
        const newShippingCharges = newSubtotal > 1000 ? 0 : 200;

        // Calculate the tax
        const newTax = newSubtotal * 0.18;

        // Calculate the total price
        const newTotal = newSubtotal + newTax + newShippingCharges;

        // Update the states with properly formatted strings
        setSubTotal(newSubtotal.toFixed(2)); // Convert subtotal to a string with 2 decimal places
        setShippingCharges(newShippingCharges.toFixed(2)); // Convert shippingCharges to a string with 2 decimal places
        setTax(newTax.toFixed(2)); // Convert tax to a string with 2 decimal places
        setTotalPrice(newTotal.toFixed(2)); // Convert totalPrice to a string with 2 decimal places

    }, [cart]);







    const handleConfirmOrder = () => {

        dispatch(CONFIRM_ORDER())

        sessionStorage.setItem('easymart_order_info', JSON.stringify({
            subtotal,
            tax,
            shippingCharges,
            totalPrice
        }))

        navigate('/checkout-details?tab=checkout')

    }


    return (
        <div className="h-[calc(100vh-6rem)] lg:border-l-[1px] py-16 lg:w-[50%] xl:w-[40%] flex flex-col gap-2 p-4 px-4 xl:px-16 bg-[#fcfdff]">
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Review your cart</h2>
                    {showAllItems ?
                        <BiChevronUp onClick={() => setShowAllItems(prev => !prev)} /> :
                        <BiChevronDown onClick={() => setShowAllItems(prev => !prev)} />
                    }

                </div>
                <hr />

                
                <div className={`h-64 flex flex-col gap-4 pt-4 ${showAllItems ? "overflow-y-scroll" :  ""} `}>
                        {cart.slice(0, showAllItems ? cart.length : 2).map((item) => (
                            <div className="flex gap-4" key={item.product._id}>
                                <div className="w-28 h-28 border-2 rounded-lg p-2 flex items-center justify-center relative">
                                    <img src={item.product.images[0].url} alt={item.product.name} />
                                    <span className="absolute -top-2 text-sm -right-2 bg-white w-8 h-8 flex items-center justify-center z-50 rounded-full border-2">{item.quantity}</span>
                                </div>
                                <div className="flex flex-col gap-2 text-xs">
                                    <h2 className="font-semibold">{item.product.name}</h2>
                                    <p className="text-gray-600">{item.product.category}...</p>
                                    <p className="text-gray-600">{item.product.description.substring(0, 35)}...</p>
                                    <p className="mt-auto font-bold">₹ {item.product.price * item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
               

                <hr />

                <div className="flex flex-col gap-4 text-xs">
                    <div className="flex justify-between items-center ">
                        <span className=" font-normal">Subtotal</span>
                        <span className="font-semibold ">₹ {subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className=" font-normal">Tax</span>
                        <span className="font-semibold ">₹ {tax}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className=" font-normal">Shipping Charges</span>
                        <span className="font-semibold ">₹ {shippingCharges}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className=" font-semibold">Total:</span>
                        <span className="font-semibold ">₹ {totalPrice}</span>
                    </div>
                </div>

                <hr className="my-4 border-gray-300" />





                <button className="w-full mt-8 lg:mt-0 p-2 bg-[#025fde] font-light text-white text-center py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleConfirmOrder}>
                    Confirm Order
                </button>
            </div>
        </div>
    );
};
