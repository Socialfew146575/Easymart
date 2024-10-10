import React from 'react'
import { CiUser } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { UseSelector, useSelector } from 'react-redux';
import { CiPhone } from "react-icons/ci";
const CustomerInfo = () => {

    const { order } = useSelector((state) => state.order)
    const { user } = useSelector((state) => state.user)
    if(!user) return;
    return (
        <div className='md:w-[30%] flex flex-col gap-4'>

            <div className='flex flex-col gap-2 border-[1px] rounded-md p-4'>
                <h2 className='text-base font-semibold'>Note</h2>
                <p className='text-xs text-gray-500'>All orders are processed within 2 business days. Thank you for your patience and understanding.</p>
            </div>


            <div className='flex flex-col gap-2 border-[1px] rounded-md p-4'>
                <h2 className='text-base font-semibold'>Customer</h2>
                <div className='flex flex-col gap-1'>
                    <p className=' flex gap-3 text-xs items-center text-gray-500'><CiUser size={18} />{user.name}</p>
                    <p className=' flex gap-3 text-xs items-center text-gray-500'><IoBagOutline size={18} /> {order.orderItems.length} Order</p>



                </div>

            </div>
            <div className='flex flex-col gap-2 border-[1px] rounded-md p-4'>
                <h2 className='text-base font-semibold'>Contact Information</h2>
                <div className='flex flex-col gap-1'>
                    <p className=' flex gap-3 text-xs items-center text-gray-500'><AiOutlineMail size={18} /> {user.email}</p>
                    <p className=' flex gap-3 text-xs items-center text-gray-500'><CiPhone size={18} /> {order.shippingInfo.phoneNo}</p>




                </div>

            </div>


            <div className='flex flex-col gap-2 border-[1px] rounded-md p-4'>
                <h2 className='text-base font-semibold'>Shipping Address</h2>
                <div className='flex flex-col gap-1'>
                    <p className=' flex gap-1 text-xs items-center text-gray-500'><CiUser size={18} /> {user.name}</p>
                    <p className=' flex gap-3 text-xs items-center text-gray-500'>{order.shippingInfo.address},</p>
                    <p className=' flex gap-3 text-xs items-center text-gray-500'>{order.shippingInfo.city}, {order.shippingInfo.state},</p>
                    <p className=' flex gap-3 text-xs items-center text-gray-500'> {order.shippingInfo.country}, {order.shippingInfo.pinCode}</p>





                </div>

            </div>

            <div className='flex flex-col gap-2 border-[1px] rounded-md p-4'>
                <h2 className='text-base font-semibold'>Billing Address</h2>

                <p className=' flex gap-1 text-xs items-center text-gray-500'>Same as shipping address.</p>

            </div>

        </div>
    )
}

export default CustomerInfo
