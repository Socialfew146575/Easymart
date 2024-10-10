import React, { useCallback, useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { BiCheckCircle } from "react-icons/bi";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { createUserOrder } from "../../redux/actions/orderActions";
import { CLEAR_ALL_ERROR } from "../../redux/slices/orderSlice";
import { CLEAR_CART } from "../../redux/slices/cartSlice";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import ConfettiExplosion from 'react-confetti-explosion';

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [succeeded, setSucceeded] = useState(false);

    const { shippingInfo, confirmedOrder, cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const {  error: orderError , message , order : newOrder } = useSelector((state) => state.order);

  

    const orderInfo = JSON.parse(sessionStorage.getItem('easymart_order_info')) || {};

   

    // Handle successful order creation
    const [timer, setTimer] = useState(5);

    useEffect(() => {
        if (message === "Your order has been placed successfully!") {
            setSucceeded(true);
           
            toast.success(message);
            setTimer(5);

            const countdown = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdown); // Clear the interval once done
                        navigate(`/orders/${newOrder._id}`);
                        return 0; // Set timer to 0 to indicate completion
                    }
                    return prev - 1; // Decrease timer
                });
            }, 1000);

            return () => clearInterval(countdown); // Cleanup the interval on unmount
        }
    }, [message, dispatch, navigate, newOrder?._id]);

    const orderItems = cart.map((item) => {
        return {
            name: item.product.name,
            description: item.product.description,
            quantity: item.quantity,
            image: item.product.images[0].url, 
            product: item.product._id,
            price: item.product.price
        };
    });

    console.log(orderItems);


    const order = {
        shippingInfo,
        orderItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    };

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    useEffect(() => {
        if (orderError) {
            toast.error(orderError);
            dispatch(CLEAR_ALL_ERROR())
        }
    }, [orderError]);

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

        if (!isShippingInfoComplete(shippingInfo)) {
            navigate('/checkout-details?tab=shippingInfo');
            return;
        }

        if (!confirmedOrder) {
            navigate('/checkout-details?tab=review');
            return;
        }

    }, [shippingInfo, confirmedOrder, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        if (!stripe || !elements) {
            setError("Stripe has not loaded yet. Please try again later.");
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post("/api/v1/payment/process", paymentData, config);

            const client_secret = data.client_secret;

            const cardElement = elements.getElement(CardElement);
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: 'IN',
                        },
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
                order.paymentInfo = {
                    id: result.paymentIntent.id,
                    status: result.paymentIntent.status,
                };
                dispatch(createUserOrder(order));
            } else {
                toast.error("There's an issue while processing the payment.");
            }
        } catch (err) {
            console.error("Error creating payment intent:", err);
            setError(err.response?.data?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        if (event.error) {
            setError(event.error.message);
        } else {
            setError("");
        }
    };

    return (
        <div className="h-[calc(100vh-5rem)] flex justify-center items-center px-24 py-8">
            <div className="border-2 rounded-xl p-16 gap-8 h-full w-full flex flex-col xl:flex-row justify-between">
                {/* Payment Form */}
                <div className="xl:w-[60%] font-roboto gap-4 flex flex-col">
                    <h2 className="text-2xl font-semibold">Final step, make the payment.</h2>
                    <p className="text-gray-500 text-sm font-serif font-medium">
                        To finalize your order, kindly complete your payment using a valid credit or debit card.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
                        <label htmlFor="cardHolderName" className="text-xs text-gray-600 font-semibold">
                            Card holder name
                        </label>
                        <input
                            type="text"
                            id="cardHolderName"
                            placeholder="John Doe"
                            className="bg-gray-200 p-3 rounded-lg w-[70%]"
                            required
                        />

                        <label htmlFor="cardNumber" className="text-xs text-gray-600 font-semibold">
                            Card number
                        </label>
                        <div className="relative">
                            <CardElement
                                id="cardNumber"
                                options={{
                                    style: {
                                        base: {
                                            fontSize: "16px",
                                            color: "#424770",
                                            "::placeholder": {
                                                color: "#aab7c4",
                                            },
                                        },
                                        invalid: {
                                            color: "#9e2146",
                                        },
                                    },
                                    hidePostalCode: true
                                }}
                                className="bg-gray-200 p-3 rounded-lg w-[70%]"
                                onChange={handleChange}
                            />
                        </div>

                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        {succeeded ? (
                            <>
                            <div className="text-green-500 text-sm">Payment Successful!</div>
                             
                                <ConfettiExplosion/>

                                <div className="text-[#1557f4] text-sm">Redirecting to Order Details in {timer} second.</div>
                                
                            </>
                            
                        ) : (
                            <button
                                type="submit"
                                disabled={!stripe || loading}
                                className="w-fit py-4 px-16 rounded-lg text-sm text-white bg-[#1557f4] mt-4"
                            >
                                {loading ? "Processing..." : "Pay now"}
                            </button>
                        )}
                    </form>
                </div>

                {/* Sidebar */}
                <div className="w-[40%] hidden xl:block py-8 px-6 rounded-lg bg-gradient-to-r from-[hsla(186,33%,98%,1)] to-[hsla(216,41%,95%,1)] font-mono">
                    <div>
                        <p className="text-xs text-gray-400">You've to pay,</p>
                        <h1 className="font-semibold text-4xl mt-3">₹{orderInfo.totalPrice}</h1>
                    </div>

                    <div className="flex items-center space-x-2 mt-6 text-xs">
                        <div className="relative inline-block">
                            <div className="bg-green-600 rounded-full w-6 h-6 flex items-center justify-center">
                                <BiCheckCircle className="text-white w-6 h-6" />
                            </div>
                        </div>
                        <h2 className="font-semibold text-sm">Payment & Invoice</h2>
                    </div>

                    <p className="text-xs text-gray-500 mt-3">
                        We’ll worry about all the transactions and payment. You can sit back and relax while you make your clients happy.
                    </p>

                    {/* Discount Information */}
                    <div className="flex items-center space-x-2 mt-6 text-xs">
                        <div className="relative inline-block">
                            <div className="bg-green-600 rounded-full w-6 h-6 flex items-center justify-center">
                                <BiCheckCircle className="text-white w-6 h-6" />
                            </div>
                        </div>
                        <h2 className="font-semibold text-sm">Discount Offer</h2>
                    </div>

                    <p className="text-xs text-gray-500 mt-3">
                        Don’t miss out! Use code <strong>SAVE20</strong> for a 20% discount on your next payment. Enjoy our services at an even better price.
                    </p>

                    {/* Contact Information */}
                    <div className="mt-6 bg-black py-4 px-4 rounded-lg">
                        <p className="text-white text-xs">
                            For any inquiries, contact our support team at support@company.com.
                        </p>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Payment;



