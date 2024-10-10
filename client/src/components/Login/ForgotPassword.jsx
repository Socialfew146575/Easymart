import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { CgSpinnerAlt } from 'react-icons/cg';
import { GiSparkles } from "react-icons/gi";
import logo from '../../images/logo.png';
import { useDispatch, useSelector } from "react-redux"
import { forgotPassword } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const { message, loading, error, isAuthenticated } = useSelector((state) => state.user);
    const [timer, setTimer] = useState(0);
    const navigate = useNavigate()
    useEffect(() => {
        if (error) {
            return toast.error(error);
        }

        if (message) {
            // Start a 3-minute timer
            setTimer(180); // 180 seconds = 3 minutes
            toast.success("Reset link sent! Please check your email.");
        }

        if (isAuthenticated) {

            navigate("/");
        }

    }, [error, message,isAuthenticated]);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const handleSendResetLink = () => {
        if (email.trim() === "") {
            return toast.error("Oops! It looks like you missed your email. Please enter it to proceed.");
        }

        dispatch(forgotPassword(email));
    };

    return (
        <div className='p-4 pb-8 flex flex-col xl:flex-row gap-4 w-full h-screen overflow-hidden'>
            <div className='lg:w-full xl:w-[40%] bg-[#f4f4f6] rounded-md py-8 px-6 flex flex-col gap-8 font-mono order-last xl:-order-last my-auto md:my-0'>
                <img src={logo} alt='EasyMart' className='h-auto w-20 object-cover mx-auto' />

                <div className='flex flex-col gap-4 mx-auto'>
                    <h1 className='text-xl md:text-3xl font-semibold font-mono mx-auto'>Forgot Your Password?</h1>
                    <p className='text-gray-500 text-sm mx-auto'>
                        Enter your email below, and we’ll send you a link to reset your password.
                    </p>
                </div>

                <div className='flex flex-col gap-4'>
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
                            disabled={timer > 0} // Disable input if timer is running
                        />
                    </div>

                    <div className='flex flex-col gap-4'>
                        {/* Message displayed after successful reset link sent */}
                        {timer > 0 && (
                            <div className='flex flex-col items-center'>
                                <span className='text-sm'>
                                    A reset link has been sent to your email. Please check your inbox.
                                </span>
                                <span className='text-xs text-gray-400 mt-1'>
                                    Didn’t receive the email? Check your spam folder or try again later.
                                </span>
                            </div>
                        )}


                        <button
                            className='px-4 text-center bg-gradient-to-r from-pink-500 to-violet-500 text-white py-2 rounded-md mt-4 hover:bg-gray-800 transition ease-in-out duration-300 disabled:bg-gray-700'
                            onClick={handleSendResetLink}
                            type='submit'
                            disabled={loading || timer > 0} // Disable button if loading or timer is running
                        >
                            {loading ? (
                                <span className='flex gap-4 items-center justify-center'>
                                    <CgSpinnerAlt size={28} className='animate-spin' /> Sending...
                                </span>
                            ) : timer > 0 ? (
                                <span>
                                    Please wait {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')} to resend
                                </span>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>

                       
                    </div>




                    <Link to={'/'} className='flex w-full'>
                        <button className='rounded-md w-full bg-white text-blue-600 flex items-center justify-center py-2 px-4 border-blue-500 border-2 hover:bg-gray-200 transition ease-in-out duration-300'>
                            <FaArrowLeft className='mr-2' /> Go Back to Home
                        </button>
                    </Link>
                </div>
            </div>

            <EnhancedComponent />

            <Toaster />
        </div>
    );
};

export default ForgotPassword;

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
                        Trouble Logging In?
                    </h1>
                    <p className='text-base ml-8'>
                        Don’t worry! We’ve got you covered. Just enter your email address, and we’ll send you instructions on how to reset your password.
                    </p>
                    <GiSparkles size={48} className='ml-auto' />
                </div>
            </div>
        </div>
    );
};
