import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { CgSpinnerAlt } from 'react-icons/cg';
import { GiSparkles } from "react-icons/gi";
import logo from '../../images/logo.png';
import Button from "../Home/Button";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { user, loading, error, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {

        if (error) {
            return toast.error(`Error Logging In: ${error || 'An unexpected error occurred.'}`);
        }


        if (isAuthenticated) {
            toast.success("Login successful! We're glad to see you again.")
            const redirect = sessionStorage.getItem("easymart_redirect") || "/"
            sessionStorage.removeItem("easymart_redirect")
            navigate(redirect);
        }

    }, [error, isAuthenticated, navigate, toast]);


    console.log(user)


    const handleLogin = (e) => {
        e.preventDefault();

        if (email.trim() === "" || password.trim() === "") {
            return toast.error("Please fill in both fields.");
        }

        dispatch(login(email, password));

        if (user) {
        
            toast.success("Login successful! We're glad to see you again.")

        }



    };

    return (
        <div className='p-4 pb-8 flex flex-col xl:flex-row gap-4 w-full h-screen overflow-hidden'>
            <div className='lg:w-full xl:w-[40%] bg-[#f4f4f6] rounded-md py-8 px-6 flex flex-col gap-8 font-mono order-last xl:-order-last my-auto md:my-0'>

                <div className='flex flex-col gap-4 mx-auto'>
                    <h1 className='text-xl md:text-3xl font-semibold font-mono mx-auto '>Welcome Back to <span className='text-blue-500 text-4xl'> EasyMart </span>.</h1>
                    <p className='text-gray-500 text-sm mx-auto'>
                        Enter your email and password to continue.
                    </p>
                </div>

                <form className='flex flex-col gap-4' onSubmit={handleLogin}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='email' className='text-xs'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='you@example.com'
                            className='px-4 py-1 rounded-md border-2 border-gray-300'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <a href='/forgotPassword' className='w-full flex justify-end font-semibold'>
                        Forgot password
                    </a>

                    <button
                        className='px-4 bg-indigo-600 bg-gradient-to-r from-pink-500 to-violet-500 text-center  text-white py-2 rounded-md mt-4 hover:bg-gray-800 transition ease-in-out duration-300 disabled:bg-gray-700'
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? (
                            <span className='flex gap-4 items-center justify-center'>
                                <CgSpinnerAlt size={28} className='animate-spin' />
                                Logging in...
                            </span>
                        ) : (
                            'Login'
                        )}
                    </button>

                    <Link to={'/'} className='flex w-full'>
                        <button className='rounded-md w-full bg-white text-blue-600  flex items-center justify-center py-2 px-4 border-blue-500 border-2 hover:bg-gray-200 transition ease-in-out duration-300'>
                            <FaArrowLeft className='mr-2' /> Go Back to Home
                        </button>
                    </Link>

                    <div className='flex w-full items-center gap-3'>
                        <hr className='flex-1 border-gray-500' />  {/* Darker gray */}
                        <span className='text-gray-500 text-sm'>OR</span>
                        <hr className='flex-1 border-gray-500' />  {/* Darker gray */}
                    </div>

                    <p className='text-sm text-gray-600 mx-auto'>Don't have an account? <a href='/register' className='font-semibold text-black'>Register</a></p>
                </form>
            </div>

            <EnhancedComponent />

            <Toaster />
        </div>
    );
};

export default Login;

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
                        Welcome Back!
                    </h1>
                    <p className='text-base ml-8'>
                        We’re thrilled to have you here again! Explore new features and updates we’ve added just for you. Your satisfaction is our priority, and we’re here to make your experience exceptional.
                    </p>
                    <GiSparkles size={48} className='ml-auto' />
                </div>
            </div>
        </div>
    );
};
