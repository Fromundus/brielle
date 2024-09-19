import React from 'react'
import ipconfig from '../ipconfig';
import { BiInfoCircle } from 'react-icons/bi';
import { MdPayments } from 'react-icons/md';
import axiosClient from '../axios-client';
import { redirect, useNavigate, useOutletContext } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import address from '../AddressesData';

function Checkout() {
    React.useState( () => {
        window.scrollTo(0, 0);
    }, [])

    const navigate = useNavigate();
    const uniqueId = uuidv4();
    const [loading, setLoading] = React.useState(false); 
    const { selected, setSelected } = useOutletContext();
    const { cart, setCart } = useOutletContext();
    const [addresses, setAddresses] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [orderTotal, setOrderTotal] = React.useState(0);
    const [data, setData] = React.useState({
        firstname: "",
        lastname: "",
        contact_number: "",
        address: "",
        address_description: "",
        service_option: "",
        message: "",
        shipping_fee: 0,
    });

    // console.log(data);

    const [errors, setErrors] = React.useState({
        firstname: "",
        lastname: "",
        contact_number: "",
        address: "",
        address_description: "",
        service_option: "",
        message: "",
        shipping_fee: "",
    });

    React.useEffect( () => {
        // axiosClient.get('/addresses')
        //     .then( (res) => {
        //         console.log(res);
        //         setAddresses(res.data.data);
        //     })
        //     .catch( (err) => {
        //         console.log(err);
        //     })

        setAddresses(address);

        if(selected.length === 0){
            navigate('/');
        }
    }, []);

    const renderAddresses = addresses.map( (item) => {
        return (
            <option className='text-black' key={item.id} value={item.name}>{item.name}</option>
        )
    });

    React.useEffect( () => {
        setOrderTotal((data.shipping_fee) + totalPrice)
    }, [data, totalPrice]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData( (prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

        if(name === "address"){
            if(value === ""){
                setData( (prev) => {
                    return {
                        ...prev,
                        shipping_fee: 0
                    }
                })
            } else {
                const selected = addresses.find((item) => {
                    if(item.name === value){
                        return item;
                    }
                });
    
                setData( (prev) => {
                    return {
                        ...prev,
                        shipping_fee: Number(selected.shipping_fee)
                    }
                })
            }
        }

        if(name === "service_option"){
            if(value === "forpickup" || ""){
                setData( (prev) => {
                    return {
                        ...prev,
                        address: "",
                        address_description: "",
                        shipping_fee: 0
                    }
                })
            }
        }

        setErrors({});
    }

    const renderSelected = selected?.map( (item) => {
        return (
            <div key={item.id}>
                <div className='flex gap-4 items-center p-2 w-full'>
                    <div className='w-1/12 min-w-[100px] min-h-[100px]'>
                        <img className='rounded-lg w-full max-h-[100px] object-cover' src={item.image} alt="" />
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-semibold'>{item.name}</span>
                        <span className='text-primary font-semibold'>&#8369;{item.price} x {item.quantity}</span>
                    </div>
                    <div className='ms-auto'>
                        <span className="font-semibold text-pink-600 pe-2">&#8369;{item.price * item.quantity}</span>
                    </div>
                </div>
            </div>
        )
    });

    React.useEffect( () => {
        let total = 0;
        selected.forEach((item) => {
            total += Number(item.price) * Number(item.quantity);
        })

        setTotalPrice(total);
    }, []);

    // console.log(selected);

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        setErrors({});

        const newSelected = selected.map((item) => {
            return {
                ...item,
                order_id: uniqueId
            }
        })

        const formData = {
            order_id: uniqueId,
            firstname: data.firstname,
            lastname: data.lastname,
            contact_number: data.contact_number,
            address: data.address,
            address_description: data.address_description,
            service_option: data.service_option,
            payment_status: "unpaid",
            shipping_fee: data.shipping_fee,
            total_price: orderTotal,
            status: "pending",
            selected: newSelected
        }

        // axiosClient.post('order', formData)
        //     .then( (res) => {
        //         console.log(res);
        //         setLoading(false);
        //         window.scrollTo(0, 0);
        //         if(res.status === 200){
        //             setSelected([]);
        //             const newCart = cart.filter(item => !selected.includes(item));
        //             setCart(newCart);
        //             localStorage.setItem("order_id", res.data.order_id);
        //             navigate(`/order/${res.data.order_id}`);
        //             // window.location.href = res.data.data.attributes.checkout_url
        //         }
        //     })
        //     .catch( (err) => {
        //         console.log(err);
        //         setErrors(err.response.data.message);
        //         setLoading(false);
        //         window.scrollTo(0, 0);
        //     })

        setSelected([]);
        const newCart = cart.filter(item => !selected.includes(item));
        setCart(newCart);

        localStorage.setItem("order_id", uniqueId);
        navigate(`/order/${uniqueId}`);
    }

    return (
        <div className='min-h-screen lg:px-40 p-4 pt-14 mb-20 flex flex-col items-center'>
            <div className='mt-5'>
                <span className='text-3xl font-semibold'>Checkout</span>
            </div>
            <form className='w-full flex flex-col gap-2 mt-5' onSubmit={submitHandler}>
                <div className='flex items-center gap-2 font-semibold'>
                    <BiInfoCircle className='text-2xl' />
                    <span>Order Info</span>
                </div>
                <input 
                    className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary' 
                    type="text" 
                    placeholder='First Name' 
                    onChange={handleChange} 
                    name='firstname' 
                    value={data.firstname} 
                />
                {errors.firstname && <span className='text-sm text-pink-600'>{errors.firstname}</span>}

                <input 
                    className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary' 
                    type="text" 
                    placeholder='Last Name' 
                    onChange={handleChange} 
                    name='lastname' 
                    value={data.lastname} 
                />
                {errors.lastname && <span className='text-sm text-pink-600'>{errors.lastname}</span>}

                <input 
                    className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary' 
                    type="number" 
                    placeholder='Contact No.' 
                    onChange={handleChange} 
                    name='contact_number' 
                    value={data.contact_number} 
                />
                {errors.contact_number && <span className='text-sm text-pink-600'>{errors.contact_number}</span>}

                <select
                        className={`border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary ${data.service_option === "" && "text-neutral-400"}`}
                        name="service_option"
                        id=""
                        onChange={handleChange}
                        value={data.service_option}
                        >
                        <option className='text-neutral-400' value="">Select Service Option</option>
                        <option className='text-black' value="delivery">Delivery</option>
                        <option className='text-black' value="forpickup">For Pick-up</option>
                        {/* <option value="cod">Cash on Delivery (COD)</option> */}
                </select>
                {errors.service_option && <span className='text-sm text-pink-600'>{errors.service_option}</span>}

                <textarea 
                        className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary' 
                        type="text" 
                        placeholder='Preferences/Message to the seller.' 
                        onChange={handleChange} 
                        name='message' 
                        value={data.message} 
                />
                {errors.message && <span className='text-sm text-pink-600'>{errors.message}</span>}

                {data.service_option === "delivery" && <>
                    <select
                            className={`border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary ${data.address === "" && "text-neutral-400"}`}
                            name="address"
                            id=""
                            onChange={handleChange}
                            value={data.address}
                            >
                            <option className='text-neutral-400' value="">Select Address</option>
                            {renderAddresses}
                    </select>
                    {errors.address && <span className='text-sm text-pink-600'>{errors.address}</span>}
                </>}

                {data.service_option === "delivery" && <>
                    <textarea 
                        className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary' 
                        type="text" 
                        placeholder='Additional Address Description' 
                        onChange={handleChange} 
                        name='address_description' 
                        value={data.address_description} 
                    />
                    {errors.address_description && <span className='text-sm text-pink-600'>{errors.address_description}</span>}
                </>}

                <div className='flex flex-col rounded-lg mt-5'>
                    {renderSelected}
                </div>
                <div className='flex gap-2 items-center font-semibold self-start mt-5'>
                    <MdPayments className='text-2xl' />
                    <span>Payment Info</span>
                </div>
                <div className='flex flex-col rounded-lg p-2 w-full items-end pe-4'>
                    <span className='text-lg'>Item Subtotal: <span className='font-semibold'>&#8369;{totalPrice}</span></span>
                    {data.service_option === "delivery" && <span className='text-lg'>Shipping Fee Subtotal: <span className='font-semibold'>&#8369;{data.shipping_fee}</span></span>}
                    <span className='text-xl text-primary font-bold'>Order Total: <span>&#8369;{orderTotal}</span></span>
                </div>
                <div className='w-full'>
                    <button className={`mt-5 bg-primary rounded-lg p-2 text-white font-semibold w-full ${loading ? "cursor-not-allowed bg-purple-400" : ""}`} disabled={loading}>Order</button>
                </div>
            </form>
        </div>
    )
}

export default Checkout