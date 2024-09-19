import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../../assets/logo.png";

function Header({cartLength}) {
    return (
        <nav className="fixed z-50 w-full py-2 ps-4 pe-8 border-b flex items-center bg-white lg:px-40">
            <Link className="w-20 mt-2" to="/r3">
                {/* <img src={logo} alt="" /> */}
                <span className='text-xl font-bold text-primary'>brielle.</span>
            </Link>
            <Link to="cart" className="relative ms-auto">
                <MdOutlineShoppingCart className="text-3xl mt-2" />
                {cartLength > 0 && <span className="absolute px-3 py-0.5 rounded-full font-bold bg-primary text-white" style={{fontSize: "7pt", top: 0, left: "10px"}}>{cartLength}</span>}
            </Link>
            <img className='w-[38px] ms-5' src={logo} alt="" />
        </nav>
    )
}

export default Header