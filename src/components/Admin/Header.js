import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../../assets/logo.png";

function Header() {
    return (
        <nav className="fixed z-50 w-full py-2 ps-4 pe-8 border-b flex items-center justify-between bg-white lg:px-40">
            <Link className="w-20 mt-2" to="/r2">
                {/* <img src={logo} alt="" /> */}
                <span className='text-xl font-bold text-primary'>brielle.</span>
            </Link>
        </nav>
    )
}

export default Header