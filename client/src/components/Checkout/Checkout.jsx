import React, { useEffect, useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import { NavLink, useSearchParams } from 'react-router-dom'
import ShippingAddress from './ShippingAdress'
import CartReview from './CartReview'
import Payment from './Payment'

const Checkout = () => {

    const [tab, setTab] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()

   

    useEffect(() => {

        setTab(() => {
            return searchParams.get('tab') || 'shippingInfo'
        })

    }, [searchParams])

    

    return (
        <div className=''>

            <nav className='border-b-[1px] py-4 flex items-center justify-between px-24'>


                <NavLink to={"/"} className='text-2xl font-semibold text-[#415be6]'>EASYMART</NavLink>

                <div className='flex items-center gap-1'>

                    {tab === 'shippingInfo' ? <span className=' w-6 h-6  text-center flex items-center justify-center rounded-full  bg-[#415be6] text-white text-xs'>1</span> : <span className='p-1 rounded-full border-[1px] bg-[#e9edff]'><BiCheck size={14} color='#415be6' /></span>
                    }

                    <span className='text-xs font-semibold text-gray-600'>Shipping Address</span>

                    <hr className=' h-[2px] bg-gray-300 w-12' />

                    {tab === 'checkout' ? <span className='p-1 rounded-full border-[1px] bg-[#e9edff]'><BiCheck size={14} color='#415be6' /></span> : <span className=' w-6 h-6  text-center flex items-center justify-center rounded-full  bg-[#415be6] text-white text-xs'>2</span>}

                    <span className='text-xs font-semibold text-gray-600'>Review</span>

                    <hr className=' h-[2px] bg-gray-300 w-12' />


                    <span className=' w-6 h-6  text-center flex items-center justify-center rounded-full  bg-[#415be6] text-white text-xs'>3</span>
                    <span className='text-xs font-semibold text-gray-600'>Checkout</span>



                </div>

            </nav>


            <div className='px-8 xl:px-24 '>

                    {tab === 'shippingInfo' && <ShippingAddress/>}
                    {tab==='review' && <CartReview/>}
                    {tab==='checkout' && <Payment/>}


            </div>

        </div>
    )
}

export default Checkout
