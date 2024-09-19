import React from 'react'
import { NavLink } from 'react-router-dom';
import { GoHome, GoHomeFill } from "react-icons/go";
import { FaUser, FaRegUser } from "react-icons/fa6";
import { HiOutlineNewspaper, HiNewspaper } from "react-icons/hi2";
import { PiHamburger, PiHamburgerFill } from "react-icons/pi";

function Navbar() {
    return (
        <nav className="fixed bottom-0 flex justify-around items-center w-full p-4 text-2xl bg-white lg:px-40">
            <NavLink to="/">
                {({isActive}) => (isActive ? 
                    <GoHomeFill className="text-primary" /> 
                    : 
                    <GoHome className="text-neutral-600" />)}
            </NavLink>
            <NavLink to="menu">
                {({isActive}) => (isActive ? 
                    <PiHamburgerFill className="text-primary" /> 
                    : 
                    <PiHamburger className="text-neutral-600" />)}
            </NavLink>
            <NavLink to="order">
                {({isActive}) => (isActive ? 
                    <HiNewspaper className="text-primary" /> 
                    : 
                    <HiOutlineNewspaper className="text-neutral-600" />)}
            </NavLink>
        </nav>
    )
}

export default Navbar