import React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import { Link } from 'react-router-dom';

function Login() {
    React.useEffect( () => {
        window.scrollTo(0 ,0);
    }, [])

    const [isLoading, setIsloading] = React.useState(false);
    const { setToken, setRole, setName, setId } = useStateContext();
    const [data, setData] = React.useState({
        contact_number: "",
        password: "",
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const [errors, setErrors] = React.useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData( (prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

        setErrors("");
    }

    const toggleShow =() => {
        setShowPassword(prev => !prev);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsloading(true);
        setErrors("");

        // axiosClient.post("/login", data)
        //     .then( ({data}) => {
        //         if(data.message === "Invalid Credentials"){
        //             setErrors(data.message);
        //         } else if (data.message === "Pending Account"){
        //             setErrors(data.message);
        //         } else {
        //             setErrors("Invalid Account")
        //         }

        //         setToken(data.token);
        //         setRole(data.role);
        //         setName(data.name);
        //         setId(data.id);
        //         setIsloading(false);
        //     })
        //     .catch( (err) => {
        //         console.log(err)
        //         if(err.response.status === 422){
        //             setErrors("Invalid Credentials")
        //         }
        //         setIsloading(false);
        //     })

        setIsloading(false);
    }

    return (
        <div className="pt-20 flex flex-col w-full min-h-screen">
            <div className='flex flex-col items-center'>
                <span className='text-2xl font-semibold'>Login</span>
                <form className='flex flex-col gap-2 mt-5 w-full px-8 lg:px-40' onSubmit={handleSubmit}>
                    {errors && <span className='text-center bg-pink-600 p-2 rounded-lg text-white font-semibold'>{errors}</span>}
                    <input 
                        className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary' 
                        type="number" 
                        placeholder='Contact No.' 
                        onChange={handleChange} 
                        name='contact_number' 
                        value={data.contact_number}
                    />
                    {errors.contact_number && <span className='text-sm text-pink-600'>{errors.contact_number}</span>}

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

                    <button className={`bg-primary p-3 rounded-lg font-bold text-white mt-5 ${data.contact_number.length === 0 || data.password.length === 0 || isLoading ? "cursor-not-allowed bg-purple-400" : ""}`} disabled={data.contact_number.length === 0 || data.password.length === 0}>{isLoading ? "Logging in..." : "Login"}</button>
                </form>
                <span className='mt-4'>Don't have an account? <Link to="/signup" className="text-primary font-semibold">Signup</Link></span>
            </div>
        </div>
    )
}

export default Login