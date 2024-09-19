import React from 'react'
import { FaFacebook, FaInstagram, FaLocationDot, FaPhone, FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import spag from "../assets/spaghetti2.png";

function Landing() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen p-10 lg:px-40 flex flex-col mb-20">
            <div className='w-3/4 lg:w-1/2 min-w-[250px] max-w-[400px] ms-[-40px] lg:ms-0'>
                <img className='w-full' src={spag} alt="" />
            </div>

            <span className="text-2xl lg:text-5xl font-semibold lg:font-bold lg:text-center mt-10 lg:mt-0">Welcome to <span className="text-4xl lg:text-6xl font-bold text-primary">brielle.</span></span>
            <span className='mt-2 mb-5 lg:text-center font-semibold text-xl lg:text-2xl text-primary'>Tasty Food Delivered Fast.</span>
            <span className='lg:px-52 text-neutral-600'>Hungry? Explore a variety of delicious meals without leaving your home. Order now and enjoy great food delivered right to your door.</span>

            <div className='mt-10 flex items-center justify-center gap-5'>
                <Link to="menu" className='self-center border-2 border-primary bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:text-primary hover:bg-white'>Order Now</Link>
                <Link to="signup" className='self-center border-2 border-primary text-primary bg-white py-3 px-6 rounded-lg font-semibold hover:text-white hover:bg-primary'>Sign up</Link>
            </div>
            <div className='flex mt-8 items-center justify-center gap-3 text-2xl'>
                <a className='text-neutral-600' href="https://www.facebook.com/johncarlcastrocueva" target="_blank"><FaFacebook /></a>
                <a className='text-neutral-600' href="https://www.x.com/johncarlcueva_" target="_blank"><FaXTwitter /></a>
                <a className='text-neutral-600' href="https://www.instagram.com/johncarl.cueva" target="_blank"><FaInstagram /></a>
            </div>

            <div className='flex flex-col mt-10 gap-2'>
                <div className='flex gap-2 items-center'>
                    <FaPhone className='text-2xl text-primary' />
                    <span>09999999999</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <FaLocationDot className='text-2xl text-primary' />
                    <span>Lorem, Ipsum, Philippines</span>
                </div>
            </div>

            {/* <div className='self-center max-w-[500px] mt-10'>
                <img className='w-full' src={pansit} alt="" />
            </div> */}
        </div>
    )
}

export default Landing