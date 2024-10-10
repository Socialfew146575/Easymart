import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { Link } from 'react-router-dom';
import image from "../../images/contactus.jpg"
import { useDispatch, useSelector } from 'react-redux';

const OrderItemsAccordion = () => {
    const { order } = useSelector((state) => state.order);
    const [showAccordion, setShowAccordion] = useState(false);

    // Debugging: Ensure order and orderItems are correctly defined
    console.log('Order:', order);
    console.log('Order Items:', order ? order.orderItems : []);

    if (!order) return null; // Avoid rendering if order is undefined

    return (
        <div className='md:w-[70%] order-last flex flex-col gap-4'>
            <div className='flex flex-col md:p-4 p-2 border-[1px] rounded-md'>
                <div className='flex justify-between items-center mb-6' onClick={() => setShowAccordion(prev => !prev)}>
                    <h2 className='text-sm font-semibold'>Order Item ({order.orderItems.length})</h2>
                    {showAccordion ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                </div>

                <OrderCard item={order.orderItems[0]} />
                {/* Accordion content with animation */}
                <div
                    className={`overflow-hidden transition-all duration-300 ${showAccordion ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    {order.orderItems.slice(1).map((item, index) => (
                        <OrderCard key={index} item={item} />
                    ))}
                </div>
            </div>

            <CartPriceCard order={order} />
        </div>
    );
};

const OrderCard = ({ item }) => {
    // Debugging: Ensure item has the expected properties
    console.log('Order Item:', item);

    if (!item) return null; // Avoid rendering if item is undefined

    return (
        <div className="flex flex-col rounded-t-lg overflow-hidden border-gray-200 mb-4">
            <hr />
            <div className='flex flex-col mt-2 gap- w-full'>
                <div className='flex gap-4 w-full'>
                    <div className='border-2 bg-gray-50 border-gray-400 rounded-md overflow-hidden p-2 md:w-32 md:h-32 w-36 h-36 '>
                        <img src={item.image || image} alt={item.name} className='object-cover md:w-28 md:h-28 w-32 h-32 rounded-md' />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <div className='flex flex-col gap-[0.1rem] uppercase font-[540] text-sm'>
                            <h2>{item.name}</h2>
                            <p className='text-xs text-gray-800'>
                                {item.description && item.description.length > 150 ? `${item.description.substr(0, 150)}...` : item.description}
                            </p>
                        </div>
                        <div className='flex md:flex-row flex-col gap-4 mt-4 justify-between w-full'>
                            <Link to={`/products/${item._id}`} className='px-4 order-last md:order-first w-fit py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg text-sm'>View Product</Link>
                            <div className='flex gap-6 items-center'>
                                <p className='text-gray-500 font-medium text-xs border-[1px] p-1 px-3 rounded-md'>{item.quantity} x ${item.price}</p>
                                <p className='text-black font-medium text-xs'>${item.quantity * item.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartPriceCard = ({ order }) => {
    return (
        <div className="w-full flex flex-col gap-2 p-4 bg-white border-[1px] rounded-md">
            <div className="flex flex-col gap-4 mb-4">
                <h2 className='text-sm font-semibold'>Order Summary</h2>
                <div className="flex justify-between items-center text-gray-600">
                    <span className="text-sm font-normal">Subtotal</span>
                    <span className="font-medium text-sm">{order.orderItems.length} item</span>
                    <span className="font-medium text-sm">$ {order.itemsPrice}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <span className="text-sm font-normal">TaxPrice</span>
                    <span className="font-medium text-sm">₹ {order.taxPrice}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <span className="text-sm font-normal">Discount on MRP</span>
                    <span className="font-medium text-sm">₹ 0.00</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <span className="text-sm font-normal">Shipping Charges</span>
                    <span className="font-medium text-sm">₹ {order.shippingPrice}</span>
                </div>
            </div>
            <hr className="my-4 border-gray-300" />
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Total (inclusive of all taxes):</span>
                    <span className="font-semibold text-sm">₹ {order.totalPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-normal text-gray-500">You Save</span>
                    <span className="font-semibold text-sm text-gray-500">₹ 0.00</span>
                </div>
            </div>
        </div>
    );
};

export default OrderItemsAccordion;
