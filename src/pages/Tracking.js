import React from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import { format } from 'date-fns';
import ipconfig from '../ipconfig';

function Tracking() {
    const { order_id } = useParams();

    const [order, setOrder] = React.useState();
    const [itemSubTotal, setItemSubTotal] = React.useState(0);
    console.log(order);

    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    // React.useEffect( () => {
    //     axiosClient.get(`order/${order_id}`)
    //         .then( (res) => {
    //             console.log(res);
    //             setOrder(res.data.data);
    //             let total = 0;
    //             res.data.data?.items.forEach((item) => {
    //                 total += Number(item.price) * Number(item.quantity);
    //             })
    //             setItemSubTotal(total)
    //         })
    //         .catch( (err) => {
    //             console.log(err);
    //         })
    // }, []);

    return (
        <div className='pt-14 mb-20 lg:px-40 p-4 min-h-screen'>
            <div className='flex flex-col items-center mt-16'>
                <span className='text-5xl font-semibold text-primary text-center'>You're Awesome!!!</span>
                <span className='mt-10'><span className='font-semibold'>Your order has been recieved.</span> We are currently checking your order. Kindly wait for your payment.</span>

                {/* <div className='flex mt-10 justify-start flex-col items-start w-full lg:w-1/2'>
                    <span>Order ID: <span className='font-semibold'>{order.order_id}</span></span>
                    <span>Name: <span className='font-semibold'>{order.firstname} {order.lastname}</span></span>
                    <span>Contact No.: <span className='font-semibold'>{order.contact_number}</span></span>
                    <span>Date & Time: <span className='font-semibold'>{format(new Date(order.created_at), "MMMM d, y - h:m aaa")}</span></span>
                    <div className='w-full my-5'>
                        {order?.items.map( (item) => {
                            return (
                                <div key={item.id}>
                                    <div className='flex gap-4 items-center p-2 w-full'>
                                        <div className='w-1/12 min-w-[100px]'>
                                            <img className='rounded-lg' src={`${ipconfig}/storage/${item.image}`} alt="" />
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
                        })}
                    </div>
                    <div className='flex flex-col items-end w-full'>
                        <span>Item Subtotal: &#8369;{itemSubTotal} </span>
                        {order.shipping_fee > 0 && <span>Shipping Fee: &#8369;{order.shipping_fee}</span>}
                        <span className='text-primary text-lg font-bold'>Order Total: <span>&#8369;{order.total_price}</span></span>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Tracking