import React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axiosClient from '../axios-client';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const navigate = useNavigate();
    const uniqueId = uuidv4();
    const [isLoading, setIsloading] = React.useState(false);
    const [data, setData] = React.useState({
        firstname: "",
        lastname: "",
        contact_number: "",
        password: "",
        password_confirmation: ""
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const [errors, setErrors] = React.useState({
        firstname: "",
        lastname: "",
        contact_number: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData( (prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

        setErrors({});
    }

    const toggleShow =() => {
        setShowPassword(prev => !prev);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});
        setIsloading(true);

        const formData = {
            cart_id: uniqueId,
            firstname: data.firstname,
            lastname: data.lastname,
            contact_number: data.contact_number,
            password: data.password,
            password_confirmation: data.password_confirmation
        }

        // axiosClient.post(`/register`, formData)
        //     .then((res) => {
        //         console.log(res);
        //         setIsloading(false);
        //         if(res.status === 200){
        //             toastSuccess(res.data.message);
        //             navigate('/auth');
        //         }
        //     })
        //     .catch( (err) => {
        //         console.log(err);
        //         setErrors(err.response.data.message);
        //         setIsloading(false);
        //     })
        setIsloading(false);
    }

    function toastSuccess(message){
        toast.success(`${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }

    return (
        <div className="pt-20 flex flex-col w-full min-h-screen mb-20">
            <div className='flex flex-col items-center'>
                <span className='text-2xl font-semibold text'>Create Account</span>
                <form className='flex flex-col gap-2 mt-5 w-full px-8 lg:px-40' onSubmit={handleSubmit}>
                    <div className='flex flex-col lg:flex-row w-full gap-2'>
                        <div className='flex flex-col w-full'>
                            <input 
                                className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary' 
                                type="text" 
                                placeholder='First Name' 
                                onChange={handleChange} 
                                name='firstname' 
                                value={data.firstname} 
                            />
                            {errors.firstname && <span className='text-sm text-pink-600 mt-2'>{errors.firstname}</span>}
                        </div>
                        <div className='flex flex-col w-full'>
                            <input 
                                className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary' 
                                type="text" 
                                placeholder='Last Name' 
                                onChange={handleChange} 
                                name='lastname' 
                                value={data.lastname} 
                            />
                            {errors.lastname && <span className='text-sm text-pink-600 mt-2'>{errors.lastname}</span>}
                        </div>

                    </div>

                    <input 
                        className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary' 
                        type="number" 
                        placeholder='Contact No.' 
                        onChange={handleChange} 
                        name='contact_number' 
                        value={data.contact_number} 
                    />
                    {errors.contact_number && <span className='text-sm text-pink-600'>{errors.contact_number}</span>}

                    <div className='flex flex-col lg:flex-row w-full gap-2'>
                        <div className='flex flex-col w-full'>
                            <div className='flex relative items-center'>
                                <input 
                                    className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary w-full pe-14' 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='Password' 
                                    onChange={handleChange} 
                                    name='password' 
                                    value={data.password} 
                                />
                                {data.password.length > 0 &&
                                <>
                                    {showPassword ? <FaEye className='absolute cursor-pointer right-4 text-xl text-neutral-400' onClick={toggleShow} />
                                    :
                                    <FaEyeSlash className='absolute cursor-pointer right-4 text-xl text-neutral-400' onClick={toggleShow} />}
                                </>
                                }
                            </div>
                        </div>
                        <div className='flex flex-col w-full'>
                            <input 
                                className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary' 
                                type={showPassword ? "text" : "password"} 
                                placeholder='Confirm Password' 
                                onChange={handleChange} 
                                name='password_confirmation' 
                                value={data.password_confirmation} 
                            />
                            {errors.password && <span className='text-sm text-pink-600 mt-2'>{errors.password}</span>}
                        </div>
                    </div>





                    <button className={`bg-primary p-3 rounded-lg font-bold text-white mt-5 ${isLoading ? "cursor-not-allowed bg-purple-400" : ""}`} disabled={isLoading}>{isLoading ? "Creating..." : "Create"}</button>
                </form>
                    <ToastContainer />
                <span className='mt-4'>Already have an account? <Link to="/login" className="text-primary font-semibold">Login</Link></span>
            </div>
        </div>
    )
}

export default Signup