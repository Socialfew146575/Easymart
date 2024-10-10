import React from 'react'
import { UseSelector, useSelector } from 'react-redux'
import { FaTrashAlt } from "react-icons/fa";
import CartCard from './CartCard';
import CartPriceCard from './CartPriceCard';
import { Toaster } from 'react-hot-toast'
import Emptycart from "../../images/Emptycart.jpg"

const Cart = () => {

    const { cart, cartItemsCount } = useSelector((state) => state.cart)
    // console.log(cart)
    return (
        <div className='max-w-full w-full pt-4 lg:pt-8 px-2 md:px-16 bg-[#e5e5e5] min-h-screen flex flex-col gap-4'>


            <div className='w-full flex flex-col lg:flex-row gap-4 justify-center mb-4 '>

                <div className='lg:w-[50%] w-full bg-white rounded-md h-fit'>

                    <h2 className='p-4 text-2xl font-medium '>Cart</h2>

                    <hr className='mx-4 h-[2px] bg-gray-100 shadow-sm ' />

                    <div className='overflow-y-scroll max-h-screen no-scrollbar'>
                        {cart.length > 0 && cart.map((cartItem) => {

                            return (
                                <CartCard cartItem={cartItem} key={cartItem.product.id} />
                            )

                        })}
                    </div>

                    {cart.length === 0 &&
                        (<div className='flex flex-col items-center'>


                            <img src={Emptycart} alt='EmptyCart' className='w-96 h-auto object-cover' />
                        </div>)}

                </div>

                <div className='lg:w-[30%] w-full   rounded-md'>
                    <CartPriceCard />
                </div>

            </div>
            <Toaster />
        </div>
    )
}

export default Cart
