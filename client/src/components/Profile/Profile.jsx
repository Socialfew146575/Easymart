import React, { useState } from 'react';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { CgMenu, CgProfile, CgSearch } from 'react-icons/cg';
import { FaBox } from 'react-icons/fa';
import User from './User';
import Orders from './Orders';


import { UseSelector, useSelector } from 'react-redux';

const Profile = () => {
    const [tab, setTab] = useState("Profile");
    const [showSidebar, setShowSidebar] = useState(false);
    const { ordersCount } = useSelector((state) => state.order)
    const renderTabContent = () => {
        if (tab === "Profile") return <User />;
        if (tab === "Orders") return <Orders />;
    };

    const renderTabHeading = () => {
        if (tab === "Profile") return "Your Profile";
        if (tab === "Orders") return `Your Orders (${ordersCount})`;
    };

    return (
        <div className='bg-white w-full min-h-screen'>
            <div className='flex items-center px-16 py-4'>
                <CgMenu className='flex md:hidden ml-4 cursor-pointer' onClick={() => setShowSidebar((prev) => !prev)} />
                <Link to={"/"} className='flex items-center'>

                    <h1 className='text-2xl font-bold  text-blue-500'>EasyMart</h1>
                </Link >
            </div>

            {/* Sidebar for mobile */}
            {showSidebar && <Sidebar tab={tab} setTab={setTab} setShowSidebar={setShowSidebar} />}

            <div className='flex w-full gap-1 px-2 '>
                {/* Sidebar for desktop */}
                <div className='hidden md:inline w-[15%]  rounded-md ' style={{ height: 'calc(100vh - 120px)' }}>
                    <h1 className='flex items-center justify-between px-4 text-xl py-4 font-semibold border-b-2 border-white'>
                        Settings <CgSearch color='blue' />
                    </h1>

                    <div className='flex flex-col gap-4 py-4 justify-center '>
                        <h3
                            className={`flex pl-6 items-center gap-8 text-base font-medium py-3 ${tab === "Profile" ? "bg-blue-50 border-r-2 border-r-blue-600" : ""}`}
                            onClick={() => setTab("Profile")}>
                            <CgProfile color='gray' /> Profile
                        </h3>
                        <h3
                            className={`flex pl-6 items-center gap-8 text-base font-medium py-3 ${tab === "Orders" ? "bg-blue-50 border-r-2 border-r-blue-600" : ""}`}
                            onClick={() => setTab("Orders")}>
                            <FaBox color='gray' /> Orders
                        </h3>
                    </div>
                </div>

                {/* Main content */}
                <div className='flex-1  rounded-md bg-[#f6f6f6]' style={{ height: 'calc(100vh - 120px)' }}>
                    <h2 className="text-xl font-semibold text-gray-700 px-8  pt-4 flex items-center">
                        {renderTabHeading()}
                    </h2>
                    <div className="px-4 md:px-4 pt-4">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

// Sidebar Component for mobile
const Sidebar = ({ tab, setTab, setShowSidebar }) => {
    const handleTabClick = (selectedTab) => {
        setTab(selectedTab);
        setShowSidebar(false); // Hide sidebar after selection on mobile
    };

    return (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-50' onClick={() => setShowSidebar(false)}>
            <div className='w-[50%] bg-white h-full' onClick={(e) => e.stopPropagation()}>
                <h1 className='flex items-center justify-between px-4 text-xl py-4 font-semibold border-b-2'>
                    Settings <CgSearch color='gray' />
                </h1>

                <div className='flex flex-col gap-4 py-4'>
                    <h3
                        className={`flex pl-6 items-center gap-8 text-base font-medium py-3 ${tab === "Profile" ? "bg-blue-100 border-r-4 border-r-blue-500" : ""}`}
                        onClick={() => handleTabClick("Profile")}>
                        <CgProfile color='gray' /> Profile
                    </h3>
                    <h3
                        className={`flex pl-6 items-center gap-8 text-base font-medium py-3 ${tab === "Orders" ? "bg-blue-100 border-r-4 border-r-blue-500" : ""}`}
                        onClick={() => handleTabClick("Orders")}>
                        <FaBox color='gray' /> Orders
                    </h3>
                </div>
            </div>
        </div>
    );
};
