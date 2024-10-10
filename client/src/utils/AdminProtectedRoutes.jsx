import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminProtectedRoutes = ({ children }) => {
    const { user, loading } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate('/login'); // Redirect to login if user is not authenticated
            } else if (user.role !== 'admin') {
                return null; // Return null if the user is not an admin
            }
        }
    }, [loading, user, navigate]);

    if (loading) {
        return <div>Loading...</div>; // Loading state while checking user data
    }

    return user && user.role === 'admin' ? children : null; // Return children if admin, otherwise return null
};

export default AdminProtectedRoutes;
