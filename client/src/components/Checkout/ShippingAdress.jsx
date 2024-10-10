import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addShipingInfo } from "../../redux/actions/cartActions";
const ShippingAddress = () => {

    const { shippingInfo , confirmedOrder  } = useSelector((state) => state.cart);
    console.log(shippingInfo)
    const [formValues, setFormValues] = useState(shippingInfo);

    const navigate = useNavigate()

    useEffect(() => {

        if (confirmedOrder) {
            navigate('/checkout-details?tab=checkout')
        }

    }, [confirmedOrder, navigate])

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    return (
        <div className='flex lg:flex-row flex-col '>
            <div className='flex-1 py-16'>
                <h2 className='font-semibold text-2xl mb-3'>Shipping Information</h2>
                <hr />
                <div className="flex flex-col gap-4 mt-4 pr-8 text-xs">
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="firstName" className="text-xs font-semibold">
                                First name <span className="text-sm text-[red] align-text-top">*</span>
                            </label>
                            <input
                                autoComplete="off"
                                type="text"
                                name="firstName"
                                placeholder="Enter first name"
                                className="border-2 rounded-lg p-3 focus:outline-blue-500"
                                value={formValues.firstName} // Bind value to form state
                                onChange={handleBlur}
                            />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="lastName" className="text-xs font-semibold">
                                Last name <span className="text-sm text-[red] align-text-top">*</span>
                            </label>
                            <input
                                autoComplete="off"
                                type="text"
                                name="lastName"
                                placeholder="Enter last name"
                                className="border-2 rounded-lg p-3 focus:outline-blue-500"
                                value={formValues.lastName} // Bind value to form state
                                onChange={handleBlur}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="email" className="text-xs font-semibold">
                                Email address <span className="text-sm text-[red] align-text-top">*</span>
                            </label>
                            <input
                                autoComplete="off"
                                type="email"
                                name="email"
                                placeholder="Enter email address"
                                className="border-2 rounded-lg p-3 focus:outline-blue-500"
                                value={formValues.email} // Bind value to form state
                                onChange={handleBlur}
                            />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="phoneNo" className="text-xs font-semibold">
                                Phone number <span className="text-sm text-[red] align-text-top">*</span>
                            </label>
                            <input
                                autoComplete="off"
                                type="number"
                                name="phoneNo"
                                placeholder="Enter phone number"
                                className="border-2 rounded-lg p-3 focus:outline-blue-500"
                                value={formValues.phoneNo} // Bind value to form state
                                onChange={handleBlur}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="address" className="text-xs font-semibold">
                            Address <span className="text-sm text-[red] align-text-top">*</span>
                        </label>
                        <input
                            autoComplete="off"
                            type="text"
                            name="address"
                            placeholder="Enter address"
                            className="border-2 rounded-lg p-3 focus:outline-blue-500"
                            value={formValues.address} // Bind value to form state
                            onChange={handleBlur}
                        />
                    </div>
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="city" className="text-xs font-semibold">
                                City
                            </label>
                            <input
                                autoComplete="off"
                                type="text"
                                name="city"
                                placeholder="Enter city"
                                className="border-2 rounded-lg p-3 focus:outline-blue-500"
                                value={formValues.city} // Bind value to form state
                                onChange={handleBlur}
                            />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="state" className="text-xs font-semibold">
                                State <span className="text-sm text-[red] align-text-top">*</span>
                            </label>
                            <input
                                autoComplete="off"
                                type="text"
                                name="state"
                                placeholder="Enter state"
                                className="border-2 rounded-lg p-3 focus:outline-blue-500"
                                value={formValues.state} // Bind value to form state
                                onChange={handleBlur}
                            />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="pinCode" className="text-xs font-semibold">
                                ZIP code <span className="text-sm text-[red] align-text-top">*</span>
                            </label>
                            <input
                                autoComplete="off"
                                type="number"
                                name="pinCode"
                                placeholder="Enter ZIP code"
                                className="border-2 rounded-lg p-3 focus:outline-blue-500"
                                value={formValues.pinCode} // Bind value to form state
                                onChange={handleBlur}
                            />
                        </div>
                    </div>
                </div>

            </div>
            <ShippingSummaryCard formValues={formValues} />
        </div>
    );
};

export default ShippingAddress;

const ShippingSummaryCard = ({ formValues }) => {

    const navigate = useNavigate();

    const dispatch = useDispatch()


    const { cart, cartItemsCount, confirmedOrder } = useSelector((state) => state.cart);

    useEffect(() => {

        if (confirmedOrder) {
            navigate('/checkout-details?tab=checkout')
        }

    }, [confirmedOrder, navigate])
    const [totalPrice, setTotalPrice] = useState("0.00");

    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        setTotalPrice(total.toFixed(2));
    }, [cart]);

    const disabled = !(formValues.firstName &&
        formValues.lastName &&
        formValues.email &&
        formValues.phoneNo &&
        formValues.address &&
        formValues.state &&
        formValues.pinCode)


    const handleSaveClick = () => {
        dispatch(addShipingInfo(formValues)); // Dispatch the action
        console.log("CLICKED");
        navigate('/checkout-details?tab=review'); // Navigate immediately
    };


    useEffect(()=>{

        if(confirmedOrder){
            navigate('/checkout-details?tab=checkout')
        }

    },[confirmedOrder , navigate])



    return (
        <div className="h-[calc(100vh-6rem)] lg:border-l-[1px] py-16 lg:w-[50%] xl:w-[40%] flex flex-col gap-2 p-4 px-4 xl:px-16 bg-[#fcfdff]">
            <div className="flex flex-col gap-4 mb-4">
                <h2 className="font-semibold text-lg">Summary</h2>
                <hr />
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold">Name</span>
                    <span className="font-semibold text-gray-500 text-xs">
                        {formValues.firstName || "--"} {formValues.lastName || "--"}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold">Email</span>
                    <span className="font-semibold text-gray-500 text-xs">{formValues.email || "--"}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold">Phone no</span>
                    <span className="font-semibold text-gray-500 text-xs">{formValues.phoneNo || "--"}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold">To address:</span>
                    <span className="font-semibold text-gray-500 text-xs">{formValues.address || "--"}</span>
                </div>
                <div className="flex gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold">City:</span>
                            <span className="font-semibold text-gray-500 text-xs">{formValues.city || "--"}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold">State:</span>
                            <span className="font-semibold text-gray-500 text-xs">{formValues.state || "--"}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold">ZIP code:</span>
                            <span className="font-semibold text-gray-500 text-xs">{formValues.pinCode || "--"}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold">Number of items:</span>
                    <span className="font-semibold text-gray-500 text-xs">{cartItemsCount}</span>
                </div>
                <hr />
                <div className="flex justify-between">
                    <span className="text-xs font-semibold">Total</span>
                    <span className="font-semibold text-gray-500 text-xs">₹ {totalPrice}</span>
                </div>
                <button className="w-full mt-8 lg:mt-0 p-2 bg-[#025fde] font-light disabled:opacity-[0.5] text-white text-center py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={disabled} onClick={handleSaveClick}>
                    Save & Continue
                </button>
            </div>
        </div>
    );
};
