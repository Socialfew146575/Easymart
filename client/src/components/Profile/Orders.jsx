import React, { useEffect } from 'react'
import image from "../../images/contactus.jpg"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../redux/actions/orderActions'
import toast, { Toaster } from 'react-hot-toast';
import { CLEAR_ALL_ERROR } from '../../redux/slices/orderSlice'
import { TfiReload } from "react-icons/tfi";
const Orders = () => {

  const dispatch = useDispatch()
  const { orders, OrdersCount, error, loading } = useSelector((state) => state.order)

  useEffect(() => {

    if (error) {
      toast.error(error);
      dispatch(CLEAR_ALL_ERROR())
    }

  }, [error, toast])


  useEffect(() => {

    dispatch(getUserOrders())

  }, [])





  return (
    <div className='max-h-[70vh] overflow-y-scroll'>

      {orders.map((order) => {
        return <OrderCard order={order} key={order._id} />
      })}

      <Toaster />
    </div>
  )
}




const OrderCard = ({ order }) => {

  // console.log(order)

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


  // console.log("orders", order)
  return (

    <div className="  flex flex-col rounded-t-lg overflow-hidden border-2 border-gray-200 mb-4 bg-white">

      <div className='flex justify-between bg-blue-50 px-2 md:px-6 py-4 border-b-2  border-gray-200'>

        <div className='flex flex-col items-start justify-center gap-2'>

          <p className='text-xs font-[400] text-[#3d3d4e]'>Order placed</p>
          <h3 className='text-xs font-medium'>{formatDate(order.createdAt)}</h3>
        </div>
        <div className='hidden lg:flex flex-col items-center justify-center gap-2'>

          <p className='text-xs font-[400] text-[#3d3d4e]'>Total</p>
          <h3 className='text-xs font-medium'>₹ {order.totalPrice}</h3>
        </div> <div className='hidden lg:flex flex-col items-center justify-center gap-2'>

          <p className='text-xs font-[400] text-[#3d3d4e]'>Ship to</p>
          <h3 className='text-xs font-medium'>{order.shippingInfo.city} , {order.shippingInfo.state}</h3>
        </div> <div className='flex flex-col items-center justify-center gap-2'>

          <h3 className='text-sm  font-medium'>#{order._id}</h3>
          <Link to={`/orders/${order._id}`} className='text-xs font-semibold text-blue-500  border-b-2 border-blue-500'>View order details</Link>
        </div>

      </div>

      <div className='flex flex-col px-3 md:px-6 py-4 gap-4'>

        <h2
          className={`px-4 py-2 rounded-md w-fit text-xs font-semibold inline-block
    ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-600' :
              order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-600' :
                order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-600' :
                  order.orderStatus === 'Processing' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
            }`}
        >
          {order.orderStatus}
        </h2>




        {order.orderItems.map((item) => {

          return (

            <div className='flex gap-4'>

              <div className='border-2 border-gray-400 rounded-md overflow-hidden p-2 w-40 h-32 '>
                <img src={item.image} alt="" className='object-cover w-full h-full rounded-md' />

              </div>

              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-[0.1rem] uppercase font-[540] text-sm'>

                  <h2 >{item.name}</h2>
                  <p className='text-xs text-gray-800'>{item.description}</p>

                </div>

                <p className="text-gray-500 font-medium text-xs">
                  {order.orderStatus === 'Delivered'
                    ? 'Your order has been delivered. We hope you enjoy your purchase!'
                    : order.orderStatus === 'Shipped'
                      ? 'Your order is on its way. Track your package for updates.'
                      : order.orderStatus === 'Processing'
                        ? 'Your order is being processed. We’ll notify you when it ships.'
                        : order.orderStatus === 'Cancelled'
                          ? 'Your order has been cancelled. Feel free to browse for other items.'
                          : 'We are preparing your order details. Please check back soon.'
                  }
                </p>



                <div className='flex gap-4 '>

                  <Link to={`/product/${item.product}`} className='px-4 flex items-center gap-2 py-2 bg-[#1557f4] text-white  rounded-lg text-sm'> <TfiReload />  Buy it again</Link>


                </div>

              </div>


            </div>
          )



        })}



      </div>




    </div>

  )




}



export default Orders
