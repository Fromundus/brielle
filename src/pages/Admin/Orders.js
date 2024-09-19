import React from 'react'
import axiosClient from '../../axios-client';
import { useSearchParams } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const productFilter = searchParams.get("filter")

    React.useEffect( () => {
        window.scrollTo(0 , 0);

        axiosClient.get("orders")
            .then( (res) => {
                console.log(res);
                setOrders(res.data.data);
            })
            .catch( (err) => {
                console.log(err);
            })
    }, []);

    function handleSearch(e){
        setSearch(e.target.value);
    }

    const renderOrders = orders.map( (item) => {
        return (
            <div key={item.order_id}>
                <div className='flex gap-4 border rounded-lg items-center p-2 w-full shadow-md'>
                    <div className='flex flex-col min-w-fit'>
                        <span className='text-sm text-neutral-400'>{item.order_id}</span>
                        <span className='font-semibold'>{item.firstname} {item.lastname}</span>
                        <span>{item.contact_number}</span>
                    </div>
                    {/* <div className='flex gap-2 flex-wrap flex-col'>
                        <div className='flex gap-1 flex-wrap'>
                            {item.items.map( (item) => {
                                return (
                                    <>
                                        <span className='text-sm'>({item.name} x{item.quantity})</span>
                                    </>
                                )
                            })}
                        </div>
                        <span className='text-primary font-semibold'>Total Price: &#8369;{item.total_price}</span>
                    </div>
                    <div>

                    </div> */}
                </div>
            </div>
        )
    })

    return (
        <div className='pt-14 mb-20 min-h-screen px-4 lg:px-40'>
            <div className='mt-3'>
                <span className='text-3xl font-semibold'>Orders</span>
            </div>
            <div className='w-full px-2 sticky top-12 bg-white pb-3'>
                <input className='w-full p-3 rounded-3xl mt-3 px-5 border-2 border-neutral-400 focus:outline-primary' type="text" placeholder='Search...' onChange={handleSearch} value={search} />
                <div className='w-full mt-3 flex gap-4 overflow-x-auto whitespace-nowrap'>
                    <button
                        className={`border-2 px-3 py-1 rounded-2xl ${productFilter === null ? "border-primary bg-primary text-white" : "border-neutral-400 text-neutral-400"}`}
                        onClick={() => setSearchParams({})}>All</button>
                    <button
                        className={`border-2 px-3 py-1 rounded-2xl ${productFilter === "pending" ? "border-primary bg-primary text-white" : "border-neutral-400 text-neutral-400"}`}
                        onClick={() => setSearchParams({filter: "pending"})}>Pending</button>
                    <button
                        className={`border-2 px-3 py-1 rounded-2xl ${productFilter === "delivery" ? "border-primary bg-primary text-white" : "border-neutral-400 text-neutral-400"}`}
                        onClick={() => setSearchParams({filter: "delivery"})}>Delivery</button>
                    <button
                        className={`border-2 px-3 py-1 rounded-2xl ${productFilter === "pick-up" ? "border-primary bg-primary text-white" : "border-neutral-400 text-neutral-400"}`}
                        onClick={() => setSearchParams({filter: "pick-up"})}>Pick-up</button>
                    <button
                        className={`border-2 px-3 py-1 rounded-2xl ${productFilter === "completed" ? "border-primary bg-primary text-white" : "border-neutral-400 text-neutral-400"}`}
                        onClick={() => setSearchParams({filter: "completed"})}>Completed</button>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                {renderOrders}
            </div>
        </div>
    )
}

export default Orders