import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaUser, FaRegUser } from "react-icons/fa6";
import { MdFastfood, MdOutlineFastfood } from "react-icons/md";
import { HiOutlineNewspaper, HiNewspaper } from "react-icons/hi2";
import { PiHamburger, PiHamburgerFill } from "react-icons/pi";

function Navbar() {
    return (
        <nav className="fixed bottom-0 flex justify-around w-full p-4 text-2xl bg-white lg:px-40">
            <NavLink end to="/r3">
                {({isActive}) => (isActive ? 
                    <PiHamburgerFill className="text-primary" /> 
                    : 
                    <PiHamburger className="text-neutral-600" />)}
            </NavLink>
            <NavLink to="orders">
                {({isActive}) => (isActive ? 
                    <HiNewspaper className="text-primary" /> 
                    : 
                    <HiOutlineNewspaper className="text-neutral-600" />)}
            </NavLink>
            <NavLink className="text-xl" to="profile">
                {({isActive}) => (isActive ? 
                    <FaUser className="text-primary" /> 
                    : 
                    <FaRegUser className="text-neutral-600" />)}
             </NavLink>
        </nav>
    )
}

export default Navbar