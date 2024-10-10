import React, { useState, useRef, useEffect } from 'react';
import logo from '../../../images/logo.png';
import { IoIosSearch } from "react-icons/io";
import { GiGears, GiShoppingCart } from "react-icons/gi";
import { BiUser, BiUserCheck } from "react-icons/bi";
import { Link, NavLink } from 'react-router-dom';
import { IoCall } from 'react-icons/io5';
import { AiOutlineInfoCircle, AiOutlineTag } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineDashboard, MdLogout } from "react-icons/md";
import { logout } from '../../../redux/actions/userActions';

const Navbar = () => {
    const [searchValue, setSearchValue] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const { isAuthenticated, isAdmin } = useSelector((state) => state.user);
    const { cartItemsCount } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const handleSearchClick = () => {
        if (searchValue.trim() === "") return;
        navigate(`/products?search=${encodeURIComponent(searchValue)}`);
        setSearchValue("");
    };

    const { pathname } = useLocation();
    if (pathname === '/contact' || pathname === "/login" || pathname === "/register" || pathname === "/forgotPassword" || pathname === "/checkout-details" || pathname.split("/")[1] === "password" || pathname === "/profile") return null;

    return (
        <div className='max-w-screen-2xl w-full bg-white pr-3 lg:px-8 sticky top-0 z-50 py-4'>
            <div className='flex items-center w-full gap-8'>
                <Link to={"/"}>
                    <NavLink to={"/"} className='text-2xl font-semibold text-[#415be6]'>EASYMART</NavLink>
                </Link>
                <div className='flex   md:w-full items-center'>
                    <div className='relative h-10 border-gray-300 items-center w-[60%] lg:w-[65%] xl:w-[40%] hidden md:flex mx-auto'>
                        <span
                            className='absolute left-0 top-0 bottom-0 border-[1px] border-gray-300 border-r-0  p-2 bg-gray-200 text-lg font-bold text-gray-500 cursor-pointer flex items-center justify-center rounded-l-md'
                            onClick={handleSearchClick}
                        >
                            <IoIosSearch size={20} />
                        </span>
                        <input
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            type="text"
                            className='h-full border-[1px] border-gray-300 rounded-md pl-10 text-sm p-1 w-full text-gray-500 placeholder-gray-400 bg-gray-200'
                            placeholder='Search for products, brands, or categories...'
                        />
                    </div>



                    <div className='flex gap-4 xl:gap-10 mr-16'>
                        <div className='flex flex-col items-center md:hidden' onClick={() => setShowSearch(prev => !prev)}>
                            <IoIosSearch size={24} />
                        </div>
                        <NavLink to={"/explore"} className='flex flex-col items-center'>
                            <AiOutlineInfoCircle size={18} />
                            <span className='text-xs hidden md:flex'>Explore</span>
                        </NavLink>
                        <NavLink to={"/cart"} className='flex flex-col items-center relative'>
                            <GiShoppingCart size={18} />
                            <span className='text-xs hidden md:flex'>Cart</span>
                            {cartItemsCount > 0 && <div className='absolute -top-1 left-4 bg-red-600 text-white w-4 h-4 text-[8px] flex items-center justify-center rounded-full'>
                                {cartItemsCount}
                            </div>}
                        </NavLink>
                        <NavLink to={"/contact"} className='flex flex-col items-center'>
                            <IoCall size={18} />
                            <span className='text-xs hidden md:flex'>Contact</span>
                        </NavLink>
                        {isAuthenticated ? (
                            <p className='flex flex-col items-center relative' onClick={() => setShowPopup(true)}>
                                <BiUserCheck size={18} />
                                <span className='text-xs hidden md:flex'>Profile</span>
                                {showPopup && <ProfilePopup setShowPopup={setShowPopup} />}
                            </p>
                        ) : (
                            <NavLink to={"/login"} className='flex flex-col items-center'>
                                <BiUser size={18} />
                                <span className='text-xs hidden md:flex'>Login</span>
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
            {showSearch && (
                <div className=' h-10 items-center w-full px-4 mb-2 flex md:hidden '>
                    <input type="text" className='h-full border-2 border-gray-300 rounded-l-md p-1 w-full' />
                    <span className='p-2 bg-black text-lg font-bold text-white rounded-r-md '><IoIosSearch size={24} /></span>
                </div>
            )}
        </div>
    );
};

export default Navbar;
const ProfilePopup = ({ setShowPopup }) => {
    const { isAdmin, user } = useSelector((state) => state.user);
    const popupRef = useRef(null);
    const dispatch = useDispatch()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setShowPopup]);

    const handleLinkClick = () => {
        setTimeout(() => {
            setShowPopup(false);
        }, 100); // Delay to allow navigation to occur
    };


    const handleLogout = () => {

        dispatch(logout())



    }

    return (
        <div ref={popupRef} className="w-44 h-auto -right-4 top-10 border-2 rounded-lg bg-white absolute flex flex-col py-4">
            {/* Account Settings */}
            <p className='flex items-center gap-2 py-2 text-[12px] hover:bg-gray-100 rounded-md p-4'>
                <BiUser size={16} /> <span>{user.name}</span>
            </p>
            <Link to="/profile" className='flex items-center gap-2 py-2 text-[12px] hover:bg-gray-100 rounded-md p-4' onClick={handleLinkClick}>
                <GiGears size={16} /> <span>Account Settings</span>
            </Link>
            {isAdmin && (
                <Link to="/admin/dashboard" className='flex items-center gap-2 py-2 text-[12px] hover:bg-gray-100 rounded-md p-4' onClick={handleLinkClick}>
                    <MdOutlineDashboard size={16} /> <span>Dashboard</span>
                </Link>
            )}
            <button className='flex items-center gap-2 py-2 text-[12px] hover:bg-gray-100 rounded-md text-left p-4' onClick={handleLogout}>
                <MdLogout size={16} /> <span>Logout</span>
            </button>
        </div>
    );
};

