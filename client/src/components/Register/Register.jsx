import React, { useState,useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { CgSpinnerAlt } from 'react-icons/cg';
import { GiSparkles } from "react-icons/gi";
import logo from '../../images/logo.png';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/actions/userActions';

const Register = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const dispatch = useDispatch()
    const navigate = useNavigate()

    

    const { user, error, loading, isAuthenticated } = useSelector((state) => state.user)


    useEffect(() => {

        if (error) {
            toast.error(`Error Registering: ${error || 'An unexpected error occurred.'}`);
        }


        if (isAuthenticated) {
            toast.success("Congratulations! Your account has been created.")
            navigate("/");
        }

    }, [error, isAuthenticated, navigate , toast]);


    const handleRegister = async () => {

        const { firstName, lastName, email, password } = userInfo;


        if (
            firstName.trim() === '' ||
            lastName.trim() === '' ||
            email.trim() === '' ||
            password.trim() === ' '
        ) {

            return toast.error('All fields are required. Please fill out the form completely.');
        }


        dispatch(register(userInfo))


        if (user && !error && !loading) {

            toast.success("Congratulations! Your account has been created.")

        }
    };

    return (
        <div className='p-4 pb-8 flex flex-col xl:flex-row gap-4 w-full h-screen overflow-hidden'>
            <div className='lg:w-full xl:w-[40%] bg-[#f4f4f6] rounded-md py-8 px-6 flex flex-col gap-8 font-mono order-last xl:-order-last my-auto md:my-0'>
                {/* <h2 className='font-semibold text-base mx-auto'>EasyMart</h2> */}
                <img src={logo} alt='EasyMart' className='h-auto w-20 object-cover mx-auto' />

                <div className='flex flex-col gap-4 mx-auto'>
                    <h1 className='text-xl md:text-3xl font-semibold font-mono mx-auto '>Welcome to EasyMart.</h1>
                    <p className='text-gray-500 text-sm mx-auto'>
                        Join us today and start your seamless shopping experience.
                    </p>
                </div>

                <div className='flex flex-col gap-4'>

                    <div className='flex md:flex-row flex-col gap-8 w-full'>

                        <div className='flex flex-col flex-1 gap-2'>
                            <label htmlFor="fName" className='text-xs'>First name</label>
                            <input type="text" id='fName' name='fName' placeholder='Enter your first name' className='px-4 py-1 rounded-md border-2 border-gray-300'
                                value={userInfo.firstName} onChange={(e) => setUserInfo((prev) => ({ ...prev, firstName: e.target.value }))} />

                        </div>
                        <div className='flex flex-col flex-1 gap-2'>
                            <label htmlFor="lName" className='text-xs'>Last name</label>
                            <input type="text" id='lName' name='lName' placeholder='Enter your last name' className='px-4 py-1 rounded-md border-2 border-gray-300'
                                value={userInfo.lastName} onChange={(e) => setUserInfo((prev) => ({ ...prev, lastName: e.target.value }))} />


                        </div>

                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='email' className='text-xs'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='you@example.com'
                            className='px-4 py-1 rounded-md border-2 border-gray-300'
                            value={userInfo.email}
                            onChange={(e) => setUserInfo((prev) => ({ ...prev, email: e.target.value }))}
                        />
                    </div>


                    <div className='flex flex-col gap-2'>
                        <label htmlFor='password' className='text-xs'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Enter your password'
                            className='px-4 py-1 rounded-md border-2 border-gray-300'
                            value={userInfo.password}
                            onChange={(e) => setUserInfo((prev) => ({ ...prev, password: e.target.value }))}
                        />
                    </div>





                    <button
                        className='px-4 text-center bg-black text-white py-2 rounded-md mt-4 hover:bg-gray-800 transition ease-in-out duration-300 disabled:bg-gray-700'
                        onClick={handleRegister}
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? (
                            <span className='flex gap-4 items-center justify-center'><CgSpinnerAlt size={28} className='animate-spin' /> Registering...</span>
                        ) : (
                            'Register'
                        )}
                    </button>

                    <Link to={'/'} className='flex w-full'>
                        <button className='rounded-md w-full bg-white text-black flex items-center justify-center py-2 px-4 border-black border-2 hover:bg-gray-200 transition ease-in-out duration-300'>
                            <FaArrowLeft className='mr-2' /> Go Back to Home
                        </button>
                    </Link>


                    <div className='flex w-full items-center gap-3'>
                        <hr className='flex-1 border-gray-500' />  {/* Darker gray */}
                        <span className='text-gray-500 text-sm'>OR</span>
                        <hr className='flex-1 border-gray-500' />  {/* Darker gray */}
                    </div>

                    <p className='text-sm text-gray-600 mx-auto'>Already have an account? <a href='/login' className='font-semibold text-black'>Login</a></p>

                </div>
            </div>


            <EnhancedComponent />


            <Toaster />
        </div>
    );
};

export default Register;



const EnhancedComponent = () => {
    return (
        <div
            className='xl:w-[60%] md:flex hidden items-end bg-cover bg-center rounded-md relative '
            style={{
                background: 'linear-gradient(90deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%)',
                height: 'calc(100% - 0rem)',
            }}
        >
            {/* Enhanced Decorative Elements */}
            <div className='w-24 h-24 absolute top-10 left-6 rounded-full bg-white/20 backdrop-blur-sm shadow-lg animate-pulse' />
            <div className='w-8 h-8 absolute top-28 left-24 rounded-full bg-black/20 backdrop-blur-md shadow-md animate-bounce' />
            <div className='w-24 h-24 absolute bottom-10 right-6 rounded-full bg-white/20 backdrop-blur-lg shadow-2xl animate-spin' />
            <div className='w-24 h-24 absolute top-48 right-24 rounded-full bg-white/20 backdrop-blur-xl shadow-xl animate-ping' />
            <div className='w-32 h-32 absolute top-1/4 left-1/4 rounded-full bg-gradient-to-br from-yellow-300 via-red-300 to-pink-300 opacity-40 blur-3xl animate-pulse' />
            <div className='w-16 h-16 absolute bottom-1/4 right-1/4 rounded-full bg-gradient-to-br from-blue-300 via-teal-300 to-indigo-300 opacity-30 blur-md animate-bounce' />
            <div className='w-40 h-40 absolute top-1/3 left-1/3 rounded-full bg-gradient-to-br from-green-300 via-lime-300 to-emerald-300 opacity-25 blur-lg animate-spin' />
            <div className='w-20 h-20 absolute bottom-1/3 left-1/3 rounded-full bg-gradient-to-br from-purple-300 via-pink-300 to-red-300 opacity-20 blur-xl animate-ping' />

            {/* Content Section */}
            <div className='flex flex-col gap-36 ml-8 text-white my-auto'>
                <div className='flex flex-col gap-4 w-[80%] select-none'>
                    <GiSparkles size={48} className='mr-2' />
                    <h1 className='text-4xl font-extrabold flex items-center ml-8'>
                        Create Your EasyMart Account
                    </h1>
                    <p className='text-base ml-8'>
                        Join EasyMart today and unlock a world of exclusive benefits. Your shopping journey starts here — let's make it exceptional together!

                    </p>
                    <GiSparkles size={48} className='ml-auto' />
                </div>

                {/* Back to Home Button */}


            </div>
        </div>
    );
};