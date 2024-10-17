import React, { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, updateUser } from '../../redux/actions/userActions';
import { FaLock } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { CLEAR_MESSAGE, CLEAR_ERROR } from '../../redux/slices/userSlice';
const User = () => {
    const { user, error, message } = useSelector((state) => state.user);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [showEditDialog, setShowEditDialog] = useState(null)

    const dispatch = useDispatch()
    useEffect(() => {
        if (user && user.name) {
            const [first, ...last] = user.name.split(" ");
            setFirstName(first);
            setLastName(last.join(" "));
        }
    }, [user]);

    // console.log(error)

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(CLEAR_ERROR());
        }
    }, [error]);


    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(CLEAR_MESSAGE())
        }
    }, [message]);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    // console.log(user?.avatar.url)
    return (
        <div className='px-2 md:px-4 flex flex-col gap-4 bg-white py-4 rounded-lg'>
            <div className='flex flex-col gap-4'>

                <div className='flex gap-6 md:gap-8 items-center'>
                    <img src={user?.avatar.url} className='w-28 h-28 rounded-full' alt="Profile" />
                    <div className='flex flex-col'>
                        <h3 className='font-semibold md:flex hidden text-xs md:text-sm '>Profile picture</h3>
                        <p className=' md:flex hidden text-xs text-gray-500'>PNG, JPEG under 15MB</p>
                    </div>
                    <div className='flex md:flex-row flex-col gap-2 md:gap-4 ml-auto'>
                        <button className='bg-[#2d94f0] p-2 md:p-2 border-2 border-blue-400 text-white shadow-sm rounded-lg text-[0.675rem] md:text-sm  font-semibold'>Upload new picture</button>
                        <button className='text-red-600 py-2 px-6 md:py-2 border-2 border-red-200 rounded-lg text-xs md:text-sm bg-white font-medium'>Delete</button>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-1'>

                <div className='flex justify-between'>
                    <h2 className='text-base font-medium'> Full name</h2>
                    <button
                        className='flex gap-2 bg-white px-2 py-1 border-2 border-gray-400 shadow-sm rounded-lg text-sm text-gray-400 font-semibold items-center'
                        onClick={() => setShowEditDialog("name")}
                    >
                        <FaPencilAlt />
                        Edit
                    </button>
                </div>

                <div className=' flex-col md:flex-row flex justify-between gap-12'>
                    <div className='flex flex-col gap-1 w-full'>
                        <label htmlFor="firstName" className='text-gray-400 text-xs font-semibold'>First name</label>
                        <input
                            id="firstName"
                            type='text'
                            value={firstName}
                            onChange={handleFirstNameChange}
                            className='border border-gray-300 rounded-lg p-2 w-full text-sm'
                        />
                    </div>

                    <div className='flex flex-col gap-1 w-full'>
                        <label htmlFor="lastName" className='text-gray-400 text-xs font-semibold'>Last name</label>
                        <input
                            id="lastName"
                            type='text'
                            value={lastName}
                            onChange={handleLastNameChange}
                            className='border border-gray-300 rounded-lg p-2 w-full text-sm'
                        />
                    </div>
                </div>
            </div>


            <hr className='mt-3 h-[0.15rem] bg-gray-200' />
            <div className='flex flex-col gap-3'>


                <h2 className='text-base font-medium'>Contact Email</h2>




                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="email" className='text-gray-400 text-xs font-semibold'>Email</label>
                    <input
                        id="email"
                        type='email'
                        value={user?.email}

                        className='border border-gray-300 rounded-lg p-2 text-sm  md:w-[48%]'
                    />
                </div>
            </div>



            <hr className='mt-3 h-[0.15rem] bg-gray-200' />


            <div className='flex justify-between mb-8'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-base font-medium'>Password</h2>
                    <p className='text-gray-600 text-xs'>
                        Modify your current password
                    </p>
                </div>
                <button
                    className='flex gap-2 bg-white px-2 py-1 border-2 border-gray-400 shadow-sm rounded-lg text-sm text-gray-400 font-semibold items-center'
                    onClick={() => setShowEditDialog('password')}
                >
                    <FaLock />
                    Change Password
                </button>
            </div>




            {showEditDialog === 'name' && <EditNameDialog firstName={firstName} lastName={lastName} setShowEditDialog={setShowEditDialog} />}
            {showEditDialog === 'password' && <ChangePasswordDialog setShowEditDialog={setShowEditDialog} />}
            <Toaster />
        </div>
    );
};

export default User;

const EditNameDialog = ({ firstName, lastName, setShowEditDialog }) => {
    const [name, setName] = useState({
        firstName: firstName,
        lastName: lastName,
    });

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);

    const handleFirstNameChange = (e) => {
        setName((prev) => ({ ...prev, firstName: e.target.value }));
    };

    const handleLastNameChange = (e) => {
        setName((prev) => ({ ...prev, lastName: e.target.value }));
    };

    const handleEdit = () => {
        if (!name.firstName || !name.lastName) {
            toast.error("Both first and last names are required.");
            return;
        }

        dispatch(updateUser(name))

        setShowEditDialog(null);

    };


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.75)]"
            onClick={() => setShowEditDialog(null)}
        >
            <div
                className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setShowEditDialog(null)}
                >
                    &#x2715;
                </button>

                {/* Main Heading */}
                <h2 className="text-3xl font-bold mb-2">Edit Your Name</h2>

                {/* Subheading */}
                <p className="text-gray-600 mb-6">
                    Update your first and last name and click "Edit" to save changes.
                </p>

                {/* First Name Input */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-gray-600 font-semibold">
                        First Name
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        value={name.firstName}
                        onChange={handleFirstNameChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your first name"
                    />
                </div>

                {/* Last Name Input */}
                <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="lastName" className="text-gray-600 font-semibold">
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        value={name.lastName}
                        onChange={handleLastNameChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your last name"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end mt-6">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition ease-in-out"
                        onClick={() => setShowEditDialog(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ease-in-out ml-2"
                        onClick={handleEdit}
                    >
                        {loading ? "Editing..." : "Edit"}
                    </button>
                </div>
            </div>
        </div>
    );
};
const ChangePasswordDialog = ({ setShowEditDialog }) => {
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };
    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };





    const handleChangePassword = () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("All password fields are required.");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        dispatch(updatePassword(oldPassword, newPassword, confirmPassword))


        setShowEditDialog(null);



    };


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.75)]"
            onClick={() => setShowEditDialog(null)}
        >
            <div
                className="bg-gray-100 p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setShowEditDialog(null)}
                >
                    &#x2715;
                </button>

                {/* Main Heading */}
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Change Your Password</h2>

                {/* Subheading */}
                <p className="text-gray-600 mb-4">
                    Update your password and click "Change" to save changes.
                </p>

                {/*Old Password Input */}
                <div className="flex items-center gap-2 mb-4">
                    <FaLock className="text-gray-500" />
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={handleOldPasswordChange}
                        className="border border-gray-300 rounded-md p-2 w-full text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Old password"
                    />
                </div>

                <hr className='my-3 h-[0.15rem] bg-gray-400' />

                {/*New Password Input */}
                <div className="flex items-center gap-2 mb-4">
                    <FaLock className="text-gray-500" />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        className="border border-gray-300 rounded-md p-2 w-full text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="New password"
                    />
                </div>

                {/* Confirm Password Input */}
                <div className="flex items-center gap-2 mb-4">
                    <FaLock className="text-gray-500" />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className="border border-gray-300 rounded-md p-2 w-full text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm password"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end mt-6 gap-2">
                    <button
                        className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition ease-in-out"
                        onClick={() => setShowEditDialog(null)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ease-in-out"
                        onClick={handleChangePassword}
                    >
                        {loading ? "Changing..." : "Change"}
                    </button>
                </div>
            </div>
        </div>
    );
};