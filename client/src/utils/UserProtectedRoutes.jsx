import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const UserProtectedRoutes = ({ children }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log("Loading:", loading); // Log loading state
        console.log("Is Authenticated:", isAuthenticated); // Log authentication state
        console.log("Current Location:", location.pathname); // Log the current path

        if (!loading) {
            if (!isAuthenticated) {
                // Store the current path the user was trying to access
                sessionStorage.setItem("easymart_redirect", location.pathname);
                navigate('/login'); // Redirect to login if the user is not authenticated
            }
        }
    }, [loading, isAuthenticated, navigate, location.pathname]);

    if (loading) {
        return <div>Loading...</div>; // Loading state while checking user data
    }

    return isAuthenticated ? children : null; // Return children if authenticated, otherwise return null
};

export default UserProtectedRoutes;
