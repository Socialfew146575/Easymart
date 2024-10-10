import React from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineCustomerService, AiOutlineSafety, AiFillInstagram, AiFillTwitterCircle, AiFillLinkedin, AiFillFacebook } from 'react-icons/ai';
import { FaShippingFast, FaLock } from 'react-icons/fa';
import StripeIcon from "../../../images/stripe.jpeg";

const Footer = () => {
    // Get the current path using useLocation
    const { pathname } = useLocation();

    // Conditionally render the Footer based on the path
    if (['/contact', '/login', '/checkout-details', '/register', '/forgotPassword', '/profile', '/cart'].includes(pathname) || pathname.split("/")[1] === "password") {
        return null;
    }

    return (
        <footer id="footer" className='flex flex-col items-center text-black bg-[#f9f9f9]  p-[2vmax]'>
            {/* Top Section: Icons and Descriptions */}
            <div className="flex items-center justify-evenly w-full border-b-2 pb-12">
                {/* Fast Shipping Section */}
                <div className='flex gap-4 basis-1/4'>
                    <FaShippingFast color='#316aff' size={32} />
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Fast Shipping</p>
                        <p className='text-xs text-gray-500'>Get your orders delivered within 24 hours.</p>
                    </div>
                </div>

                {/* Secure Payments Section */}
                <div className='flex gap-4 basis-1/4'>
                    <FaLock color='#316aff' size={32} />
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Secure Payments</p>
                        <p className='text-xs text-gray-500'>Your payment information is fully encrypted and protected.</p>
                    </div>
                </div>

                {/* Customer Support Section */}
                <div className='flex gap-4 basis-1/4'>
                    <AiOutlineCustomerService color='#316aff' size={32} />
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>24/7 Support</p>
                        <p className='text-xs text-gray-500'>We are here to assist you anytime, anywhere.</p>
                    </div>
                </div>

                {/* Quality Guarantee Section */}
                <div className='flex gap-4 basis-1/4'>
                    <AiOutlineSafety color='#316aff' size={32} />
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Quality Assurance</p>
                        <p className='text-xs text-gray-500'>Only the best quality products delivered to your doorstep.</p>
                    </div>
                </div>
            </div>

            {/* Middle Section: Company Info, Links, and Socials */}
            <div className="flex items-start justify-evenly w-full mt-8">
                {/* Company Info */}
                <div className='flex flex-col gap-4 basis-1/4'>
                    <p className='text-2xl font-semibold text-[#415be6]'>EASYMART</p>
                    <p className='text-sm text-gray-500 w-3/4'>Delivering joy to your doorstep, with quality products and a seamless shopping experience.</p>
                </div>

                {/* Privacy & Terms Section */}
                <div className='flex flex-col gap-2 basis-1/4'>
                    <p className='text-md font-bold text-black'>Privacy & Terms</p>
                    <span className='text-xs text-gray-500'>Privacy</span>
                    <span className='text-xs text-gray-500'>Terms and Conditions</span>
                    <span className='text-xs text-gray-500'>Cookie Policy</span>
                    <span className='text-xs text-gray-500'>Shipping Policy</span>
                    <span className='text-xs text-gray-500'>Refund Policy</span>
                </div>

                {/* Social Links Section */}
                <div className='flex flex-col gap-2 basis-1/4'>
                    <p className='text-md font-bold text-black'>Socials</p>
                    <span className='flex items-center gap-2 text-xs text-gray-500'>
                        <AiFillFacebook size={18} /> Facebook
                    </span>
                    <span className='flex items-center gap-2 text-xs text-gray-500'>
                        <AiFillInstagram size={18} /> Instagram
                    </span>
                    <span className='flex items-center gap-2 text-xs text-gray-500'>
                        <AiFillTwitterCircle size={18} /> Twitter
                    </span>
                    <span className='flex items-center gap-2 text-xs text-gray-500'>
                        <AiFillLinkedin size={18} /> LinkedIn
                    </span>
                </div>

                {/* Payment Methods */}
                <div className='flex flex-col gap-4 basis-1/4'>
                    <span className='text-md font-bold'>Support Payment By</span>
                    <img src={StripeIcon} alt="Stripe Payment" className='w-[100px] h-auto' />
                </div>
            </div>

            {/* Bottom Section: Copyright */}
            <div className='mt-12 mb-2 text-xs text-gray-400 flex justify-between w-full'>
                <span>© 2024 EASYMART. All Rights Reserved.</span>
                <span>Privacy & Terms</span>
            </div>
        </footer>
    );
}

export default Footer;
