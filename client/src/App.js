import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductPage from "./components/Product/ProductPage";
import { Route, Routes } from "react-router-dom";
import Products from "./components/Product/Products";
import Navbar from "./components/layout/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ForgotPassword from "./components/Login/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userActions";
import ResetPassword from "./components/Login/ResetPassword";
import Profile from "./components/Profile/Profile";
import OrderDetail from "./components/Orders/OrderDetail";
import Checkout from "./components/Checkout/Checkout";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CategoryBar from "./components/layout/CategoryBar/CategoryBar";
import UserProtectedRoutes from "./utils/UserProtectedRoutes";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/stripeapikey`,
        { withCredentials: true }
      );
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      // console.log(error);
    }
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      getStripeApiKey();
    }
  }, [getStripeApiKey, user]);

  return (
    <Router>
      <Navbar />
      <CategoryBar />
      <Elements stripe={stripeApiKey ? loadStripe(stripeApiKey) : null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/explore" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <UserProtectedRoutes>
                <Profile />
              </UserProtectedRoutes>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <UserProtectedRoutes>
                <OrderDetail />
              </UserProtectedRoutes>
            }
          />
          <Route
            path="/checkout-details"
            element={
              <UserProtectedRoutes>
                <Checkout />
              </UserProtectedRoutes>
            }
          />
        </Routes>
      </Elements>
      <Footer />
    </Router>
  );
};

export default App;
