import React, { useState } from 'react';
import Contactus from "../../images/contactus.jpg";
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { CgSpinnerAlt } from "react-icons/cg";
import Button from "../Home/Button"; // Import the Button component
import iphone from "../../images/iphone.png"
const Contact = () => {

    const [supportEmail, setSupportEmail] = useState({ firstName: "", lastName: "", subject: "", message: "", email: "" });
    const [loading, setLoading] = useState(false);

    const handleSendClick = async () => {
        setLoading(true);
        const { firstName, lastName, subject, message, email } = supportEmail;

        try {
            if (firstName.trim() === "" || lastName.trim() === "" || subject.trim() === "" || message.trim() === "" || email.trim() === "") {
                setLoading(false);
                return toast.error("All fields are required. Please fill out the form completely.");
            }

            await axios.post(`${process.env.REACT_APP_API_URL}/support`, supportEmail);

            toast.success("Your message has been sent successfully!");
            setSupportEmail({ firstName: "", lastName: "", subject: "", message: "", email: "" });
        } catch (error) {
            console.error(error);
            toast.error("Failed to send the email. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4 pb-8 flex flex-col xl:flex-row gap-4 w-full h-screen overflow-hidden'>
            <div className='lg:w-full xl:w-[40%] bg-[#f4f4f6] rounded-md py-6 px-6 flex flex-col gap-3 font-mono order-last xl:-order-last'>
                <h2 className='font-semibold text-2xl text-[#415be6]'>EasyMart</h2>

                <div className='flex flex-col gap-2'>
                    <h1 className='text-3xl font-semibold font-mono'>We'd like to help you.</h1>
                    <p className='text-gray-500 text-sm'>We're a full-service agency with experts ready to help. We'll get in touch within 24hrs.</p>
                </div>

                <div className='flex flex-col gap-4'>
                    <div className='flex md:flex-row flex-col gap-8 w-full'>
                        <div className='flex flex-col flex-1 gap-2'>
                            <label htmlFor="fName" className='text-xs'>First name</label>
                            <input type="text" id='fName' name='fName' placeholder='Enter your first name' className='px-4 py-1 rounded-md border-2 border-gray-300'
                                value={supportEmail.firstName} onChange={(e) => setSupportEmail((prev) => ({ ...prev, firstName: e.target.value }))} />
                        </div>
                        <div className='flex flex-col flex-1 gap-2'>
                            <label htmlFor="lName" className='text-xs'>Last name</label>
                            <input type="text" id='lName' name='lName' placeholder='Enter your last name' className='px-4 py-1 rounded-md border-2 border-gray-300'
                                value={supportEmail.lastName} onChange={(e) => setSupportEmail((prev) => ({ ...prev, lastName: e.target.value }))} />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className='text-xs'>Email</label>
                        <input type="email" id='email' name='email' placeholder='you@example.com' className='px-4 py-1 rounded-md border-2 border-gray-300' value={supportEmail.email} onChange={(e) => setSupportEmail((prev) => ({ ...prev, email: e.target.value }))} />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="subject" className='text-xs'>Subject</label>
                        <input type="text" id='subject' name='subject' placeholder='How can we help you?' className='px-4 py-1 rounded-md border-2 border-gray-300'
                            value={supportEmail.subject} onChange={(e) => setSupportEmail((prev) => ({ ...prev, subject: e.target.value }))} />
                    </div>

                    <div className='flex flex-col flex-1 gap-2'>
                        <label htmlFor="message" className='text-xs'>Message</label>
                        <textarea id='message' name='message' placeholder='Leave us a message...' rows={5} className='px-4 py-2 rounded-md border-2 border-gray-300'
                            value={supportEmail.message} onChange={(e) => setSupportEmail((prev) => ({ ...prev, message: e.target.value }))} />
                    </div>

                    {/* Use your custom Button here */}
                    <Button
                        title="Send Message"
                        onClick={handleSendClick}
                        width="w-full"
                        padding="py-2"
                        loading={loading}
                    />

                    <Link to={"/"} className=' md:hidden flex w-full'>
                        <button className='rounded-md w-full  bg-white text-black flex items-center justify-center py-2 px-4 border-black border-2 hover:bg-gray-200 transition ease-in-out duration-300'>
                            <FaArrowLeft className='mr-2' /> Go Back to Home
                        </button>
                    </Link>

                </div>
            </div>

            <div
                className='xl:w-[60%] md:flex hidden items-end bg-cover bg-center rounded-md overflow-hidden'
                style={{ backgroundImage: `url(${iphone})`, backgroundSize: 'cover', height: "calc(100% - 0rem)" }}
            >

                <Link to={"/"} className='mb-4 ml-4'>
                    <button className='rounded-full bg-white text-blue-600 flex items-center justify-center p-3 px-6 border-blue-500 border-2 hover:bg-gray-200 transition ease-in-out duration-300'>
                        <FaArrowLeft className='mr-2' /> Go Back to Home
                    </button>
                </Link>
            </div>
            <Toaster />
        </div>
    );
};

export default Contact;
