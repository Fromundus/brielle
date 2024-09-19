import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../../assets/logo.png";

function Header({ cartLength }) {

    return (
        <nav className="fixed z-50 w-full py-2 ps-4 pe-2 border-b flex items-center bg-white lg:px-40">
            <Link className="w-20" to="/">
                {/* <img className='w-[40px]' src={logo} alt="" /> */}
                <span className='text-xl font-bold text-primary'>brielle.</span>
            </Link>
            <Link to="cart" className="relative ms-auto">
                <MdOutlineShoppingCart className="text-3xl mt-2" />
                {cartLength > 0 && <span className="absolute px-3 py-0.5 rounded-full font-bold bg-primary text-white" style={{fontSize: "7pt", top: 0, left: "10px"}}>{cartLength}</span>}
            </Link>
            <div className='ms-4 flex gap-2'>
                <Link to="login" className='border-2 border-primary bg-primary text-white py-1 px-2 rounded-lg hover:text-primary hover:bg-white'>Login</Link>
            </div>
        </nav>
    )
}

export default Header