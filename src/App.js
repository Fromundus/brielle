import React from 'react';
import "./App.css";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider';
import RequireAuthentication from './components/RequireAuthentication';

import GuestLayout from './layouts/GuestLayout';
import Landing from './pages/Landing';
import Menu from './pages/Menu';
import Auth from './layouts/Auth';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';

import SuperAdminLayout from './layouts/SuperAdminLayout';

import UserLayout from './layouts/UserLayout';

import AdminLayout from './layouts/AdminLayout';
import Products from './pages/Admin/Products';
import Account from './pages/Admin/Account';
import Checkout from './pages/Checkout';
import Tracking from './pages/Tracking';
import Payment from './pages/Payment';
import UserHome from './pages/User/UserHome';
import UserProfile from './pages/User/UserProfile';
import UserCart from './pages/User/UserCart';
import Orders from './pages/Admin/Orders';
import Product from './pages/Admin/Product';
import Search from './pages/Search';
import Home from './pages/Admin/Home';
import UserOrders from './pages/User/UserOrders';
import UserCheckout from './pages/User/UserCheckout';

const roles = {
    superAdmin: 1,
    admin: 2,
    user: 3
}

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<GuestLayout />}>
            <Route index element={<Landing />} />
            <Route path="menu" element={<Menu />} />
            <Route path="cart" element={<Cart />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='payment/:order_id' element={<Payment />} />
            <Route path='order'>
                <Route index element={<Search />} />
                <Route path=':order_id' element={<Tracking />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path="signup" element={<Signup />} />
        </Route>

        <Route element={<RequireAuthentication allowedRoles={roles.superAdmin} />}>
            <Route path={`r${roles.superAdmin}`} element={<SuperAdminLayout />}>
                <Route index  element={"Super Admin"} />
            </Route>
        </Route>

        <Route element={<RequireAuthentication allowedRoles={roles.admin} />}>
            <Route path={`r${roles.admin}`} element={<AdminLayout />}>
                <Route index element={<Home />} />
                <Route path='orders' element={<Orders />} />
                <Route path='products' element={<Products />} />
                <Route path='products/:id' element={<Product />} />
                <Route path='account' element={<Account />} />
            </Route>
        </Route>

        <Route element={<RequireAuthentication allowedRoles={roles.user} />}>
            <Route path={`r${roles.user}`} element={<UserLayout />}>
                <Route index element={<UserHome />} />
                <Route path='profile' element={<UserProfile />} />
                <Route path='cart' element={<UserCart />} />
                <Route path='orders' element={<UserOrders />} />
                <Route path='checkout' element={<UserCheckout />} />
            </Route>
        </Route>

        <Route path="*" element="Not Found" />
    </>
))

function App() {
    return (
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    )
}

export default App