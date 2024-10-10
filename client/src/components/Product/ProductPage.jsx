import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductReviews, getSimilarProducts, getSingleProduct } from '../../redux/actions/productActions';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import Loader from '../layout/Loader/Loader';

import toast, { Toaster } from 'react-hot-toast';
import ErrorPage from '../../images/product-not-found.png'
import { addToCart } from "../../redux/actions/cartActions"
import ReviewCard from './ReviewCard';
import ReviewDialog from './ReviewDialog';
import { FaChartBar } from 'react-icons/fa';
import SimilarProducts from './SimilarProducts';
const ProductPage = () => {
    const dispatch = useDispatch();
    
    const { product, loading, error, reviews , similarProducts } = useSelector((state) => state.product);
    const { cart, error: cartError } = useSelector((state) => state.cart);
    const params = useParams();
    const [ratings, setRatings] = useState([0, 0, 0, 0, 0]);
    const [quantity, setQuantity] = useState(1);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [seeMore, setSeeMore] = useState(false);

    const calculateRatingPercentage = () => {
        const newRatings = [0, 0, 0, 0, 0];
        product.reviews.forEach((review) => {
            newRatings[review.rating - 1]++;
        });
        setRatings(newRatings);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }

        dispatch(getSingleProduct(params.id));
        dispatch(getProductReviews(params.id))

        if(product && product.category){
            dispatch(getSimilarProducts(product.category))
        }

    }, [dispatch, params.id, error, toast]);

    useEffect(() => {
        if (product && product.reviews) {
            calculateRatingPercentage();
        }

        if (product && product.images && product.images.length > 0) {
            setSelectedImage(product.images[0].url);
        }
    }, [product]);

    const handleIncrementClick = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrementClick = () => {
        setQuantity((prev) => prev - 1);
    };

    const handleAddToCart = () => {
        dispatch(addToCart(product, quantity));
    };

    useEffect(() => {
        if (cartError) {
            toast.error(cartError);
        } else if (cart.some((item) => item.product.id === product.id)) {
            toast.success("Product Added to Cart.");
        }
    }, [cartError, cart, product.id]);

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "#ffd700",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 16 : 18
    };

    const toggleSeeMore = () => {
        setSeeMore(!seeMore);
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className='flex items-center justify-center'>
                <img src={ErrorPage} alt="Product Not Found !!!" />
            </div>
        );
    }

    return (
        <>
            <div className='w-full max-w-full p-6 flex flex-col md:flex-row box-border bg-white sm:mt-12 relative '>
                {/* Image Section */}
                <div className='flex gap-2 w-[40%] '>
                    <div className='flex flex-col gap-2 pl-4'>
                        {product && product.images && product.images.map((image) => (
                            <div key={image.public_id} className='bg-[#dfdfdf] w-24 h-24 flex items-center justify-center rounded-md'>
                                <img
                                    src={image.url}
                                    alt={product.name}
                                    className={` ${image.url === selectedImage && "border-2 border-[#6f98ff]"} w-full rounded-md h-full object-contain`}
                                    onClick={() => setSelectedImage(image.url)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className='w-[40rem] max-h-[30rem] bg-[#dfdfdf] mr-6 rounded-md flex items-center justify-center'>
                        {selectedImage && <img src={selectedImage} alt={product.name} className='w-80' />}
                    </div>
                </div>

                {/* Info and Cart Section */}
                <div className='w-[60%] flex justify-between'>
                    {/* Info Card */}
                    <div className='flex flex-col w-2/3 px-6'>
                        <h1 className='text-2xl sm:text-3xl font-franklin text-gray-700'>{product.name}</h1>
                        <p className='font-serif text-gray-500'>SKU #{product._id}</p>

                        <div className='flex items-center gap-3 border-b-2 pb-2'>
                            <ReactStars {...options} />
                            <p className='text-xs font-light text-gray-500'>{`(${product.numberOfReviews} reviews)`}</p>
                        </div>

                        {/* RAM and Processor */}
                        <div className="flex flex-col gap-8 mt-4 border-b-2 pb-4">
                            <p className='text-xs text-gray-400'>
                                <strong>RAM:</strong>
                                <span className='p-1 bg-blue-50 border-2 border-blue-400 text-blue-500 rounded-md ml-4'>{product.specifications?.RAM}</span>
                            </p>
                            <p className='text-xs text-gray-400'>
                                <strong>Processor:</strong>
                                <span className='p-1 bg-blue-50 border-2 border-blue-400 text-blue-500 rounded-md ml-4'>{product.specifications?.Processor}</span>
                            </p>

                            <p className='text-xs flex gap-6 items-center  text-gray-400'>
                                <strong>Price:</strong>
                                <span className='text-lg font-semibold  text-black'>₹{product.price}</span>
                            </p>

                            <p className='text-xs flex gap-6 items-center  text-gray-400'>
                                <strong>Status:</strong>
                                <b className={`${product.stock < 1 ? "text-red-600" : "text-green-600"}`}>
                                    {product.stock < 1 ? "Out of Stock" : "In Stock"}
                                </b>
                            </p>
                        </div>

                        {/* Description with "See More" */}
                        <div className='w-full mt-4'>
                            <p className='text-sm text-gray-500'>
                                {seeMore ? product?.description : product?.description?.substring(0, 100) + "..."}
                                <span
                                    className='mt-3 cursor-pointer font-semibold py-1 px-4 rounded-full text-blue-400 transition ease-in-out'
                                    onClick={toggleSeeMore}
                                >
                                    {seeMore ? "See Less" : "See More"}
                                </span>
                            </p>
                        </div>

                    </div>

                    {/* Cart Card */}
                    <div className="flex flex-col gap-5 w-1/3 bg-white/30 border-2 border-gray-200 h-fit p-4 rounded-lg backdrop-blur-md shadow-lg">


                        {/* Quantity Control Section */}
                        <div className="flex items-center justify-between space-x-2 bg-white/20 backdrop-blur-lg p-2  border-b-2 pb-4">
                            <span className="text-xs font-medium">Quantity: <span className='text-black'>{quantity}</span> </span>

                            <div className='flex shadow-md'>
                                {/* Decrement Button */}
                                <button
                                    className="w-8 h-8 rounded-l-md cursor-pointer text-gray-500 border border-gray-300 "
                                    onClick={handleDecrementClick}
                                    disabled={quantity === 1}
                                >
                                    -
                                </button>

                                {/* Quantity Input */}
                                <input
                                    type="number"
                                    value={quantity}
                                    className="w-12 h-8 text-center border border-gray-300 "
                                    onChange={(e) => setQuantity(e.target.value)}
                                />

                                {/* Increment Button */}
                                <button
                                    className="w-8 h-8 rounded-r-md cursor-pointer  border border-gray-300 text-blue-600 "
                                    onClick={handleIncrementClick}
                                    disabled={quantity === product.stock || product.stock < 1}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Total Price Section */}
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-gray-700 text-sm">Total:</span>
                            <span className="text-md font-semibold text-gray-800">₹ {product.price * quantity}</span>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-500 transition ease-in-out w-full"
                            onClick={handleAddToCart}
                            disabled={product.stock < 1}
                        >
                            Add to Cart
                        </button>
                    </div>

                </div>
            </div>


            <div className='mx-12 border-t-2 p-4 flex flex-col gap-8'>
                {/* Heading */}
                <h2 className='text-xl font-semibold'>Specifications</h2>

                {/* Specifications Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    {product.specifications && Object.entries(product?.specifications).map(([key, value], index) => (
                        <div key={index} className='flex justify-between'>
                            <span className='font-medium text-xs text-gray-500'>{key}:</span>
                            <span className='text-xs text-gray-700'>{value}</span>
                        </div>
                    ))}
                </div>
            </div>



            <div className='mx-12 border-y-2 p-4 flex flex-col gap-8 mt-8'>
                {/* Heading */}
                <h2 className='text-xl font-semibold'>Reviews</h2>

                {/* Grid Layout for Ratings and Reviews */}
                <div className='grid grid-cols-5 gap-4'>

                    {/* Rating Bars (1/4 width) */}
                    <div className='col-span-1 border-2 rounded-md h-fit p-2 w-full shadow-lg relative'>
                        <div className='flex gap-4 border-b-2 pb-2'>
                            {/* Ratings number */}
                            <div className='flex flex-col gap-1 items-start pl-4 w-full'>
                                <h2 className='text-4xl font-bold'>{product.ratings}</h2>
                                <ReactStars {...options} />
                                <p className='text-xs text-gray-400'>{product.numberOfReviews} reviews</p>
                            </div>

                            {/* Rating bars */}
                            <div className='flex flex-col gap-2 text-xs w-full'>
                                {ratings.map((rating, index) => {
                                    const percentage = parseInt((rating / product.numberOfReviews) * 100);
                                    return (
                                        <div className='flex gap-2 items-center' key={index}>
                                            <span className='text-black'>{index + 1}</span>
                                            <div className='w-full h-[4px] bg-gray-200  rounded-full overflow-hidden box-border'>
                                                <div
                                                    className='h-full bg-[#306dfc] border-[1px] border-[#306dfc] rounded-sm p-0'
                                                    style={{ width: percentage > 0 ? `${percentage}%` : '0%', opacity: percentage > 0 ? "1" : "0" }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Placeholder for Empty Div */}
                        <div className='mt-3 bg-gray-100 p-4 rounded-md text-center'>
                            {/* Suggestion: Add Summary or Icon */}
                            <span className='text-sm text-gray-500 flex items-center gap-4'>   <FaChartBar color='black' /> Average Rating Summary</span>

                        </div>
                    </div>

                    {/* Review Comments (3/4 width) */}
                    <div className='col-span-4 flex gap-4 flex-col'>

                        <button className='w-fit bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out hover:bg-blue-700'>
                            Write a Review
                        </button>


                        <div className='overflow-y-auto w-full h-[65vh]'>
                            {reviews && reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <ReviewCard review={review} key={review._id} />
                                ))
                            ) : (
                                <p>No Reviews Yet</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <div className='mx-12 flex flex-col mt-4'>

                <h2 className='text-xl font-semibold'>Similar Products</h2>
                    <SimilarProducts products={similarProducts} id={product._id}/>

            </div>




            {showDialog && <ReviewDialog onClose={() => setShowDialog(false)} />}
            <Toaster />
        </>
    );
};

export default ProductPage;
