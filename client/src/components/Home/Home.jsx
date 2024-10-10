import React, { useEffect, useRef } from 'react'
import { CgMouse } from "react-icons/cg";
import Product from './Product';
import MetaData from '../layout/MetaData';

import { getAllProducts } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { CLEAR_ALL_ERROR } from '../../redux/slices/productSlice';
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Landing from './Landing';



const Home = () => {

    const containerRef = useRef(null)


    const dispatch = useDispatch();
    const { products, loading, error, productsCount } = useSelector((state) => state.product)



    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {

        if (error) {
            toast.error(error)

        }

        dispatch(getAllProducts())

    }, [dispatch, error, toast])


    if (loading) {
        return <Loader />
    }


    return (
        <>
            <MetaData title={"Ecommerce"} />

            <Landing containerRef={containerRef}/>

            <h2 className='text-center  p-[1vmax] mx-auto font-["Roboto"] text-4xl font-bold  mt-4  w-[20vmax]'>
                New Products
            </h2>


            <div id="container" ref={containerRef} className='flex mx-2 lg:mx-auto my-[2vmax] lg:w-[80vw] flex-wrap gap-4 items-center max-w-[100%]'>

                {products &&
                    products.map((product, index) => {
                        return <Product product={product} key={index} />
                    })
                }

            </div>
                <Toaster/>
        </>
    )
}

export default Home

