import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import OrderItemsAccordion from './OrderItemsAccordion';
import { useDispatch, useSelector } from 'react-redux';
import CustomerInfo from './CustomerInfo';
import { getUserOrder } from '../../redux/actions/orderActions';
import { CLEAR_ALL_ERROR } from '../../redux/slices/orderSlice';
import toast, { Toaster } from 'react-hot-toast';
const OrderDetail = () => {

    const { id } = useParams();

    const dispatch = useDispatch()
    const { order, error, loading } = useSelector((state) => state.order)

    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(CLEAR_ALL_ERROR())
        }

    }, [error, toast])


    useEffect(() => {

        dispatch(getUserOrder(id))

    }, [id])

    // console.log(order , error , loading)

    if(!order) return null;

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: 'UTC', // Adjust based on your time zone requirements
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    // console.log(order)
    return (
        <div className='py-4 px-4 md:px-8'>

            <div className='flex md:flex-row flex-col gap-4 md:gap-8 '>

                <h2 className='text-xl font-medium text-black'>Order ID : <span className='text-black'>{id}</span> </h2>

                <div className='flex gap-4'>

                    <span
                        className={`p-1  flex items-center font-medium text-[10px] rounded-lg ${order.paymentInfo.status === 'succeeded'
                            ? 'px-6 bg-[#e6f4ea] text-[#34c759]' // Light green background with darker green text
                            : order.paymentInfo.status === 'Pending'
                                ? 'bg-[#fff7e6] text-[#ff9800]' // Light yellow background with orange text
                                : 'bg-[#fbeaea] text-[#f87171]' // Light red background with dark red text
                            }`}
                    >
                        {order.paymentInfo.status === 'succeeded' ? "Paid" : "Pending"}
                    </span>

                    <span
                        className={`p-1 px-4 flex items-center font-medium text-[10px] rounded-lg ${order.orderStatus === 'Delivered'
                            ? 'bg-[#e6f4ea] text-[#34c759]' // Light green background with darker green text
                            : order.orderStatus === 'Shipped'
                                ? 'bg-[#e6f0ff] text-[#007aff]' // Light blue background with darker blue text
                                : order.orderStatus === 'Processing'
                                    ? 'bg-[#fffbe6] text-yellow-600' // Light yellow background with darker yellow text
                                    : order.orderStatus === 'Cancelled'
                                        ? 'bg-[#fbeaea] text-[#f87171]' // Light red background with dark red text
                                        : 'bg-[#faf0ef] text-[#9e9e9e]' // Light gray background with dark gray text (default)
                            }`}
                    >
                        {order.orderStatus}
                    </span>


                </div>

            </div>


            <p className='mt-3 text-xs text-gray-500'>{formatDate(order.createdAt)}</p>


            <div className='flex md:flex-row flex-col gap-4 w-full mt-8'>

                <OrderItemsAccordion />

                <CustomerInfo />


            </div>


            <Toaster />
        </div>
    )
}

export default OrderDetail
